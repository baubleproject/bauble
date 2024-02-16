import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "@/providers/Provider";
import { ClerkProvider } from "@clerk/nextjs";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { SiteConfig } from "@/config/siteconfig";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: SiteConfig.title,
    template: `%s :: ${SiteConfig.title}`,
  },
  description: SiteConfig.description,
  icons: [
    {
      url: "/logo.svg",
      href: "/logo.svg",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} transition-colors duration-300`}>
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
