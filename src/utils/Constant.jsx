export const image_bg =
  "https://cdn.dribbble.com/users/6022807/screenshots/15784383/dribble4_4x.png";

export const urlmoviesnowplaying =
  "https://api.themoviedb.org/3/movie/now_playing?&page=1";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_tmbauthtoken}`,
  },
};



export const moviecardurl = "https://image.tmdb.org/t/p/w400/";

export const popularmv = "https://api.themoviedb.org/3/movie/popular?&page=1";
export const topratedmv =
  "https://api.themoviedb.org/3/movie/top_rated?&page=1";
export const upcomingmv = "https://api.themoviedb.org/3/movie/upcoming?&page=1";

export const search = "https://api.themoviedb.org/3/search/movie?";

export const youtubeapikey = import.meta.env.VITE_youtubekey;
export const youtubevideourl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=8&regionCode=in&key=${youtubeapikey}`;
export const youtubeidkey = `&key=${import.meta.env.VITE_youtubekey}`;
export const youtubebyid =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=";

export const youtubesearch =
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=";
