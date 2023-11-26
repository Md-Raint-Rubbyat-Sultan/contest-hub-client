import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import Para from "../../Utils/Para";

const Counter = ({ date }) => {
  const calculateTimeLeft = useCallback(() => {
    const remainingTime = new Date(date) - new Date();
    return remainingTime > 0 ? remainingTime : 0;
  }, [date]);

  const [timeRemain, setTimeLeft] = useState(() => calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeRemain, calculateTimeLeft]);

  return (
    <div className="flex justify-start items-center gap-2 w-fit bg-[#283618] text-[#FEFAE0] font-semibold px-4 py-2 rounded-xl">
      <Para>{Math.ceil(timeRemain / (1000 * 60 * 60 * 24))} days</Para>
      <Para>
        {Math.ceil((timeRemain % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}{" "}
        hours
      </Para>
      <Para>
        {Math.ceil((timeRemain % (1000 * 60 * 60)) / (1000 * 60))} minutes
      </Para>
      <Para>{Math.ceil((timeRemain % (1000 * 60)) / 1000)} seconds</Para>
    </div>
  );
};

Counter.propTypes = {
  date: PropTypes.string,
};

export default Counter;
