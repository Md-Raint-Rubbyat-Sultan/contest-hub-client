import { NavLink } from "react-router-dom";
import H1Prime from "../../Utils/H1Prime";
import {
  FaBars,
  FaRegWindowClose,
  FaHome,
  FaUser,
  FaTrophy,
  FaRegWindowMaximize,
  FaEdit,
} from "react-icons/fa";
import { useState } from "react";
import logo from "../../../assets/logo.png";
import useIsAdmin from "../../../hooks/useIsAdmin";
import useIsHost from "../../../hooks/useIsHost";

const DashBoardNavBar = () => {
  const [menu, setMenu] = useState(() => false);
  const [isAdmin] = useIsAdmin();
  const [isHost] = useIsHost();

  const dynamicLinks = (
    <>
      {isAdmin && (
        <>
          <li>
            <NavLink
              onClick={() => setMenu((prev) => !prev)}
              className={({ isActive }) =>
                (isActive ? "text-white" : "") + " flex items-center gap-2"
              }
              to={"/dashboard/manage-user"}
            >
              <FaUser />
              Manage User
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setMenu((prev) => !prev)}
              className={({ isActive }) =>
                (isActive ? "text-white" : "") + " flex items-center gap-2"
              }
              to={"/dashboard/manage-contests"}
            >
              <FaTrophy />
              Manage Contest
            </NavLink>
          </li>
        </>
      )}

      {isHost && (
        <>
          <li>
            <NavLink
              onClick={() => setMenu((prev) => !prev)}
              className={({ isActive }) =>
                (isActive ? "text-white" : "") + " flex items-center gap-2"
              }
              to={"/dashboard/add-contest"}
            >
              <FaEdit />
              Add Contest
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setMenu((prev) => !prev)}
              className={({ isActive }) =>
                (isActive ? "text-white" : "") + " flex items-center gap-2"
              }
              to={"/dashboard/my-contest"}
            >
              <FaTrophy />
              my Contest
            </NavLink>
          </li>
        </>
      )}

      {!isAdmin && !isHost && (
        <>
          <li>
            <NavLink
              onClick={() => setMenu((prev) => !prev)}
              className={({ isActive }) =>
                (isActive ? "text-white" : "") + " flex items-center gap-2"
              }
              to={"/dashboard/user-profile"}
            >
              <FaUser />
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setMenu((prev) => !prev)}
              className={({ isActive }) =>
                (isActive ? "text-white" : "") + " flex items-center gap-2"
              }
              to={"/dashboard/win-contest"}
            >
              <FaTrophy />
              win contest
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => setMenu((prev) => !prev)}
              className={({ isActive }) =>
                (isActive ? "text-white" : "") + " flex items-center gap-2"
              }
              to={"/dashboard/participate-contest"}
            >
              <FaRegWindowMaximize />
              Participate contest
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="font-bold">
      <div className="flex justify-center items-center lg:flex-col py-8 gap-4">
        <figure>
          <img className="w-12 h-12" src={logo} alt="Logo" />
        </figure>
        <H1Prime custom={"text-center text-[#283618] "}>Contest | Hub</H1Prime>
      </div>
      <div className="relative">
        <div
          onClick={() => setMenu((prev) => !prev)}
          className="lg:hidden inline-block text-2xl m-3 p-2 border-2 border-[#283618] rounded-lg shadow-lg"
        >
          {menu ? <FaRegWindowClose /> : <FaBars />}
        </div>
        <div
          className={`absolute lg:static lg:flex justify-center bg-[#DDA15E] lg:bg-transparent px-2 py-4 lg:py-0 lg:px-0 duration-300 z-40  ${
            menu ? "left-0" : "-left-full"
          }`}
        >
          <ul className="font-medium uppercase space-y-6 text-[#283618]">
            {dynamicLinks}
            {/* shared links */}
            <li>
              <hr className="h-px w-full" />
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  (isActive ? "text-white" : "") + " flex items-center gap-2"
                }
                to={"/"}
              >
                <FaHome />
                Home
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardNavBar;
