import './globals.css'
import Image from 'next/image'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'TapLaunch Control',
  description: 'Manage NFC tag redirects',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-neutral-950 text-neutral-100">
        <header className="border-b border-neutral-800 sticky top-0 z-10 bg-neutral-950/80 backdrop-blur">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-3">
            <Image
              src="/brand/taplaunch_logo_master.png"
              alt="TapLaunch"
              width={28}
              height={28}
            />
            <span className="font-semibold tracking-wide">TapLaunch Control</span>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  )
}
