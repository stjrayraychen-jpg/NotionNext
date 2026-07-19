import { createRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { siteConfig } from '@/lib/config'

const WalineClient = ({ containerRef }) => {
  useEffect(() => {
    let walineInstance = null

    const loadWalineV3 = async () => {
      // 1. 强行注入官方最新的 v3 版本 CSS 样式
      if (!document.getElementById('waline-v3-css')) {
        const link = document.createElement('link')
        link.id = 'waline-v3-css'
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/@waline/client@v3/dist/waline.css'
        document.head.appendChild(link)
      }

      // 2. 强行引入官方最新的 v3 版本核心控制脚本
      const { init } = await import('@waline/client')

      if (containerRef.current) {
        walineInstance = init({
          el: containerRef.current,
          // 锁死当前路径，防止多级斜杠丢失
          path: window.location.pathname, 
          serverURL: siteConfig('COMMENT_WALINE_SERVER_URL'),
          lang: siteConfig('LANG'),
          reaction: false,
          meta: ['nick'],
          requiredMeta: ['nick'],
          dark: 'html.dark',
          // 显式传入 v3 的核心渲染参数，激活嵌套树
          turnstile: false, 
          search: false,
          emoji: [
            '//npm.elemecdn.com/@waline/emojis@1.1.0/tieba',
            '//npm.elemecdn.com/@waline/emojis@1.1.0/weibo',
            '//npm.elemecdn.com/@waline/emojis@1.1.0/bilibili'
          ]
        })
      }
    }

    const timer = setTimeout(() => {
      loadWalineV3()
    }, 150)

    return () => {
      clearTimeout(timer)
      if (walineInstance && typeof walineInstance.destroy === 'function') {
        walineInstance.destroy()
      }
    }
  }, [containerRef])

  return <div ref={containerRef} className="w-full" />
}

const WalineComponent = () => {
  const containerRef = createRef()
  const router = useRouter()

  return (
    <div className="w-full">
      {/* 确保新旧版本交替时的兜底显形样式 */}
      <style jsx global>{`
        .wl-reply-wrapper, .wl-reply-item {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
        }
      `}</style>
      
      {/* 动态 key 强制重构组件，防止单页路由死锁 */}
      <WalineClient key={router.asPath} containerRef={containerRef} />
    </div>
  )
}

export default WalineComponent
