import H2Prime from "../../../components/Utils/H2Prime";
import useAuth from "../../../hooks/useAuth";
import ConfirmedContests from "../../../components/Dashboard/MyContests/ConfiremdContests";
import H3Prime from "../../../components/Utils/H3Prime";
import PendingContests from "../../../components/Dashboard/MyContests/PendingContests";
import { Button } from "flowbite-react";

const MyContests = () => {
  const { user: hostName } = useAuth();

  return (
    <div className="space-y-16 mb-24">
      <H2Prime custom={"text-center text-[#283618]"}>
        Welcome {hostName?.displayName}!
      </H2Prime>
      <div>
        <nav className="flex justify-center items-center gap-3 text-2xl font-semibold">
          <a href="#pending">
            <Button color="success">Pending</Button>
          </a>
          <a href="#confirmed">
            <Button color="success">Confirmed</Button>
          </a>
        </nav>
      </div>
      <div className="space-y-12" id="pending">
        <H3Prime custom={"text-center text-[#283618]"}>Pending Contest</H3Prime>
        <PendingContests />
      </div>
      <div className="space-y-12" id="confirmed">
        <H3Prime custom={"text-center text-[#283618]"}>
          Approved Contest
        </H3Prime>
        <ConfirmedContests />
      </div>
    </div>
  );
};

export default MyContests;
