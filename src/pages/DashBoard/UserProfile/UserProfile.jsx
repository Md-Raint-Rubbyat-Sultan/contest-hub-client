import { Avatar, Button, Label, TextInput } from "flowbite-react";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import UserStatus from "../../../components/Dashboard/UserProfile/UserStatus";

const UserProfile = () => {
  const { user, updateUserProfile, isLoading, setIsLoading } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  //   console.log(user);

  const handelUserProfileChange = async (userData) => {
    // console.log(userData);
    const profile = {
      displayName: userData?.name,
      photoURL: userData?.photo,
    };

    try {
      await updateUserProfile(profile);
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(() => false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-10">
      <div className="max-w-md mx-auto border-2 rounded-md p-4 space-y-6 shadow-lg flex-1">
        <Avatar img={user?.photoURL} rounded>
          <div className="space-y-1 font-medium dark:text-white">
            <div>{user?.displayName}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {user?.email}
            </div>
          </div>
        </Avatar>
        <form
          onSubmit={handleSubmit(handelUserProfileChange)}
          className="space-y-6"
        >
          <div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="name" value="Change Your Name" />
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder={user?.displayName}
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-red-600">This field is required*</span>
              )}
            </div>
          </div>
          <div>
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="photo" value="Change Your PhotoURL" />
              </div>
              <TextInput
                id="photo"
                type="text"
                placeholder={user?.photoURL}
                {...register("photo", { required: true })}
              />
              {errors.photo && (
                <span className="text-red-600">This field is required*</span>
              )}
            </div>
          </div>
          <Button type="submit" color="success" className="w-full">
            {isLoading ? <FaSpinner className="animate-spin" /> : "Change"}
          </Button>
        </form>
      </div>
      <div className="flex-1">
        <UserStatus />
      </div>
    </div>
  );
};

export default UserProfile;
