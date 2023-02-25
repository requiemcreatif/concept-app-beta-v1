import React from "react";
import { Outlet } from "react-router-dom";
//import Sidebar from "../../components/SideBar/SideBar";
import SmallSideBar from "../../components/SmallSideBar/SmallSideBar";
import "./layout.css";
const Layout = () => {
  return (
    <main className="main">
      <main className="main">
        <div className="nav"></div>
        <div className="sidebar-wrapper aside">
          <div className="side-bar sidebar">
            <SmallSideBar />
            {/* <Sidebar />
            {!isSidebarOpen && <SmallSideBar />} */}
          </div>

          <div className="outlet">
            <Outlet />
          </div>
        </div>
      </main>
    </main>
  );
};

export default Layout;
