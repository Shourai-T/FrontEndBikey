import React, { useEffect } from 'react';
import BgPayment from "../assets/BgPayment.png";
import IconPayment from "../assets/IconPayment.png";
import IconDeposit from "../assets/IconDeposit.png";
import { useDispatch, useSelector } from 'react-redux';
import { getAllTransaction } from '../redux/api_request/transaction_api';
import { getUser } from '../redux/api_request/user_api';
import LoadingScreen from '../components/LoadingScreen';
import previousIcon from '../assets/previous-icon.png'
function History() {
  const dispatch = useDispatch();

  useEffect(() => {
    getAllTransaction(dispatch);
    getUser(dispatch);
  }, [dispatch]);

  const transactions = useSelector((state: any) => state.transaction.getAllTransaction.data) ;
  const user = useSelector((state: any) => state.user.getUser.currentUser);
  const loadingTransaction = useSelector((state: any) => state.transaction.getAllTransaction.isFetching);
  const loadingUser = useSelector((state: any) => state.user.getUser.isFetching);
  
  if(loadingTransaction || loadingUser) return <LoadingScreen />;
  return (
    <div className="mt-12 mx-auto bg-white">
      <div className='flex items-center w-full px-8 pb-4'>
        <img src={previousIcon} alt="Previous Icon" className="w-6 h-6 cursor-pointer" onClick={() => window.history.back()} />
      </div>
      {/* Balance Card */}
      <div className="mx-8 p-8 h-auto rounded-[16px] text-white bg-cover bg-center"
        style={{ backgroundImage: `url(${BgPayment})` }}
      >
        <p className="text-[12px] font-normal opacity-80">Số dư hiện tại</p>
        <p className="text-[24px] font-bold mt-2">{user?.wallet.balance || 0} VND</p>
      </div>


      <div className="pt-4 bg-white">
        <h2 className="text-sm font-medium ml-8 mb-4">Lịch sử giao dịch</h2>
        <div>
          {transactions.map((transaction:any,index: number ) => (
            <div 
              key={transaction._id} 
              className={`flex items-center gap-3 px-8 py-1.5 ${
                index % 2 === 0 ? 'bg-[#F7F7F7]' : 'bg-white'
              }`}
            >
              <div className="p-2 rounded-full">
                {transaction.type === 'deposit' 
                  ? <img src={IconDeposit} alt="icon-deposit" className="w-[20px]" />
                  : <img src={IconPayment} alt="icon-payment" className="w-[20px]" />
                }
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold truncate">
                    {transaction?.type === "deposit" ? 
                    <p>Nạp tiền vào từ ZaloPay</p>
                  : <p> Thanh toán dịch vụ thuê xe </p>}
                  </p>
                  <p className={`text-xs font-semibold whitespace-nowrap ${
                    transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'deposit' ? '+' : '-'}
                    {transaction?.amount.toLocaleString()} VND
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(transaction.createdAt).toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{transaction.status === 'success'?
                <p className='text-[#12B76A]'>Giao dịch thành công</p>:
                <p className='text-[#F04438]'>Giao dịch thất bại</p>}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default History;
