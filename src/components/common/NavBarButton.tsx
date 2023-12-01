
"use client"
import { isSignedIn } from "@/lib/ClerkAuthTools"
import { Button } from "../ui/button"
import { FaHome } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


export function NavBarButton() {
    const [isSigned, setIsSigned] = useState(false)
    const [isPending, setIsPending] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const checkIfIsSigned = async () => {
            const result = await isSignedIn()
            setIsSigned(result)
        }
        checkIfIsSigned()
        setIsPending(false)
    }, [])

    const onSignIn = () => {
        setIsPending(true)
        router.push("/signin")
        setIsPending(false)
    }

    const onGoHome = () => {
        setIsPending(true)
        router.push("/home")
        setIsPending(false)
    }

    if (isPending) {
        return (
            <Button disabled>
                Loading...
            </Button>
        )
    }

    return (
        <div className="">
            {
                !isSigned ?
                    (<Button onClick={onGoHome} className="gap-2 flex items-center"><FaHome size={25} />Home</Button>)
                    :
                    (<Button onClick={onSignIn}>Sign In</Button>)
            }
        </div>

    )
}
