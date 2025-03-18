import React from 'react'
import IconUserCircle from "../assets/IconUser2.png"
import { useNavigate } from 'react-router-dom'

const User = () => {
    const navigate = useNavigate()

    return (
        <div className='mt-12 px-8 min-h-screen'>
            {/* Header user */}
            <div className='flex gap-3 my-4'>
                <img src={IconUserCircle} alt="Icon User" className='w-5' />
                <h3 className='text-sm font-semibold'>Nguyễn Văn A</h3>
            </div>

            {/* User Information */}
            <div className="space-y-6">
                <div className="flex gap-5">
                    <div className="w-[120px] text-xs font-semibold">Số điện thoại</div>
                    <div className="flex-1 text-[11px]">0969036238</div>
                </div>
                <div className="flex gap-5">
                    <div className="w-[120px] text-xs font-semibold">Ngày sinh</div>
                    <div className="flex-1 text-[11px]">18/11/2004</div>
                </div>
                <div className="flex gap-5">
                    <div className="w-[120px] text-xs font-semibold">Giới tính</div>
                    <div className="flex-1 text-[11px]">Nữ</div>
                </div>
                <div className="flex gap-5">
                    <div className="w-[120px] text-xs font-semibold">Mật khẩu</div>
                    <div className="flex-1 text-[11px]">*******</div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex justify-between">
                <button 
                className="py-2 px-4 border border-[#1a237e] text-[#1a237e] rounded-full text-[8px] font-semibold"
                onClick={() => navigate('/user/change-password')}
                >
                    Đổi mật khẩu
                </button>
                <button 
                className="py-2 px-4 border border-[#1a237e] text-[#1a237e] rounded-full text-[8px] font-semibold"
                onClick={() => navigate('/user/edit')}
                >
                    Chỉnh sửa thông tin
                </button>
                <button 
                className="py-2 px-4 bg-[#1a237e] text-white rounded-full text-[8px] font-semibold"
                onClick={() => navigate('/login')}
                >
                    Đăng xuất
                </button>
            </div>
        </div>
    )
}

export default User