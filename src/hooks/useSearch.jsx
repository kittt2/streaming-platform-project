import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { options, search } from "@/utils/Constant";
import { addsearchmovies } from "@/utils/MovieSlice";

function useSearchMovies(text, delay) {
  const dispatch = useDispatch();

  const debounce = (func, delay) => {
    let debounceTimer;
    return function (...args) {
      const context = this;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const getMovies = useCallback(debounce(async (query) => {
    if (!query) return;

    try {
      const response = await fetch(search + `query=${query}`+"&page=1", options);
      const data = await response.json();
      if (data.results) {
        dispatch(addsearchmovies(data.results));
      } else {
        console.error("No results found");
      }
    } catch (error) {
      console.error("Error fetching movie search results:", error);
    }
  }, delay), [dispatch, delay]);

  useEffect(() => {
    getMovies(text);
  }, [text, getMovies]);
}

export default useSearchMovies;
