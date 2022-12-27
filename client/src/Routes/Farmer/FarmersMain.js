import React from "react";
import { Outlet } from "react-router-dom";
import FarmerNav from "./FarmerNav";

const FarmersMain = () => {
  return (
    <div style={{ postion: "relative" }}>
      <Outlet />
      <FarmerNav />
    </div>
  );
};

export default FarmersMain;
