import { Link, useParams } from "react-router-dom";
import MySpinner from "../../components/Shared/Spinner/MySpinner";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import HelmetTitle from "../../components/Shared/HelmetTitle/HelmetTitle";
import H2Prime from "../../components/Utils/H2Prime";
import Para from "../../components/Utils/Para";
import { Button } from "flowbite-react";
import Counter from "../../components/ContestDetail/Counter/Counter";

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
    initialData: {},
  });

  if (isPending) return <MySpinner />;

  const {
    name,
    contest_description,
    details,
    task,
    date,
    img,
    winner,
    price,
    prize,
    participation_count,
    category,
  } = contest;

  console.log(winner);

  return (
    <div className="space-y-24 mb-24">
      <HelmetTitle title="Contest Hub | Details" />
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="md:flex-[2]">
          <H2Prime custom={"text-[#283618]"}>{name}</H2Prime>
          <Para>
            <span className="font-bold">Type:</span> {category}
          </Para>
          <Para>
            <span className="font-bold">Prize:</span> ${prize}
          </Para>
          <Para>
            <span className="font-bold">Price:</span> ${price}
          </Para>
          <Para>
            <span className="font-bold">Participants:</span>{" "}
            {participation_count}
          </Para>
          <Para custom={"flex items-center gap-2"}>
            <span className="font-bold">Time Left:</span>
            <Counter date={date} />
          </Para>
          <Link className="inline-block mt-8">
            <Button color="success" disabled={winner?.name !== "none"}>
              Registration
            </Button>
          </Link>
        </div>
        <figure className="md:flex-[3]">
          <img
            className="object-cover rounded-xl max-h-[600px] mx-auto"
            src={img}
            alt={name}
          />
        </figure>
      </div>
      <div>
        <Para>
          <span className="font-bold">Task:</span> {task}
        </Para>
        <Para>
          <span className="font-bold">Description:</span> {contest_description}
        </Para>
        <Para>
          <span className="font-bold">Details:</span> {details}
        </Para>
      </div>
    </div>
  );
};

export default ContestDetails;
