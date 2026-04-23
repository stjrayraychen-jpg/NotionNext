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

        {/* 顶部大标题 喵Guide */}
        <div className='text-4xl font-serif font-bold tracking-widest mb-6' style={{color: '#8B4513'}}>
          喵Guide
        </div>

        {/* 头像+名字+简介 */}
        <SmartLink href='/'>
          <div className='flex space-x-6 justify-center items-center'>
            <div className='hover:rotate-45 hover:scale-1
