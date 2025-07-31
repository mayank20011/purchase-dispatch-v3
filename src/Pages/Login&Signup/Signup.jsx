import { useState } from "react";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

  function changePasswordType(str) {
    if (str == "password") {
      if (passwordType == "password") {
        setPasswordType("text");
      } else setPasswordType("password");
    } else {
      if (confirmPasswordType == "password") {
        setConfirmPasswordType("text");
      } else setConfirmPasswordType("password");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { name, email, password, confirmPassword } = Object.fromEntries(
      formData.entries()
    );
    if (!name || !email || !password || !confirmPassword) {
      toast.error("All Fileds are required");
    } else {
      if (password.length < 6 || confirmPassword.length < 6) {
        toast.error("Password and reset password must be greater then 6 chars");
      } else if (password !== confirmPassword) {
        toast.error("Password and reset pasword must be same");
      } else {
        setLoading(true);
        axios
          .post(
            "https://purchase-dispatch-excel.vercel.app/api/v1/user/signup",
            { name, email, password }
          )
          .then((res) => {
            toast.success("Account created successfully!");
            setLoading(false);
            navigate("/login", { replace: true });
          })
          .catch((err) => {
            let errMessage = "Something went wrong";
            if (err.status == 409 || err.status == 400 || err.status == 403) {
              errMessage = err.response.data.message;
            }
            toast.error(errMessage);
            setLoading(false);
          });
      }
    }
  }

  return (
    <form
      className="mobile-screen sm:rounded-2xl flex justif-center items-center bg-black text-white"
      onSubmit={handleSubmit}
    >
      <div className="custom-container flex flex-col gap-6">
        <h1 className="text-4xl font-semibold text-center">Sign Up</h1>
        <div className="flex flex-col gap-4 text-[#a8a8a8]">
          <input
            type="text"
            className="bg-[#121212] p-3 rounded-md outline-none cursor-pointer"
            placeholder="Enter Name"
            required
            name="name"
            autoComplete="off"
          />
          <input
            type="email"
            className="bg-[#121212] p-3 rounded-md outline-none cursor-pointer"
            placeholder="Email"
            required
            name="email"
            autoComplete="off"
          />
          <div className="w-full relative">
            <input
              type={passwordType}
              className="bg-[#121212] p-3 rounded-md outline-none cursor-pointer w-full"
              placeholder="Password"
              required
              name="password"
            />
            <i
              className="absolute fa-solid fa-eye top-1/2 -translate-y-1/2 right-0 pr-4 cursor-pointer"
              onClick={() => {
                changePasswordType("password");
              }}
            ></i>
          </div>
          <div className="w-full relative">
            <input
              type={confirmPasswordType}
              className="bg-[#121212] p-3 rounded-md outline-none cursor-pointer w-full"
              placeholder="Reset Password"
              required
              name="confirmPassword"
            />
            <i
              className="absolute fa-solid fa-eye top-1/2 -translate-y-1/2 right-0 pr-4 cursor-pointer"
              onClick={() => {
                changePasswordType("confirmationpass");
              }}
            ></i>
          </div>
          <button
            className={`py-2 rounded-md ${
              loading
                ? "bg-blue-600/20 cursor-not-allowed"
                : "bg-[#3441af] cursor-pointer"
            }`}
            disabled={loading}
            type="submit"
          >
            {loading ? (
              <Spinner padding={15} color={"#a8a8a8"} />
            ) : (
              <p className="py-1  font-semibold">Sign Up</p>
            )}
          </button>
          <Link to={"/login"} className="text-center pt-8">
            Already have an account?{" "}
            <span className="text-blue-600">Login</span>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Signup;
