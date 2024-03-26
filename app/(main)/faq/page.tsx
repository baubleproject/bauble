"use client"
import Logo from "@/components/custom/Logo"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { faqData as FAQDATA } from "@/lib/faq"

import React, { useEffect, useState } from 'react'

export default function Page() {
    const faqData = FAQDATA.faqs

    const [faq, setFaq] = useState(faqData)
    const [filter, setFilter] = useState("")

    useEffect(() => {

        const data = faqData.filter((faq) => {
            return faq.question.toLowerCase().includes(filter.toLowerCase())
        })
        setFaq(data)

    }, [filter, setFilter])

    return (
        <section className="w-full">
            <div className="w-5/6 md:w-2/3 mx-auto space-y-6">
                <div>
                    <div className="">
                        <Logo className=" w-28 h-14 md:w-48 md:h-28" />
                    </div>
                    <p className="font-light">
                        Bauble is a comprehensive Student Project Collaboration System developed as a final year project. It addresses the inefficiencies and challenges associated with traditional methods of academic collaboration among students. The system empowers users with role-based authentication, allowing admins to manage projects comprehensively while enabling members to contribute effectively within a balanced collaborative environment. Bauble integrates modern technologies like Next.js, TypeScript, Prisma ORM, and PostgreSQL to create a flexible and user-centric platform. It streamlines project management, enhances communication, and fosters a transparent and efficient academic environment. Through its innovative features and robust architecture, Bauble aims to redefine collaborative experiences for students, making academic projects more manageable, engaging, and successful.
                    </p>
                </div>

                <div className="w-full">
                    <p className="tracking-tighter font-semibold text-lg">FAQ</p>
                    <Input onChange={(e) => setFilter(e.target.value)} value={filter} className="w-5/6 md:w-1/3 my-2" placeholder="Filter the faq" />
                    <Accordion type="single" collapsible>
                        {
                            faq.map((faq, index) => (
                                <AccordionItem value={`item~${index}`} key={index}>
                                    <AccordionTrigger>
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))
                        }
                    </Accordion>
                </div>
            </div>
        </section>
    )
}
