import React from "react";

function Videotitle({ title, overview }) {
  return (
    
      <div className=" text-gray-100 sm:text-2xl bg-gradient-to-r font-base  absolute bottom-6 left-4 md:bottom-1/3 lg:bottom-1/4 lg:left-36 space-y-2 ">
        {" "}
        <h2 className="font-black font-custom text-2xl  sm:text-4xl lg:text-7xl ">{title}</h2>{" "}
        
       
      </div>

  );
}

export default Videotitle;
