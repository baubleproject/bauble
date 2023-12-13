import { LibrarySection } from "@/components/custom/profile/LibrarySection";
import { SavedSection } from "@/components/custom/profile/SavedSection";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { initialUserCreation } from "@/lib/ClerkAuthTools";
import { FaBell } from "react-icons/fa6";
import { EditProfileButton } from "@/components/custom/modals/EditProfile";

export default async function Home() {
    const profile = await initialUserCreation();
    if (!profile) {
        return null;
    }

    return (
        <main className="min-h-screen flex flex-col items-center bg-slate-300 dark:bg-slate-900">
            <section
                className="h-64 w-full bg-contain bg-center relative rounded-b-[2rem]"
                style={{
                    backgroundImage: `url(${profile.headerImageUrl})`,
                }}
            ></section>

            <section className="w-full flex flex-col  ">
                <div className="flex flex-col lg:flex-row relative w-5/6 mx-auto">
                    <div
                        className="w-32 h-32 md:h-36 md:w-36 lg:h-40 lg:w-40 absolute rounded-full bg-contain bg-center bg-no-repeat border-white border-4 -top-20 left-4"
                        style={{
                            backgroundImage: `url(${profile.profileImageUrl})`,
                        }}
                    />

                    <div className="flex-1 flex justify-end">
                        <div className="lg:m-8 m-6 flex gap-2">
                            <EditProfileButton profile = {profile} />
                            <Button>
                                <FaBell />
                            </Button>
                            <Button>Follow</Button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="py-4 w-5/6 mx-auto">
                <div className="w-full px-5 h-full flex flex-col lg:flex-row mx-auto ">
                    <div className="h-full lg:w-2/5 flex flex-col justify-center items-center md:items-start ">
                        <p className="-tracking-wider font-bold text-3xl">{profile.name}</p>
                        <p className="-tracking-wide font-light">@{profile.email}</p>
                        <p className="-tracking-wide text-base">
                            {profile.bio ? profile.bio : "No bio"}
                        </p>
                    </div>
                </div>
            </div>

            <section className="w-full m-4 py-4">
                <div className="w-5/6 mx-auto flex items-center justify-start">
                    <Tabs className="w-full" defaultValue="library">
                        <TabsList className="grid w-[400px] grid-cols-2">
                            <TabsTrigger value="library">Library</TabsTrigger>
                            <TabsTrigger value="saved">Saved</TabsTrigger>
                        </TabsList>
                        <section className="flex w-full h-64 ">
                            <TabsContent value="library" className="w-full">
                                <LibrarySection />
                            </TabsContent>
                            <TabsContent value="saved" className="w-full">
                                <SavedSection />
                            </TabsContent>
                        </section>
                    </Tabs>
                </div>
            </section>
        </main>
    );
}
