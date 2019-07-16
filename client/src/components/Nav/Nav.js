import React from "react";
import "../../css/style.css";

const Nav = props => {
  return (
    <nav class="flex items-center justify-start flex-wrap bg-gray-800 px-6 py-4">
      <div class="flex items-center flex-shrink-0 text-gray-100 mr-6">
        <a href="/" class="font-semibold text-xl tracking-tight">
          Stat.US
        </a>
      </div>
      <div class="block lg:hidden">
        <button class="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white">
          <svg
            class="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          {props.isLoggedIn === false ? (
            <a className="nav-link cursor-pointer text-gray-200" href="/login">
              Log-in
            </a>
          ) : (
            <a
              className="nav-link cursor-pointer text-gray-200"
              onClick={props.logout}
              href={null}
            >
              Logout
            </a>
          )}
        </div>
        <div className="text-sm lg:flex-grow">
          {props.isLoggedIn === false ? (
            <a className="nav-link text-gray-200" href="/register">
              Register
            </a>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
