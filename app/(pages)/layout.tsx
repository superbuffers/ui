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
    // shortcut: '/shortcut-icon.png',
    // apple: '/apple-icon.png',
    // other: {
    //   rel: 'apple-touch-icon-precomposed',
    //   url: '/apple-touch-icon-precomposed.png'
    // }
  },
  // manifest: '',
  themeColor: 'light',
  openGraph: {
    // determiner?: 'a' | 'an' | 'the' | 'auto' | '';
    title: 'SuperBuffers',
    description: '',
    // emails?: string | Array<string>;
    // phoneNumbers?: string | Array<string>;
    // faxNumbers?: string | Array<string>;
    // siteName?: string;
    locale: 'en',
    // alternateLocale?: Locale | Array<Locale>;
    images: '/favicon.svg',
    // audio?: OGAudio | Array<OGAudio>;
    // videos?: OGVideo | Array<OGVideo>;
    url: '',
    // countryName?: string;
    // ttl?: number;
    type: 'website'
  },
  twitter: {
    site: '',
    // siteId?: string;
    // creator?: string;
    // creatorId?: string;
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
