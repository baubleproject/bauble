import { initialProfile } from "@/actions/InitialProfile"
import { dmsans } from "@/lib/font";
import { getTimeOfDay } from "@/lib/utils";
import moment from "moment";

export default async function page() {

    const currentDateTime = new Date(); // Pass in the current date and time
    const timeOfDay = getTimeOfDay(currentDateTime);
    const todaytime = moment(currentDateTime).format("dddd, MMMM Do")

    const profile = await initialProfile()
    if (!profile) {
        return null
    }
    return (
        <main className={`w-full h-full ${dmsans.className}`}>
            <h1 className='text-sm md:text-lg -tracking-wider font-light'>Home</h1>
            <section className="w-full h-full flex md:items-center flex-col">
                <p className="text-md md:text-xl font-extralight">{todaytime}</p>
                <p className="text-xl md:text-2xl font-normal">Good {timeOfDay}, {profile?.lastname}{" "}{profile?.firstname}</p>
            </section>
        </main>
    )
}
