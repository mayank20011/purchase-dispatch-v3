import Navbar from "../../components/Navbar";

const PurchaseDahiCup = () => {
  return (
    <div className="mobile-screen sm:rounded-2xl flex flex-col bg-black text-white">
      <Navbar name={"Purchase / Dahi Cup"} />
      <div
        className="custom-container flex flex-col gap-6 grow overflow-y-auto"
        style={{ scrollbarColor: "black black", scrollbarWidth: "thin" }}
      ></div>
    </div>
  );
};

export default PurchaseDahiCup;
