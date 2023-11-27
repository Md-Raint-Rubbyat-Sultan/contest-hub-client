import axios from "axios";
import { useContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    let mount = true;
    if (mount) {
      axiosSecure.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          if (
            error?.response?.status === 401 ||
            error?.response?.status === 403
          ) {
            logoutUser()
              .then(() => {
                navigate("/");
                axiosSecure
                  .post("/logout", {})
                  .then(() => {
                    if (error?.response?.status === 401) {
                      return toast.error("Access denied, please login.");
                    }
                    if (error?.response?.status === 403) {
                      return toast.error("Forbidden Access.");
                    }
                  })
                  .catch((er) => toast.error(er.message));
              })
              .catch((er) => toast.error(er.message));
            console.log(error);
          }
          return Promise.reject(error);
        }
      );
    }
    return () => (mount = false);
  }, [logoutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
