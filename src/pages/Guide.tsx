import React from 'react'
import PreviousIcon from '../assets/previous-icon.png'
import { useNavigate } from 'react-router-dom'

const Guide = () => {
  const stepData=[
    "Chạm vào nút “Mở khóa” và quét mã QR trên xe đạp để mở khóa.",
    "Tận hưởng chuyến đi, nên đội mũ bảo hiểm và tuân thủ luật giao thông.",
    "Trả xe đạp về trạm xe đạp Bikey bất kì, thực hiện đóng khóa xe và xác nhận kết thúc chuyến đi trên này."
  ]
  return (
    <div className="p-6">
      <h2 className="my-4 text-xl text-center font-semibold">
        Hướng dẫn sử dụng
      </h2>
      <div className="bg-[#666666] h-[205px]"></div>
      <div className="my-4 space-y-2">
       {stepData.map((step,index)=>{
          return (
            <p><strong>Bước {index+1}:</strong> {step}</p>
          )
       })}
      </div>
    </div>
  );
};

export default Guide;
