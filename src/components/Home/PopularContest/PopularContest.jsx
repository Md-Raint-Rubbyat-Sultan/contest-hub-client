import usePopularContests from "../../../hooks/usePopularContests";
import MySpinner from "../../Shared/Spinner/MySpinner";
import H1Prime from "../../Utils/H1Prime";
import PopularCards from "./PopularCards";

const PopularContest = () => {
  const [popular, isPending] = usePopularContests();

  if (isPending) return <MySpinner />;
  console.log(popular);

  return (
    <div className="space-y-10">
      <H1Prime custom={"text-[#283618] text-center"}>
        Most Hyped Contests
      </H1Prime>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 place-items-center">
        {popular?.map((item) => (
          <PopularCards key={item?._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default PopularContest;
