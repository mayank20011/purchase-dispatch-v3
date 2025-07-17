import Navbar from "../../components/Navbar"

const PurchaseGensetDiesel = () => {
  return (
    <div className="mobile-screen sm:rounded-2xl flex flex-col bg-black text-white">
      <Navbar name={"Purchase /Genset Diesel"} />
      <div
        className="custom-container flex flex-col gap-6 grow overflow-y-auto"
        style={{ scrollbarColor: "black black", scrollbarWidth: "thin" }}
      ></div>
    </div>
  )
}

export default PurchaseGensetDiesel