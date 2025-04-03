import React from 'react'
import BgReport from "../assets/ReportBg.jpg"

const RPFeedback = () => {
  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center justify-center">
        <img src={BgReport} alt="Bg-report" className='w-[268px]' />
        <h4 className='text-center font-semibold py-3 text-xs'>Cảm ơn bạn đã báo cáo! <br />
        Chúng tôi sẽ xử lý sớm nhất có thể. </h4>
        <p className='text-center text-[11px]'>Vui lòng chọn trạm xe gần nhất có thể để đổi xe. <br /> 
        Nếu cần hỗ trợ thêm, vui lòng gọi tổng đài.</p>
    </div>
  )
}

export default RPFeedback