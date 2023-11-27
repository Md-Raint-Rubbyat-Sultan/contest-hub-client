import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useIsHost = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data: isHost } = useQuery({
    queryKey: ["user/host", user || "no user"],
    enabled: user === null ? false : true,
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/users/host/${user?.email}`);
      return data;
    },
    initialData: false,
  });
  return [isHost];
};

export default useIsHost;
