import Navbar from "../../components/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useRef, useEffect } from "react";
import Modal from "../../components/Modal";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import axios from "axios";
import Search from "../../components/Search";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";
const PurchaseMilk = () => {
  const navigate = useNavigate();

  // for error
  const tempError = {
    purchasingFromError: false,
    milkError: false,
    serialNoError: false,
    vechileNoError: false,
    driverNameError: false,
    adulterationError: false,
    fatError: false,
    clrError: false,
    dateError: false,
    timeError: false,
    volumeError: false,
  };
  const [error, setError] = useState(tempError);

  // for purchase list loading Error and loading
  const [fetchNameError, setFetchNameError] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchedName, setFetchedName] = useState([]);

  // for formData
  const [purchasingFrom, setPurchasingFrom] = useState("");
  const [selectedDate, setSelectedDate] = useState();
  const [milkType, setMilkType] = useState("");
  const [time, setTime] = useState("");
  const [weightSlab, setWeightSlab] = useState("");
  const [vechileNo, setVechileNo] = useState("");
  const [driverName, setDriverName] = useState("");
  const [adulteration, setadulteration] = useState("");
  const [fat, setFat] = useState("");
  const [clr, setClr] = useState("");
  const [volume, setVolume] = useState("");

  // for modal
  const [openModal, setOpenModal] = useState(false);

  // for ref
  const form = useRef(null);

  // for loading
  const [loading, setLoading] = useState(false);

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
    if (data.PurchasingFrom == undefined || data.PurchasingFrom == "") {
      tempError.purchasingFromError = true;
    }
    if (data.MilkType == undefined || data.MilkType == "") {
      tempError.milkError = true;
    }
    if (data.SerialNumber == undefined || data.SerialNumber == "") {
      tempError.serialNoError = true;
    }
    if (data.VechileNumber == undefined || data.VechileNumber == "") {
      tempError.vechileNoError = true;
    }
    if (data.DriverName == undefined || data.DriverName == "") {
      tempError.driverNameError = true;
    }
    if (data.Date == undefined || data.Date == "") {
      tempError.dateError = true;
    }
    if (data.Time == undefined || data.Time == "") {
      tempError.timeError = true;
    }
    if (data.Adulteration == undefined || data.Adulteration == "") {
      tempError.adulterationError = true;
    }
    if (data.Adulteration == "Yes") {
      if (data.Volume == undefined || data.Volume == "") {
        tempError.volumeError = true;
      }
      if (data.Fat == undefined || data.Fat == "") {
        tempError.fatError = true;
      }
      if (data.Clr == undefined || data.Clr == "") {
        tempError.clrError = true;
      }
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

  useEffect(() => {
    if (fetchedName == null || fetchedName.length == 0) {
      setFetchLoading(true);
      axios
        .get(`http://localhost:3000/names`)
        .then((res) => {
          const data = res.data.map((obj) => obj.name);
          setFetchedName(data);
          setFetchLoading(false);
        })
        .catch((err) => {
          setFetchNameError(true);
          setFetchLoading(false);
        });
    }
  }, []);

  return (
    <>
      <div className="mobile-screen sm:rounded-2xl flex flex-col bg-black text-white">
        <Navbar name={"Purchase / Milk"} />
        {fetchLoading ? (
          <LoadingPage numberOfInputBox={6} remark={false}/>
        ) : fetchNameError ? (
          <div className="flex grow items-center justify-center">
            <img
              src="/errorImage.png"
              alt="Error Image"
              className="aspect-quuare w-full"
            />
          </div>
        ) : (
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
                name={"PurchasingFrom"}
                fetchedData={fetchedName}
                setPurchasingFrom={setPurchasingFrom}
                disableError={() => {
                  setError((prev) => ({
                    ...prev,
                    purchasingFromError: false,
                  }));
                }}
              />
            </div>
            {/* select Milk Type */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="MilkType"
                className={`${
                  error.milkError
                    ? "text-red-600 font-semibold animate-bounce"
                    : ""
                }`}
              >
                Select Milk Type
              </label>
              <select
                name="MilkType"
                value={milkType}
                onChange={(e) => {
                  setMilkType(e.target.value);
                  setError((prev) => ({ ...prev, milkError: false }));
                }}
                required
                className="w-full p-3 rounded-md bg-[#121212] text-white outline-none cursor-pointer"
              >
                <option value="" disabled hidden>
                  Select an option
                </option>
                <option value="Cow Milk">Cow Milk</option>
                <option value="Buffalo Milk">Buffalo Milk</option>
                <option value="Mixed">Mixed</option>
              </select>
            </div>
            {/* for serial number */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="SerialNumber"
                className={`${
                  error.serialNoError
                    ? "text-red-600 font-semibold animate-bounce"
                    : ""
                }`}
              >
                Serial Number Of Weight Slab
              </label>
              <input
                value={weightSlab}
                type="text"
                name="SerialNumber"
                required
                onChange={(e) => {
                  setWeightSlab(e.target.value);
                  setError((prev) => ({ ...prev, serialNoError: false }));
                }}
                placeholder="Enter Weight Slab Serial Number"
                className="w-full p-3 rounded-md bg-[#121212] text-white outline-none cursor-pointer"
              />
            </div>
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
            {/* for adulteration */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="Adulteration"
                className={`${
                  error.adulterationError
                    ? "text-red-600 font-semibold animate-bounce"
                    : ""
                }`}
              >
                Adulteration
              </label>
              <select
                name="Adulteration"
                value={adulteration}
                onChange={(e) => {
                  setadulteration(e.target.value);
                  setError((prev) => ({ ...prev, adulterationError: false }));
                }}
                required
                className="w-full p-3 rounded-md bg-[#121212] text-white outline-none cursor-pointer"
              >
                <option value="" disabled hidden>
                  Did Product Passed the batch test?
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            {adulteration == "Yes" ? (
              <>
                {/* Milk Volume */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="Volume"
                    className={`${
                      error.volumeError
                        ? "text-red-600 font-semibold animate-bounce"
                        : ""
                    }`}
                  >
                    Milk Volume
                  </label>
                  <input
                    value={volume}
                    type="number"
                    name="Volume"
                    required
                    onWheel={(e) => {
                      e.target.blur();
                    }}
                    onChange={(e) => {
                      setVolume(e.target.value);
                      setError((prev) => ({ ...prev, volumeError: false }));
                    }}
                    placeholder="Enter Volume of Milk Purchasing"
                    className="w-full p-3 rounded-md bg-[#121212] text-white outline-none cursor-pointer"
                  />
                </div>
                {/* Fat percent */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="Fat"
                    className={`${
                      error.fatError
                        ? "text-red-600 font-semibold animate-bounce"
                        : ""
                    }`}
                  >
                    Fat
                  </label>
                  <input
                    value={fat}
                    type="number"
                    name="Fat"
                    required
                    onWheel={(e) => {
                      e.target.blur();
                    }}
                    onChange={(e) => {
                      setError((prev) => ({ ...prev, fatError: false }));
                      setFat(e.target.value);
                    }}
                    placeholder="Enter Fat %"
                    className="w-full p-3 rounded-md bg-[#121212] text-white outline-none cursor-pointer"
                  />
                </div>
                {/* clr */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="Clr"
                    className={`${
                      error.clrError
                        ? "text-red-600 font-semibold animate-bounce"
                        : ""
                    }`}
                  >
                    Clr
                  </label>
                  <input
                    value={clr}
                    type="number"
                    name="Clr"
                    required
                    onChange={(e) => {
                      setClr(e.target.value);
                      setError((prev) => ({ ...prev, clrError: false }));
                    }}
                    onWheel={(e) => {
                      e.target.blur();
                    }}
                    placeholder="Enter Clr Value"
                    className="w-full p-3 rounded-md bg-[#121212] text-white outline-none cursor-pointer"
                  />
                </div>
                {/* snf value*/}
                <div className="flex flex-col gap-2">
                  <label htmlFor="Snf">SNF</label>
                  <input
                    type="number"
                    name="Snf"
                    readOnly
                    className="w-full p-3 rounded-md bg-[#121212] text-white outline-none cursor-not-allowed"
                    value={
                      fat && clr
                        ? (
                            parseFloat(clr) / 4 +
                            parseFloat(fat) * 0.2 +
                            0.66
                          ).toFixed(2)
                        : ""
                    }
                    required
                  />
                </div>
              </>
            ) : null}
            <button
              type="button"
              className="bg-[#3441af] cursor-pointer py-3 rounded-md"
              onClick={() => collectFormData()}
            >
              Submit
            </button>
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
            <div className="flex items-center gap-4 font-bold">
              <h1 className="text-blue-400">Purchasing From:</h1>
              <h1 className="font-semibold">{purchasingFrom}</h1>
            </div>
            <div className="flex items-center gap-4 font-bold">
              <h1 className="text-blue-400">Type Of Milk:</h1>
              <h1 className="font-semibold">{milkType}</h1>
            </div>
            <div className="flex items-center gap-4 font-bold">
              <h1 className="text-blue-400">Vechile Number:</h1>
              <h1 className="font-semibold ">{vechileNo}</h1>
            </div>

            <div className="flex items-center gap-4 font-bold">
              <h1 className="text-blue-400">Driver Name:</h1>
              <h1 className="font-semibold ">{driverName}</h1>
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
              <h1 className="text-blue-400">Labtest Passed:</h1>
              <h1 className="font-semibold">{adulteration}</h1>
            </div>
            {adulteration == "Yes" ? (
              <>
                <div className="flex items-center gap-4 font-bold">
                  <h1 className="text-blue-400">Milk Volume:</h1>
                  <h1 className="font-semibold ">{volume}</h1>
                </div>
                <div className="flex items-center gap-4 font-bold">
                  <h1 className="text-blue-400">FAT %:</h1>
                  <h1 className="font-semibold ">{fat}</h1>
                </div>
                <div className="flex items-center gap-4 font-bold">
                  <h1 className="text-blue-400">CLR:</h1>
                  <h1 className="font-semibold ">{clr}</h1>
                </div>
                <div className="flex items-center gap-4 font-bold">
                  <h1 className="text-blue-400">SNF:</h1>
                  <h1 className="font-semibold ">
                    {fat && clr
                      ? (
                          parseFloat(clr) / 4 +
                          parseFloat(fat) * 0.2 +
                          0.66
                        ).toFixed(2)
                      : "Not calculated"}
                  </h1>
                </div>
              </>
            ) : null}
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

export default PurchaseMilk;
