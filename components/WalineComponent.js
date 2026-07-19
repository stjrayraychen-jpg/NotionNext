import { createRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { siteConfig } from '@/lib/config'

// 将核心初始化逻辑抽离出来
const WalineClient = ({ containerRef }) => {
  useEffect(() => {
    let walineInstance = null

    const loadWaline = async () => {
      if (!document.getElementById('waline-css')) {
        const link = document.createElement('link')
        link.id = 'waline-css'
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/@waline/client@v2/dist/waline.css'
        document.head.appendChild(link)
      }

      const { init } = await import('@waline/client')

      if (containerRef.current) {
        walineInstance = init({
          el: containerRef.current,
          path: window.location.pathname, // 严格同步当前路径
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

    // 给 DOM 留出充分的挂载时间
    const timer = setTimeout(() => {
      loadWaline()
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
      {/* 注入强制显形样式 */}
      <style jsx global>{`
        .wl-cards .wl-reply-wrapper,
        .wl-cards .wl-reply-item {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          background: rgba(0, 0, 0, 0.03) !important;
          padding: 10px !important;
          margin-top: 5px !important;
          border-radius: 4px !important;
        }
        html.dark .wl-cards .wl-reply-item {
          background: rgba(255, 255, 255, 0.05) !important;
        }
        .wl-reply-item .wl-content, 
        .wl-reply-item .wl-nick, 
        .wl-reply-item p {
          color: var(--tw-prose-body, #333) !important;
          display: block !important;
        }
        html.dark .wl-reply-item .wl-content,
        html.dark .wl-reply-item .wl-nick,
        html.dark .wl-reply-item p {
          color: #e5e7eb !important;
        }
      `}</style>
      
      {/* 【终极核心】：通过动态赋予不同的 key，强行让 React 每次刷新或切路由时彻底杀掉并重建 Waline 实例 */}
      <WalineClient key={router.asPath} containerRef={containerRef} />
    </div>
  )
}

export default WalineComponent
