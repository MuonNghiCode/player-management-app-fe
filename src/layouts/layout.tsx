import React from "react";
import { Outlet } from "react-router";
import Header from "./header";
import Footer from "./footer";
import ScrollToTop from "../components/ScrollToTop";

const layout: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col h-screen">
        <div className="fixed top-0 left-0 w-full text-black text center z-50">
          <Header />
        </div>
        <main className="flex-1 pt-20 bg-black">
          <Outlet />
        </main>
        <div className="z-10 bg-black text-white text-center ">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default layout;
