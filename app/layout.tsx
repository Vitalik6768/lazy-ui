import './globals.css'
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navebar } from '@/components/Navebar';
import { SideBarClient } from '@/components/SideBarClient';
import { Toaster } from "@/components/ui/toaster"
import AuthProvider from '@/components/AuthProvider';


const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {

  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (



    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>

          <SideBarClient />

          <Navebar />

          {children}

          <Toaster />
        </AuthProvider>
      </body>

    </html>
  )
}
