import useMoviestrailer from "@/hooks/useMoviestrailer";
import { useSelector } from "react-redux";
function Videobackground({ movieid }) {
  const videotrailer = useSelector((store) => store.movies?.trailervideo);

  useMoviestrailer(movieid);

  return (
    <div className="w-screenh overflow-hidden  max-h-full aspect-video pb-[30.25%] md:pb-[40%] lg:pb-[54.25% lg:rounded-3xl ">
      <iframe
        className="absolute top-0 left-0 w-screen aspect-video h-full object-cover z-0 "
        src={`https://www.youtube.com/embed/${videotrailer?.key}?autoplay=1&mute=1&loop=1&playlist=${videotrailer?.key}`}
        title="YouTube video player"
        frameBorder="6"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
}

export default Videobackground;
