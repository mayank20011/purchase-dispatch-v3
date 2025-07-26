import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");

  function handleSubmit(e) {
    e.preventDefault();
    if (password == "" || confirmPassword == "") {
      toast.error("Both Field required");
    } else if (password.length < 6 || confirmPassword.length < 6) {
      toast.error(
        "Password and ConfirmPassword should be atleast 6 character long"
      );
    } else if (password !== confirmPassword) {
      toast.error("Password and Confirmation password not matching");
    } else {
      setLoading(true);
      axios
        .post("https://purchase-dispatch-excel.vercel.app/api/v1/user/reset-password", {
          email,
          password,
        })
        .then(() => {
          setLoading(false);
          toast.success("Password Reset Successfully");
          navigate(`/login`, { replace: true });
        })
        .catch((err) => {
          setLoading(false);
          let errorMessage = "Something went wrong";
          if (err.status == 404 || err.status == 404 || err.status == 500) {
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
        <h1 className="text-4xl font-semibold text-center">Reset Password</h1>
        <div className="flex flex-col gap-4 text-[#a8a8a8]">
          <div className="w-full relative">
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type={passwordType}
              className="bg-[#121212] p-3 rounded-md outline-none cursor-pointer w-full"
              placeholder="Enter Password"
              required
              name="password"
              autoComplete="off"
            />
            <i
              className="fa-solid fa-eye absolute top-1/2 right-[20px] -translate-y-1/2 cursor-pointer"
              onClick={() => {
                passwordType == "password"
                  ? setPasswordType("text")
                  : setPasswordType("password");
              }}
            ></i>
          </div>
          <div className="w-full relative">
            <input
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              type={confirmPasswordType}
              className="bg-[#121212] p-3 rounded-md outline-none cursor-pointer w-full"
              placeholder="Confirm Password"
              required
              name="confirmPassword"
              autoComplete="off"
            />
            <i
              className="fa-solid fa-eye absolute top-1/2 right-[20px] -translate-y-1/2 cursor-pointer"
              onClick={() => {
                confirmPasswordType == "password"
                  ? setConfirmPasswordType("text")
                  : setConfirmPasswordType("password");
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
              <p className="py-1  font-semibold">Reset Password</p>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ResetPassword;
