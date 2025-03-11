import React from 'react';
import { ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';
import BgPayment from "../assets/BgPayment.png"
import IconPayment from "../assets/IconPayment.png"
import IconDeposit from "../assets/IconDeposit.png"

interface Transaction {
  id: string;
  type: 'deposit' | 'payment';
  amount: number;
  date: string;
  time: string;
  description: string;
  status: string;
}

function History() {
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'deposit',
      amount: 50000,
      date: '05/03/2025',
      time: '08:00:00',
      description: 'Nạp tiền vào từ ZaloPay',
      status: 'Giao dịch thành công'
    },
    {
      id: '2',
      type: 'deposit',
      amount: 50000,
      date: '05/03/2025',
      time: '08:00:00',
      description: 'Nạp tiền vào từ ZaloPay',
      status: 'Giao dịch thành công'
    },
    {
      id: '3',
      type: 'payment',
      amount: 35000,
      date: '05/03/2025',
      time: '08:30:00',
      description: 'Thanh toán dịch vụ thuê xe',
      status: 'Giao dịch thành công'
    },
    {
      id: '4',
      type: 'deposit',
      amount: 50000,
      date: '09/02/2025',
      time: '08:00:00',
      description: 'Nạp tiền vào từ ZaloPay',
      status: 'Giao dịch thành công'
    },
    {
      id: '5',
      type: 'payment',
      amount: 35000,
      date: '09/02/2025',
      time: '08:30:00',
      description: 'Thanh toán dịch vụ thuê xe',
      status: 'Giao dịch thành công'
    }
  ];

  return (
    <div className=" mt-12 mx-auto bg-white">
      {/* Balance Card */}
      <div className="mx-8 p-8 h-auto rounded-[16px] text-white bg-cover bg-center items-between"
      style={{ backgroundImage: `url(${BgPayment})` }}
      >
        <p className="text-[12px] font-normal opacity-80">Số dư hiện tại</p>
        <p className="text-[24px] font-bold mt-2">123.000 VND</p>
      </div>

      {/* Transaction History */}
      <div className="pt-4 bg-white">
        <h2 className="text-sm font-medium ml-8 mb-4">Lịch sử giao dịch</h2>
        
        <div className="">
          {transactions.map((transaction, index) => (
            <div 
              key={transaction.id} 
              className={`flex items-center gap-3 px-8 py-1.5 ${
                index % 2 === 0 ? 'bg-[#F7F7F7]' : 'bg-white'
              } `}
            >
              <div className={`p-2 rounded-full`}>
                {transaction.type === 'deposit' 
                  ? <img src={IconDeposit} alt="icon-deposit" className='w-[20px]' />
                  : <img src={IconPayment} alt="icon-payment" className='w-[20px]' />
                }
              </div>
              
              <div className="flex-1 min-w-0 ">
                <div className="flex items-center justify-between gap-2 ">
                  <p className="text-xs font-semibold truncate">{transaction.description}</p>
                  <p className={`text-xs font-semibold whitespace-nowrap ${
                    transaction.type === 'deposit' 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {transaction.type === 'deposit' ? '+' : '-'}
                    {transaction.amount.toLocaleString()} VND
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-1">{transaction.time} {transaction.date}</p>
                <p className="text-xs text-gray-500 mt-0.5">{transaction.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default History;