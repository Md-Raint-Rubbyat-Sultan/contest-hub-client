import H2Prime from "../../../components/Utils/H2Prime";
import useAuth from "../../../hooks/useAuth";
import ConfirmedContests from "../../../components/Dashboard/MyContests/ConfiremdContests";
import H3Prime from "../../../components/Utils/H3Prime";

const MyContests = () => {
  const { user: hostName } = useAuth();

  return (
    <div className="space-y-24 mb-24">
      <H2Prime custom={"text-center text-[#283618]"}>
        Welcome {hostName?.displayName}!
      </H2Prime>
      <div>{/* pending contests */}</div>
      <div className="space-y-12">
        <H3Prime custom={"text-center text-[#283618]"}>
          Approved Contest
        </H3Prime>
        <ConfirmedContests />
      </div>
    </div>
  );
};

export default MyContests;
