import PropTypes from "prop-types";
import { Button, Card } from "flowbite-react";
import Para from "../../Utils/Para";
import H4Prime from "../../Utils/H4Prime";
import MutedPara from "../../Utils/MutedPara";

const PopularCards = ({ item }) => {
  const { name, img, participation_count, contest_description } = item;
  return (
    <Card className="w-full h-full" imgSrc={img} horizontal>
      <H4Prime custom={"text-[#283618]"}>{name}</H4Prime>
      <Para>participators: {participation_count}</Para>
      <MutedPara>{contest_description.slice(0, 150)}...</MutedPara>
      <Button color="success">Details</Button>
    </Card>
  );
};

PopularCards.propTypes = {
  item: PropTypes.object.isRequired,
};

export default PopularCards;
