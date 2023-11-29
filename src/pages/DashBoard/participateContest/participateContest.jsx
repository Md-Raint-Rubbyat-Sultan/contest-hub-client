import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import MySpinner from "../../../components/Shared/Spinner/MySpinner";
import { Button, Table } from "flowbite-react";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-hot-toast";
import H2Prime from "../../../components/Utils/H2Prime";
import { ToggleSwitch } from "flowbite-react";

const ParticipateContest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [loading, setLoading] = useState(() => false);
  const [switch1, setSwitch1] = useState(() => false);

  const {
    data: userPaymentInfo,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["user-payment-info", user || "no user has", switch1],
    enabled: user === null ? false : true,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/user-payment-info/?email=${user?.email}&sort=${
          switch1 ? "des" : "acc"
        }`
      );
      return data;
    },
    initialData: [],
  });

  if (isPending) return <MySpinner />;
  //   console.log(userPaymentInfo);

  const today = new Date();

  const handelParticipation = async (id) => {
    setLoading(() => true);

    try {
      await axiosSecure.patch(`/user-payment-info/${id}?`, {});
      refetch();
      toast.success("You are in now!");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(() => false);
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <H2Prime custom={"text-center text-[#283618] mb-4"}>
          Welcome {user?.displayName}!
        </H2Prime>
        <div>
          <ToggleSwitch
            checked={switch1}
            label="Sort by Upcoming"
            onChange={() => {
              setSwitch1((prev) => !prev);
              refetch();
            }}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Contest name</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Deadline</Table.HeadCell>
            <Table.HeadCell>Prize</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {userPaymentInfo?.map((info) => (
              <Table.Row
                key={info?._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{info?.contestName}</Table.Cell>
                <Table.Cell>{info?.category}</Table.Cell>
                <Table.Cell>{info?.contestDate}</Table.Cell>
                <Table.Cell>$ {info?.prize}</Table.Cell>
                <Table.Cell>$ {info?.price}</Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={() => handelParticipation(info?._id)}
                    disabled={
                      today > new Date(info?.contestDate) || info?.participation
                    }
                  >
                    {loading ? (
                      <FaSpinner className="animate-spin" />
                    ) : info?.participation ? (
                      "You are in."
                    ) : (
                      "Participate"
                    )}
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default ParticipateContest;
