import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import MySpinner from "../../Shared/Spinner/MySpinner";
import { Table } from "flowbite-react";
import H2Prime from "../../Utils/H2Prime";

const WinContest = () => {
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

  const win = userStats?.win;

  const register = userStats?.registered;

  //   console.log(win, register);

  return (
    <div className="space-y-12">
      <div>
        <H2Prime custom={"text-center text-[#283618] py-6"}>
          Win {win?.length}
        </H2Prime>
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell>Contest name</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Prize</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {win?.map((_win) => (
                <Table.Row
                  key={_win?._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>{_win?.contestName}</Table.Cell>
                  <Table.Cell>{_win?.category}</Table.Cell>
                  <Table.Cell>$ {_win?.prize}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
      <div>
        <H2Prime custom={"text-center text-[#283618] py-6"}>
          Register {register?.length}
        </H2Prime>
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell>Contest name</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Prize</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Payment ID</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {register?.map((reg) => (
                <Table.Row
                  key={reg?._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <Table.Cell>{reg?.contestName}</Table.Cell>
                  <Table.Cell>{reg?.category}</Table.Cell>
                  <Table.Cell>$ {reg?.prize}</Table.Cell>
                  <Table.Cell>$ {reg?.price}</Table.Cell>
                  <Table.Cell>
                    $ {reg?.participation ? "Participate" : "Not Attend"}
                  </Table.Cell>
                  <Table.Cell>{reg?.transactionId}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default WinContest;
