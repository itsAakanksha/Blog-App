import { useState, useEffect } from "react";
import { Header, Footer, Container } from "./components/index";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Outlet } from "react-router-dom";
import conf from "./conf/conf";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentuser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between flex-col bg-custom  text-black">
    <div className='w-full block'>
      <Header />
        <main className="py-8">
          <Outlet />
        </main>
      <Footer />
    </div>
    </div>
  ) : null;
}

export default App;
