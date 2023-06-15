'use client'
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
  themeColor: 'black',
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

const SEO = () => {
  return null
}

export { SEO }
