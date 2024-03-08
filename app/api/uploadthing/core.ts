import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs"
import { db } from "@/lib/db";

const f = createUploadthing();

const handleAuth = () => {
    const { userId } = auth()
    const user = auth()
    if (!userId) throw new Error("Unauthorized")
    return { userId };
}

export const ourFileRouter = {
    projectImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => { }),
    projectFile: f(["image", "pdf", "text"])
        .middleware(() => handleAuth())
        .onUploadComplete(() => { }),
    profileImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(() => handleAuth())
        .onUploadComplete(() => { })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
