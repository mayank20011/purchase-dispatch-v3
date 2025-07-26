import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from "../../components/Spinner";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const VerifyOTP = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [Otp, setOtp] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (Otp == null || Otp == "") {
      toast.error("Enter Email");
    } else {
      setLoading(true);
      axios
        .post("https://purchase-dispatch-excel.vercel.app/api/v1/user/send-otp", { email, otp:Otp })
        .then(() => {
          setLoading(false);
          navigate(`/reset-password/${email}`, { replace: true });
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
        <h1 className="text-4xl font-semibold text-center">Enter OTP</h1>
        <div className="flex flex-col gap-4 text-[#a8a8a8]">
          <input
          onWheel={(e)=>{e.target.blur()}}
            value={Otp}
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            type="number"
            className="bg-[#121212] p-3 rounded-md outline-none cursor-pointer"
            placeholder="Enter your 4 digit Otp"
            required
            name="otp"
            autoComplete="off"
            min={1000}
            max={9999}
          />
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
              <p className="py-1  font-semibold">Send OTP</p>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default VerifyOTP;
