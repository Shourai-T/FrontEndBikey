import LoadingImg from "../assets/loading.gif";

const LoadingScreenAdmin = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-white">
      <div className="loader"></div>
      <img
        src={LoadingImg}
        alt="Loading..."
        className=" max-w-[400px] h-auto"
      />
      <p className="text-sm">Chờ một chút nhé</p>
    </div>
  );
};

export default LoadingScreenAdmin;
