import Navbar from "../../components/Navbar";
import { companyData } from "./dispatchData";
import Search from "../../components/Search";
import { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import Modal from "../../components/Modal";
import Spinner from "../../components/Spinner";
import axios from "axios";

const Dispatch = () => {
  // for purchase list loading Error and loading
  const [fetchNameError, setFetchNameError] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchedName, setFetchedName] = useState([]);

  // for form input
  const [selectedCompany, setSelectedCompany] = useState("");
  const [vechileNo, setVechileNo] = useState("");
  const [driverName, setDriverName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [time, setTime] = useState("");
  const [filledProduct, setFilledProduct] = useState({});
  const [dispatchTo, setDispatchTo] = useState("");
  const [noOfCreates, SetNoOfCreates] = useState("");

  // for loading
  const [loading, setLoading] = useState(false);
  // for modal
  const [openModal, setOpenModal] = useState(false);

  // for error
  const tempError = {
    vechileNoError: false,
    driverNameError: false,
    dateError: false,
    timeError: false,
    dispatchToError: false,
    createsError: false,
  };
  const [error, setError] = useState("");

  // for form ref
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

  const collectFormData = () => {
    const tempFilledProduct = {};
    const formData = new FormData(form.current);
    const data = Object.fromEntries(formData.entries());

    for (let key in data) {
      if (
        key == "Date" ||
        key == "Time" ||
        key == "DriverName" ||
        key == "VechileNumber" ||
        key == "Company" ||
        key == "DispatchTo" ||
        key == "Creates"
      ) {
        continue;
      } else {
        if (data[key].length > 0) {
          tempFilledProduct[key] = data[key];
        }
      }
    }

    setFilledProduct(tempFilledProduct);

    if (data.DispatchTo == "") {
      tempError.dispatchToError = true;
    }
    if (data.Date == "") {
      tempError.dateError = true;
    }
    if (data.Time == "") {
      tempError.timeError = true;
    }
    if (data.DriverName == "") {
      tempError.driverNameError = true;
    }
    if (data.VechileNumber == "") {
      tempError.vechileNoError = true;
    }
    if (data.Creates == "") {
      tempError.createsError = true;
    }
    setError(tempError);
    if (Object.keys(tempFilledProduct).length == 0) {
      toast.error("Fill Atleast 1 Product");
      return;
    }
    if (checkIfAnyError(tempError)) {
      return;
    } else {
      setOpenModal(true);
    }
  };

  function submitData() {
    const formData = new FormData(form.current);
    const data = Object.fromEntries(formData.entries());
    setLoading(true);
    axios
      .post(
        "https://purchase-dispatch-excel.vercel.app/api/v1/dispatch/push-data-to-sheet",
        { ...data, _id: dispatchTo._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        setLoading(false);
        setOpenModal(false);
        toast.success("Data Saved Successfully");
        // reseting form
        setSelectedDate("");
        setTime("");
        setSelectedCompany("");
        setDriverName("");
        setVechileNo("");
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

  useEffect(() => {
    if (selectedCompany == "Vardaan") {
      if (fetchedName == null || fetchedName.length <= 1) {
        setFetchLoading(true);
        axios
          .get(`https://purchase-dispatch-excel.vercel.app/api/v1/dispatch/get-names/vardaan`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            setFetchedName(res.data.data);
            setFetchLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setFetchNameError(true);
            setFetchLoading(false);
          });
      } else {
        selectedCompany == "Happy Nature"
          ? setFetchedName([{ _id: "HN01", name: "Happy Nature" }])
          : setFetchedName([{ _id: "GP01", name: "Gopala" }]);
      }
    } else {
      selectedCompany == "Happy Nature"
        ? setFetchedName([{ _id: "HN01", name: "Happy Nature" }])
        : setFetchedName([{ _id: "GP01", name: "Gopala" }]);
    }
  }, [selectedCompany]);

  return (
    <>
      <div className="mobile-screen sm:rounded-2xl flex flex-col bg-black text-white">
        <Navbar name={"Dispatch"} />
        {fetchNameError ? (
          <div className="flex grow items-center justify-center">
            <img
              src="/errorImage.png"
              alt="Error Image"
              className="aspect-quuare w-full"
            />
          </div>
        ) : (
          <form
            className="custom-container flex flex-col gap-6 grow overflow-y-auto"
            ref={form}
            style={{ scrollbarColor: "black black", scrollbarWidth: "thin" }}
            autoComplete="off"
          >
            {/* for company name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="Company">Select Company</label>
              <select
                value={selectedCompany}
                name="Company"
                id="Company"
                className="w-full p-3 rounded-md bg-[#121212] text-white outline-none cursor-pointer"
                onChange={(e) => setSelectedCompany(e.target.value)}
              >
                <option value="" disabled hidden></option>
                {companyData.names.map((name) => (
                  <option value={name} key={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            {/* for selecting persons from whom we are purchasing */}
            {selectedCompany !== "" ? (
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="Purchasing From"
                  className={`${
                    error.dispatchToError
                      ? "text-red-600 font-semibold animate-bounce"
                      : ""
                  }`}
                >
                  Select Person To Dispatch Order
                </label>
                <Search
                  name={"DispatchTo"}
                  fetchedData={fetchedName}
                  setPurchasingFrom={setDispatchTo}
                  disableError={() => {
                    setError((prev) => ({
                      ...prev,
                      dispatchToError: false,
                    }));
                  }}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <p className={` ${fetchLoading ? "animate-pulse" : ""}`}>
                  Select Person To Dispatch Order
                </p>
                <p
                  className={`text-white/20 w-full bg-[#121212] p-4 rounded-md cursor-not-allowed not-first:${
                    fetchLoading ? "animate-pulse" : ""
                  }`}
                >
                  {" "}
                  Select Company to open List
                </p>
              </div>
            )}

            {/* vechile number */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="VechileNumber"
                className={`${
                  error.vechileNoError
                    ? "text-red-600 font-semibold animate-bounce"
                    : ""
                }`}
              >
                Vechile Number
              </label>
              <input
                value={vechileNo}
                type="text"
                name="VechileNumber"
                required
                onChange={(e) => {
                  setVechileNo(e.target.value);
                  setError((prev) => ({ ...prev, vechileNoError: false }));
                }}
                placeholder="Enter Vechile Number"
                className="w-full p-3 rounded-md bg-[#121212] text-white outline-none cursor-pointer"
              />
            </div>
            {/* Driver Name */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="DriverName"
                className={`${
                  error.driverNameError
                    ? "text-red-600 font-semibold animate-bounce"
                    : ""
                }`}
              >
                Driver Name
              </label>
              <input
                value={driverName}
                type="text"
                name="DriverName"
                required
                onChange={(e) => {
                  setDriverName(e.target.value);
                  setError((prev) => ({ ...prev, driverNameError: false }));
                }}
                placeholder="Enter Driver Name"
                className="w-full p-3 rounded-md bg-[#121212] text-white outline-none cursor-pointer"
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
            {/* For No Of Creates */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="Creates"
                className={`${
                  error.createsError
                    ? "text-red-600 font-semibold animate-bounce"
                    : ""
                }`}
              >
                Creates
              </label>
              <input
                value={noOfCreates}
                onChange={(e) => {
                  SetNoOfCreates(e.target.value);
                  setError((prev) => ({ ...prev, createsError: false }));
                }}
                placeholder="Enter No Of Creates ..."
                type="number"
                min={0}
                required
                name="Creates"
                className="w-full p-3 rounded-md bg-[#121212] text-white outline-none cursor-pointer"
              />
            </div>
            {/* for products */}
            {selectedCompany.length > 0 ? (
              <>
                <h1 className="text-xl">{`${selectedCompany} Products:-`}</h1>
                <div className="flex flex-col gap-6">
                  {companyData.products[selectedCompany].map((product) => (
                    <div className="flex flex-col gap-2" key={product}>
                      <label htmlFor={product}>{product}</label>
                      <input
                        type="text"
                        name={product}
                        placeholder="Enter Quantity ..."
                        className="w-full p-3 rounded-md bg-[#121212] text-white outline-none cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="bg-[#3441af] cursor-pointer py-3 rounded-md mt-auto"
                  onClick={() => collectFormData()}
                >
                  Submit
                </button>
              </>
            ) : null}
          </form>
        )}
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
            {/* For Company */}
            <div className="flex items-center gap-4 font-bold">
              <h1 className="text-blue-400">Company:</h1>
              <h1 className="font-semibold ">{selectedCompany}</h1>
            </div>
            {/* for Date */}
            <div className="flex items-center gap-4 font-bold">
              <h1 className="text-blue-400">Date:</h1>
              <h1 className="font-semibold ">
                {selectedDate
                  ? selectedDate.toLocaleDateString("en-GB")
                  : "Not selected"}
              </h1>
            </div>
            {/* For Time */}
            <div className="flex items-center gap-4 font-bold">
              <h1 className="text-blue-400">Time:</h1>
              <h1 className="font-semibold ">{time}</h1>
            </div>
            {/* for Driver Name */}
            <div className="flex items-center gap-4 font-bold">
              <h1 className="text-blue-400">Driver Name:</h1>
              <h1 className="font-semibold ">{driverName}</h1>
            </div>
            {/* For vechile No */}
            <div className="flex items-center gap-4 font-bold">
              <h1 className="text-blue-400">Vechile Number:</h1>
              <h1 className="font-semibold ">{vechileNo}</h1>
            </div>
            {/* For Dispatch To */}
            <div className="flex items-center gap-4 font-bold">
              <h1 className="text-blue-400">Dispatch To:</h1>
              <h1 className="font-semibold ">{dispatchTo.name}</h1>
            </div>
            {/* unique id */}
            <div className="flex items-center gap-4 font-bold">
              <h1 className="text-blue-400">Unique Id:</h1>
              <h1 className="font-semibold ">{dispatchTo._id}</h1>
            </div>
            {/* For No Of Creates */}
            <div className="flex items-center gap-4 font-bold">
              <h1 className="text-blue-400">No Of Creates:</h1>
              <h1 className="font-semibold ">{noOfCreates}</h1>
            </div>
            {/* For Products */}
            <div className="flex flex-col gap-4 font-bold">
              <h1 className="text-blue-400">Products:</h1>
              {Object.keys(filledProduct).map((key) => (
                <h1 className="flex gap-2" key={key}>
                  <span>{key}:</span>
                  <span>{filledProduct[key]} Crates</span>
                </h1>
              ))}
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

export default Dispatch;
