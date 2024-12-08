import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { adduser } from "@/utils/Userslice";
import { auth } from "../utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import { PiGoogleChromeLogoThin } from "react-icons/pi";
import { signInWithPopup } from "firebase/auth";
import { providergoogle } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { image_bg } from "@/utils/Constant";
const Login = () => {
  const navigate = useNavigate();
  const [error, seterror] = useState("");
  const dispatch = useDispatch();
  const[Track,setTrack] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data, e) {
    e.stopPropagation();
    setTrack(true)
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        
        toast.success("loged in");
        setTrack(false)
       
      })
      .catch((error) => {
        setTrack(false)
        const errorCode = error.code;
        const errorMessage = error.message;
        seterror(errorCode + errorMessage);
        toast.error(errorMessage);
      });
  }

  function registerwithgoogle() {
    setTrack(true)
    signInWithPopup(auth, providergoogle)
      .then((result) => {
        const user = result.user;
       
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          adduser({
            uid: uid,
            displayName: displayName,
            email: email,
            photoURL: photoURL,
          })
        );
        toast.success("Logged in with Google");
      
        setTrack(false)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        seterror(`${errorCode}: ${errorMessage}`);
        toast.error(errorMessage);
        setTrack(false)
      });
  }

  return (
    <div className={`image  object-fill h-screen  `} style={{ backgroundImage: `url(${image_bg})` }} >
      <h1 className="font-custom text-7xl pt-20 text-white font-extrabold text-center py-9 uppercase md:text-9xl">
        s<span className="text-orange-300" >ign</span> i<span className="text-orange-300" >n</span>
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col bg-opacity-10 backdrop-filter backdrop-blur-lg bg-grey border border-gray-200 rounded-xl space-y-5 py-4 mx-8 md:mx-auto md:max-w-md  ">
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            type="text"
            className="py-2 rounded-full mx-6 bg-transparent px-5 text-white bg-opacity-20 bg-white backdrop-blur-lg border-2 border-gray-200 placeholder-gray-200 md:py-4"
            placeholder="email"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value:
                  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  "Password must include uppercase, lowercase, number, and special character",
              },
            })}
            type="text"
            className=" py-2 rounded-full  mx-6 bg-transparent px-5 text-white bg-opacity-20 bg-white backdrop-blur-lg border-2 border-gray-200 placeholder-gray-200 md:py-4 "
            placeholder="password"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <button
            type="submit"
            disabled={Track}
            className={`bg-orange-300 mx-6 ${Track&&'opacity-50 cursor-not-allowed'}   rounded-2xl py-2 font-bold uppercase md:py-4`}
          >
            login
          </button>
          <div className="flex font-custom text-xl mx-6 text-white  ">
            <h1 className="px-3 text-custom">not have an account?</h1>
            <Link
              to={"/register"}
              className="text-custom cursor-pointer text-orange-400"
            >
              sign up
            </Link>
          </div>
        </div>
      </form>
      <div className="flex flex-col space-y-5 mx-8 bg-transparent px-2 text-white bg-opacity-20 bg-white backdrop-blur-lg border-2 border-gray-200 placeholder-white rounded-xl my-4 py-4   md:mx-auto  md:max-w-md  ">
        <button
          className="bg-orange-300 mx-6 fkex-1   rounded-xl py-1 font-bold uppercase relative md:py-2 md:mx-20"
          onClick={registerwithgoogle}
        >
          <span className="flex  w-full   flex-1 justify-center">
            <PiGoogleChromeLogoThin className="text-2xl" />{" "}
            <span className="invisible">-</span>Sign in with google
          </span>
        </button>
      </div>
    </div>
  );
};

export default Login;
