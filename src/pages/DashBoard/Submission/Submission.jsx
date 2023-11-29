import { useNavigate, useParams } from "react-router-dom";
import H3Prime from "../../../components/Utils/H3Prime";
import { Button, Table } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import MySpinner from "../../../components/Shared/Spinner/MySpinner";
import { toast } from "react-hot-toast";

const Submission = () => {
  const id = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: paymentInfos, isPending } = useQuery({
    queryKey: ["single-payment-info-by-id", id?.id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/single-payment-info-by-id/${id?.id}`
      );
      return data;
    },
    initialData: [],
  });

  if (isPending) return <MySpinner />;
  // console.log(paymentInfos, id);
  const today = new Date();

  const handelWinner = async (info) => {
    // console.log(info);
    // userImg=== null ?  : userImg

    try {
      await axiosSecure.patch(`/make-winner/${info?.contestId}`, {
        winnerName: info?.userName,
        winnerEmail: info?.userEmail,
        winnerImg:
          info?.userImg === null
            ? "https://i.ibb.co/jJf2wWF/user.png"
            : info?.userImg,
      });
      //   console.log(data);
      toast?.success("Winner has been selected!");
      navigate("/dashboard/my-contest");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-10">
      <H3Prime custom={"text-center text-[#283618]"}>Choose Winner</H3Prime>
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Contest name</Table.HeadCell>
            <Table.HeadCell>Participator</Table.HeadCell>
            <Table.HeadCell>email</Table.HeadCell>
            <Table.HeadCell>task</Table.HeadCell>
            <Table.HeadCell>Make Winner</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {paymentInfos?.map((info) => (
              <Table.Row
                key={info?._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{info?.contestName}</Table.Cell>
                <Table.Cell>{info?.userName}</Table.Cell>
                <Table.Cell>{info?.userEmail}</Table.Cell>
                <Table.Cell>{info?.task}</Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={() => handelWinner(info)}
                    disabled={new Date(info?.contestDate) > today}
                  >
                    Make Winner
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

export default Submission;
