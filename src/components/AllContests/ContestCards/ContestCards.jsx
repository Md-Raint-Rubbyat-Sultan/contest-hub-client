import { Button, Card } from "flowbite-react";
import PropTypes from "prop-types";
import H4Prime from "../../Utils/H4Prime";
import Para from "../../Utils/Para";
import MutedPara from "../../Utils/MutedPara";
import { Link } from "react-router-dom";

const ContestCards = ({ contest }) => {
  const { _id, name, img, participation_count, contest_description } = contest;
  return (
    <Card className="w-full" imgAlt={name} imgSrc={img}>
      <H4Prime custom={"text-[#283618]"}>{name}</H4Prime>
      <Para>participators: {participation_count}</Para>
      <MutedPara>{contest_description.slice(0, 150)}...</MutedPara>
      <Link to={`/contests-details/${_id}`} className="block w-full">
        <Button className="w-full" color="success">
          Details
        </Button>
      </Link>
    </Card>
  );
};

ContestCards.propTypes = {
  contest: PropTypes.object.isRequired,
};

export default ContestCards;
