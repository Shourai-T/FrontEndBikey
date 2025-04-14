import LoadingImg from '../assets/loading.gif'

const LoadingScreenAdmin = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="loader"></div>
        <img src={LoadingImg} alt="Loading..." className="w-full h-auto" />
        <p className='text-sm'>Chờ một chút nhé</p>
    </div>
  )
}

export default LoadingScreenAdmin