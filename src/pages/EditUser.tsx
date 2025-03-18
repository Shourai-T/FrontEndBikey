import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const EditUser = () => {
    return (
        <div className='mt-12 px-8 min-h-screen'>
            {/* Header user */}
            <h3 className='text-sm font-semibold my-4'>Chỉnh sửa thông tin</h3>

            {/* User Information */}
            <div className="space-y-6">
                <div className="flex gap-5">
                    <div className="w-[120px] text-xs font-semibold">Số điện thoại</div>
                    <div className="flex-1 text-[11px]">0969036238</div>
                </div>
                <div className="flex gap-5 items-center">
                    <div className="w-[120px] text-xs font-semibold">Ngày sinh</div>
                    <input type="date" name="" id="" className='flex-1 text-[11px] py-2 px-4 bg-[#F7F7F7] rounded-lg outline-none' />
                </div>
                <div className="flex gap-5 items-center">
                    <div className="w-[120px] text-xs font-semibold">Giới tính</div>
                    <div className="relative flex-1">
                        <select
                            required
                            className="w-full bg-[#F7F7F7] py-2 px-4 placeholder:text-[10px] rounded-md focus:outline-none appearance-none text-[10px]"
                        >
                            <option value="male" className="text-xs">
                                Nam
                            </option>
                            <option value="female" className="text-xs">
                                Nữ
                            </option>
                        </select>
                        <FontAwesomeIcon
                            icon={faChevronDown}
                            className="absolute size-3 right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600"
                        />
                    </div>
                </div>

            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex justify-center gap-7">
                <button className="py-2 px-4 border border-[#1a237e] text-[#1a237e] rounded-full text-[8px] font-semibold">
                    Hủy
                </button>
                <button className="py-2 px-4 bg-[#1a237e] text-white rounded-full text-[8px] font-semibold">
                    Chỉnh sửa
                </button>
            </div>
        </div>
    )
}

export default EditUser