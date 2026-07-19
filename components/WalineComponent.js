import { createRef, useEffect } from 'react'
import { init } from '@waline/client'
import { useRouter } from 'next/router'
import '@waline/client/style'
import { siteConfig } from '@/lib/config'

let walineInstance = null

const WalineComponent = (props) => {
  const containerRef = createRef()
  const router = useRouter()

  useEffect(() => {
    // 强制每次执行时如果已有实例就先销毁，确保完全重新渲染
    if (walineInstance) {
      walineInstance.destroy()
      walineInstance = null
    }

    if (containerRef.current) {
      walineInstance = init({
        ...props,
        el: containerRef.current,
        serverURL: siteConfig('COMMENT_WALINE_SERVER_URL'),
        lang: siteConfig('LANG'),
        reaction: false,
        meta: ['nick'],
        requiredMeta: ['nick'],
        dark: 'html.dark',
        // 显式声明开启子评论树渲染
        comment: true, 
        emoji: [
          '//npm.elemecdn.com/@waline/emojis@1.1.0/tieba',
          '//npm.elemecdn.com/@waline/emojis@1.1.0/weibo',
          '//npm.elemecdn.com/@waline/emojis@1.1.0/bilibili'
        ]
      })
    }

    // 组件卸载时销毁
    return () => {
      if (walineInstance) {
        walineInstance.destroy()
        walineInstance = null
      }
    }
  }, [router.asPath]) // 核心：死死监听路由变化，只要路径变了或者刷新了，就彻底重刷评论区

  return <div ref={containerRef} className="w-full" />
}

export default WalineComponent
