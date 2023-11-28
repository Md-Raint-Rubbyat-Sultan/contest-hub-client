import { Button } from "flowbite-react";
import PropTypes from "prop-types";
import H4Prime from "../../Utils/H4Prime";
import Para from "../../Utils/Para";
import MutedPara from "../../Utils/MutedPara";
import { Link } from "react-router-dom";

const ContestCards = ({ contest }) => {
  const { _id, name, img, participation_count, contest_description } = contest;
  return (
    <div className="border-2 border-gray-200 rounded-md overflow-hidden flex flex-col shadow-lg">
      <figure>
        <img className="w-full h-[400px]" src={img} alt={name} />
      </figure>
      <div className="p-3 h-full flex flex-col gap-3">
        <div className="flex-grow">
          <H4Prime custom={"text-[#283618]"}>{name}</H4Prime>
          <Para>participators: {participation_count}</Para>
          <MutedPara>{contest_description.slice(0, 150)}...</MutedPara>
        </div>
        <div className="">
          <Link to={`/contests-details/${_id}`} className="block w-full">
            <Button className="w-full" color="success">
              Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

ContestCards.propTypes = {
  contest: PropTypes.object.isRequired,
};

export default ContestCards;
