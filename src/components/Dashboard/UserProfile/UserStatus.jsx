import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import MySpinner from "../../Shared/Spinner/MySpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import H3Prime from "../../Utils/H3Prime";

const UserStatus = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userStats, isPending } = useQuery({
    queryKey: ["user-full-status", user || "no stats"],
    enabled: user === null ? false : true,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/user-full-status/?email=${user?.email}`
      );
      return data;
    },
  });

  if (isPending) return <MySpinner />;

  const win = userStats?.win.length;

  const register = userStats?.registered;

  const registered = register.length;

  const attempt = register.filter(
    (atmp) => atmp?.participation === true
  ).length;

  const data = [
    {
      name: "Registered",
      uv: 3000,
      pv: 1398,
      stat: registered,
    },
    {
      name: "Attempt",
      uv: 2000,
      pv: 9800,
      stat: attempt,
    },
    {
      name: "Win",
      uv: 4000,
      pv: 2400,
      stat: win,
    },
  ];

  //   console.log(win, attempt, registered);

  return (
    <div className="overflow-auto">
      <H3Prime custom={"text-[#283618] mb-4"}>
        Total Win: {(win / attempt) * 100}%
      </H3Prime>
      <div>
        <ResponsiveContainer width={320} height={400}>
          <BarChart
            width={150}
            height={40}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis dataKey="stat" />
            <Tooltip />
            <Legend />
            <Bar dataKey="stat" fill="#283618" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserStatus;
