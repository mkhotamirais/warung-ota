import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeOpenAuth, removeOpenNav } from "./app/features/basicSlice";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { openNav, openAuth } = useSelector((state) => state.basic);
  const dispatch = useDispatch();
  const handleMain = () => {
    if (openNav) dispatch(removeOpenNav());
    if (openAuth) dispatch(removeOpenAuth());
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (openNav) dispatch(removeOpenNav());
      if (openAuth) dispatch(removeOpenAuth());
    });
  }, [dispatch, openAuth, openNav]);
  const { dark } = useSelector((state) => state.basic);
  return (
    <div className={`${dark ? "bg-slate-800 text-white" : "bg-white"} text-gray-700`}>
      <Header />
      <main onClick={handleMain} className="min-h-screen px-3 lg:px-12">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
      <ScrollRestoration />
    </div>
  );
};

export default App;
