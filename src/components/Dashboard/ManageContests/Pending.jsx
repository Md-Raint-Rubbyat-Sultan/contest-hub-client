import { Button, Table } from "flowbite-react";
import { useState } from "react";
import usePendingContests from "../../../hooks/usePendingContests";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import MySpinner from "../../Shared/Spinner/MySpinner";
import { FaCheckSquare, FaSpinner } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import useAllPendingContests from "../../../hooks/useAllPendingContests";

const Pending = () => {
  const [loading, setLoading] = useState(() => false);
  const [allPendingContests, isPending, refetch] = useAllPendingContests();
  const axiosSecure = useAxiosSecure();

  if (isPending) return <MySpinner />;

  //   console.log(allPendingContests);

  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>Contest name</Table.HeadCell>
          <Table.HeadCell>Creator name</Table.HeadCell>
          <Table.HeadCell>status</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Approve</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {allPendingContests?.map((pending) => (
            <Table.Row
              key={pending?._id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>{pending?.name}</Table.Cell>
              <Table.Cell>{pending?.host?.name}</Table.Cell>
              <Table.Cell>{pending?.approved}</Table.Cell>
              <Table.Cell>{pending?.category}</Table.Cell>
              <Table.Cell>$ {pending?.price}</Table.Cell>
              <Table.Cell>
                <Button color="warning">
                  <FaCheckSquare />
                </Button>
              </Table.Cell>
              <Table.Cell>
                {loading ? (
                  <Button color="failure">
                    <FaSpinner className="animate-spin" />
                  </Button>
                ) : (
                  <Button color="failure">
                    <FaTrashCan />
                  </Button>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Pending;
