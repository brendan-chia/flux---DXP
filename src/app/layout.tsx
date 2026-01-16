import type { Metadata } from "next";
import { Poppins, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Flux | Corporate Training Excellence",
  description: "Future-ready skills for Malaysian corporations. HRD Corp registered training provider offering ESG, Leadership, AI, and Finance programs.",
  keywords: ["corporate training", "HRD Corp", "Malaysia", "ESG", "leadership", "AI training"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${poppins.variable} ${sourceSans.variable} font-sans antialiased bg-slate-950 text-slate-50 min-h-screen`}
      >
        <Navbar />
        <main className="pt-24">
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
