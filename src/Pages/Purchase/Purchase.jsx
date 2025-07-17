import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

const Purchase = () => {
  const purchaseOptions = [
    {
      to: "/purchase/milk",
      heading: "Milk Purchase",
      pera: "Initiale a new milk purchase order",
      imgSrc: "/milk.jpg",
    },
    {
      to: "/purchase/smp",
      heading: "SMP Purchase",
      pera: "Start a new purchase order for SMP",
      imgSrc: "/smp-bags.png",
    },
    {
      to: "/purchase/polyfilm",
      heading: "PolyFilm Purchase",
      pera: "Create a new order to purchase polyfilms for packaging",
      imgSrc: "/polyfilm.webp",
    },
    {
      to: "/purchase/wooden-block",
      heading: "Wooden Block",
      pera: "Initiate a purchase request for wooden blocks used in production",
      imgSrc: "/wooden-block.jpg",
    },
    {
      to: "/purchase/diesel-genset",
      heading: "Genset Diesel",
      pera: "Log a diesel purchase for genset fuel requirements",
      imgSrc: "/genset-diesel.jpeg",
    },
    {
      to: "/purchase/dahi-cup",
      heading: "Dahi Cup",
      pera: "Place a new purchase order for dahi packaging cups",
      imgSrc: "/dahi-cup.jpeg",
    },
    {
      to: "/purchase/dahi-matka",
      heading: "Dahi Matka",
      pera: "Create a new purchase order for dahi matka containers",
      imgSrc: "/dahi-matka.png",
    },
  ];

  return (
    <div className="mobile-screen sm:rounded-2xl flex flex-col bg-black text-white">
      <Navbar name={"Purchase"}/>
      <div
        className="custom-container flex flex-col gap-6 grow overflow-y-auto"
        style={{ scrollbarColor: "black black", scrollbarWidth: "thin" }}
      >
        {purchaseOptions.map((option, index) => (
          <Link to={option.to} className="flex gap-2 items-center bg-neutral-900/80 rounded-2xl p-4" key={option.to}>
            <div
              className={`${
                index % 2 == 0 ? "order-2" : "order-1"
              } flex flex-col gap-2 w-3/5`}
            >
              <h1 className="text-xl font-semibold">{option.heading}</h1>
              <p>{option.pera}</p>
            </div>
            <img
              src={option.imgSrc}
              alt={`${option.heading} Img`}
              className={`w-2/5 aspect-[16/9] ${index % 2 == 0 ? "order-1" : "order-2"} rounded-2xl`}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Purchase;
