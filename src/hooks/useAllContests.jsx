import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllContests = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: contests,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/contests");
      return data;
    },
  });
  return [contests, isPending, refetch];
};

export default useAllContests;
