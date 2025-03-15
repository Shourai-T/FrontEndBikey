import React from 'react'
import IconGuide from '../assets/IconGuide.png'
import IconFix from '../assets/IconFix.png'

const InfoQR = () => {
  return (
    <div className='px-6 m-auto'>
        <div className='mt-10 w-full'>
            <h1 className='m-auto font-bold py-2 border-b'>Trạm xe 001 - Văn phòng TNGo Hồ Chí Minh</h1>
        </div>
        <div className='flex gap-5 my-4 py-4 flex-col border-b'>
            <div className='flex flex-col gap-2'>
                <p className='font-semibold text-xs'>Mã xe <span className='text-[#102590] pl-2'>1232fcefw</span></p>
                <p className='font-semibold text-xs'>Trạng thái <span className='font-normal pl-2'>Sẵn sàng</span></p>
            </div>
            <div className='flex justify-center'>
                <button className='font-bold text-sm text-white py-4 px-16 rounded-lg bg-[#102590] shadow-sm'>Bắt đầu</button>
            </div>
            <div className='flex justify-center gap-5 items-center'>
                <button className=' flex justify-center items-center gap-1 py-2 px-4 border border-[#102590] rounded-full'>
                    <img src={IconGuide} alt="icon" className='w-5' />
                    <span className='text-[8px]'>Quy định sử dụng</span>
                </button>
                <button className='flex justify-center items-center gap-1 py-2 px-4 border border-[#102590] rounded-full'>
                    <img src={IconFix} alt="icon" className='w-5' />
                    <span className='text-[8px]'>Báo xe hỏng</span>
                </button>
            </div>
        </div>
        <div className='flex items-center justify-between'>
            <p className='text-[11px]'>Số dư tài khoản</p>
            <span className='text-xs font-semibold'>20.000 điểm</span>
        </div>
    </div>
  )
}

export default InfoQR