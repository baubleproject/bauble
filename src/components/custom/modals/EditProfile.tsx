"use client"
import { useModal } from "@/hooks/useModal"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Profile } from "@prisma/client"

export function EditProfile() {
    const { isOpen, type, onClose, data } = useModal()
    const isModalOpen = isOpen && type == "editProfile"


    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" value={data.profile?.name} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Bio
                        </Label>
                        <Input id="username" value={data.profile?.bio!} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

interface ProfileIT {
    profile: Profile
}

export function EditProfileButton({ profile }: ProfileIT) {
    const { onOpen } = useModal()
    return (
        <Button className='' onClick={() => onOpen("editProfile", { profile })}>Edit Profile</Button>
    )
}
