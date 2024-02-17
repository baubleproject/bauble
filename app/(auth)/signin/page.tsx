import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};
export default function Page() {
  return (
    <section className="h-full flex items-center justify-center">
      <SignIn />
    </section>
  );
}
