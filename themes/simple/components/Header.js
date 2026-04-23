import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'
import SocialButton from './SocialButton'

export default function Header(props) {
  const { siteInfo } = props
  return (
    <header className='text-center justify-between items-center px-6 relative z-10' style={{backgroundColor: '#FDF6EC'}}>
      <div className='flex flex-col items-center justify-center py-8'>
        
        {/* 上方：猫猫图 + 头像简介 并排 */}
        <div className='flex items-center justify-center'>
          
          {/* 左边猫猫图 */}
          <div className='hidden md:block flex-none mr-8'>
            <img 
              src='https://i.ibb.co/CsMGHRvm/miao-guide-banner.jpg' 
              alt='喵Guide'
              className='h-48 w-auto object-contain'
            />
          </div>

          {/* 右边头像+简介 */}
          <div className='flex-none'>
            <SmartLink href='/'>
              <div className='flex space-x-6 justify-center'>
                <div className='hover:rotate-45 hover:scale-125 transform duration-200 cursor-pointer justify-center items-center flex'>
                  <LazyImage
                    priority={true}
                    src={siteInfo?.icon}
                    className='rounded-full'
                    width={100}
                    height={100}
                    alt={siteConfig('AUTHOR')}
                  />
                </div>
                <div className='flex-col flex justify-center'>
                  <div className='text-2xl font-serif dark:text-white py-2 hover:scale-105 transform duration-200'>
                    {siteConfig('AUTHOR')}
                  </div>
                  <div
                    className='font-light dark:text-white py-2 hover:scale-105 transform duration-200 text-center'
                    dangerouslySetInnerHTML={{
                      __html: siteConfig('SIMPLE_LOGO_DESCRIPTION', null, CONFIG)
                    }}
                  />
                </div>
              </div>
            </SmartLink>
            <div className='flex justify-center'>
              <SocialButton />
            </div>
          </div>

        </div>

        {/* 下方：欢迎语横跨居中 */}
        <div className='text-xs mt-6 text-gray-500 dark:text-gray-300 tracking-widest'>
          {siteConfig('DESCRIPTION')}
        </div>

      </div>
    </header>
  )
}
