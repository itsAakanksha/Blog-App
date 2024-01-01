import React from "react";
import { Container, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const authStatus = useSelector((state)=>state.auth.status);
  // const authStatus = true
  // console.log(authStatus)
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "SignUp",
      slug: "/signup",
      active: !authStatus,
    },

    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: " All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header className=" py-3 shadow bg-gray-500">
    
      <nav className="flex">
        <ul className="flex ml-auto">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.slug)}
                  className=" px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}
          {authStatus && (
            <li>
              <LogoutBtn />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
