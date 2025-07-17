import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
const Home = () => {
  const options = [
    {
      to: "/purchase",
      imgSrc: "/purchase.png",
      heading: "Explore all Purchasing Options",
      pera: "Explore all purchasing options for milk, SMP, polyfilms, wooden blocks, die sets, and packaging.",
    },
    {
      to: "/dispatch",
      imgSrc: "/dispatch.png",
      heading: "Dispatch Orders",
      pera: "Dispatch all pending orders efficiently to ensure timely delivery and maintain smooth flow across operations and logistics.",
    },
  ];
  return (
    <div className="mobile-screen sm:rounded-2xl flex flex-col bg-black text-white">
      <Navbar name={"Home"} />
      <div
        className="custom-container flex flex-col gap-6 grow overflow-y-auto"
        style={{ scrollbarColor: "black black", scrollbarWidth: "thin" }}
      >
        {options.map((option) => (
          <Link key={option.heading} to={option.to} className="flex flex-col gap-2">
            <img
              src={option.imgSrc}
              alt="Purchase Img"
              className="w-full aspect-[16/9] rounded-2xl"
            />
            <h1 className="text-lg font-semibold">{option.heading}</h1>
            <p>{option.pera}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
