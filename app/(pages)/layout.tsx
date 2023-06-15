import 'normalize.css'
import '../assets/css/globals.css'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SuperBuffers',
  description: '',
  icons: {
    icon: '/favicon.svg'
  },
  themeColor: 'light',
  openGraph: {
    title: 'SuperBuffers',
    description: '',
    locale: 'en',
    images: '/favicon.svg',
    url: '',
    type: 'website'
  },
  twitter: {
    site: '',
    description: '',
    title: 'SuperBuffers',
    images: '/favicon.svg',
    card: 'summary'
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <div className='flex min-h-full min-w-[1400px] flex-col overflow-hidden text-[#273167]'>
          <Navbar />
          <main className='flex-1'>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
