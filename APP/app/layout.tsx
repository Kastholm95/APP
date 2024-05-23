import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });
const googleAnalyticsId = process.env.GOOGLE_ANALYTICS_ID;

export default function RootLayout({
  children, deviceType
}: Readonly<{
  children: React.ReactNode;
  deviceType: string;
}>) {
  
  return (
    <html  lang="da">
      <link
        rel="preload"
        href="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
        as="script"
      />
      <link rel="dns-prefetch" href="//adx.adform.net" crossOrigin="" />
      <link rel="dns-prefetch" href="//ads.pubmatic.com" crossOrigin="" />
      <body className={`${inter.className}`}>
        <Header />
        <main className="mt-[60px]">{children}</main>
        <GoogleAnalytics gaId={googleAnalyticsId} />
        {/* <AdRefresher {...adSettings} /> */}
        <Footer />

        {/* Google Publisher Tag - Definerer og anmoder om reklamer */}
        <Script async 
        src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" 
        />

        {/* OneTag scriptet bruges til at optimere og forenkle indlæsning af reklamer fra forskellige netværk, 
        hvilket hjælper med at øge indtægterne fra reklamevisninger. */}
        <Script async 
        src="//get.s-onetag.com/fe24cb85-40ce-4663-902a-d4273cadd44f/tag.min.js"/>

        {/* Prebid.js er en open source teknologi, der tillader ad tech firmaer at foretage real-tidsbudgivning 
        på reklamepladser, før reklamen bliver vist. */}
        <Script
        src="/lib/prebid8.46.0-1.js"
        strategy="afterInteractive"
      />

        {/* Et tilpasset script, der specifikt håndterer opsætning eller konfiguration af dine reklameenheder 
        baseret på dine egne præferencer og indstillinger. */}
      <Script
        src="/lib/ad-script.min.js"
        strategy="afterInteractive"
      />
      </body>
    </html>
  );
}