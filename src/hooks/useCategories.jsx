import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCategories = () => {
  const axiosPublic = useAxiosPublic();
  const { data: category, isPending } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/categories");
      return data;
    },
    initialData: [],
  });
  return [category, isPending];
};

export default useCategories;
