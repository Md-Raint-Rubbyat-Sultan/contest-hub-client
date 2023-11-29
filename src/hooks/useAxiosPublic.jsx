import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://contest-hub-server-six.vercel.app/api/v1",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
