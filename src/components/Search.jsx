import React, { useEffect, useState } from "react";
import { youtubeidkey, youtubesearch } from "@/utils/Constant";
import { useNavigate } from "react-router-dom";
import { memo } from "react";
import toast from "react-hot-toast";

const truncateTitle = (title, maxLength = 50) => {
  return title.length > maxLength
    ? title.substring(0, maxLength) + "..."
    : title;
};

const Search = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  async function handleSearchInputChange() {
   
    if (search.length > 2) {
      try {
        const response = await fetch(youtubesearch + search + youtubeidkey);
        const result = await response.json();
        const titles = result?.items.map((item) =>
          truncateTitle(item.snippet.title)
        );
        setSuggestions(titles.slice(0, 8));
        
      } catch (error) {
        toast.error("Error fetching suggestions:");
      }
    } else {
      setSuggestions([]);
    }
  }

  async function handleYoutubeSearch() {
    const response = await fetch(youtubesearch + search + youtubeidkey);
    const result = await response.json();
   
    setSearchResults(result.items);
   
    setSearch("");
    navigate("/youtubesearch", { state: { searchResults: result.items } });
  }


  useEffect(()=>{
    
    const timer= setTimeout(() => {
       handleSearchInputChange()
    }, 500);

    return ()=>{
      clearTimeout(timer)
    }

  },[search])

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex w-full justify-center relative">
        <input
          className="border-2 text-gray-300 border-gray-700 bg-gray-900 rounded-l-full px-2 w-1/2 md:px-6 sm:w-1/3 py-2"
          type="text"
          placeholder="search"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          onFocus={()=>setSuggestions("")}
        />
        <button
          onClick={handleYoutubeSearch}
          className="text-white border-2 rounded-r-full font-bold border-gray-700 px-2 md:px-6"
        >
          Search
        </button>
        {suggestions?.length > 0 && (
          <ul className="absolute bg-gray-800  text-gray-200 sm:-ml-12 md:-ml-20 lg:-ml-16 mt-12 w-2/3 sm:w-1/3  rounded-xl shadow-lg z-10 ">
            {suggestions?.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => {
                  setSearch(suggestion);
                  setSuggestions([]);
                }}
                className="cursor-pointer hover:bg-gray-900  px-4 py-2"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default memo(Search);
