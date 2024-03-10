import { cn } from '@/lib/utils'
import React, { HTMLAttributes } from 'react'
import { GrAddCircle } from 'react-icons/gr'

interface Props extends HTMLAttributes<HTMLDivElement> {
}


export const AddCustomButton = ( {className,...props}:Props) => {
    return (
            <div {...props} className={cn('w-fit h-14 dark:bg-zinc-900 dark:hover:bg-zinc-800 transition-colors duration-300 cursor-pointer flex justify-center items-center gap-2 px-5 rounded-xl border-2 border-zinc-400 dark:border-zinc-600 border-dashed',className)}>
                <GrAddCircle className='font-light text-xl text-zinc-500 dark:text-zinc-300' />
            </div>

    )
}
