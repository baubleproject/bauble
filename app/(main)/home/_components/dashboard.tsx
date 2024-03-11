import studyIllustration from "/public/images/Scrum board-bro.svg";

import { initialProfile } from "@/actions/InitialProfile";
import { getTimeOfDay } from "@/lib/utils";
import moment from "moment";
import Image from "next/image";

const Dashboard = async () => {
  const currentDateTime = new Date(); // Pass in the current date and time
  const timeOfDay = getTimeOfDay(currentDateTime);
  const todaytime = moment(currentDateTime).format("dddd, MMMM Do");
  const profile = await initialProfile();
  if (!profile) {
    return null;
  }
  return (
    <div className="w-full font-inter box-border pt-7">
      <header className="bg-green-300 px-5 box-border h-1/4 flex items-center justify-between my-5 rounded-xl">
        <div className="flex flex-col gap-2">
          <p className="text-xl md:text-2xl font-normal">
            Good {timeOfDay}, {profile?.lastname} {profile?.firstname}
          </p>
          <small className="font-outfit">
            Ready to continue your journey on Academia?
          </small>
          <p className="text-md md:text-xl font-extralight">{todaytime}</p>
        </div>
        <Image
          src={studyIllustration}
          alt="study illustration"
          className="self-end"
        />
      </header>
    </div>
  );
};

export default Dashboard;
