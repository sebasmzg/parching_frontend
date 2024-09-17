import type { Metadata } from "next";
import { Belleza } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/common/navbar/navBar";
import Footer from "@/components/common/footer/footer";

const belleza = Belleza({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: {
    default: "Parching App",
    template: "%s | Parching App",
  },
  description:
    "Parching App is a platform that allows you to find and create events in your area.",
  icons: {
    icon: "/assets/img/ParchingLogo.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${belleza.className} antialiased`}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
