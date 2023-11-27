import { Button, Table } from "flowbite-react";
import useHostConfirmed from "../../../hooks/useHostConfirmed";
import MySpinner from "../../Shared/Spinner/MySpinner";

const ConfirmedContests = () => {
  const [confirmedContestFoHost, isPending] = useHostConfirmed();

  if (isPending) return <MySpinner />;

  //   console.log(confirmedContestFoHost);
  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>#</Table.HeadCell>
          <Table.HeadCell>Contest name</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>winner</Table.HeadCell>
          <Table.HeadCell>Category</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {confirmedContestFoHost?.map((contest, idx) => (
            <Table.Row
              key={contest?._id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>{idx + 1}</Table.Cell>
              <Table.Cell>{contest?.name}</Table.Cell>
              <Table.Cell>{contest?.approved}</Table.Cell>
              <Table.Cell>{contest?.winner?.name}</Table.Cell>
              <Table.Cell>{contest?.category}</Table.Cell>
              <Table.Cell>$ {contest?.price}</Table.Cell>
              <Table.Cell>
                <Button>See Submission</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ConfirmedContests;
