import { useState } from 'react'

const ShareButtons = ({ post }) => {
  const [showQr, setShowQr] = useState(false)

  return (
    <div className='relative inline-block'>
      <button
        onClick={() => setShowQr(!showQr)}
        className='cursor-pointer bg-green-600 text-white rounded-full mx-1 w-8 h-8 flex items-center justify-center'
        aria-label='微信公众号'>
        <i className='fab fa-weixin' />
      </button>

      {showQr && (
        <>
          <div
            className='fixed inset-0 z-30'
            onClick={() => setShowQr(false)}
          />
          <div className='absolute bottom-10 -left-10 z-40 bg-white shadow-xl p-3 text-center rounded-lg'>
            <img
              src='https://i.ibb.co/svrWBYx7/20260502175757-529-85.jpg'
              alt='微信公众号二维码'
              width={150}
              height={150}
            />
            <p className='text-xs text-gray-600 mt-1'>扫码关注公众号</p>
          </div>
        </>
      )}
    </div>
  )
}

export default ShareButtons
