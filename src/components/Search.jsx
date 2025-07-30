// import { useState } from "react";

// const Search = ({ fetchedData, setPurchasingFrom, disableError, name }) => {
//   const [filteredData, setFilteredData] = useState([]);
//   const [openList, setOpenList] = useState(false);
//   const [selectedName, setSelectedName] = useState("");

//   function handleInputChange(e) {
//     setOpenList(true);
//     setSelectedName(e.target.value);
//     if (e.target.value == "") {
//       setOpenList(false);
//     } else {
//       setOpenList(true);
//       const searchResult = fetchedData.filter((name) =>
//         name.toLowerCase().startsWith(e.target.value.trim().toLowerCase())
//       );
//       setFilteredData(searchResult);
//     }
//   }

//   return (
//     <div className="relative bg-[#121212] text-white rounded-md">
//       <input
//         name={name}
//         required
//         type="text"
//         placeholder="Serach ..."
//         className="w-full p-3 rounded-md  outline-none cursor-pointer"
//         onChange={handleInputChange}
//         value={selectedName}
//         autoComplete="off"
//       />
//       {openList ? (
//         <div
//           className="flex flex-col gap-2 absolute bottom-0 w-full left-0 max-h-[450px] translate-y-[101%] overflow-y-auto bg-[#121212] p-4 rounded-md z-[2]"
//           style={{ scrollbarWidth: "thin", scrollbarColor: "white #121212" }}
//         >
//           {filteredData.length > 0 ? (
//             filteredData.map((name) => (
//               <h1
//                 key={name}
//                 className="bg-black/50 p-2 rounded-sm cursor-pointer"
//                 onClick={() => {
//                   setSelectedName(name);
//                   disableError();
//                   setPurchasingFrom(name);
//                   setOpenList(false);
//                 }}
//               >
//                 {name}
//               </h1>
//             ))
//           ) : (
//             <p className="text-center">No Match found !</p>
//           )}
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default Search;


import { useState } from "react";

const Search = ({ fetchedData, setPurchasingFrom, disableError, name }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [openList, setOpenList] = useState(false);
  const [selectedName, setSelectedName] = useState("");

  function handleInputChange(e) {
    setOpenList(true);
    setSelectedName(e.target.value);
    if (e.target.value == "") {
      setOpenList(false);
    } else {
      setOpenList(true);
      const searchResult = fetchedData.filter((obj) =>
        obj.name.toLowerCase().startsWith(e.target.value.trim().toLowerCase())
      );
      setFilteredData(searchResult);
    }
  }

  return (
    <div className="relative bg-[#121212] text-white rounded-md">
      <input
        name={name}
        required
        type="text"
        placeholder="Serach ..."
        className="w-full p-3 rounded-md  outline-none cursor-pointer"
        onChange={handleInputChange}
        value={selectedName}
        autoComplete="off"
      />
      {openList ? (
        <div
          className="flex flex-col gap-2 absolute bottom-0 w-full left-0 max-h-[450px] translate-y-[101%] overflow-y-auto bg-[#121212] p-4 rounded-md z-[2]"
          style={{ scrollbarWidth: "thin", scrollbarColor: "white #121212" }}
        >
          {filteredData.length > 0 ? (
            filteredData.map((obj) => (
              <h1
                key={obj.name}
                className="bg-black/50 p-2 rounded-sm cursor-pointer"
                onClick={() => {
                  setSelectedName(obj.name);
                  disableError();
                  setPurchasingFrom(obj);
                  setOpenList(false);
                }}
              >
                {obj.name}
              </h1>
            ))
          ) : (
            <p className="text-center">No Match found !</p>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Search;