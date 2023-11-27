import { Button } from "flowbite-react";
import H2Prime from "../../../components/Utils/H2Prime";
import H3Prime from "../../../components/Utils/H3Prime";
import Pending from "../../../components/Dashboard/ManageContests/Pending";
import AllContests from "../../../components/Dashboard/ManageContests/AllContests";

const ManageContests = () => {
  return (
    <div className="space-y-16">
      <H2Prime custom={"text-center text-[#283618]"}>Add A New Contest</H2Prime>
      <div>
        <nav className="flex justify-center items-center gap-3 text-2xl font-semibold">
          <a href="#pending">
            <Button color="success">Pending</Button>
          </a>
          <a href="#contests">
            <Button color="success">Contests</Button>
          </a>
        </nav>
      </div>
      <div className="space-y-12" id="pending">
        <H3Prime custom={"text-center text-[#283618]"}>Pending Contest</H3Prime>
        <Pending />
      </div>
      <div className="space-y-12" id="contests">
        <H3Prime custom={"text-center text-[#283618]"}>
          Approved Contest
        </H3Prime>
        <AllContests />
      </div>
    </div>
  );
};

export default ManageContests;
