import { createRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { siteConfig } from '@/lib/config'

const WalineComponent = (props) => {
  const containerRef = createRef()
  const router = useRouter()

  useEffect(() => {
    let walineInstance = null

    // 动态加载最新且兼容性最好的全量 Waline 客户端脚本
    const loadWaline = async () => {
      // 1. 动态引入样式
      if (!document.getElementById('waline-css')) {
        const link = document.createElement('link')
        link.id = 'waline-css'
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/@waline/client@v2/dist/waline.css'
        document.head.appendChild(link)
      }

      // 2. 动态引入最新版核心 JS 脚本
      const { init } = await import('@waline/client')

      // 3. 确保 DOM 完全就绪后初始化
      if (containerRef.current) {
        walineInstance = init({
          ...props,
          el: containerRef.current,
          path: window.location.pathname, // 强制同步浏览器路径
          serverURL: siteConfig('COMMENT_WALINE_SERVER_URL'),
          lang: siteConfig('LANG'),
          reaction: false,
          meta: ['nick'],
          requiredMeta: ['nick'],
          dark: 'html.dark',
          emoji: [
            '//npm.elemecdn.com/@waline/emojis@1.1.0/tieba',
            '//npm.elemecdn.com/@waline/emojis@1.1.0/weibo',
            '//npm.elemecdn.com/@waline/emojis@1.1.0/bilibili'
          ]
        })
      }
    }

    // 稍微延迟确保 Next.js DOM 挂载完毕
    const timer = setTimeout(() => {
      loadWaline()
    }, 200)

    return () => {
      clearTimeout(timer)
      if (walineInstance && typeof walineInstance.destroy === 'function') {
        walineInstance.destroy()
      }
    }
  }, [router.asPath])

  return <div ref={containerRef} className="w-full" />
}

export default WalineComponent
