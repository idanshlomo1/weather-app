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
  description: "Built using Next js",
  icons: {
    icon: '/is-logo.svg'
  }
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
