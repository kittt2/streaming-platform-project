import React, { memo, useEffect, useState ,lazy, Suspense} from "react";
import { youtubevideourl } from "@/utils/Constant";
import Youtubevideocard from "./Youtubevideocard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import { SkeletonDemo } from "./Skeletonui";
import toast from "react-hot-toast";
const Search = lazy(() => import("./Search"));

const Browse = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [pageToken, setPageToken] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [search, setsearch] = useState("");
  const [value, setvalue] = useState([]);

  const fetchVideos = async () => {
    const url = pageToken
      ? `${youtubevideourl}&pageToken=${pageToken}`
      : youtubevideourl;

    try {
      const response = await fetch(url);
      const result = await response.json();
      setData((prevData) => {
        const existingIds = new Set(prevData.map((item) => item.id));
        const filteredItems = result?.items.filter(
          (item) => !existingIds.has(item.id)
        );
        return [...prevData, ...filteredItems];
      });
      setPageToken(result.nextPageToken);
      setHasMore(!!result.nextPageToken);
      
    } catch (error) {
      toast.error("Error fetching data");
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="mt-24 w-full">
      <Suspense fallback={<SkeletonDemo count={10} />}> <Search /> </Suspense>
      <InfiniteScroll
        dataLength={data.length}
        next={fetchVideos}
        hasMore={hasMore}
        loader={<p className="text-center">Loading...</p>}
        endMessage={<p className="text-center">No more videos</p>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {data?.map((video) => {
            const videoId = video.id.videoId || video.id;
            return <Youtubevideocard key={videoId} data={video} />;
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default memo(Browse);
