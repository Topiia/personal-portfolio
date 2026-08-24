import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
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
            <body className={`${inter.variable} font-sans antialiased`}>
                {children}
            </body>
        </html>
    );
}
