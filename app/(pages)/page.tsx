import Image from 'next/image'
import { SEO } from '@/components/SEO'

export default function Home() {
  return (
    <>
      <SEO />
      <section className='bg-[url("/home/banner_bg.webp"),_url("/home/banner_bg.png")] bg-cover bg-center bg-no-repeat py-[264px] font-bold xl:bg-contain'>
        <div className='container grid grid-cols-14'>
          <div className='col-span-8'>
            <h1 className='text-[120px] leading-[144px]'>SuperBuffers</h1>
            <p className='mb-[60px] mt-[52px] text-2xl leading-10'>
              Our mission is to build a trustworthy middleware to enable the fast execution of Internet based apps in
              Web3.
            </p>
            <button className='flex rounded-[6px] bg-gradient-to-br from-[#382AD2] to-[#4274EE] px-[30px] py-5 text-white shadow-[0_2px_8px_0_rgba(64,102,232,0.5)] transition-all  duration-300 hover:shadow-[0_3px_9px_0_rgba(64,102,232)]'>
              <Image className='mr-[10px]' width={24} height={24} src='/home/github.svg' alt='github' />
              Github
            </button>
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
              <div className='text-[38px] font-bold leading-[60px]'>Transparent and verifiable sequencer</div>
              <div className='mt-5 leading-[38px]'>XXXXXXXXXXXXXXXX</div>
            </div>
          </div>

          <div className='flex'>
            <div className='text-right'>
              <div className='text-[38px] font-bold leading-[60px]'>Fast and secure aggregator</div>
              <div className='mt-5 leading-[38px]'>XXXXXXXXXXXXXXXX</div>
            </div>
            <div className='ml-[150px] flex items-center'>
              <div>
                <div className='mb-[30px] flex h-[117px] w-[117px] items-center justify-center rounded-[10px] shadow-[0_4px_20px_0_rgba(188,188,188,0.5)]'>
                  <Image width={58} height={58} src={'/home/icons/2-1.svg'} alt='' />
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
              <div className='text-[38px] font-bold leading-[60px]'>
                Friendly UI to integrate Internet users and layer 2
              </div>
              <div className='mt-5 leading-[38px]'>XXXXXXXXXXXXXXXX</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
