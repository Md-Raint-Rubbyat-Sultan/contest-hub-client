import { Button, Table } from "flowbite-react";
import { FaEdit, FaSpinner } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import usePendingContests from "../../../hooks/usePendingContests";
import MySpinner from "../../Shared/Spinner/MySpinner";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
const PendingContests = () => {
  const [loading, setLoading] = useState(() => false);
  const [pendingContests, isPending, refetch] = usePendingContests();
  const axiosSecure = useAxiosSecure();

  if (isPending) return <MySpinner />;

  //   console.log(pendingContests);

  const handelDelete = (id) => {
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
          await axiosSecure.delete(`/contest/host/delete-pending/${id}`);
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
          <Table.HeadCell>status</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Update</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {pendingContests?.map((pending) => (
            <Table.Row
              key={pending?._id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>{pending?.name}</Table.Cell>
              <Table.Cell>{pending?.approved}</Table.Cell>
              <Table.Cell>{pending?.category}</Table.Cell>
              <Table.Cell>$ {pending?.price}</Table.Cell>
              <Table.Cell>
                <Button color="warning">
                  <FaEdit />
                </Button>
              </Table.Cell>
              <Table.Cell>
                {loading ? (
                  <Button color="failure">
                    <FaSpinner className="animate-spin" />
                  </Button>
                ) : (
                  <Button
                    onClick={() => handelDelete(pending?._id)}
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

export default PendingContests;
