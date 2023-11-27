import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useIsAdmin from "./useIsAdmin";

const useUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [isAdmin] = useIsAdmin();

  const {
    data: users,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["users", isAdmin],
    enabled: isAdmin,
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users");
      return data;
    },
  });
  return [users, isPending, refetch];
};

export default useUsers;
