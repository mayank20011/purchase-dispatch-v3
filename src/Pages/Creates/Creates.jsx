import Navbar from "../../components/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useRef, useEffect } from "react";
import Modal from "../../components/Modal";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import axios from "axios";
import Search from "../../components/Search";
import LoadingPage from "../../components/LoadingPage";

const Creates = () => {
  const form = useRef();

  const tempError = {
    createsInwardError: false,
    dateError: false,
    nameError: false,
  };

  // for modal
  const [openModal, setOpenModal] = useState(false);

  // for purchase list loading Error and loading
  const [fetchNameError, setFetchNameError] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchedName, setFetchedName] = useState([]);

  // for input
  const [selectedName, setSelectedName] = useState("");
  const [noOfCreates, setNoOfCreates] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // for loading
  const [loading, setLoading] = useState(false);

  // for error
  const [error, setError] = useState(tempError);

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
    if (data.name == undefined || data.name == "") {
      tempError.nameError = true;
    }
    if (data.Date == undefined || data.Date == "") {
      tempError.dateError = true;
    }
    if (data.CreatesInward == undefined || data.CreatesInward == "") {
      tempError.createsInwardError = true;
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
    setLoading(true);
    axios
      .post(
        "https://purchase-dispatch-excel.vercel.app/api/v1/creates/push-data-to-sheet",
        {
          name: selectedName.name,
          Date: data.Date,
          createsInward: noOfCreates,
          _id: selectedName._id,
        },
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
        setSelectedName("");
        setSelectedDate("");
        setNoOfCreates("");
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
        .get(
          `https://purchase-dispatch-excel.vercel.app/api/v1/dispatch/get-names/vardaan`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          setFetchedName([
            { _id: "HN01", name: "Happy Nature" },
            { _id: "GP01", name: "Gopala" },
            ...res.data.data,
          ]);
          setFetchLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setFetchNameError(true);
          setFetchLoading(false);
        });
    }
  }, []);

  return (
    <>
      <div className="mobile-screen sm:rounded-2xl flex flex-col bg-black text-white">
        <Navbar name={"Creates Entry"} />
        {fetchLoading ? (
          <LoadingPage numberOfInputBox={5} remark={false} />
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
            className="grow overflow-y-auto custom-container flex flex-col gap-6"
            style={{ scrollbarColor: "black black", scrollbarWidth: "thin" }}
            ref={form}
          >
            {/* for receiving creates from */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="name"
                className={`${
                  error.nameError
                    ? "text-red-600 font-semibold animate-bounce"
                    : ""
                }`}
              >
                Receiving Creates From
              </label>
              <Search
                name={"name"}
                fetchedData={fetchedName}
                setPurchasingFrom={setSelectedName}
                disableError={() => {
                  setError((prev) => ({
                    ...prev,
                    nameError: false,
                  }));
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
            {/* for no of creates */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="CreatesInward"
                className={`${
                  error.createsInwardError
                    ? "text-red-600 font-semibold animate-bounce"
                    : ""
                }`}
              >
                No Of Creates Received
              </label>
              <input
                value={noOfCreates}
                type="number"
                name="CreatesInward"
                required
                min={0}
                onChange={(e) => {
                  setNoOfCreates(e.target.value);
                  setError((prev) => ({ ...prev, createsInwardError: false }));
                }}
                onWheel={(e) => {
                  e.target.blur();
                }}
                autoComplete="off"
                placeholder="Enter Number Of Creates Received ..."
                className="w-full p-3 rounded-md bg-[#121212] text-white outline-none cursor-pointer"
              />
            </div>
            <div className="grow"></div>
            <button
              type="button"
              className="bg-[#3441af] cursor-pointer py-3 rounded-md mt-auto"
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
              <h1 className="text-blue-400">Name:</h1>
              <h1 className="font-semibold">{selectedName.name}</h1>
            </div>
            <div className="flex items-center gap-4 font-bold">
              <h1 className="text-blue-400">Unique Id:</h1>
              <h1 className="font-semibold">{selectedName._id}</h1>
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
              <h1 className="text-blue-400">Creates Inward:</h1>
              <h1 className="font-semibold ">{noOfCreates}</h1>
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

export default Creates;
