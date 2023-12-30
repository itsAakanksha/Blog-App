import React from "react";
import { Container, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Header() {
  // const authStatus = useSelector((state)=>state.auth.status);
  const authStatus = true;
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: authStatus,
    },
    {
      name: "SignUp",
      slug: "/signUp",
      active: authStatus,
    },
    {
      name: "login ",
      slug: "/login",
      active: authStatus,
    },
    {
      name: " All Posts",
      slug: "/all Posts",
      active: authStatus,
    },
    {
      name: "add Post",
      slug: "/addpost",
      active: authStatus,
    },
  ];
  return (
    <header py-3 shadow bg-gray-500>
    
      <nav className="flex">
        <ul className="flex ml-auto">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.slug)}
                  className=" px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                >
                  {item.name}{" "}
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
