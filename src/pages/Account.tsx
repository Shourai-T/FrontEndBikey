import { useDispatch, useSelector } from 'react-redux';
import AccountIcon from '../assets/account_black.png'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getUser } from '../redux/api_request/user_api';
import {format} from 'date-fns'
import {vi } from 'date-fns/locale' 
import { logoutSuccess } from '../redux/slice/authSlice';
import PreviousIcon from '../assets/previous-icon.png'
import LoadingScreen from '../components/LoadingScreen';
function Account (){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(
        () => {
           getUser(dispatch)
        },
        [dispatch]
    )

    const formatDate =(date: string| Date):string => {
        return format(new Date(date), 'dd/MM/yyyy');
    }

    const handleLogout = () => {
        dispatch(logoutSuccess()); 
        navigate('/login'); 
    };

    const loadingUser = useSelector((state:any) => state.user.getUser.isFetching)
    
   

    const user = useSelector((state:any) => state.user.getUser.currentUser)
    if (loadingUser) return <LoadingScreen />
    return(
        <div className="width-screen flex flex-col gap-8 p-8 ">
            <div className="flex items-center gap-2">
                <img src ={PreviousIcon}
                className='w-6' onClick={() => navigate('/home')}></img>
                <img src={AccountIcon} className='w-7 h-7'></img>
                <p className='text-xl font-semibold'>{user?.fullName}</p>
            </div>

            <div className='flex flex-col w-full gap-4'>
                <div className='flex w-full'>
                    <div className='flex w-full font-bold'> Số điện thoại </div>
                    <div className='flex w-full'> {user?.phoneNumber} </div>
                </div>
                <div className='flex w-full'>
                    <div className='flex w-full font-bold'> Ngày sinh </div>
                    <div className='flex w-full'>{user?.dateOfBirth ? formatDate(user.dateOfBirth) : "N/A"}</div>

                </div>
                <div className='flex w-full'>
                    <div className='flex w-full font-bold'> Giới tính </div>
                    <div className='flex w-full'> {user?.gender === 'male'? 'Nam' : 'Nữ'  } </div>
                </div>
            </div>
            <div className='flex justify-between'>
                <button className='border border-[#102590] text-[#102590] text-xs h-[40px] py-2 rounded-full py-1 px-3'
                onClick={
                    () => {navigate('/edit-account')}
                }>Chỉnh sửa thông tin</button>
                <button className='border border-[#102590] bg-[#102590] text-white text-xs h-[40px] py-2 rounded-full py-1 px-3'
                onClick={
                    handleLogout
                }>Đăng xuất</button>
            </div>
        </div>
    )
}

export default Account;