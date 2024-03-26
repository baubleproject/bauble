import { LiaComments, LiaCommentSlashSolid } from "react-icons/lia";
import { getPlentyTasksById, getTasksById } from '@/actions/getTaskById'
import { useModal } from '@/hooks/useModalStore'
import { truncateText } from '@/lib/utils'
import React from 'react'
import { priorityMap } from '../tables/TaskTables/columns'
import useTaskStore from "@/store/TaskState";

export type TaskType = Awaited<ReturnType<typeof getTasksById>>

interface KanbanTaskCard {
    task: TaskType
}

export default function KanbanTaskCard({ task }: KanbanTaskCard) {

    const countOfComments = task?.comments.length ? task?.comments.length : 0

    const { onOpen } = useModal()
    const { setDraggedTask } = useTaskStore()

    const openModal = () => {
        onOpen("taskDetails", { taskId: task?.id })
    }

    const setDraggedTaskFUnction = () => {
        setDraggedTask(task?.id!)
    }

    return (
        <div className='p-2 rounded-lg w-fit shadow-md border-[0.1px] border-zinc-200 dark:border-zinc-800 space-y-3 cursor-pointer my-1' onClick={openModal} draggable onDragStart={setDraggedTaskFUnction}>
            <div className='flex items-center gap-3 justify-between'>
                <p className='text-sm font-semibold'>{truncateText(task?.name as string, 20)}</p>
                <div className={`py-0.5 px-2.5 text-xs rounded-lg ${priorityMap[task?.priority!].color} w-fit text-white font-semibold flex items-center justify-center gap-1`}>
                    <p>
                        {String(task?.priority).toLowerCase()}
                    </p>
                </div>

            </div>

            <div className='flex items-center justify-between gap-3'>
                <div>
                    {
                        task?.memberId ? (
                            <div className='flex items-center gap-1 bg-zinc-300 dark:bg-zinc-700 rounded-md px-2 py-1'>
                                <div className="cursor-pointer rounded-full w-4 h-4 bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${task?.assignedTo?.profile?.imageUrl})` }}></div>
                                <p className='text-xs'>{truncateText(task?.assignedTo?.profile?.firstname! + task?.assignedTo?.profile?.lastname!, 25)}</p>
                            </div>
                        ) : (
                            <div className="font-semibold bg-green-200 dark:bg-green-900 text-xs rounded-md w-fit p-1.5">Not assigned to anyone</div>
                        )
                    }

                </div>
                <p className='text-sm' >{countOfComments > 0 ? (

                    <p className="flex items-center justify-center gap-0.5">{countOfComments}
                        <LiaComments className='w-4 h-4' />
                    </p>
                ) : (
                    <p>
                        <LiaCommentSlashSolid className='w-4 h-4' />
                    </p>
                )}</p>
            </div>
        </div >
    )
}
