import { Button, Table } from "flowbite-react";
import { useState } from "react";
import useAllContests from "../../../hooks/useAllContests";
import { FaSpinner } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import MySpinner from "../../Shared/Spinner/MySpinner";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllContests = () => {
  const [loading, setLoading] = useState(() => false);
  const [contests, isPending, refetch] = useAllContests();
  const axiosSecure = useAxiosSecure();

  if (isPending) return <MySpinner />;

  const handelDeleteContest = (id) => {
    setLoading(() => true);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#283618",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/contests/${id}`);
          refetch();
          Swal.fire({
            position: "center",
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(() => false);
        }
      }
    });
  };

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
                  <Button
                    onClick={() => handelDeleteContest(contest?._id)}
                    color="failure"
                  >
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
