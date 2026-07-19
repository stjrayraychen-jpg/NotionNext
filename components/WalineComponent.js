import { createRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { siteConfig } from '@/lib/config'

const WalineComponent = (props) => {
  const containerRef = createRef()
  const router = useRouter()

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
          ...props,
          el: containerRef.current,
          path: window.location.pathname,
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

  return (
    <div className="w-full">
      {/* 终极显形样式注入：强行把所有子评论的容器、文字、昵称设为绝对可见的颜色，防止被主题样式吞掉 */}
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
      <div ref={containerRef} className="w-full" />
    </div>
  )
}

export default WalineComponent
