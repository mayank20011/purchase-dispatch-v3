import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
const Navbar = ({ name }) => {
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const nav = document.querySelector("#nav");
    if (openNav) {
      nav.classList.remove("-translate-x-full");
    } else {
      nav.classList.add("-translate-x-full");
    }
  }, [openNav]);

  function navigateBack() {
    if (location.pathname == "/") return;
    navigate(-1);
  }

  return (
    <div className="bg-[#121212]">
      <div className="relative w-full custom-container overflow-hidden !py-4">
        <div className="flex items-center justify-between">
          <i
            className="fa-solid fa-arrow-left text-2xl cursor-pointer"
            onClick={() => {
              navigateBack();
            }}
          ></i>
          <h1 className="font-bold text-xl">{name}</h1>
          <i
            className="fa-solid fa-bars text-2xl cursor-pointer hover:scale-95 transition"
            onClick={() => {
              setOpenNav(true);
            }}
          ></i>
        </div>

        <nav
          className="fixed top-0 left-0 h-screen bg-[#121212]/90 w-[300px] p-6 flex flex-col gap-6 text-left transition -translate-x-full overflow-y-auto z-[100]"
          id="nav"
        >
          <i
            className="fa-solid fa-x text-2xl text-right cursor-pointer"
            onClick={() => {
              setOpenNav(false);
            }}
          ></i>
          <Link
            to={"/"}
            className="text-lg font-semibold flex gap-4 items-center"
          >
            <i className="fa-solid fa-home"></i>
            <span>Home</span>
          </Link>

          <div className="border-t-1 border-b-1 py-4 border-slate flex flex-col gap-4">
            {/* purchase */}
            <Link
              to={"/purchase"}
              className="text-lg font-semibold flex gap-4 items-center"
            >
              <i className="fa-solid fa-cart-shopping"></i>
              <span>Purchase</span>
            </Link>
            {/* milk */}
            <Link to={"/purchase/milk"} className="flex gap-4 items-center">
              <i className="fa-solid fa-glass-water-droplet"></i>
              <span>Milk</span>
            </Link>
            {/* smp */}
            <Link to={"/purchase/smp"} className="flex gap-4 items-center">
              <i className="fa-solid fa-sack-dollar"></i>
              <span>SMP</span>
            </Link>
            {/* polyfilms */}
            <Link to={"/purchase/polyfilm"} className="flex gap-4 items-center">
              <i className="fa-solid fa-sheet-plastic"></i>
              <span>Polyfilms</span>
            </Link>
            {/* wooden block */}
            <Link
              to={"/purchase/wooden-block"}
              className="flex gap-4 items-center"
            >
              <i className="fa-solid fa-tree"></i>
              <span>Wooden Block</span>
            </Link>
            {/* diesel */}
            <Link
              to={"/purchase/diesel-genset"}
              className="flex gap-4 items-center"
            >
              <i className="fa-solid fa-gas-pump"></i>
              <span>Diesel Genset</span>
            </Link>
            {/* dahi cup */}
            <Link to={"/purchase/dahi-cup"} className="flex gap-4 items-center">
              <i className="fa-solid fa-jug-detergent"></i>
              <span>Dahi Cup</span>
            </Link>
            {/* dahi matka */}
            <Link
              to={"/purchase/dahi-matka"}
              className="flex gap-4 items-center"
            >
              <i className="fa-solid fa-bowl-food"></i>
              <span>Dahi Matka</span>
            </Link>
          </div>

          <Link
            to={"/dispatch"}
            className="text-lg font-semibold flex gap-4 items-center"
          >
            <i className="fa-solid fa-truck-fast"></i>
            <span>Dispatch</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
