
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React, { ReactNode } from 'react';

interface SVGProps {
    image: string,
    className: string
}

export default function Svg({ image, className }: SVGProps) {
    return (
        <Image
            className={cn("absolute h-20 w-20",className)}
            priority
            src={image}
            alt="Follow us on Twitter"
        />
    );
}

