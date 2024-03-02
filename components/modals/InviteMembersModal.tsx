'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Check, Copy, RefreshCcw } from 'lucide-react';
import { toast } from "sonner"
import { useModal } from '@/hooks/useModalStore';
import { Label } from '../ui/label';
import { useOrigin } from '@/hooks/useOrigin';
import { useState } from 'react';


export default function InviteMembersModal() {
    const { isOpen, onClose, data, type, onOpen } = useModal(); // hook to handle modal management with zustand
    const isModalOpen = isOpen && type === 'inviteMembers'; // is it open ? is to create a project ?

    const origin = useOrigin(); // get the window object
    const { project } = data
    const inviteUrl = `${origin}/invite/${project?.inviteCode}`;


    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);
        toast.success(
            'Invite has been copied to clipboard',
        );
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    const onNew = async () => {
        try {
            setLoading(true);
            const response = await axios.patch(
                `/api/projects/${project?.id}/inviteCode`
            );
            toast.success(
                'New projecct invite has been created.',
            );
            onOpen('inviteMembers', { project: response.data });
        } catch (error) {
            console.log(error, ': Error caught on onNew hook in invite modal.');
        } finally {
            setLoading(false);
        }
    };


    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="overflow-hidden">
                <DialogHeader>
                    <DialogTitle>Invite collaborators to {project?.name}!</DialogTitle>
                    <DialogDescription className='text-sm'>
                        The main purpose of bauble is not accomplished if you dont have collaborators in your project
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Label className="text-sx bold text-zinc-400 ">
                        Project Invite Link
                    </Label>
                    <div className="flex items-center mt-2 gap-x-2">
                        <Input
                            readOnly
                            disabled={loading}
                            className="bg-zinc-300/50 border-0 
                            focus-visible:ring-0 text-black 
                            focus-visible:ring-offset-0"
                            value={inviteUrl}
                        />
                        <Button onClick={onCopy} disabled={loading}>
                            {copied ? <Check /> : <Copy />}
                        </Button>
                    </div>
                    <Button
                        onClick={onNew}
                        disabled={loading}
                        className="text-xs text-zinc-500 mt-4 "
                        size="sm"
                        variant="link"
                    >
                        Generate a new link.
                        <RefreshCcw className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
