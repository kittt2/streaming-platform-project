import React, { useEffect, useState, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { youtubevideourl, youtubebyid, youtubeidkey } from "@/utils/Constant";
import Youtubevideocard from "./Youtubevideocard";
import { formatNumber } from "./Helper/Viewcount";
import { formatDistanceToNow } from "date-fns";
const Search = lazy(() => import("./Search"));
import { SkeletonDemo } from "./Skeletonui";

function VideoDetail() {
  const { id } = useParams();
  const [toggle, settoggle] = useState(false);
  const [videoDetails, setVideoDetails] = useState(null);
  const [recommendedVideos, setRecommendedVideos] = useState([]);

  const fetchVideoDetails = async () => {
    const response = await fetch(youtubebyid + id + youtubeidkey);
    const result = await response.json();
    setVideoDetails(result.items[0]);
  };

  const fetchRecommendedVideos = async () => {
    const response = await fetch(youtubevideourl);
    const result = await response.json();
    setRecommendedVideos(result.items);
  };

  useEffect(() => {
    fetchVideoDetails();
    fetchRecommendedVideos();
  }, [id]);

  const des = videoDetails?.snippet.description.split("\n");

  return (
    <>
      <div className="mt-20 w-full">
        <Suspense fallback={<SkeletonDemo count={10} />}>
          {" "}
          <Search />{" "}
        </Suspense>
      </div>
      <div className="main-container mt-4 grid md:grid-cols-3 h-full   px-6 overflow-hidden   [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] ">
        {videoDetails && (
          <div className="content-container h-fit text-white grid grid-cols-1 sm:grid-cols-1 md:col-span-2  ">
            <div className="w-full h-[70vh]">
              <iframe
                className="w-full h-full object-cover rounded-xl"
                src={`https://www.youtube.com/embed/${id}`}
                title={videoDetails.snippet.title}
                allowFullScreen
              />
            </div>
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold">
                {videoDetails.snippet.title}
              </h2>
              <p className="text-white font-bold text-xl py-1  ">
                {videoDetails.snippet.channelTitle}
              </p>
              <div className="flex gap-2">
                <p className="text-gray-300">
                  {formatNumber(videoDetails?.statistics?.viewCount)} views
                </p>
                <p className="text-gray-300">
                  {formatDistanceToNow(
                    new Date(videoDetails?.snippet.publishedAt),
                    {
                      addSuffix: true,
                    }
                  )}
                </p>
              </div>

              <div className={"h-full w-full"}>
                <h1 className="uppercase py-2 font-bold ">description</h1>

                {des.map((item, index) => (
                  <p
                    key={index}
                    className="flex text-gray-300 py-1 font-semibold flex-col"
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 sm:h-3/4 px-4 sm:grid-cols-1 md:grid-cols-1 md:max-h-[120vh] md:overflow-y-scroll gap-4 md:px-4 lg:px-6 xl:px-12 md:h-full overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <h3 className="text-white font-custom text-3xl text-center uppercase font-bold">
            Recommended Videos
          </h3>
          {recommendedVideos?.map((video) => (
            <Youtubevideocard key={video.id} data={video} />
          ))}
        </div>
      </div>
    </>
  );
}

export default VideoDetail;
