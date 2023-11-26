import { Avatar, Dropdown, Navbar } from "flowbite-react";
import logo from "../../../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaSignOutAlt } from "react-icons/fa";

const NavBar = () => {
  const { user, logoutUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handelLogout = () => {
    logoutUser()
      .then(() => {
        axiosSecure
          .post("/logout", {})
          .then((res) => {
            if (res.data?.success) {
              toast.success("Logged Out!");
            }
          })
          .catch((er) => toast.error(er.message));
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="max-w-[2050px] mx-auto">
      <Navbar
        fluid
        className="fixed top-0 w-full z-[1000] text-[#FEFAE0] bg-[#606C38] py-8"
      >
        <Navbar.Brand>
          <img src={logo} className="mr-3 h-6 sm:h-9" alt="logo" />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Contest | Hub
          </span>
        </Navbar.Brand>
        <div className="flex md:order-2">
          {user && (
            <Dropdown
              arrowIcon={true}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img={
                    user?.photoURL
                      ? user?.photoURL
                      : "https://i.ibb.co/jJf2wWF/user.png"
                  }
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{user?.displayName}</span>
                <span className="block truncate text-sm font-medium">
                  {user?.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handelLogout}>
                <Link to={"/"} className="flex items-center gap-4">
                  Logout <FaSignOutAlt />
                </Link>
              </Dropdown.Item>
            </Dropdown>
          )}
          <Navbar.Toggle className="text-[#FEFAE0]" />
        </div>
        <Navbar.Collapse>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? "pb-2 text-xl text-[#DDA15E]"
                : "pb-2 text-xl text-[#FEFAE0]"
            }
          >
            Home
          </NavLink>
          <NavLink
            to={"/all-contests/?category=Article"}
            className={({ isActive }) =>
              isActive
                ? "pb-2 text-xl text-[#DDA15E]"
                : "pb-2 text-xl text-[#FEFAE0]"
            }
          >
            All Contest
          </NavLink>
          {!user && (
            <NavLink
              to={"/login"}
              className={({ isActive }) =>
                isActive
                  ? "pb-2 text-xl text-[#DDA15E]"
                  : "pb-2 text-xl text-[#FEFAE0]"
              }
            >
              Login
            </NavLink>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
