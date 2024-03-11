import { initialProfile } from "@/actions/InitialProfile";
import { dmsans } from "@/lib/font";
import { getTimeOfDay } from "@/lib/utils";
import moment from "moment";
import TaskBoard from "./_components/TaskBoard";
import TeamsBoard from "./_components/TeamsBoard";
import Dashboard from "./_components/dashboard";

export default async function page() {
  const currentDateTime = new Date(); // Pass in the current date and time
  const timeOfDay = getTimeOfDay(currentDateTime);
  const todaytime = moment(currentDateTime).format("dddd, MMMM Do");

  const profile = await initialProfile();
  if (!profile) {
    return null;
  }
  return (
    <main className={`w-full min-h-full space-y-4 ${dmsans.className}`}>
      {/*WTF: i'm contemplating hiding the page title or not
            <h1 className='text-sm md:text-lg -tracking-wider font-light'>Home</h1>
            */}
      <section className="w-full flex md:items-center flex-col space-y-2 py-2">
        <p className="text-md md:text-xl font-extralight">{todaytime}</p>
        <p className="text-xl md:text-2xl font-normal">
          Good {timeOfDay}, {profile?.lastname} {profile?.firstname}
        </p>
      </section>
      {/* <Dashboard />   */}

      {/* WTF: */}
      <section className="md:w-2/3 mx-auto flex flex-col md:grid-cols-2 md:grid w-full gap-3">
        <div className="w-full h-72 overflow-hidden rounded-2xl border-[0.06px] dark:hover:border-[1px] border-zinc-300 dark:border-zinc-700">
          <TeamsBoard className="min-h-full" />
        </div>
        <div className="w-full h-72 overflow-hidden rounded-2xl border-[0.06px] dark:hover:border-[1px] border-zinc-300 dark:border-zinc-700">
          <TaskBoard className="h-full" />
        </div>
        {/*
                <div className="w-full  h-96 overflow-auto sm:w-full bg-mySecondary">
                </div>
                <div className="w-full   overflow-auto sm:w-full bg-myPrimary">
                </div>
                    */}
      </section>
    </main>
  );
}
