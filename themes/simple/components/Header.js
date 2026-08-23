import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'
import SocialButton from './SocialButton'
import Script from 'next/script'

const KIT_FORM_HTML = `<form action="https://app.kit.com/forms/9834588/subscriptions" class="seva-form formkit-form" method="post" data-sv-form="9834588" data-uid="f2e8653206" data-format="inline" data-version="5" min-width="400 500 600 700 800"><div data-style="clean"><ul class="formkit-alert formkit-alert-error" data-element="errors" data-group="alert"></ul><div data-element="fields" data-stacked="false" class="seva-fields formkit-fields"><div class="formkit-field"><input class="formkit-input" name="email_address" aria-label="Email Address" placeholder="Email Address" required="" type="email" style="color: rgb(0, 0, 0); border-color: rgb(227, 227, 227); border-radius: 4px; font-weight: 400;"></div><button data-element="submit" class="formkit-submit formkit-submit" style="color: rgb(255, 255, 255); background-color: rgb(22, 119, 190); border-radius: 4px; font-weight: 400;"><div class="formkit-spinner"><div></div><div></div><div></div></div><span class="">Subscribe</span></button></div><div class="formkit-powered-by-convertkit-container"><a href="https://kit.com/features/forms?utm_campaign=poweredby&utm_content=form&utm_medium=referral&utm_source=dynamic" data-element="powered-by" class="formkit-powered-by-convertkit" data-variant="dark" target="_blank" rel="nofollow noopener">Built with Kit</a></div></div></form>`

/**
 * 网站顶部
 * @returns
 */
export default function Header(props) {
  const { siteInfo } = props
  return (
    <header className='text-center justify-between items-center px-6 bg-white h-80 dark:bg-black relative z-10'>
      <div className='float-none inline-block py-12'>
        <SmartLink href='/'>
          {/* 可使用一张单图作为logo */}
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
        <div className='text-xs mt-4 text-gray-500 dark:text-gray-300'>
          {siteConfig('DESCRIPTION')}
        </div>

        {/* 订阅表单 */}
        <div className='mt-6 flex justify-center'>
          <div
            className='max-w-md w-full'
            dangerouslySetInnerHTML={{ __html: KIT_FORM_HTML }}
          />
        </div>
        <Script src='https://f.convertkit.com/ckjs/ck.5.js' strategy='lazyOnload' />
      </div>
    </header>
  )
}
