import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePopularContests = () => {
  const axiosPublic = useAxiosPublic();

  const { data: popular, isPending } = useQuery({
    queryKey: ["popular-contests"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/popular-contests");
      return data;
    },
  });
  return [popular, isPending];
};

export default usePopularContests;
