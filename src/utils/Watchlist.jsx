import {
  doc,
  setDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "./firebase";
import { options } from "./Constant";


export const addToWatchlist = async (userId, movieId) => {
  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
  
    await setDoc(
      userDocRef,
      {
        watchlist: arrayUnion(movieId),
      },
      { merge: true }
    );
  } else {
    
    await setDoc(userDocRef, {
      watchlist: [movieId],
    });
  }
};


export const removeFromWatchlist = async (userId, movieId) => {
  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    await setDoc(
      userDocRef,
      {
        watchlist: arrayRemove(movieId),
      },
      { merge: true }
    );
  }
};


export const getWatchlist = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    return userDoc.data().watchlist || [];
  } else {
    return [];
  }
};


export const fetchMovieDetails = async (movieId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=YOUR_API_KEY`
  ,options);
  const data = await response.json();
  return data;
};
