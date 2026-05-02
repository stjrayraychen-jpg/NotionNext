import { useState } from 'react'

const ShareButtons = ({ post }) => {
  const [showQr, setShowQr] = useState(false)

  return (
    <div style={{position: 'relative', display: 'inline-block'}}>
      <button
        onClick={() => setShowQr(!showQr)}
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
          justifyContent: 'center',
          margin: '0 4px'
        }}>
        <i className='fab fa-weixin' />
      </button>

      {showQr && (
        <>
          <div
            style={{position: 'fixed', inset: 0, zIndex: 30}}
            onClick={() => setShowQr(false)}
          />
          <div style={{
            position: 'absolute',
            bottom: '40px',
            left: '-40px',
            zIndex: 40,
            backgroundColor: 'white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            padding: '12px',
            textAlign: 'center',
            borderRadius: '8px'
          }}>
            <img
              src='https://i.ibb.co/svrWBYx7/20260502175757-529-85.jpg'
              alt='微信公众号二维码'
              style={{width: '150px', height: '150px'}}
            />
            <p style={{fontSize: '12px', color: '#666', marginTop: '4px'}}>扫码关注公众号</p>
          </div>
        </>
      )}
    </div>
  )
}

export default ShareButtons
