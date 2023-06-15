import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='container flex items-center justify-between py-4 font-bold'>
      <Link href={'/'}>
        <Image className='inline-block' width={170} height={27} src='/logo.svg' alt='' />
      </Link>
      <div className='space-x-[30px]'>
        <Link href='/'>Introduction</Link>
        <Link href='/game'>On-Chain Game</Link>
        <Link href='/'>Data Feed</Link>
        <Link href='/team'>Team</Link>
      </div>
    </div>
  )
}

export { Navbar }
