import type { Metadata } from "next";
import { Belleza } from "next/font/google";
import "./globals.css";
import StoreProvider from "./storeProvider";


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
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
