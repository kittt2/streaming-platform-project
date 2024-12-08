import { useState } from "react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adduser } from "@/utils/Userslice";
import { signInWithPopup } from "firebase/auth";
import { providergoogle } from "../utils/firebase";
import { image_bg } from "@/utils/Constant";
import { PiGoogleChromeLogoThin } from "react-icons/pi";
const Register = () => {
  const [error, seterror] = useState([]);
  const [image, setImage] = useState(null);
  const[Track,setTrack] = useState(false)
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

 

  function onSubmit(data, e) {
    setTrack(true)
    e.preventDefault();
    
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
       
        updateProfile(user, { displayName: data.displayName })
          .then(() => {
            const { uid, email, displayName, photoURL } = user;
            
            dispatch(
              adduser({
                uid: uid,
                displayName: displayName,
                email: email,
                
              })
            );
           
            toast.success("Your account is created.");
            setTrack(false)
          
          })
          .catch((error) => {
            setTrack(false)
            seterror(error.message);
            toast.error(error.message);
          });
      })
      .catch((error) => {
        setTrack(false)
        const errorCode = error.code;
        const errorMessage = error.message;
        seterror(`${errorMessage} (${errorCode})`);
        toast.error(error.message);
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
        toast.success("Your account is created.");
        setTrack(false)
       
      })
      .catch((error) => {
        setTrack(false)
        const errorCode = error.code;
        const errorMessage = error.message;
        seterror(`${errorMessage} (${errorCode})`);
        toast.error(error.message);
      });
  }
  return (
    <div className={`image  object-fill h-screen `} style={{ backgroundImage: `url(${image_bg})` }} >
      <h1 className="font-custom text-5xl pt-20 font-extrabold text-center text-white py-6 uppercase md:text-7xl">
        Sign up
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-1 border-2 rounded-3xl bg-transparent bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border  border-gray-200  max-h-min flex-col space-y-5 py-4 mx-8 md:mx-auto md:max-w-md justify-center ">
          <input
            {...register("displayName", {
              required: "name is required",
            })}
            type="text"
            className="py-1 rounded-full placeholder-white text-white  bg-transparent border-2 mx-6 px-5 md:py-2 "
            placeholder="User Name"
          />

          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            type="text"
            className="py-1 rounded-full placeholder-white text-white  bg-transparent border-2 mx-6 px-5 md:py-2 "
            placeholder="email"
          />
          {errors.email && (
            <p className="text-red-500  h-1">{errors.email.message}</p>
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
            className=" py-1  text-white  placeholder-white  mx-6 bg-transparent border-2 rounded-full px-5 md:py-2 "
            placeholder="password"
          />
          {errors.password && (
            <p className="text-red-500  h-1  ">{errors.password.message}</p>
          )}
          <input
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
            type="text"
            className=" py-1  text-white  placeholder-white mx-6 bg-transparent border-2  rounded-full px-5 md:py-2  "
            placeholder="confirm password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 h-1 ">
              {errors.confirmPassword.message}
            </p>
          )}


          <button
            type="submit"
            className={`bg-orange-300 rounded-2xl py-1  mx-8 ${Track ? 'opacity-50 cursor-not-allowed' : ''}  md:mx-20  font-bold  uppercase md:py-2 `}
            disabled={Track}
          >
            create
          </button>
          <div className="flex font-custom text-xl justify-center">
            <p className="px-1 text-custom text-[#f2f8f8] font-bold ">
              Already have an account?
            </p>
            <Link to={"/login"} className="text-custom text-orange-400">
              login
            </Link>
          </div>
        </div>
      </form>

      <div className="flex flex-col space-y-5 bg-transparent border-2 rounded-3xl my-2 py-4  mx-9  md:mx-auto  md:max-w-md ">
        <button
          className="bg-orange-300 mx-8 fkex-1   rounded-2xl py-1 font-bold uppercase relative md:py-2 md:mx-20 "
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

export default Register;
