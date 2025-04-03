import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AlertTriangle, X } from "lucide-react";

interface RuleAlertProps {
    setShowRules: (show: boolean) => void;
}

export const RuleAleart = ({setShowRules}:RuleAlertProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 h-full flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md relative">
        <button
          onClick={() => setShowRules(false)}
          className="absolute right-4 top-4"
        >
          <X size={20} />
        </button>

        <div className="space-y-4">
          <div className="text-2xl font-bold mb-6">
            10.000 <span className="text-gray-500 text-lg">điểm/lượt</span>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium">Thời lượng: 60 phút / lượt</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-blue-600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium">Thời hạn: 60 phút</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 flex items-center text-[#102590] justify-center flex-shrink-0">
              <FontAwesomeIcon icon={faCreditCard} />
            </div>
            <div>
              <p className="font-medium">
                Cước phí quá thời lượng: 3.000 điểm / 15 phút
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 text-[#F79009]">
            <div className="w-6 h-6 flex-shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <p className="font-medium">
                Để sử dụng dịch vụ, cần có tối thiểu 20.000 điểm trong tài
                khoản.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
