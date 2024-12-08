import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowplayingmovie: null,
    trailervideo: null,
    searchmovies:null,
    toprated: null,
    upcoming: null,
    popular: null,
  },
  reducers: {
    addmovie: (state, action) => {
      state.nowplayingmovie = action.payload;
    },
    cleartrailervideo: (state) => {
      state.trailervideo = null;
    },
    addtrailervideo: (state, action) => {
      state.trailervideo = action.payload;
    },
    addsearchmovies: (state, action) => {
      state.searchmovies = action.payload;
    },
    clearsearchmovies: (state) => {
      state.searchmovies = null;
    },
    addtoprated: (state, action) => {
      state.toprated = action.payload;
    },
    addupcoming: (state, action) => {
      state.upcoming = action.payload;
    },
    addpopular: (state, action) => {
      state.popular = action.payload;
    },

   
  },
});

export const {
  addmovie,
  addtrailervideo,
  addpopular,
  addtoprated,
  addupcoming,
  addsearchmovies,
  clearsearchmovies,
  cleartrailervideo
} = movieSlice.actions;
export default movieSlice.reducer;
