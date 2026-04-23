import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'
import SocialButton from './SocialButton'

export default function Header(props) {
  const { siteInfo } = props
  return (
    <header className='text-center items-center px-6 relative z-10' style={{backgroundColor: '#FDF6EC'}}>
      <div className='flex flex-col items-center justify-center py-8'>
        <div className='text-4xl font-serif font-bold tracking-widest mb-6' style={{color: '#8B4513'}}>
          喵Guide
        </div>
        <SmartLink href='/'>
          <div className='flex space-x-6 justify-center items-center'>
            <div className='hover:rotate-45 hover:scale-125 transform duration-200 cursor-pointer'>
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
        <div className='flex justify-center mt-2'>
          <SocialButton />
        </div>
        <div className='text-xs mt-4 tracking-wide
