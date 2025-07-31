import { useState } from "react";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLogedIn }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  function changePasswordType() {
    if (passwordType == "password") {
      setPasswordType("text");
    } else setPasswordType("password");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData.entries());
    if (!email || !password) {
      toast.error("Bot field required");
    } else if (password.length < 6) {
      toast.error("Wrong Password");
    } else {
      setLoading(true);
      axios
        .post("https://purchase-dispatch-excel.vercel.app/api/v1/user/login", {
          email,
          password,
        })
        .then((res) => {
          setLoading(false);
          setIsLogedIn(true);
          if (res.data.success) {
            localStorage.setItem("token", res.data.token);
            navigate("/");
          }
        })
        .catch((err) => {
          console.group(err);
          setLoading(false);
          let errorMessage = "Something went wrong";
          if (
            err.status == 404 ||
            err.status == 400 ||
            err.status == 401 ||
            err.status == 500
          ) {
            errorMessage = err.response.data.message;
          }
          toast.error(errorMessage);
        });
    }
  }

  return (
    <form
      className="mobile-screen sm:rounded-2xl flex justif-center items-center bg-black text-white"
      onSubmit={handleSubmit}
    >
      <div className="custom-container flex flex-col gap-6">
        <h1 className="text-4xl font-semibold text-center">Login</h1>
        <div className="flex flex-col gap-4 text-[#a8a8a8]">
          <input
            type="email"
            className="bg-[#121212] p-3 rounded-md outline-none cursor-pointer"
            placeholder="Email"
            name="email"
            required
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
                changePasswordType();
              }}
            ></i>
          </div>
          <Link to={"/send-otp"}>
            Forgot your password?{" "}
            <span className="text-blue-600">Reset password</span>
          </Link>
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
              <p className="py-1  font-semibold">Log in</p>
            )}
          </button>
          <Link to={"/sign-up"} className="text-center pt-8">
            Don't have an account?{" "}
            <span className="text-blue-600">Sign up</span>
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Login;
