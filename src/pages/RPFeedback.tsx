import BgReport from "../assets/ReportBg.jpg"
import { useNavigate } from 'react-router-dom'
import ArrowIcon from "../assets/arrow_back_ios.png";
const RPFeedback = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center justify-center space-y-2">
        <img src={BgReport} alt="Bg-report" className='w-[268px]' />
        <h4 className='text-center font-semibold py-3 text-xs'>Cảm ơn bạn đã báo cáo! <br />
        Chúng tôi sẽ xử lý sớm nhất có thể. </h4>
        <p className='text-center text-[11px]'>Vui lòng chọn trạm xe gần nhất có thể để đổi xe. <br /> 
        Nếu cần hỗ trợ thêm, vui lòng gọi tổng đài.</p>
        <button className="flex items-center rounded-full border-2 border-black px-4 py-2 gap-1"
        onClick={
          () => navigate("/home")
        }>
          <img src={ArrowIcon} alt="" className="w-6" />
          Quay lại trang chủ
        </button>
    </div>
  )
}

export default RPFeedback