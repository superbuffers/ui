import Image from 'next/image'

const teams = [
  {
    img: '/team/jyy.png',
    name: 'Yiying Jiang',
    introduction: 'Researcher | Master of software engineering from University of Science and Technology of China',
    href: 'https://academy.kunyaokeji.com/team'
  },
  {
    img: '/team/yyb.png',
    name: 'Yunbo Yang',
    introduction:
      'Researcher | Current Ph.D Candidate in East China Normal UniversitySoftware Engineering, Cryptography and Network Security',
    href: 'https://academy.kunyaokeji.com/team'
  },
  {
    img: '/team/yyh.png',
    name: 'Yuhui Yan',
    introduction:
      'Backend Developer | 3 years+ blockchain development, involved in the development of Ethereum, Filecoin, Aleo. Languages: Rust, Golang, Python'
  },
  {
    img: '/team/lqs.png',
    name: 'Qingshan Li',
    introduction:
      'Frontend Developer | 4-years experience in frontend development including 2 years of experience for Web3 projects. Language: Java Script, Rust'
  },
  {
    img: '/team/hl.png',
    name: 'Lei He',
    introduction: 'UI Designer | 7 years experience in UX design and over 3 years focused on designing Web3 products.'
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
        <div className='grid grid-cols-2 gap-x-[45px] gap-y-[35px]'>
          {teams.map((item, index) => (
            <a
              key={index}
              data-href={!!item?.href}
              className='group flex space-x-5 data-[href=false]:cursor-default '
              href={item.href ? item.href : 'javascript:void(0)'}
              target={item.href ? '_black' : '_self'}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className='h-[120px] w-[120px]' src={item.img} alt={item.name} />
              <div className='flex flex-col'>
                <div className={'mb-3 text-2xl font-bold leading-6 ' + (item.href ? 'group-hover:underline' : '')}>
                  {item.name}
                </div>
                <div className='text-lg leading-[30px]'>{item.introduction}</div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
