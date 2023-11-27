import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import useIsAdmin from "./useIsAdmin";

const useAllPendingContests = () => {
  const axiosSecure = useAxiosSecure();
  const [isAdmin] = useIsAdmin();
  const { user } = useAuth();
  const {
    data: allPendingContests,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["allPendingContests", user || "no user", isAdmin],
    enabled: user === null ? false : true && isAdmin,
    queryFn: async () => {
      const { data } = await axiosSecure.get("/pending");
      return data;
    },
  });

  return [allPendingContests, isPending, refetch];
};

export default useAllPendingContests;
