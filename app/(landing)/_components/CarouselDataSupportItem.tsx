import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface Props {
    description: string
    title: string
    classnames: string
}

export const CarouselDataSupportItem = ({ title, description, classnames }: Props) => (
    <CarouselItem className="md:basis-1/3">
        <article className={cn(`h-full rounded-2xl p-8 md:p-12 lg:p-16 flex flex-col gap-5 font-outfit text-white`, classnames)}>
            <small className="text-neutral-600 text-xs">WE OFFER</small>
            <h4 className="text-lg font-semibold">{title}</h4>
            <p className="text-sm font-normal text-neutral-700">{description}</p>
        </article>
    </CarouselItem>
);
