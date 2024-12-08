import React from "react";
import { useSelector } from "react-redux";
import Videotitle from "./Videotitle";
import Videobackground from "./Videobackground";

function Maincontainer() {
  const movies = useSelector((store) => store.movies?.nowplayingmovie);
  if (!movies) return;

  const mainMovie = movies[0];

  const { original_title, overview, id } = mainMovie;

  return (
    <div className="relative  overflow-hidden w-screen ">
      {" "}
      <Videobackground movieid={id} />{" "}
      <div className="absolute top-0 left-0 w-screen h-full flex  items-center justify-center bg-black bg-opacity-50   ">
        
        <Videotitle title={original_title} overview={overview} />{" "}
        
        
      </div>{" "}
      
    </div>
  );
}

export default Maincontainer;
