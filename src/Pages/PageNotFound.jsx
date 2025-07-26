import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <div className="mobile-screen sm:rounded-2xl flex flex-col bg-black text-white">
      <div className="w-full flex grow py-12 items-center justify-center flex-col gap-4">
        <p className="text-center text-3xl">Page Not Found !!!</p>
        <Link to="/login" className="text-blue-600 underline underline-offset-2 cursor-pointer">Return to Login Page</Link>
      </div>
    </div>
  );
};

export default PageNotFound;
