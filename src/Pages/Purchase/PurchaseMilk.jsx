import Navbar from "../../components/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useRef } from "react";
import Modal from "../../components/Modal";

const PurchaseMilk = () => {
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
  const [openModal, setOpenModal] = useState(false);
  const form = useRef(null);

  function collectFormData() {
    const formData = new FormData(form.current);
    const {
      MilkType,
      SerialNumber,
      VechileNumber,
      DriverName,
      Date,
      Time,
      Adulteration,
      Volume,
      Fat,
      Clr,
      Snf,
    } = Object.fromEntries(formData.entries());
    console.log(MilkType,
      SerialNumber,
      VechileNumber,
      DriverName,
      Date,
      Time,
      Adulteration,
      Volume,
      Fat,
      Clr,
      Snf)
  }

  return (
    <>
      <div className="mobile-screen sm:rounded-2xl flex flex-col bg-black text-white">
        <Navbar name={"Purchase / Milk"} />
        <form
          className="custom-container flex flex-col gap-6 grow overflow-y-auto text-[#a8a8a8]"
          style={{ scrollbarColor: "black black", scrollbarWidth: "thin" }}
          ref={form}
        >
          {/* select Milk Type */}
          <div className="flex flex-col gap-2">
            <label htmlFor="MilkType">Select Milk Type</label>
            <select
              name="MilkType"
              value={milkType}
              onChange={(e) => setMilkType(e.target.value)}
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
            {/* <p className="text-sm font-semibold text-red-600">Fill Up This Field First</p> */}
          </div>
          {/* for serial number */}
          <div className="flex flex-col gap-2">
            <label htmlFor="SerialNumber">Serial Number Of Weight Slab</label>
            <input
              value={weightSlab}
              type="text"
              name="SerialNumber"
              required
              onChange={(e) => {
                setWeightSlab(e.target.value);
              }}
              placeholder="Enter Weight Slab Serial Number"
              className="w-full p-3 rounded-md bg-[#121212] text-white outline-none cursor-pointer"
            />
          </div>
          {/* vechile number */}
          <div className="flex flex-col gap-2">
            <label htmlFor="VechileNumber">Vechile Number</label>
            <input
              value={vechileNo}
              type="text"
              name="VechileNumber"
              required
              onChange={(e) => {
                setVechileNo(e.target.value);
              }}
              placeholder="Enter Vechile Number"
              className="w-full p-3 rounded-md bg-[#121212] text-white outline-none cursor-pointer"
            />
          </div>
          {/* Driver Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="DriverName">Driver Name</label>
            <input
              value={driverName}
              type="text"
              name="DriverName"
              required
              onChange={(e) => {
                setDriverName(e.target.value);
              }}
              placeholder="Enter Driver Name"
              className="w-full p-3 rounded-md bg-[#121212] text-white outline-none cursor-pointer"
            />
          </div>
          {/* for Date */}
          <div className="flex flex-col gap-2">
            <label htmlFor="Date">Date</label>
            <DatePicker
              name="Date"
              required
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              placeholderText="Select Date"
              className="w-full p-3 rounded-md bg-[#121212] text-white outline-none cursor-pointer"
            />
          </div>
          {/* time */}
          <div className="flex flex-col gap-2">
            <label htmlFor="Time">Time</label>
            <input
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
              }}
              type="time"
              required
              name="Time"
              className="w-full p-3 rounded-md bg-[#121212] text-white outline-none cursor-pointer"
            />
          </div>
          {/* for adulteration */}
          <div className="flex flex-col gap-2">
            <label htmlFor="Adulteration">Adulteration</label>
            <select
              name="Adulteration"
              value={adulteration}
              onChange={(e) => {
                setadulteration(e.target.value);
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
                <label htmlFor="Volume">Milk Volume</label>
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
                  }}
                  placeholder="Enter Volume of Milk Purchasing"
                  className="w-full p-3 rounded-md bg-[#121212] text-white outline-none cursor-pointer"
                />
              </div>
              {/* Fat percent */}
              <div className="flex flex-col gap-2">
                <label htmlFor="Fat">Fat</label>
                <input
                  value={fat}
                  type="number"
                  name="Fat"
                  required
                  onWheel={(e) => {
                    e.target.blur();
                  }}
                  onChange={(e) => {
                    setFat(e.target.value);
                  }}
                  placeholder="Enter Fat %"
                  className="w-full p-3 rounded-md bg-[#121212] text-white outline-none cursor-pointer"
                />
              </div>
              {/* clr */}
              <div className="flex flex-col gap-2">
                <label htmlFor="Clr">Clr</label>
                <input
                  value={clr}
                  type="number"
                  name="Clr"
                  required
                  onChange={(e) => {
                    setClr(e.target.value);
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
                    fat == 0 || clr == 0 ? "" : clr / 4 + fat * 0.2 + 0.66
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
      </div>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div
          className="h-[500px] overflow-y-auto flex flex-col gap-4"
          style={{ scrollbarWidth: "thin", scrollbarColor: "white white" }}
        ></div>
      </Modal>
    </>
  );
};

export default PurchaseMilk;
