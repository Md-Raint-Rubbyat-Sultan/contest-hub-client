import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useIsHost from "./useIsHost";
import useAxiosSecure from "./useAxiosSecure";

const usePendingContests = () => {
  const { user } = useAuth();
  const [isHost] = useIsHost();
  const axiosSecure = useAxiosSecure();
  const {
    data: pendingContests,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["pending-contest-by-host", user || "no user", isHost],
    enabled: user === null ? false : true && isHost,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/contest/host/pending/?email=${user?.email}`
      );
      return data;
    },
    initialData: [],
  });
  return [pendingContests, isPending, refetch];
};

export default usePendingContests;
