import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useContestByCategory = (category) => {
  const axiosPublic = useAxiosPublic();

  const { data: categoryData, isLoading } = useQuery({
    queryKey: ["contestByCategory", category],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/contests-by-category/?category=${category}`
      );
      return data;
    },
  });
  return [categoryData, isLoading];
};

export default useContestByCategory;
