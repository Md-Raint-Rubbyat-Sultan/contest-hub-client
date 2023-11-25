import usePopularContests from "../../hooks/usePopularContests";
import MySpinner from "../Shared/Spinner/MySpinner";

const Advertises = () => {
  const [popular, isPending] = usePopularContests();
  if (isPending) return <MySpinner />;

  const winners = popular?.filter((winner) => winner?.winner?.name !== "none");
  console.log(winners);

  return (
    <div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Advertises;
