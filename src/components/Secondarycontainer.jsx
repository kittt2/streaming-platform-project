import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { moviecardurl, options } from "@/utils/Constant";
import { SkeletonDemo } from "./Skeletonui";

const Movielist = lazy(() => import("./Movielist"));

function Secondarycontainer() {
  const movies = useSelector((store) => store.movies?.nowplayingmovie);
  const toprated = useSelector((store) => store.movies?.toprated);
  const upcoming = useSelector((store) => store.movies?.upcoming);
  const popular = useSelector((store) => store.movies?.popular);

  return (
    <div className="bg-black" id="browse">
      <Suspense fallback={<SkeletonDemo count={4} />}>
        <Movielist title={"now playing"} movies={movies} />
      </Suspense>
      <Suspense fallback={<SkeletonDemo count={4} />}>
        <Movielist title={"upcoming"} movies={upcoming} />
      </Suspense>
      <Suspense fallback={<SkeletonDemo count={4} />}>
        <Movielist title={"top rated"} movies={toprated} />
      </Suspense>
      <Suspense fallback={<SkeletonDemo count={4} />}>
        <Movielist title={"popular"} movies={popular} />
      </Suspense>
    </div>
  );
}

export default Secondarycontainer;
