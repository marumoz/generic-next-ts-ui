import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
    title: "Generic TS App",
    description: "TypeScript Boilerplate created by Moses Maru",
    authors: { name: "Moses Maru" },
    manifest: "/manifest.json"
};

const cairo = Cairo({
    subsets: ["latin"],
    display: 'auto',
})

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cairo.className}>
                {children}
            </body>
        </html>
    );
}
