import React from "react";
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { formatNumber } from "./Helper/Viewcount";
import { Link } from "react-router-dom";

function Searchvideocard({ data }) {
  const { snippet, id } = data;
  const videoId = id?.videoId || id;

  return (
    <div className="w-full px-4 md:px-20 lg:px-40 " key={videoId}>
      <Link to={`/video/${videoId}`}>
        <Card className="w-full bg-black text-white h-full border-none rounded-2xl flex flex-col  sm:flex sm:flex-row">
          <img
            className=" sm:w-1/3 h-full object-cover rounded-2xl"
            src={snippet?.thumbnails?.medium.url}
            alt={snippet?.title}
          />
          <div className="flex  flex-col justify-between sm:px-4 py-2  sm:w-2/3">
            <div>
              <p className="text-sm sm:text-lg font-semibold">{snippet.title}</p>
              <p>
                {formatDistanceToNow(new Date(snippet.publishedAt), {
                  addSuffix: true,
                })}
              </p>
              <p className="text-gray-400 mt-1 font-bold  sm:text-xl ">{snippet.channelTitle}</p>
            </div>
            
          </div>
        </Card>
      </Link>
    </div>
  );
}

export default Searchvideocard;
