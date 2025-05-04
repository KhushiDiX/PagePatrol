import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "PagePatrol - Monitor your website for changes",
  description: "Monitor and fix broken links and orphaned pages on your website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Toaster position="top-right" />
        {/* <Navbar /> */}
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
