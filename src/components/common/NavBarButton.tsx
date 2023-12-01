
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
            try {
                const result = await isSignedIn()
                if (result) {
                    setIsSigned(true)
                }
            }catch(e){

            } finally {
                setIsPending(false)
            }
        }

        checkIfIsSigned();
    }, [])

    const onSignIn = () => {
        router.push("/signin")
    }

    const onGoHome = () => {
        router.push("/home")
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
                isSigned ?
                    (<Button onClick={onGoHome} className="gap-2 flex items-center">Dashboard</Button>)
                    :
                    (<Button onClick={onSignIn}>Sign In</Button>)
            }
        </div>

    )
}
