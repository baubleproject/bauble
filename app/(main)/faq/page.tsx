"use client"
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
            <div className="w-5/6 md:w-2/3 mx-auto">
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
        </section>
    )
}
