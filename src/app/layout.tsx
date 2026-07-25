import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hamro Saathi (हाम्रो साथी) — A Gentle Learning Companion",
  description:
    "An autism-friendly e-learning platform designed for children with Autism Spectrum Disorder. Calm, interest-based activities with a parent dashboard for progress tracking.",
  keywords: [
    "autism learning",
    "e-learning",
    "neurodiversity",
    "children education",
    "ASD",
    "special education",
    "calm learning",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-calm-mode="off"
      data-dyslexia-font="off"
      data-colorblind-mode="off"
      data-large-text="off"
      data-reduce-motion="off"
      data-mute-sounds="off"
      data-high-contrast="off"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
      )}
    >
      <head>
        <script
          // Sync stored accessibility flags onto <html> before hydration.
          // Only write a value when the stored flag is truthy ('on'); the
          // SSR'd defaults above are all 'off', so unmodified flags stay
          // consistent between server and client and we avoid a
          // hydration mismatch on the <html> element.
          dangerouslySetInnerHTML={{
            __html: `try{
              var raw = window.localStorage.getItem('hamro:accessibility');
              if (!raw) { /* nothing stored, keep SSR defaults */ }
              else {
                var s = JSON.parse(raw);
                var m = ['calmMode','dyslexiaFont','colorblindMode','largeText','reduceMotion','muteSounds','highContrast'];
                var d = ['data-calm-mode','data-dyslexia-font','data-colorblind-mode','data-large-text','data-reduce-motion','data-mute-sounds','data-high-contrast'];
                var h = document.documentElement;
                for (var i = 0; i < m.length; i++) {
                  if (s[m[i]]) { h.setAttribute(d[i], 'on'); }
                }
              }
            } catch (_) {}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
