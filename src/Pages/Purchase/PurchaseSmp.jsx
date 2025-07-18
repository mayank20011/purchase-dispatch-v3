import Navbar from "../../components/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useRef } from "react";
import Modal from "../../components/Modal";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import axios from "axios";
import Search from "../../components/Search";
import { useNavigate } from "react-router-dom";

const PurchaseSmp = () => {
  const navigate = useNavigate();

  const tempError = {
    purchasingFromError: false,
    noOfBagsError: false,
    remarkError: false,
    dateError: false,
    timeError: false,
  };

  const [error, setError] = useState(tempError);

  // form data states
  const [purchasingFrom, setPurchasingFrom] = useState("");
  const [noOfBags, setNoOfBags] = useState("");
  const [selectedDate, setSelectedDate] = useState();
  const [time, setTime] = useState(false);
  const [remark, setRemark] = useState("");

  // loading
  const [loading, setLoading] = useState(false);

  // for modal
  const [openModal, setOpenModal] = useState(false);

  // for form
  const form = useRef();

  // for checking if there is any error
  function checkIfAnyError(tempError) {
    for (let key in tempError) {
      if (tempError[key] == true) {
        return 1;
      }
    }
    return 0;
  }

  function collectFormData() {
    const formData = new FormData(form.current);
    const data = Object.fromEntries(formData.entries());
    if (data.purchasingFrom == undefined || data.purchasingFrom == "") {
      tempError.purchasingFromError = true;
    }
    if (data.Date == undefined || data.Date == "") {
      tempError.dateError = true;
    }
    if (data.Time == undefined || data.Time == "") {
      tempError.timeError = true;
    }
    if (data.NumberOfBags == undefined || data.NumberOfBags == "") {
      tempError.noOfBagsError = true;
    }
    if (data.Remark == undefined || data.Remark == "") {
      tempError.remarkError = true;
    }
    setError(tempError);
    if (checkIfAnyError(tempError)) {
      return;
    } else {
      setOpenModal(true);
    }
  }

  function submitData() {
    const formdata = new FormData(form.current);
    const data = Object.fromEntries(formdata.entries());
    console.log(data);
    setLoading(true);
    axios
      .post("", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setLoading(false);
        setOpenModal(false);
        toast.success("Data Saved Successfully");
        // reseting form
        navigate(0);
      })
      .catch((err) => {
        setOpenModal(false);
        setLoading(false);
        console.log(err);
        let errorMessage = "Something went wrong";
        if (err.status == 400 || err.status == 500 || err.status == 403) {
          errorMessage = err.response.data.message;
          if (err.status == 403) {
            localStorage.clear();
          }
        }
        toast.error(errorMessage);
      });
  }

  return (
    <>
      <div className="mobile-screen sm:rounded-2xl flex flex-col bg-black text-white">
        <Navbar name={"Purchase / SMP"} />
        <div
          className="custom-container flex flex-col gap-6 grow overflow-y-auto"
          style={{ scrollbarColor: "black black", scrollbarWidth: "thin" }}
        >
          <form
            className="custom-container flex flex-col gap-6 grow overflow-y-auto text-[#a8a8a8]"
            style={{ scrollbarColor: "black black", scrollbarWidth: "thin" }}
            ref={form}
          >
            {/* for selecting persons from whom we are purchasing */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="Purchasing From"
                className={`${
                  error.purchasingFromError
                    ? "text-red-600 font-semibold animate-bounce"
                    : ""
                }`}
              >
                Purchasing From
              </label>
              <Search
                name={"purchasingFrom"}
                url={"http://localhost:3000/names"}
                setPurchasingFrom={setPurchasingFrom}
                disableError={() => {
                  setError((prev) => ({ ...prev, purchasingFromError: false }));
                }}
              />
            </div>
            {/* for Date */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="Date"
                className={`${
                  error.dateError
                    ? "text-red-600 font-semibold animate-bounce"
                    : ""
                }`}
              >
                Date
              </label>
              <DatePicker
                name="Date"
                required
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  setError((prev) => ({ ...prev, dateError: false }));
                }}
                placeholderText="Select Date"
                className="w-full p-3 rounded-md bg-[#121212] text-white outline-none cursor-pointer"
              />
            </div>
            {/* time */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="Time"
                className={`${
                  error.timeError
                    ? "text-red-600 font-semibold animate-bounce"
                    : ""
                }`}
              >
                Time
              </label>
              <input
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
                  setError((prev) => ({ ...prev, timeError: false }));
                }}
                type="time"
                required
                name="Time"
                className="w-full p-3 rounded-md bg-[#121212] text-white outline-none cursor-pointer"
              />
            </div>
            {/* Number of bags */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="NumberOfBags"
                className={`${
                  error.noOfBagsError
                    ? "text-red-600 font-semibold animate-bounce"
                    : ""
                }`}
              >
                Number of Bags
              </label>
              <input
                value={noOfBags}
                type="number"
                name="NumberOfBags"
                required
                onWheel={(e) => {
                  e.target.blur();
                }}
                onChange={(e) => {
                  setNoOfBags(e.target.value);
                  setError((prev) => ({ ...prev, noOfBagsError: false }));
                }}
                placeholder="Enter Number of Bags"
                className="w-full p-3 rounded-md bg-[#121212] text-white outline-none cursor-pointer"
              />
            </div>
            {/* Remark */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="Remark"
                className={`${
                  error.remarkError
                    ? "text-red-600 font-semibold animate-bounce"
                    : ""
                }`}
              >
                Remark
              </label>
              <textarea
                value={remark}
                type="text"
                name="Remark"
                required
                onChange={(e) => {
                  setRemark(e.target.value);
                  setError((prev) => ({ ...prev, remarkError: false }));
                }}
                placeholder="Add Remark"
                className="w-full p-3 rounded-md bg-[#121212] text-white outline-none cursor-pointer h-[250px] resize-none"
              />
            </div>
            <button
              type="button"
              className="bg-[#3441af] cursor-pointer py-3 rounded-md"
              onClick={() => collectFormData()}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        loading={loading}
      >
        <div
          className="h-[500px] overflow-y-auto flex flex-col gap-4"
          style={{ scrollbarWidth: "thin", scrollbarColor: "white white" }}
        >
          <i className="fa-solid fa-cart-shopping text-center text-[60px] text-green-600"></i>
          <p className="text-center text-red-600 font-semibold text-lg">
            Are you sure you want to submit this information?
          </p>
          {/* for content */}
          <div
            className="flex flex-col gap-2 grow overflow-auto"
            style={{ scrollbarWidth: "thin", scrollbarColor: "white black" }}
          >
            <div className="flex items-center gap-4 font-bold">
              <h1 className="text-blue-400">Purchasing From:</h1>
              <h1 className="font-semibold">{purchasingFrom}</h1>
            </div>
            <div className="flex items-center gap-4 font-bold">
              <h1 className="text-blue-400">Date:</h1>
              <h1 className="font-semibold ">
                {selectedDate
                  ? selectedDate.toLocaleDateString("en-GB")
                  : "Not selected"}
              </h1>
            </div>
            <div className="flex items-center gap-4 font-bold">
              <h1 className="text-blue-400">Time:</h1>
              <h1 className="font-semibold ">{time}</h1>
            </div>
            <div className="flex items-center gap-4 font-bold">
              <h1 className="text-blue-400">Number of bags:</h1>
              <h1 className="font-semibold ">{noOfBags}</h1>
            </div>
            <div className="flex items-center gap-4 font-bold">
              <h1 className="text-blue-400">Remark:</h1>
              <h1 className="font-semibold ">{remark}</h1>
            </div>
          </div>
          {/* for button */}
          <div className="flex gap-6">
            <button
              type="button"
              className={`justify-center w-1/2 flex items-center  px-6 py-2 rounded-md text-white gap-4 font-semibold  ${
                loading
                  ? "cursor-not-allowed bg-slate-300/30 text-white"
                  : "cursor-pointer bg-red-600"
              }`}
              onClick={
                loading
                  ? () => {}
                  : () => {
                      setOpenModal(false);
                    }
              }
              disabled={loading}
            >
              <i className="fa-solid fa-trash text-white"></i>
              <span>Cancel</span>
            </button>
            <button
              type="button"
              className={`justify-center w-1/2 flex items-center  px-6 py-2 rounded-md text-white gap-4 font-semibold  ${
                loading
                  ? "bg-slate-300/30 cursor-not-allowed"
                  : "cursor-pointer bg-green-600"
              }`}
              onClick={submitData}
              disabled={loading}
            >
              {loading ? (
                <Spinner color={"white"} padding={"10"} />
              ) : (
                <>
                  <i className="fa-solid fa-check text-white"></i>
                  <span>Submit</span>
                </>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PurchaseSmp;
