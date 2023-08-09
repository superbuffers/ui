import Image from 'next/image'

export default function Home() {
  return (
    <>
      <section className='bg-[url("/home/banner_bg.webp"),_url("/home/banner_bg.png")] bg-cover bg-center bg-no-repeat py-[264px] font-bold xl:bg-contain'>
        <div className='container grid grid-cols-14'>
          <div className='col-span-8'>
            <h1 className='text-[120px] leading-[144px]'>SuperBuffers</h1>
            <p className='mb-[60px] mt-[52px] text-2xl leading-10'>
              How to speed up the processing time of blockchain applications? We show you the solutions!
            </p>
            <a
              className='inline-flex items-center rounded-[6px] bg-gradient-to-br from-[#382AD2] to-[#4274EE] px-[30px] py-5 text-white shadow-[0_2px_8px_0_rgba(64,102,232,0.5)] transition-all  duration-300 hover:shadow-[0_3px_9px_0_rgba(64,102,232)]'
              href='https://medium.com/@superbuffers/superbuffers-a-middleware-to-speed-up-web3-applications-99899933def8'
              target='_black'
            >
              <span>Learn More</span>
            </a>
          </div>
          <div className='relative col-start-13'>
            <picture className='absolute left-0 h-[703px] w-[700px] -translate-x-1/2 -translate-y-1/4'>
              <source srcSet='/home/banner.webp' type='image/webp' />
              <img className='' src='/home/banner.png' alt='banner' />
            </picture>
          </div>
        </div>
      </section>
      <section className='container'>
        <div className='space-y-[150px] p-[226px]'>
          <div className='flex'>
            <div className='mr-[150px] flex items-center'>
              <div className='mr-[30px] flex h-[117px] w-[117px] items-center justify-center rounded-[10px] shadow-[0_4px_20px_0_rgba(188,188,188,0.5)]'>
                <Image width={74} height={74} src={'/home/icons/1-1.svg'} alt='' />
              </div>
              <div>
                <div className='mb-[30px] flex h-[117px] w-[117px] items-center justify-center rounded-[10px] shadow-[0_4px_20px_0_rgba(188,188,188,0.5)]'>
                  <Image width={52} height={52} src={'/home/icons/1-2.svg'} alt='' />
                </div>
                <div className='flex h-[117px] w-[117px] items-center justify-center rounded-[10px] shadow-[0_4px_20px_0_rgba(188,188,188,0.5)]'>
                  <Image width={60} height={60} src={'/home/icons/1-3.svg'} alt='' />
                </div>
              </div>
            </div>
            <div>
              <div className='text-[38px] font-bold leading-[60px]'>Real time application service</div>
              <div className='mt-5 leading-[38px]'>
                Experience lightning-fast response times for any Web3 application with Superbuffers, eliminating
                concerns about high latency in distributed systems. Our cutting-edge technology ensures seamless
                real-time performance for your applications.
              </div>
            </div>
          </div>
          <div className='flex'>
            <div className='text-right'>
              <div className='text-[38px] font-bold leading-[60px]'>Privacy-preserving verifiable sequencer</div>
              <div className='mt-5 leading-[38px]'>
                Inspired by Web2 sequencers, Superbuffers introduces a Web3-based sequencer offering unparalleled
                privacy and trustworthiness. Our state-of-the-art sequencer ensures data integrity and protection,
                addressing the challenges faced by traditional Web2 solutions.
              </div>
            </div>
            <div className='ml-[150px] flex items-center'>
              <div>
                <div className='mb-[30px] flex h-[117px] w-[117px] items-center justify-center rounded-[10px] shadow-[0_4px_20px_0_rgba(188,188,188,0.5)]'>
                  <Image width={48} height={48} src={'/home/icons/2-1.svg'} alt='' />
                </div>

                <div className='flex h-[117px] w-[117px] items-center justify-center rounded-[10px] shadow-[0_4px_20px_0_rgba(188,188,188,0.5)]'>
                  <Image width={48} height={48} src={'/home/icons/2-2.svg'} alt='' />
                </div>
              </div>
              <div className='ml-[30px] flex h-[117px] w-[117px] items-center justify-center rounded-[10px] shadow-[0_4px_20px_0_rgba(188,188,188,0.5)]'>
                <Image width={62} height={62} src={'/home/icons/2-3.svg'} alt='' />
              </div>
            </div>
          </div>

          <div className='flex'>
            <div className='mr-[150px]'>
              <div className='mx-auto mb-[30px] flex h-[117px] w-[117px] items-center justify-center rounded-[10px] shadow-[0_4px_20px_0_rgba(188,188,188,0.5)]'>
                <Image width={54} height={54} src={'/home/icons/3-1.svg'} alt='' />
              </div>
              <div className='flex items-center'>
                <div className='mr-[30px] flex h-[117px] w-[117px] items-center justify-center rounded-[10px] shadow-[0_4px_20px_0_rgba(188,188,188,0.5)]'>
                  <Image width={88} height={88} src={'/home/icons/3-2.svg'} alt='' />
                </div>

                <div className='flex h-[117px] w-[117px] items-center justify-center rounded-[10px] shadow-[0_4px_20px_0_rgba(188,188,188,0.5)]'>
                  <Image width={62} height={62} src={'/home/icons/3-3.svg'} alt='' />
                </div>
              </div>
            </div>
            <div>
              <div className='text-[38px] font-bold leading-[60px]'>0-persistence</div>
              <div className='mt-5 leading-[38px]'>
                {
                  "SuperBuffers' innovative zero-persistence storage eliminates storage pressure, showcasing our platform's exceptional portability. This groundbreaking feature paves the way for limitless expansion and diverse applications, opening up a world of possibilities for SuperBuffers."
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
