import React, { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import BgPayment from "../assets/BgPayment.png";
import IconZalopay from "../assets/IconZalopay.png";
import check from "../assets/check.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import PreviousIcon from "../assets/previous-icon.png";
import { createTransactionWithZalopay } from "../redux/api_request/transaction_api";
import { useDispatch, useSelector } from "react-redux";
import { RuleAleart } from "../components/RuleAleart";
import LoadingScreen from "../components/LoadingScreen";

const Deposit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState<number>(0);
  const predefinedAmounts = [20000, 50000, 100000, 200000];
  const [showRules, setShowRules] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setAmount(Number(value));
  };

  const formatAmount = (value: number) => {
    return value.toLocaleString("vi-VN");
  };

  const handleSubmit = () => {
    if (amount >= 20000) {
      createTransactionWithZalopay(amount, dispatch);
    }
  };

  const loadingTransaction = useSelector((state:any) => state.transaction.createTransaction.isFetching)
  if (loadingTransaction) return <LoadingScreen />
  return (
    <div className="flex flex-col h-screen bg-white p-6 mt-2 justify-between">
      <div className="flex flex-col">
        {/* Header */}
        <div
          className="flex justify-between items-center mb-4"
          onClick={() => setShowRules(true)}
        >
          <img
            src={PreviousIcon}
            className="w-6 h-6"
            onClick={() => navigate(-1)}
          ></img>
          <h2 className="text-lg font-medium">Quy định</h2>
        </div>

        {/* Rules Dialog */}
        {showRules && <RuleAleart setShowRules={setShowRules} />}

        {/* Payment Card */}
        <div
          className="h-[178px] text-white rounded-2xl p-6 mb-6 bg-cover bg-center"
          style={{ backgroundImage: `url(${BgPayment})` }}
        >
          <p className="text-sm mb-2">Số tiền muốn nạp (VND)</p>
          <div className="relative mb-6">
            <input
              type="text"
              value={formatAmount(amount)}
              onChange={handleAmountChange}
              className={`w-full bg-transparent text-4xl text-center focus:outline-none 
                ${amount !== 0 ? "text-white" : "text-white opacity-50"}`}
              placeholder="0"
            />
          </div>

          {/* Amount Buttons */}
          <div className="grid grid-cols-4 gap-3 pt-3 border-t">
            {predefinedAmounts.map((value) => (
              <button
                key={value}
                onClick={() => setAmount(value)}
                className={`py-2 px-1 rounded-full text-[8px] ${
                  amount === value ? "bg-white text-blue-600" : "bg-white/10"
                }`}
              >
                {(value / 1000).toLocaleString()}K
              </button>
            ))}
          </div>
        </div>

        {/* Warning Message */}
        <div className="flex items-center gap-2 mb-6 text-xs text-[#F79009]">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <p>
            Số tiền nạp tối thiểu là 20.000 VND. Tiền nạp vào sẽ không thể hoàn
            lại được.
          </p>
        </div>

        {/* Payment Method */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4">Phương thức thanh toán</h3>
          <div className="border-b py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={IconZalopay}
                alt="ZaloPay"
                className="w-8 h-8 rounded"
              />
              <span>Ví ZaloPay</span>
            </div>
            <img src={check} alt="checkpoint" className="w-5" />
          </div>
        </div>
      </div>
      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className={`w-full py-4 rounded-lg text-[#666666] font-medium ${
          amount >= 20000
            ? "bg-blue-600 text-white"
            : "bg-[#E5E5E5] text-[#666666]"
        }`}
        disabled={amount < 20000}
      >
        Nạp tiền
      </button>
    </div>
  );
};

export default Deposit;
