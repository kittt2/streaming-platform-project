import { options } from "@/utils/Constant";
import { addtrailervideo, cleartrailervideo } from "@/utils/MovieSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
function useMoviestrailer(movieid) {
  const dispatch = useDispatch();
  
  const getmovievideo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieid +
        "/videos?language=en-US",
      options
    );

    const video = await data.json();
    const result = video.results.filter((video) => video.type === "Trailer");
    const findFirstValidTrailer = (videos) => {
      for (let i = 0; i < videos.length; i++) {
        if (videos[i]?.key) {
          return videos[i];
        }
      }
      return null;
    };

    const trailer =
      findFirstValidTrailer(result) || findFirstValidTrailer(video.results);

    dispatch(addtrailervideo(trailer));
  };

  useEffect(() => {
    getmovievideo();
    return () => {
      dispatch(cleartrailervideo());
    };
  }, [movieid]);
}

export default useMoviestrailer;
