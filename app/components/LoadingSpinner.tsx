import { HashLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="w-full h-96 flex justify-center items-center">
        <HashLoader 
            color="#232F3E" 
            size={100}
            speedMultiplier={.6}
        />
    </div>
  );
}

export default LoadingSpinner;