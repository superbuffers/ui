import Image from 'next/image'
import Link from 'next/link'

export const LINKS = [
  {
    title: 'Introduction',
    href: '/'
  },
  {
    title: 'On-Chain Game',
    href: '/gameVideo'
  },
  {
    title: 'Team',
    href: '/team'
  }
]

const Navbar = () => {
  return (
    <div className='container flex items-center justify-between py-4 font-bold'>
      <Link href={'/'}>
        <Image className='inline-block' width={170} height={27} src='/logo.png' alt='' />
      </Link>
      <div className='space-x-[30px]'>
        {LINKS.map((item, index) => (
          <Link href={item.href} key={index}>
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  )
}

export { Navbar }
