import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../partials/Header/Header";
import Footer from "../partials/Footer/Footer";
const MainLayout = () => {
  return (
    <div>
      <Header></Header>

        <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
