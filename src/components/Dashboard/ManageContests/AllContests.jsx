import { Button, Table } from "flowbite-react";
import { useState } from "react";
import useAllContests from "../../../hooks/useAllContests";
import { FaEdit, FaSpinner } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";

const AllContests = () => {
  const [loading, setLoading] = useState(() => false);
  const [contests, isPending, refetch] = useAllContests();
  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>Contest name</Table.HeadCell>
          <Table.HeadCell>Creator name</Table.HeadCell>
          <Table.HeadCell>status</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {contests?.map((contest) => (
            <Table.Row
              key={contest?._id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>{contest?.name}</Table.Cell>
              <Table.Cell>{contest?.host?.name}</Table.Cell>
              <Table.Cell>{contest?.approved}</Table.Cell>
              <Table.Cell>{contest?.category}</Table.Cell>
              <Table.Cell>$ {contest?.price}</Table.Cell>
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

export default AllContests;
