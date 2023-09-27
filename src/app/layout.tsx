import { SITE_INFO, SITE_TITLE } from "@/lib/variables";
import "./globals.css";
import type { Metadata } from "next";
import { Roboto_Serif } from "next/font/google";

const roboto_serif = Roboto_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_INFO,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto_serif.className}>
        <main className="md:container md:w-4/5 lg:w-2/3 xl:w-3/5 md:mx-auto pl-6 pr-4">
          {children}
        </main>
      </body>
    </html>
  );
}
