import React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Autoplay, { AutoplayType } from "embla-carousel-autoplay";
import { carouselData } from "@/data/CarouselData";
import { CarouselDataSupportItem } from "./CarouselDataSupportItem";

export default function Support() {
    const autoplayOptions = {
        delay: 4000,
        stopOnLastSnap: false,
        // stopOnFocusIn: true,
        // stopOnMouseEnter: true,
    };
    return (
        <section id="why" className="md:max-w-screen-2xl items-center w-full">
            <h2 className="text-text-color text-2xl hidden px-4 md:block">
                {/*Why Bauble?*/}
            </h2>
            <div className="w-full overflow-hidden pl-4 md:p-10 box-border">
                <Carousel plugins={[Autoplay(autoplayOptions)] /* Enable autoplay */}>
                    <CarouselContent className="w-full">
                        {carouselData.map((item, index) => (
                            <CarouselDataSupportItem key={index} {...item} classnames={`${item.bgColor} text-neutal-900 font-semibold `} />
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    );
}
