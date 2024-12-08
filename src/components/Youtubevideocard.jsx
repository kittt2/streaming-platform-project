import React from "react";
import { Card } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { formatNumber } from "./Helper/Viewcount";
import { Link } from "react-router-dom";

function Youtubevideocard({ data }) {
  const { snippet,id } = data;
  const videoId = id?.videoId || id;

  return (
    <div className="w-full" key={videoId}>
      <Link to={`/video/${videoId}`}>
        <Card className="w-full bg-black text-white h-full rounded-2xl border-black border-2 shadow-xl ">
          <img
            className="w-full h-48 object-cover rounded-t-2xl"
            src={snippet?.thumbnails?.medium.url}
            alt={snippet?.title}
          />
          <p className="font-bold mt-2 px-2 text-gray-400">
            {snippet?.channelTitle}
          </p>
          <p className="text-sm text-gray-200 font-semibold px-2 py-1">{snippet.title}</p>
          <div className="flex justify-between px-2 py-1 text-gray-500 ">
            <p>{formatNumber(data?.statistics?.viewCount)} views</p>
            <p>
              {formatDistanceToNow(new Date(snippet.publishedAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </Card>
      </Link>
    </div>
  );
}

export default Youtubevideocard;
