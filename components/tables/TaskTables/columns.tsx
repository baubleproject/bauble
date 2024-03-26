"use client";
/* eslint-disable */
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { GrFormEdit } from "react-icons/gr";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Member, MemberRole, Priority, Task, TaskStatus } from "@prisma/client";
import { formatDate } from "@/lib/utils";
import { Hash } from "lucide-react";
import { TasksandAssignedTo } from "@/type/TaskandAssignedTo";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { MemberandProfile } from "@/type/MemberandProfile";
import * as React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm as FormUse } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { useModal as ModalState } from "@/hooks/useModalStore";
import { useRouter as RouterUse } from "next/navigation";
import * as Reloader from "@/hooks/useReload";
import { useEventListener } from "usehooks-ts";
import { TaskType } from "@/components/Cards/KanbanTaskCard";

const roleIconMap = {
    GUEST: null,
    LEADER: <ShieldCheck className="h-5 w-5 ml-2 text-red-700" />,
    ADMIN: <ShieldCheck className="h-5 w-5 ml-2 text-indigo-700" />,
};

export const priorityMap = {
    [Priority.URGENT]: {
        color: "bg-red-900",
        icon: <Hash className=" h-3 w-3" />,
    },
    [Priority.LOW]: {
        color: "bg-blue-900",
        icon: <Hash className=" h-3 w-3" />,
    },

    [Priority.HIGH]: {
        color: "bg-red-900",
        icon: <Hash className=" h-3 w-3" />,
    },

    [Priority.MEDIUM]: {
        color: "bg-yellow-900",
        icon: <Hash className=" h-3 w-3" />,
    },
};

export const statusMap = {
    [TaskStatus.OPEN]: {
        color: "bg-blue-900",
        icon: <Hash className=" h-3 w-3" />,
    },
    [TaskStatus.CANCELED]: {
        color: "bg-red-900",
        icon: <Hash className=" h-3 w-3" />,
    },

    [TaskStatus.COMPLETED]: {
        color: "bg-green-900",
        icon: <Hash className=" h-3 w-3" />,
    },

    [TaskStatus.IN_PROGRESS]: {
        color: "bg-yellow-900",
        icon: <Hash className=" h-3 w-3" />,
    },
};

const FormSchema = z.object({
    name: z.string({
        required_error: "The task status is required",
    }),
});

export const columns: ColumnDef<TaskType>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const [editing, setEditing] = React.useState(false);
            const [loading, setLoading] = React.useState(false);
            const name: string = row.getValue("name");
            const task = row.original;
            const { ReloadPage } = Reloader.useReloadState();

            const router = RouterUse();

            const form = FormUse<z.infer<typeof FormSchema>>({
                resolver: zodResolver(FormSchema),
            });

            const enableEditing = () => {
                setEditing(true);
            };

            const disableEditing = () => {
                setEditing(false);
            };
            const onSubmit = async (data: z.infer<typeof FormSchema>) => {
                try {
                    setLoading(true);
                    await axios.put(`/api/tasks/${task?.id}/edit`, data);
                    toast.success("task status has been updated");
                    form.reset();
                    router.refresh();
                    ReloadPage();
                    //window.location.reload()
                    return disableEditing();
                } catch (error) {
                    console.log(error);
                    toast("failed to update task");
                } finally {
                    setLoading(false);
                }
            };

            const onKeyDown = (e: KeyboardEvent) => {
                if (e.key === "Escape") {
                    setEditing(false)
                }
            };

            useEventListener("keydown", onKeyDown);

            return editing ? (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className=" flex items-center gap-1"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder={task?.name}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="font-semibold text-red-500" />
                                </FormItem>
                            )}
                        ></FormField>

                        <Button
                            disabled={loading || form.formState.isSubmitting}
                            type="submit"
                        >
                            <GrFormEdit />
                        </Button>
                    </form>
                </Form>
            ) : (
                <div
                    onClick={enableEditing}
                    className="font-semibold flex items-center gap-0.5"
                >
                    <p>{name}</p>
                    <div className="rounded-lg bg-zinc-300 p-0.5">
                        <GrFormEdit />
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "assignedTo",
        header: "Assigned to",
        cell: ({ row }) => {
            const person = row.getValue("assignedTo");
            let formatted: string | MemberandProfile;

            if (person !== null) {
                formatted = person as MemberandProfile;
                const role = (formatted as any).role;

                formatted =
                    (formatted as any).profile?.firstname! +
                    " " +
                    (formatted as any).profile?.lastname!;
                return (
                    <div className="w-fit flex">
                        <p>{formatted as string}</p>
                        {roleIconMap[role as MemberRole]}
                    </div>
                );
            } else {
                formatted = "Not assigned to anyone";
                return (
                    <div className="font-semibold bg-green-200 dark:bg-green-900 rounded-md w-fit p-2">
                        {formatted.toLowerCase()}
                    </div>
                );
            }
        },
    },

    {
        accessorKey: "priority",
        header: "Task Priority",
    },
    {
        accessorKey: "start",
        header: "Creation Time",
        cell: ({ row }) => {
            const time = row.getValue("start");
            const formatted = formatDate(time as Date);
            return <div className="">{formatted}</div>;
        },
    },
    {
        accessorKey: "end",
        header: "Deadline",
        cell: ({ row }) => {
            const time = row.getValue("end");
            const formatted = formatDate(time as Date);
            return <div className="">{formatted}</div>;
        },
    },
    {
        accessorKey: "status",
        header: "Task Status",
        cell: ({ row }) => {
            //@eslint-disable-next-line
            const { onOpen } = ModalState();
            const status = row.getValue("status");
            const task = row.original;
            return (
                <div
                    onClick={() => onOpen("taskStatus", { taskId: task?.id })}
                    className={`py-1 px-3 cursor-pointer rounded-lg ${statusMap[status as TaskStatus].color
                        } w-fit text-white font-semibold flex items-center justify-center gap-1`}
                >
                    <p>{String(status).toLowerCase()}</p>
                    {statusMap[status as TaskStatus].icon}
                </div>
            );
        },
    },

    {
        /* eslint-disable */
        id: "actions",
        cell: ({ row }) => {
            const task = row.original;
            //@eslint-disable-next-line
            const { onOpen } = ModalState();
            const { ReloadPage } = Reloader.useReloadState();
            const router = RouterUse();

            const onTaskDelete = async () => {
                try {
                    await axios.delete(`/api/tasks/${task?.id}/delete`);
                    toast.success("tast has been deleted");
                    //ReloadPage();
                } catch (error) {
                    console.log(error);
                    toast.success(error as string);
                }
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4 font-semibold md:h-6 md:w-6" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(task?.id!)}
                        >
                            Copy task ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => onOpen("taskDetails", { taskId: task?.id })}
                        >
                            View task details
                        </DropdownMenuItem>
                        {/*
                        <DropdownMenuItem
                            onClick={() => onOpen("taskStatus", { taskId: task.id })}
                        >
                            Update task status
                        </DropdownMenuItem>
                            */}
                        <DropdownMenuItem
                            onClick={() => onOpen("updateTask", { task: task! })}
                        >
                            Update task details
                        </DropdownMenuItem>


                        <DropdownMenuItem className="bg-red-300 hover:bg-red-500 hover:dark:bg-red-800 dark:bg-red-600" onClick={onTaskDelete} >Delete Task (admin only)</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

/* eslint-enable */
