import type { Metadata } from "next";
import { Geist, Geist_Mono ,Plus_Jakarta_Sans} from "next/font/google";
import "./globals.css";
import { Providers } from './providers';
import { defaultMetadata, localBusinessJsonLd } from '@/config/seo';
import { GoogleAnalytics } from '@next/third-parties/google';

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


export const metadata: Metadata = defaultMetadata;

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
        {/* [!code highlight] 2. JSON-LD only renders in Production */}
        {localBusinessJsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
          />
        )}
        <Providers>
          {children}
        </Providers>
        {/* The Analytics Component */}
        
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ""} />
      </body>
    </html>
  );
}
