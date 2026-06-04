import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/ThemeProvider"
import { AuthProvider } from "@/components/AuthProvider"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import AuthModal from "@/components/AuthModal"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "e-waste RD — Reciclaje Electrónico Responsable en República Dominicana",
  description:
    "Plataforma para promover el reciclaje responsable de residuos electrónicos. Encuentra puntos de recolección y disposición adecuada en República Dominicana.",
  keywords: [
    "reciclaje electrónico",
    "e-waste",
    "República Dominicana",
    "UNPHU",
    "residuos electrónicos",
    "sostenibilidad",
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (!theme) theme = 'dark';
                  document.documentElement.classList.add(theme);
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            {children}
            <Footer />
            <AuthModal />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
