import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import AuthProvider from "./components/Auth/AuthProvider";
import QueryProvider from "./components/QueryProvider";
import { ThemeProvider } from "next-themes";

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
  verification: {
    google: "REBrJwYZlG_xiRY2Tp00vq1vYIJJvOCfGaC9RGanVnE",
  },
  openGraph: {
    siteName: "TypeStorm",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <AuthProvider>
            <ThemeProvider enableSystem={true}>
              <Navbar />
              {children}
            </ThemeProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
