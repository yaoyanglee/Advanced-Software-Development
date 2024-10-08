import React, { useContext } from "react";
import CityDropdown from "./CityDropdown";
import PriceRangeDropdown from "./PriceRangeDropdown";
import TypeDropdown from "./TypeDropdown";
import RoSDropdown from "./RoSDropdown";

import { RiSearch2Line } from "react-icons/ri";

import { HouseContext } from "./HouseContext";
// import SearchBox from "./SearchBox";

const Search = () => {
  const { houses } = useContext(HouseContext);
  const { handleClick } = useContext(HouseContext);
  return (
    <>
      <div className="flex justify-around items-center ">
        <h1 className="text-3xl font-bold text-gray-800">
          Search properties to rent
        </h1>
      </div>
      <br></br>
      <div className="px-[20px] py-1 max-w-[1200px] mx-auto flex flex-col lg:flex-row justify-between gap-3 lg:gap-x-3 relative  lg:bg-white rounded-lg">
        <CityDropdown/>
        <TypeDropdown />
        <RoSDropdown />
        <PriceRangeDropdown/>
        {/* <SearchBox /> */}
        <button
          onClick={() => {
            handleClick();
          }}
          className="bg-violet-600 hover:bg-violet-700 transition w-full lg:max-w-[150px] h-16 rounded-lg flex justify-center items-center text-white text-xl "
        >
          <RiSearch2Line />
        </button>
      </div>
    </>
  );
};

export default Search;
