import Header from "./Header";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../utils/firebase";
import { adduser, removeuser } from "../utils/Userslice"; // Ensure 'removeuser' is imported correctly
import { Outlet, useNavigate } from "react-router-dom";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe= onAuthStateChanged(auth, (user) => {
      if (user) {
    
        const uid = user.uid;
        dispatch(
          adduser({
            uid: uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          })
        );
        navigate("/");
      } else {
     
        navigate("/login") // Debugging: Log sign out
      }
    });
     
    return ()=> unsubscribe()

  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <Outlet />
    </>
  );
};

export default Body;
