import { Link, useNavigate, useSearchParams } from "react-router-dom";
import HelmetTitle from "../../components/Shared/HelmetTitle/HelmetTitle";
import useCategories from "../../hooks/useCategories";
import { useState } from "react";
import qs from "query-string";
import MySpinner from "../../components/Shared/Spinner/MySpinner";
import useContestByCategory from "../../hooks/useContestByCategory";
import ContestCards from "../../components/AllContests/ContestCards/ContestCards";
import H3Prime from "../../components/Utils/H3Prime";

const AllContest = () => {
  const [currentPage, setCurrentPage] = useState(() => 0);
  const [params] = useSearchParams();
  const [pathName, setPathName] = useState(() => params.get("category"));
  const [categories, isPending] = useCategories();
  const [categoryData, isLoading] = useContestByCategory(pathName);
  const navigate = useNavigate();

  if (isPending || isLoading) return <MySpinner />;

  const { data: contests, count } = categoryData;

  //   pagination handling
  const itemsPrePage = Math.ceil(count / 10);

  const totalPages = [...Array(itemsPrePage).keys()];

  // console.log(contests);
  // console.log(totalPages);

  //   tabs handling
  const handelTabs = (queryParam) => {
    let pathName = {};
    if (params) {
      pathName = qs.parse(params);
    }
    const newPath = { ...pathName, category: queryParam };
    const url = qs.stringify(newPath);
    navigate(`/all-contests/?${url}`);
    setPathName(() => queryParam);
  };

  return (
    <div className="space-y-24 mb-24">
      <HelmetTitle title="Contest Hub | Contests" />
      {/* tab section */}
      <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12">
        {categories?.map((item, idx) => (
          <Link key={idx} className="block">
            <p
              onClick={() => handelTabs(item)}
              className={`${
                params.get("category") === item
                  ? "text-[#DDA15E] border-b-4 border-[#DDA15E] pb-2"
                  : ""
              } text-2xl font-bold cursor-pointer uppercase`}
            >
              {item}
            </p>
          </Link>
        ))}
      </div>
      {/* contests card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 lg:gap-8 xl:gap-10">
        {contests.length > 0 ? (
          contests?.map((contest) => (
            <ContestCards key={contest?._id} contest={contest} />
          ))
        ) : (
          <H3Prime custom={"font-medium text-center text-[#283618] h-screen"}>
            No Food Found!
          </H3Prime>
        )}
      </div>
      {/* pagination per tab */}
      <div className="flex justify-center items-center flex-wrap gap-5">
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 border-2 border-gray-300 rounded-lg text-lg font-semibold hover:text-[#FEFAE0] hover:bg-[#283618] cursor-pointer"
          disabled={currentPage === 0 ? true : false}
        >
          Previous
        </button>
        {totalPages.map((totalPage) => (
          <button
            onClick={() => setCurrentPage(() => totalPage)}
            className={`px-4 py-2 border-2 border-gray-300 ${
              currentPage === totalPage ? "bg-[#283618] text-[#FEFAE0]" : ""
            } rounded-lg text-lg font-semibold cursor-pointer`}
            key={totalPage}
          >
            {totalPage + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((next) => next + 1)}
          className="px-4 py-2 border-2 border-gray-300 rounded-lg text-lg font-semibold hover:text-[#FEFAE0] hover:bg-[#283618] cursor-pointer"
          disabled={currentPage === totalPages.length - 1 ? true : false}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllContest;
