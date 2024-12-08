import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moviecardurl } from "@/utils/Constant";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import {
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
} from "../utils/Watchlist";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import useMoviestrailer from "@/hooks/useMoviestrailer";
import { cleartrailervideo } from "@/utils/MovieSlice";

function About() {
  const [userId, setUserId] = useState(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const movieId = parseInt(id);
  const videotrailer = useSelector((store) => store.movies?.trailervideo);
  useMoviestrailer(movieId);
  const nowPlaying = useSelector(
    (state) => state.movies?.nowplayingmovie || []
  );
  const topRated = useSelector((state) => state.movies?.toprated || []);
  const upcoming = useSelector((state) => state.movies?.upcoming || []);
  const popular = useSelector((state) => state.movies?.popular || []);
  const searchResults = useSelector(
    (store) => store.movies?.searchmovies || []
  );
  const allMovies = [
    ...nowPlaying,
    ...topRated,
    ...upcoming,
    ...popular,
    ...searchResults,
  ];

  const movie = allMovies.find((movie) => movie.id === movieId);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  useEffect(() => {
    return () => {
      dispatch(cleartrailervideo());
    };
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        const watchlist = await getWatchlist(user.uid);
        setIsInWatchlist(watchlist.includes(movieId));
      } else {
        setUserId(null);
      }
    });
  }, [movieId]);

  const handleAddToWatchlist = async () => {
    if (userId) {
      await addToWatchlist(userId, movieId);
      setIsInWatchlist(true);
    }
  };

  const handleRemoveFromWatchlist = async () => {
    if (userId) {
      await removeFromWatchlist(userId, movieId);
      setIsInWatchlist(false);
    }
  };

  return (
    <div className="bg-black mt-20 text-white p-4 md:grid md:grid-cols-12 md:gap-4 ]">
      <Card className="w-full mb-3 border-gray-800 bg-black text-white font-custom md:col-span-6  ">
        <CardHeader className="text-xl md:text-xl lg:pt-14 lg:text-2xl font-bold text-center">
          {movie.title}
        </CardHeader>
        <CardContent className="flex flex-col  items-center p-2 md:p-2 lg:px-40">
          <div className="h-80 w-full ">
            <img
              src={moviecardurl + movie.poster_path}
              className=" h-full w-full rounded-xl object-fill"
              alt={movie.title}
            />
          </div>
        </CardContent>
      </Card>
      <Card className="w-full border-gray-800 mb-4 bg-black text-white font-semibold md:col-span-6">
        <CardContent className="p-2 md:p-4 lg:p-6">
          <CardHeader className="text-xl md:text-xl lg:text-2xl font-custom font-bold text-center">
            {movie.title}
          </CardHeader>
          <CardDescription className="space-y-2 text-sm md:text-base lg:text-lg">
            <p>
              <strong>Overview:</strong> {movie.overview}
            </p>
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p>
              <strong>Popularity:</strong> {movie.popularity}
            </p>
            <p>
              <strong>Vote Average:</strong> {movie.vote_average}
            </p>
            <p>
              <strong>Vote Count:</strong> {movie.vote_count}
            </p>
            <p>
              <strong>Original Language:</strong> {movie.original_language}
            </p>
            <p>
              <strong>Adult:</strong> {movie.adult ? "Yes" : "No"}
            </p>
            <div>
              {" "}
              {isInWatchlist ? (
                <button
                  className="bg-orange-300 p-2 rounded-lg text-black font-bold"
                  onClick={handleRemoveFromWatchlist}
                >
                  Remove from Watchlist
                </button>
              ) : (
                <button
                  className="bg-orange-300 p-2 rounded-lg text-black font-bold"
                  onClick={handleAddToWatchlist}
                >
                  Add to Watchlist
                </button>
              )}{" "}
            </div>
          </CardDescription>
        </CardContent>
      </Card>
      {videotrailer ? (
        <Card className="w-full border-gray-800 mb-4 bg-black text-white font-semibold md:col-span-12 md:w-full  md:px-2 lg:px-2">
          <CardContent>
            <CardHeader className="text-lg font-bold text-center">
              Trailer
            </CardHeader>
            <iframe
              className="w-full  aspect-video max-h-[70vh] border-none "
              src={`https://www.youtube.com/embed/${videotrailer?.key}?&playlist=${videotrailer?.key}`}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center w-full h-[15vh] text-2xl uppercase font-bold col-span-12">
          {movie ? "Loading...":"no trailer found"}
        </div>
      )}
    </div>
  );
}

export default memo(About);
