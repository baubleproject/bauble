import { initialProfile } from "@/actions/InitialProfile"
import { dmsans } from "@/lib/font";
import { getTimeOfDay } from "@/lib/utils";
import moment from "moment";
import TaskBoard from "./_components/TaskBoard";
import TeamsBoard from "./_components/TeamsBoard";

export default async function page() {

    const currentDateTime = new Date(); // Pass in the current date and time
    const timeOfDay = getTimeOfDay(currentDateTime);
    const todaytime = moment(currentDateTime).format("dddd, MMMM Do")

    const profile = await initialProfile()
    if (!profile) {
        return null
    }
    return (
        <main className={`w-full min-h-full space-y-4 ${dmsans.className}`}>
            <h1 className='text-sm md:text-lg -tracking-wider font-light'>Home</h1>
            <section className="w-full flex md:items-center flex-col space-y-2 py-2">
                <p className="text-md md:text-xl font-extralight">{todaytime}</p>
                <p className="text-xl md:text-2xl font-normal">Good {timeOfDay}, {profile?.lastname}{" "}{profile?.firstname}</p>
            </section>



            {/* WTF: */}
            <section className="bg-yellow-800  gap-1 min-h-[40%] w-full md:w-11/12 mx-auto flex flex-col md:flex-row flex-wrap">
                <div className="w-full md:w-1/2 overflow-auto">
                    <TeamsBoard className="h-full" />
                </div>
                <div className="w-full h-72 bg-yellow-800 md:w-1/2 overflow-auto">
                    <TaskBoard className="h-full" />
                </div>
                <div className="w-full md:w-1/2 h-96 overflow-auto sm:w-full bg-purple-900">
                    {/* Content for the third item */}
                </div>
                <div className="w-full md:w-1/2 h-56 overflow-auto sm:w-full bg-red-900">
                    {/* Content for the fourth item */}
                </div>
            </section>

        </main>
    )
}
