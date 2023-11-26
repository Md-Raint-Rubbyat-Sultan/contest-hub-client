import { useParams } from "react-router-dom";
import MySpinner from "../../components/Shared/Spinner/MySpinner";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import HelmetTitle from "../../components/Shared/HelmetTitle/HelmetTitle";

const ContestDetails = () => {
  const id = useParams();
  const axiosSecure = useAxiosSecure();

  const { isPending, data: contest } = useQuery({
    queryKey: ["single-contest"],
    queryFn: () =>
      axiosSecure
        .get(`/single-contest/${id?.id}`, {
          headers: { "content-type": "application/json" },
        })
        .then((res) => res.data),
  });

  if (isPending) return <MySpinner />;

  console.log(contest, id);

  return (
    <div>
      <HelmetTitle title="Contest Hub | Details" />
      <div>
        <div></div>
        <figure></figure>
      </div>
      <div></div>
    </div>
  );
};

export default ContestDetails;
