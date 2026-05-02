import { siteConfig } from '@/lib/config'
import { useState } from 'react'

const ShareBar = ({ post }) => {
  const [showQr, setShowQr] = useState(false)

  if (!post || post?.type !== 'Post') {
    return <></>
  }

  return (
    <div className='m-1'>
      <div className='flex w-full md:justify-end'>
        <div style={{position: 'relative', display: 'inline-block'}}>
          <button
            onMouseEnter={() => setShowQr(true)}
            onMouseLeave={() => setShowQr(false)}
            style={{
              cursor: 'pointer',
              backgroundColor: '#07C160',
              color: 'white',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <i className='fab fa-weixin' />
          </button>

          {showQr && (
            <div
              onMouseEnter={() => setShowQr(true)}
              onMouseLeave={() => setShowQr(false)}
              style={{
                position: 'absolute',
                bottom: '40px',
                right: '0',
                zIndex: 9999,
                backgroundColor: 'white',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                padding: '12px',
                textAlign: 'center',
                borderRadius: '8px'
              }}>
              <img
                src='https://i.ibb.co/svrWBYx7/20260502175757-529-85.jpg'
                alt='微信公众号二维码'
                style={{width: '150px', height: '150px', display: 'block'}}
              />
              <p style={{fontSize: '12px', color: '#666', marginTop: '4px', margin: '4px 0 0 0'}}>扫码关注公众号</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ShareBar
