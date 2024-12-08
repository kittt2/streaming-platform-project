import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import { removeuser } from "@/utils/Userslice";
import toast from "react-hot-toast";
import { memo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Header = () => {
  const [att, setatt] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users?.value);

  function handel(e) {
    setatt(!att);
  }

  function handelsignout() {
    signOut(auth)
      .then(() => {
        dispatch(removeuser());
        toast.success("Logged out ");
      })
      .catch((error) => {
        navigate("error");
      });
  }

  return (
    <>
      <div className="bg-[#000000] fixed  z-50 text-[#dfdff2] bg-blend-saturation flex flex-1 items-center justify-between md:items-center p-4  md:px-40 w-full flex-wrap  ">
        <h1 className="font-bold   text-xl font-custom  mx-4">Stream</h1>
        <div className="hidden md:flex flex-row  md:items-center">
          <ul className="flex justify-between uppercase  items-center space-x-8">
            {user?.email && (
              <Link to={"/"} className="font-bold  cursor-pointer">
                home
              </Link>
            )}
            {user?.email && (
              <Link to={"/browse"} className="font-semibold  cursor-pointer">
                youtube
              </Link>
            )}
            {user?.email && (
              <Link
                to={"/contact"}
                className="font font-semibold  cursor-pointer"
              >
                search
              </Link>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src={user?.photoURL} />
                  <AvatarFallback className=" border-1  bg-black  uppercase">
                    <img src="/favicon.png" className="w-full h-full object-cover" alt="U" />
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to={"/watchlist"}>{user.displayName}</Link>
                </DropdownMenuItem>
                {user.email ? (
                  <DropdownMenuItem onClick={handelsignout}>
                    Sign out
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem>
                    <Link to={"/login"}>login</Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </ul>
        </div>

        <div className="md:hidden">
          <button onClick={handel}>
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />{" "}
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`${
          att ? "flex" : "hidden"
        } bg-slate-700 items-center z-40 fixed top-0 left-0 right-0 md:hidden `}
      >
        <ul className="flex uppercase flex-col items-center text-center justify-center py-7 space-y-6  bg-black text-[#cecedd] w-full">
          <button onClick={handel}>
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />{" "}
            </svg>
          </button>
          {user?.email && (
            <Link
              to={"/"}
              className="font-bold py-4 cursor-pointer hover:underline  "
            >
              home
            </Link>
          )}
          {user?.email && (
            <Link
              to={"/browse"}
              className="font-semibold py-4 cursor-pointer hover:underline"
            >
              youtube
            </Link>
          )}
          {user?.email && (
            <Link
              to={"/contact"}
              className="font font-semibold py-4 cursor-pointer hover:underline"
            >
              search
            </Link>
          )}
          {user?.email && (
            <Link
              to={"/watchlist"}
              className="font  font-semibold py-4 cursor-pointer"
            >
              watchlist
            </Link>
          )}
          {user?.email ? (
            <Link
              onClick={handelsignout}
              className="font font-semibold py-4 cursor-pointer"
            >
              Sign out
            </Link>
          ) : (
            <Link
              className="font font-semibold py-4 cursor-pointer"
              to={"/login"}
            >
              login
            </Link>
          )}
        </ul>
      </div>
    </>
  );
};

export default memo(Header);
