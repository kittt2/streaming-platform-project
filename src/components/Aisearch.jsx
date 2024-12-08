import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useSearchMovies from "@/hooks/useSearch";
import { clearsearchmovies } from "@/utils/MovieSlice";
import Movielist from "./Movielist";
import { useEffect } from "react";
import { Skeleton } from "./ui/skeleton";
import { SkeletonDemo } from "./Skeletonui";

const Aisearch = () => {
  const [text, setText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const searchResults = useSelector((store) => store.movies?.searchmovies);
  const dispatch = useDispatch();

  useSearchMovies(searchQuery, 500);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(text);
    setText(""); 
  };
   
  const clearSearchResults = () => {
    dispatch(clearsearchmovies());
  };
  

  if(!searchResults){
    <SkeletonDemo/>
  }


  return (
    <>
      <div className="flex  flex-col my-20 md:flex-row md:justify-center  p-2 space-x-2">
        <input
          className=" w-full  md:w-1/2 my-2 p-2 rounded-lg"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="search movies "
        />
        <button
          className="bg-orange-300 my-2 p-2 rounded-lg px-4 uppercase"
          onClick={handleSearch}
        >
          search
        </button>
        <button
          className="bg-red-500 my-2 p-2 rounded-lg px-4 uppercase"
          onClick={clearSearchResults}
        >
          clear
        </button>
      </div>
      <div className="bg-black">
        
         { searchResults && <Movielist  title={"search result"} movies={searchResults} /> }
      
      </div>
    </>
  );
};

export default Aisearch;
