import LoadingImg from '../assets/loading.gif'
const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="loader"></div>
        <img src={LoadingImg} alt="Loading..." className="w-[100px] h-auto" />
        <p className='text-sm'>Loading...</p>
    </div>
  );
}

export default LoadingScreen;