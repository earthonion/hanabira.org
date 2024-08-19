import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Nav from "@/components/Nav";
import DashboardNav from "@/components/DashboardNav";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

import Script from "next/script";
const GA_MEASUREMENT_ID = "G-P4SLLVSNCX"; //my hanabira.org code
//const GA_MEASUREMENT_ID = "G-27EKDKSDWE"; // zen-lingo.com


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "hanabira.org",
  description: "Your path to Japanese fluency (JLPT N5-N1).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <base href="/" />
      </head>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>


      <body className={inter.className}>
            <div className="h-full grid lg:grid-cols-body overflow-auto">
              <Sidebar />
              <div className="flex flex-col h-full">
                <Nav />
                <DashboardNav />
                {children}
              </div>
            </div>
          <Footer />
          <CookieConsent />
      </body>
    </html>
  );
}
