import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function Support() {
  return (
    <section id="why" className="md:max-w-screen-2xl items-center w-full">
      <h2 className="text-text-color text-2xl hidden px-4 md:block ">
        {/*Why Bauble?*/}
      </h2>
      <div className="w-full overflow-hidden pl-4 md:p-10 box-border">
        <Carousel plugins={[Autoplay({ delay: 3000 })] /* Enable autoplay */}>
          <CarouselContent className="w-full">
            <CarouselItem className="md:basis-1/3">
              <article className="w-full  bg-green-900 dark:bg-primary h-full rounded-2xl p-16 flex flex-col gap-5 font-outfit">
                <small className="text-black dark:text-white opacity-50 text-xs">
                  WE OFFER
                </small>
                <h4 className="text-lg font-medium">
                  Collaborative Project Spaces
                </h4>
                <p className="text-sm font-light">
                  Create collaborative spaces for each project where team
                  members can share resources, communicate, and work together
                  seamlessly.
                </p>
              </article>
            </CarouselItem>
            <CarouselItem className="md:basis-1/3">
              <article className=" h-full rounded-2xl p-16 flex flex-col gap-5 font-outfit bg-black text-white">
                <small className="text-white text-xs">WE OFFER</small>
                <h4 className="text-lg font-medium">Task Management</h4>
                <p className="text-sm font-light">
                  Manage tasks efficiently by assigning them, setting deadlines,
                  and tracking progress within Baubles integrated task
                  management system.
                </p>
              </article>
            </CarouselItem>
            <CarouselItem className="md:basis-1/3">
              <article className=" h-full rounded-2xl p-16 flex flex-col gap-5 font-outfit bg-purple-300">
                <small className="text-black opacity-50 text-xs">
                  WE OFFER
                </small>
                <h4 className="text-lg font-medium">
                  Document Sharing and Version Control
                </h4>
                <p className="text-sm font-light">
                  Seamlessly share documents and ensure version control to keep
                  track of changes made by team members throughout the project
                  lifecycle.
                </p>
              </article>
            </CarouselItem>
            <CarouselItem className="md:basis-1/3">
              <article className=" h-full rounded-2xl p-16 flex flex-col gap-5 font-outfit bg-yellow-300">
                <small className="text-black opacity-50 text-xs">WE ARE</small>
                <h4 className="text-lg font-medium">Open Source</h4>
                <p className="text-sm font-light">
                  Benefit from community contributions. Bauble is open-source,
                  promoting transparency and empowering users to customize and
                  extend the platform.
                </p>
              </article>
            </CarouselItem>
            <CarouselItem className="md:basis-1/3">
              <article className=" h-full rounded-2xl p-16 flex flex-col gap-5 font-outfit bg-green-300">
                <small className="text-black opacity-50 text-xs">
                  WE OFFER
                </small>
                <h4 className="text-lg font-medium">Customizable Templates</h4>
                <p className="text-sm font-light">
                  Utilize customizable templates to streamline project creation
                  and enhance productivity.
                </p>
              </article>
            </CarouselItem>
            <CarouselItem className="md:basis-1/3">
              <article className=" h-full rounded-2xl p-16 flex flex-col gap-5 font-outfit bg-blue-300">
                <small className="text-black opacity-50 text-xs">
                  WE OFFER
                </small>
                <h4 className="text-lg font-medium">Real-Time Notifications</h4>
                <p className="text-sm font-light">
                  Stay updated with real-time notifications about project
                  activities, updates, and changes.
                </p>
              </article>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
