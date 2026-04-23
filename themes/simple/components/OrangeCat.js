import { useEffect, useState } from 'react'

export default function OrangeCat() {
  const [message, setMessage] = useState('')
  const [showMessage, setShowMessage] = useState(false)
  const [blinking, setBlinking] = useState(false)
  const [tailWag, setTailWag] = useState(false)

  const messages = [
    '让我来喵两句～',
    '今天薅了多少羊毛？😸',
    '喵～欢迎来到喵Guide！',
    '美卡教程看了吗？',
    '点我有惊喜喵～'
  ]

  useEffect(() => {
    // 随机眨眼
    const blinkInterval = setInterval(() => {
      setBlinking(true)
      setTimeout(() => setBlinking(false), 200)
    }, 3000)

    // 尾巴摇摆
    const tailInterval = setInterval(() => {
      setTailWag(v => !v)
    }, 800)

    // 随机显示消息
    const msgInterval = setInterval(() => {
      const msg = messages[Math.floor(Math.random() * messages.length)]
      setMessage(msg)
      setShowMessage(true)
      setTimeout(() => setShowMessage(false), 3000)
    }, 6000)

    return () => {
      clearInterval(blinkInterval)
      clearInterval(tailInterval)
      clearInterval(msgInterval)
    }
  }, [])

  const handleClick = () => {
    const msg = messages[Math.floor(Math.random() * messages.length)]
    setMessage(msg)
    setShowMessage(true)
    setTimeout(() => setShowMessage(false), 3000)
  }

  return (
    <div
      style={{
        position: 'fixed',
        right: '16px',
top: '80px',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none'
      }}
      onClick={handleClick}
    >
      {/* 对话框 */}
      {showMessage && (
        <div style={{
          backgroundColor: '#FDF6EC',
          border: '2px solid #E8873A',
          borderRadius: '12px',
          padding: '8px 12px',
          marginBottom: '8px',
          fontSize: '12px',
          color: '#8B4513',
          whiteSpace: 'nowrap',
          boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
          position: 'relative'
        }}>
          {message}
          <div style={{
            position: 'absolute',
            bottom: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: '8px solid #E8873A'
          }} />
        </div>
      )}

      {/* 橘猫 SVG */}
      <svg width="80" height="100" viewBox="0 0 80 100" xmlns="http://www.w3.org/2000/svg">
        {/* 尾巴 */}
        <path
          d={tailWag
            ? 'M40 85 Q65 75 68 60 Q70 50 60 48'
            : 'M40 85 Q60 80 65 65 Q68 55 58 50'}
          stroke="#E8873A" strokeWidth="7" fill="none" strokeLinecap="round"
          style={{transition: 'd 0.4s ease'}}
        />

        {/* 身体 */}
        <ellipse cx="40" cy="72" rx="24" ry="22" fill="#E8873A"/>

        {/* 肚皮 */}
        <ellipse cx="40" cy="76" rx="14" ry="14" fill="#F5C98A" opacity="0.7"/>

        {/* 身体纹路 */}
        <path d="M28 62 Q33 72 28 80" stroke="#D4721F" strokeWidth="1.5" fill="none" opacity="0.5"/>
        <path d="M52 62 Q47 72 52 80" stroke="#D4721F" strokeWidth="1.5" fill="none" opacity="0.5"/>

        {/* 头 */}
        <ellipse cx="40" cy="38" rx="22" ry="20" fill="#E8873A"/>

        {/* 耳朵左 */}
        <polygon points="20,24 26,8 34,24" fill="#E8873A"/>
        <polygon points="22,22 26,11 32,22" fill="#E8A07A" opacity="0.6"/>

        {/* 耳朵右 */}
        <polygon points="46,24 54,8 60,24" fill="#E8873A"/>
        <polygon points="48,22 54,11 58,22" fill="#E8A07A" opacity="0.6"/>

        {/* 脸部 */}
        <ellipse cx="40" cy="42" rx="14" ry="12" fill="#F5C98A" opacity="0.5"/>

        {/* 眼睛左 */}
        <ellipse cx="32" cy="36" rx="4" ry={blinking ? 1 : 5} fill="#4A7C59"/>
        <ellipse cx="32" cy="36" rx="2.5" ry={blinking ? 0.5 : 3.5} fill="#1A1A1A"/>
        <circle cx="33.5" cy="34" r="1" fill="white"/>

        {/* 眼睛右 */}
        <ellipse cx="48" cy="36" rx="4" ry={blinking ? 1 : 5} fill="#4A7C59"/>
        <ellipse cx="48" cy="36" rx="2.5" ry={blinking ? 0.5 : 3.5} fill="#1A1A1A"/>
        <circle cx="49.5" cy="34" r="1" fill="white"/>

        {/* 鼻子 */}
        <polygon points="40,43 37,47 43,47" fill="#E87070"/>

        {/* 嘴巴 */}
        <path d="M37,47 Q40,51 43,47" stroke="#C45A5A" strokeWidth="1.2" fill="none"/>
        <path d="M34,49 Q37,52 40,50" stroke="#C45A5A" strokeWidth="1.2" fill="none"/>
        <path d="M46,49 Q43,52 40,50" stroke="#C45A5A" strokeWidth="1.2" fill="none"/>

        {/* 胡须左 */}
        <line x1="14" y1="42" x2="30" y2="44" stroke="#8B6914" strokeWidth="1" opacity="0.6"/>
        <line x1="14" y1="46" x2="30" y2="46" stroke="#8B6914" strokeWidth="1" opacity="0.6"/>

        {/* 胡须右 */}
        <line x1="66" y1="42" x2="50" y2="44" stroke="#8B6914" strokeWidth="1" opacity="0.6"/>
        <line x1="66" y1="46" x2="50" y2="46" stroke="#8B6914" strokeWidth="1" opacity="0.6"/>

        {/* 前爪 */}
        <ellipse cx="28" cy="91" rx="10" ry="7" fill="#E8873A"/>
        <ellipse cx="52" cy="91" rx="10" ry="7" fill="#E8873A"/>
        <line x1="24" y1="94" x2="24" y2="98" stroke="#D4721F" strokeWidth="1" opacity="0.5"/>
        <line x1="28" y1="95" x2="28" y2="99" stroke="#D4721F" strokeWidth="1" opacity="0.5"/>
        <line x1="32" y1="94" x2="32" y2="98" stroke="#D4721F" strokeWidth="1" opacity="0.5"/>
        <line x1="48" y1="94" x2="48" y2="98" stroke="#D4721F" strokeWidth="1" opacity="0.5"/>
        <line x1="52" y1="95" x2="52" y2="99" stroke="#D4721F" strokeWidth="1" opacity="0.5"/>
        <line x1="56" y1="94" x2="56" y2="98" stroke="#D4721F" strokeWidth="1" opacity="0.5"/>
      </svg>
    </div>
  )
}
