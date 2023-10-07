import { BarLoader } from "react-spinners";

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="font-semibold text-lg mb-6 text-complement">Loading ...</p>
      <BarLoader width="50%" color="#6c63ff" />
    </div>
  );
};

export default LoadingPage;
