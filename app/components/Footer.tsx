import Link from 'next/link'

const Footer = () => {
  return (
    <section
      className='bg-[url(/home/footer_bg.svg)] bg-cover'
      style={
        {
          // background: 'url(/home/footer_bg.svg)'
          // filter: 'blur(50px)'
        }
      }
    >
      <div className='container py-[60px] font-bold'>
        <div className='mb-5 text-[40px] leading-[48px]'>SuperBuffers</div>
        <div className='grid grid-cols-14'>
          <p className='col-span-5 leading-10'>
            Our mission is to build a trustworthy middleware to enable the fast execution of Internet based apps in
            Web3.
          </p>
          <div className='col-span-4 col-start-11 grid grid-cols-2 gap-x-[50px] gap-y-[30px]'>
            <Link href='/'>Introduction</Link>
            <Link href='/'>Data Feed</Link>
            <Link href='/'>On-Chain Game</Link>
            <Link href='/team'>Team</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
export { Footer }
