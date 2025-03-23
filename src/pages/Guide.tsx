import React from 'react'
import PreviousIcon from '../assets/previous-icon.png'
import { useNavigate } from 'react-router-dom'

const Guide = () => {
  const navigate = useNavigate();
  return (
    <div className='p-6 items-center'>
      <div className='flex items-center'>
        <img src={PreviousIcon} 
        alt='previous' 
        className='cursor-pointer w-[20px] h-[20px]' 
        onClick={() => navigate(-1)}/>
        <h2 className='my-4 text-xl text-center font-semibold w-full'>Hướng dẫn sử dụng</h2>
      </div>
      <div className='bg-[#666666] h-[205px]'>
    </div>

    </div>
  )
}

export default Guide