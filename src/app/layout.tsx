import type { Metadata } from "next";
import { Geist, Geist_Mono ,Plus_Jakarta_Sans} from "next/font/google";
import "./globals.css";
import { Providers } from './providers';

const isDev = process.env.NEXT_PUBLIC_ENVIRONMENT === 'dev';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 2. Configure Font
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta", // Define CSS variable
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sapana Fertilizers",
  description: "welcome to Sapana Fertilizers",
  
  // [!code ++] 2. Add Conditional Robots Tag
  robots: {
    index: !isDev, // If dev, index = false
    follow: !isDev, // If dev, follow = false
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${jakarta.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
