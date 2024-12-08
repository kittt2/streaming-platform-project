import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getWatchlist, fetchMovieDetails } from "../utils/Watchlist";
import Movielist from "./Movielist";
import { SkeletonDemo } from "./Skeletonui";

const Watchlist = () => {
  const user = useSelector((store) => store.users.value);
  const [watchlist, setWatchlist] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchWatchlistAndDetails = async () => {
      if (user?.uid) {
        const watchlist = await getWatchlist(user.uid);
        setWatchlist(watchlist);
        const movieDetails = await Promise.all(
          watchlist.map((id) => fetchMovieDetails(id))
        );
        setMovies(movieDetails);
      } else {
        setWatchlist([]);
        setMovies([]);
      }
    };
    fetchWatchlistAndDetails();
  }, [user?.uid]);

  return (
    <div className="uppercase font-custom  font-bold text-5xl flex flex-col  items-center md:space-y-28">
      <div className="text-white grid py-6 ">
        <h1 className=" mt-20 sm:mt-20">hello {user?.displayName}</h1>
      </div>

      {watchlist? <Movielist title={"your watchlist"} movies={movies} />:<div className="text-white w-full text-center text-2xl" >loading...</div>}
    </div>
  );
};

export default Watchlist;
