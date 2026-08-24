import type { Metadata } from 'next';
import { Instrument_Sans, Instrument_Serif } from 'next/font/google';
import './globals.css';

const instrumentSans = Instrument_Sans({
    subsets: ['latin'],
    variable: '--font-instrument-sans',
    display: 'swap',
    weight: ['400', '500', '600', '700'],
});

const instrumentSerif = Instrument_Serif({
    subsets: ['latin'],
    variable: '--font-instrument-serif',
    display: 'swap',
    weight: ['400'],
});

export const metadata: Metadata = {
    title: 'Ankit Singh — Full Stack Engineer',
    description: 'Full Stack Engineer building production-grade systems across backend, frontend, real-time infrastructure, and AI-powered services.',
    icons: {
        icon: '/topiiaa_icon.ico',
        shortcut: '/topiiaa_icon.ico',
        apple: '/topiiaa_icon.ico',
    },
    openGraph: {
        title: 'Ankit Singh — Full Stack Engineer',
        description: 'Full Stack Engineer building production-grade systems across backend, frontend, real-time infrastructure, and AI-powered services.',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={`${instrumentSans.variable} ${instrumentSerif.variable} font-sans antialiased`}>
                {children}
            </body>
        </html>
    );
}
