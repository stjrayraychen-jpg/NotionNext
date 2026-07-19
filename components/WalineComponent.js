import { createRef, useEffect } from 'react'
import { init } from '@waline/client'
import { useRouter } from 'next/router'
import '@waline/client/style'
import { siteConfig } from '@/lib/config'

let waline = null

const WalineComponent = (props) => {
  const containerRef = createRef()
  const router = useRouter()

  useEffect(() => {
    // 每次渲染或路由改变时，彻底重新初始化，保证父子评论的树状结构能完整重新拉取
    if (!waline && containerRef.current) {
      waline = init({
        ...props,
        el: containerRef.current,
        // 删掉了强制锁死的 path，让 Waline 官方原生脚本自己在运行时百分之百准确地抓取真实的 window.location.pathname
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

    // 路由跳转时直接销毁重建，这是解决单页应用（Next.js）评论区数据不刷新的终极最稳方案
    const handleRouteChange = () => {
      if (waline) {
        waline.destroy()
        waline = null
      }
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      if (waline) {
        waline.destroy()
        waline = null
      }
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router.asPath]) // 监听路由变化

  return <div ref={containerRef} />
}

export default WalineComponent
