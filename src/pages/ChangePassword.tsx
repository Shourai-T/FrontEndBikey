import React from 'react'
import { useNavigate } from 'react-router-dom'

const ChangePassword = () => {
    const navigate = useNavigate()

  return (
    <div className='mt-12 px-8 min-h-screen'>
                {/* Header user */}
                <h3 className='text-sm font-semibold my-4'>Chỉnh sửa thông tin</h3>
    
                {/* User Information */}
                <div className="space-y-6">
                    <div className="flex gap-5 items-center">
                        <div className="w-[120px] text-xs font-semibold">Mật khẩu cũ (*)</div>
                        <input type="text" placeholder='Nhập mật khẩu cũ' className='flex-1 text-[11px] py-2 px-4 bg-[#F7F7F7] rounded-lg outline-none placeholder:text-[10px]' />
                    </div>
                    <div className="flex gap-5 items-center">
                        <div className="w-[120px] text-xs font-semibold">Mật khẩu mới (*)</div>
                        <input type="password" placeholder='Nhập mật khẩu cũ' className='flex-1 text-[11px] py-2 px-4 bg-[#F7F7F7] rounded-lg outline-none placeholder:text-[10px]' />
                    </div>
                    <div className="flex gap-5 items-center">
                        <div className="w-[120px] text-xs font-semibold">Nhập lại mật khẩu mới (*)</div>
                        <input type="password" placeholder='Nhập mật khẩu cũ' className='flex-1 text-[11px] py-2 px-4 bg-[#F7F7F7] rounded-lg outline-none placeholder:text-[10px]' />
                    </div>
                </div>
    
                {/* Action Buttons */}
                <div className="mt-12 flex justify-center gap-7">
                    <button 
                    className="py-2 px-4 border border-[#1a237e] text-[#1a237e] rounded-full text-[8px] font-semibold"
                    onClick={() => navigate('/user')}
                    >
                        Hủy
                    </button>
                    <button className="py-2 px-4 bg-[#1a237e] text-white rounded-full text-[8px] font-semibold">
                        Thay đổi
                    </button>
                </div>
            </div>
  )
}

export default ChangePassword