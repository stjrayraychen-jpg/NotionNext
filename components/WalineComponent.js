import { createRef, useEffect } from 'react'
import { init } from '@waline/client'
import { useRouter } from 'next/router'
import '@waline/client/style'
import { siteConfig } from '@/lib/config'

const WalineComponent = (props) => {
  const containerRef = createRef()
  const router = useRouter()

  useEffect(() => {
    let walineInstance = null

    // 延迟 100ms 初始化，彻底解决 NotionNext 单页路由切换时 DOM 树未挂载完毕的异步渲染 Bug
    const timer = setTimeout(() => {
      if (containerRef.current) {
        // 提取真实的路径，防止单页应用路由参数污染
        const currentPath = window.location.pathname

        walineInstance = init({
          ...props,
          el: containerRef.current,
          // 【核心锁死】显式指定当前路径，不让前端组件猜，强行跟数据库的 /article/sofi/lemfi 字符对齐
          path: currentPath, 
          serverURL: siteConfig('COMMENT_WALINE_SERVER_URL'),
          lang: siteConfig('LANG'),
          reaction: false,
          meta: ['nick'],
          requiredMeta: ['nick'],
          dark: 'html.dark',
          comment: true, // 确保拉取子评论树
          emoji: [
            '//npm.elemecdn.com/@waline/emojis@1.1.0/tieba',
            '//npm.elemecdn.com/@waline/emojis@1.1.0/weibo',
            '//npm.elemecdn.com/@waline/emojis@1.1.0/bilibili'
          ]
        })
      }
    }, 100)

    // 清理函数：路由改变或组件卸载时，严格销毁实例并清除定时器
    return () => {
      clearTimeout(timer)
      if (walineInstance && typeof walineInstance.destroy === 'function') {
        walineInstance.destroy()
      }
    }
  }, [router.asPath]) // 死死监听路由变化

  return <div ref={containerRef} className="w-full" />
}

export default WalineComponent
