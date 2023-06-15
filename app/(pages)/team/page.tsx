import Image from 'next/image'

const teams = [
  {
    img: '/home/team_banner.svg',
    name: 'lll',
    introduction: '1231231'
  }
]

export default function Team() {
  const str =
    "We envision a future where thousands of decentralized, sovereign rollups flourish, each tailored to meet the unique requirements of different industries, applications, and use cases. We have built a talented and diverse team capable of delivering outstanding results to achieve this vision.\n \nWe are always looking for great talent to help make our vision a reality. If you're interested in joining us, please apply below."

  return (
    <div className='min-h-screen text-[#273167]'>
      <section className='container grid grid-cols-12 bg-[url(/home/team_bg.svg)] bg-contain bg-right-bottom bg-no-repeat'>
        <div className=' col-span-7 py-[196px] font-bold'>
          <div className='mb-[52px] text-[120px] leading-[144px]'>Our Teams</div>
          <p className='whitespace-pre-line text-[24px] leading-[40px]'>{str}</p>
        </div>
        <div className='relative col-span-5'>
          <Image
            className='absolute -top-20 right-0 translate-y-1/2'
            width={541}
            height={501}
            src={'/home/team_banner.svg'}
            alt='banner'
          />
        </div>
      </section>

      <section className='container py-[149px]'>
        {teams.map((item, index) => (
          <div key={index}>
            <Image className='rounded-[6px]' width={453} height={280} src={item.img} alt={item.name} />
            <div className='pb-5 pt-[30px] text-xl leading-6'>{item.name}</div>
            <div className='leading-[19px]'>{item.introduction}</div>
          </div>
        ))}
      </section>
    </div>
  )
}
