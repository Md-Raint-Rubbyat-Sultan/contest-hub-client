import usePopularContests from "../../../hooks/usePopularContests";
import MySpinner from "../../Shared/Spinner/MySpinner";
import H3Prime from "../../Utils/H3Prime";
import Para from "../../Utils/Para";

const Advertises = () => {
  const [popular, isPending] = usePopularContests();
  if (isPending) return <MySpinner />;

  const winners = popular?.filter((winner) => winner?.winner?.name !== "none");
  // console.log(winners);

  return (
    <div className="flex items-center">
      <div className="flex-1">
        <H3Prime custom={"text-[#283618]"}>Winners Zone!</H3Prime>
        <div>
          {winners.map((winner) => (
            <div
              key={winner?._id}
              className="flex items-center gap-2 border-b-2 border-[#DDA15E] w-fit"
            >
              <Para>Winner: {winner?.winner?.name}</Para>
              <span>|</span>
              <Para>Prize: ${winner?.prize}</Para>
              <span>|</span>
              <Para>Contest: ${winner?.name}</Para>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1">
        <img
          className=""
          src="https://images.unsplash.com/photo-1514820720301-4c4790309f46?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="winner"
        />
      </div>
    </div>
  );
};

export default Advertises;
