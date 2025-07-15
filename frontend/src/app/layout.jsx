import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import AuthProvider from "./components/Auth/AuthProvider";
import QueryProvider from "./components/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: { default: "TypeStorm", template: "TypeStorm - %s" },
  description: "Improve your typing skills with TypeStorm!",
  keywords: [
    "typing",
    "type",
    "typing test",
    "typing practice",
    "typing game",
    "typing challenge",
    "speed typing",
    "improve typing speed",
    "wpm calculator",
    "free typing test",
    "free typing speed test online",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
