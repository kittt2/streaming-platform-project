import React from "react";
import { options, urlmoviesnowplaying } from "@/utils/Constant";
import { addmovie } from "@/utils/MovieSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function useNowplayingmovies() {
  const dispatch = useDispatch();
  const nowplayingmovie = useSelector((store) => store.movies.nowplayingmovie);

  const getmoviesnowplaying = async () => {
    const data = await fetch(urlmoviesnowplaying, options);
    const result = await data.json();

    dispatch(addmovie(result.results));
  };

  useEffect(() => {
    !nowplayingmovie && getmoviesnowplaying();
  }, []);
}

export default useNowplayingmovies;
