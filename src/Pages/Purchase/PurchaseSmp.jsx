import Navbar from "../../components/Navbar";
import Modal from "../../components/Modal";
import { useState, useEffect, useRef } from "react";

const PurchaseSmp = () => {
  const form = useRef();
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

        </form>
        </div>
      </div>
      <Modal></Modal>
    </>
  );
};

export default PurchaseSmp;
