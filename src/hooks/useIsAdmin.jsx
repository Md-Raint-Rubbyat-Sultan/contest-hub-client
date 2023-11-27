import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useIsAdmin = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data: isAdmin } = useQuery({
    queryKey: ["user/admin", user || "no user"],
    enabled: user === null ? false : true,
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/users/admin/${user?.email}`);
      return data;
    },
    initialData: false,
  });
  return [isAdmin];
};

export default useIsAdmin;
