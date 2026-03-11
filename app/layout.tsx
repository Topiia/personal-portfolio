import type { Metadata } from 'next';
import { Outfit, Inter, JetBrains_Mono } from "next/font/google";
import './globals.css';
import { FloatingBackground } from '@/components/background/FloatingBackground';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { ThemeProvider } from '@/components/theme/ThemeProvider';

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
    display: "swap",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
    display: "swap",
});

export const metadata: Metadata = {
    title: 'Ankit Singh | AI Full-Stack Engineer',
    description: 'AI Full-Stack Engineer specializing in real-time systems, distributed architecture, and intelligent web applications.',
    icons: {
        icon: '/topiiaa_icon.ico',
        shortcut: '/topiiaa_icon.ico',
        apple: '/topiiaa_icon.ico',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={`${outfit.variable} ${inter.variable} ${jetbrainsMono.variable} font-inter relative`}>
                <ThemeProvider>
                    <FloatingBackground />
                    <CustomCursor />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
