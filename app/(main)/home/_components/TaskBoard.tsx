
import { HTMLAttributes } from 'react';

interface TaskBoardProps extends HTMLAttributes<HTMLDivElement> {
    // Define any additional props specific to TaskBoard component
}

export default async function TaskBoard({ className, ...props }: TaskBoardProps) {
    return (
        <div className={`w-full h-full bg-zinc-950 ${className}`} {...props}>
       </div>
    )
}

