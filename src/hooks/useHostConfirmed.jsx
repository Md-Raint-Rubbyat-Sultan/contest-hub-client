import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useIsHost from "./useIsHost";
import useAxiosSecure from "./useAxiosSecure";

const useHostConfirmed = () => {
  const { user } = useAuth();
  const [isHost] = useIsHost();
  const axiosSecure = useAxiosSecure();
  const { data: confirmedContestFoHost, isPending } = useQuery({
    queryKey: ["confirmed-contest-by-host", user || "no user", isHost],
    enabled: user === null ? false : true && isHost,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/contest/host/confirmed/?email=${user?.email}`
      );
      return data;
    },
    initialData: [],
  });
  return [confirmedContestFoHost, isPending];
};

export default useHostConfirmed;
