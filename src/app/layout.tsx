import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils"
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { GlobalContextProvider } from "@/lib/globalContext";
import Footer from "@/components/Footer";
import { Montserrat } from "next/font/google"; // No 'as', direct import


const montserrat = Montserrat({
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Weather Application",
  description: "Get real-time weather updates with our Weather App built using Next.js.",
  icons: {
    icon: "/is-logo.svg",
  },
  openGraph: {
    title: "Weather Application",
    description: "Real-time weather updates and forecasts built using Next.js.",
    url: process.env.NEXT_PUBLIC_URL || "https://weather-app-is.vercel.app/",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_URL || "https://weather-app-is.vercel.app"}/is-logo.svg`,
        width: 1200,
        height: 630,
        alt: "Weather Application",
      },
    ],
    siteName: "Weather App",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weather Application",
    description: "Real-time weather updates and forecasts built using Next.js.",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_URL || "https://weather-app-is.vercel.app"}/is-logo.svg`,
        alt: "Weather Application",
      },
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(`antialiased ${montserrat.className} `)}

      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <GlobalContextProvider>

            {children}
            <Footer />
          </GlobalContextProvider>
          <Toaster dir="rtl" position="top-center" richColors />
        </ThemeProvider>


      </body>
    </html>
  );
}
