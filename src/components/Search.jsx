import { useState, useEffect } from "react";
import axios from "axios";

const Search = ({ url, setPurchasingFrom, disableError, name }) => {
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);
  let copyData= [] ;

  const [openList, setOpenList] = useState(false);
  const [selectedName, setSelectedName] = useState("");

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setLoading(false);
        const data = res.data.map((obj) => obj.name);
        setFetchedData(data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  function handleInputChange(e) {
    setSelectedName(e.target.value);
    if (e.target.value == "") {
      setOpenList(false);
    } else {
      setOpenList(true);
      const searchResult = fetchedData.filter((name) =>
        name.toLowerCase().startsWith(e.target.value.trim().toLowerCase())
      );
      setFilteredData(searchResult);
    }
  }

  return (
    <div className="relative bg-[#121212] text-white rounded-md">
      {loading ? (
        <div className="p-6 w-full animate-pulse rounded-md cursor-not-allowed bg-black"></div>
      ) : (
        <input
          name={name}
          required
          type="text"
          placeholder="Serach ..."
          className="w-full p-3 rounded-md  outline-none cursor-pointer"
          onChange={handleInputChange}
          value={selectedName}
        />
      )}

      {openList ? (
        <div
          className="flex flex-col gap-2 absolute bottom-0 w-full left-0 max-h-[450px] translate-y-[101%] overflow-y-auto bg-[#121212] p-4 rounded-md z-[2]"
          style={{ scrollbarWidth: "thin", scrollbarColor: "white #121212" }}
        >
          {filteredData.map((name) => (
            <h1
              key={name}
              className="bg-black/50 p-2 rounded-sm cursor-pointer"
              onClick={() => {
                setSelectedName(name);
                disableError();
                setPurchasingFrom(name);
                setOpenList(false);
              }}
            >
              {name}
            </h1>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Search;
