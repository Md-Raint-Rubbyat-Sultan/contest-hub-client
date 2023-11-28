import { Link, useParams } from "react-router-dom";
import MySpinner from "../../components/Shared/Spinner/MySpinner";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import HelmetTitle from "../../components/Shared/HelmetTitle/HelmetTitle";
import H2Prime from "../../components/Utils/H2Prime";
import Para from "../../components/Utils/Para";
import { Button } from "flowbite-react";
import Counter from "../../components/ContestDetail/Counter/Counter";
import useIsAdmin from "../../hooks/useIsAdmin";
import useIsHost from "../../hooks/useIsHost";

const ContestDetails = () => {
  const id = useParams();
  const axiosSecure = useAxiosSecure();
  const [isAdmin] = useIsAdmin();
  const [isHost] = useIsHost();

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
    _id,
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

  // console.log(winner);

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
          {winner?.name !== "none" && (
            <div className="py-4 flex items-center justify-start gap-3">
              <figure>
                <img
                  className="w-20 h-20 rounded-full"
                  src={winner?.img}
                  alt={winner?.name}
                />
              </figure>
              <div>
                <Para custom={"font-bold"}>{winner?.name}</Para>
                <Para custom={"text-[#DDA15E] font-bold"}>Winner</Para>
              </div>
            </div>
          )}
          <Para custom={"flex flex-wrap items-center gap-2"}>
            <span className="font-bold">Time Left:</span>
            <Counter date={date} />
          </Para>
          <Link className="inline-block mt-8" to={`/payment/${_id}`}>
            <Button
              color="success"
              disabled={
                winner?.name !== "none" || isAdmin || isHost ? true : false
              }
            >
              Registration
            </Button>
          </Link>
        </div>
        <figure className="md:flex-[3]">
          <img
            className="object-cover rounded-xl max-h-[600px] mx-auto"
            src={img || "https://i.ibb.co/jJf2wWF/user.png"}
            alt={name}
          />
        </figure>
      </div>
      <div className="space-y-3">
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
