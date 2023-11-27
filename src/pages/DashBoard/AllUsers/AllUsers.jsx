import { Button, Select, Table } from "flowbite-react";
import MySpinner from "../../../components/Shared/Spinner/MySpinner";
import H2Prime from "../../../components/Utils/H2Prime";
import useAuth from "../../../hooks/useAuth";
import useUsers from "../../../hooks/useUsers";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-hot-toast";

const AllUsers = () => {
  const [userRole, setUserRole] = useState(() => "");
  const [loading, setLoading] = useState(() => false);
  const { user: adminName } = useAuth();
  const [users, isPending, refetch] = useUsers();
  const axiosSecure = useAxiosSecure();

  if (isPending) return <MySpinner />;

  const handelUserRole = async (user) => {
    // console.log(user);
    setLoading(() => true);

    let role = userRole;
    if (role === "" || role === user?.role) {
      setLoading(() => false);
      return toast.error(`${user?.name} is already ${user?.role}`);
    }

    // console.log(role);

    try {
      await axiosSecure.patch(`/users/${user?._id}`, {
        role: role,
      });
      // console.log("success", data);
      toast.success(`${user?.name} is now ${role}`);
      refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(() => false);
    }
  };

  return (
    <div className="space-y-24 mb-24">
      <H2Prime custom={"text-center text-[#283618]"}>
        Welcome Admin {adminName?.displayName}!
      </H2Prime>
      {/* table */}
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>#</Table.HeadCell>
            <Table.HeadCell>User name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Role</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {users?.map((user, idx) => (
              <Table.Row
                key={user?._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{idx + 1}</Table.Cell>
                <Table.Cell>{user?.name}</Table.Cell>
                <Table.Cell>{user?.email}</Table.Cell>
                <Table.Cell>
                  <div className="max-w-xs">
                    <Select
                      defaultValue="default"
                      onChange={(e) => setUserRole(() => e.target.value)}
                      id="countries"
                      disabled={user?.role === "admin"}
                    >
                      <option value="default" disabled>
                        {user?.role}
                      </option>
                      <option value="gust">guest</option>
                      <option value="host">host</option>
                    </Select>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    disabled={user?.role === "admin"}
                    onClick={() => handelUserRole(user)}
                  >
                    {loading ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      "Set Role"
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

export default AllUsers;
