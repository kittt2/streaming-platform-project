import React from "react";
import Searchvideocard from "./Searchresultcard";
import { useLocation } from "react-router-dom";
import Search from "./Search";

const Youtubesearchresult = () => {
  const location = useLocation();
  const data = location.state?.searchResults || [];

  

  return (
    <div className="mt-24 w-full " >
      <div className="flex justify-center w-full " >
        <Search/>
        </div>  
        <div className="grid gap-4 mt-4  grid-col-12 " >
      {data?.map((video) => {
        const videoId = video.id.videoId || video.id;
        return <Searchvideocard key={videoId} data={video} />;
      })}
      </div>
    </div>
  );
};

export default Youtubesearchresult;
