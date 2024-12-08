import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./Userslice";
import movieReducer from "./MovieSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    movies: movieReducer,
  },
});
