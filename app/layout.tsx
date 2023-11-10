import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import Providers from "./Providers";
import { GlobalContextProvider } from "./context/store";

const inter = Inter({ subsets: ['latin'] })

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
 })


export const metadata: Metadata = {
  title: 'Price Wise',
  description: 'Track prices of your favorite products',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
        <body className={inter.className}>
          <main className="max-w-10xl mx-auto">
            <Providers>
              <GlobalContextProvider>
                <Navbar />
                {children}
              </GlobalContextProvider>
            </Providers>
          </main>
        </body>
      </html>
  )
}
