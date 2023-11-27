import { Outlet } from "react-router-dom";
import DashBoardNavBar from "../components/Shared/DashBoardNavBar/DashBoardNavBar";
import HelmetTitle from "../components/Shared/HelmetTitle/HelmetTitle";

const DashBoard = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      <HelmetTitle title="Contest Hub | Dashboard" />
      <div className="flex-[3] lg:min-h-screen bg-[#DDA15E]">
        <DashBoardNavBar />
      </div>
      <div className="flex-[9] px-4 lg:px-12 py-10 lg:py-24">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;
