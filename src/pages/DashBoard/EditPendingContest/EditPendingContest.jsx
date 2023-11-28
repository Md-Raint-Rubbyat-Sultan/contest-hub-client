import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, Label, Select, TextInput, Textarea } from "flowbite-react";
import H2Prime from "../../../components/Utils/H2Prime";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import MySpinner from "../../../components/Shared/Spinner/MySpinner";
import H3Prime from "../../../components/Utils/H3Prime";

const EditPendingContest = () => {
  const id = useParams();
  const [loading, setLoading] = useState(() => false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isPending, data: contest } = useQuery({
    queryKey: ["single-pending-contest"],
    queryFn: () =>
      axiosSecure
        .get(`/single-pending-contest/${id?.id}`, {
          headers: { "content-type": "application/json" },
        })
        .then((res) => res.data),
    initialData: {},
  });

  if (isPending) return <MySpinner />;

  const {
    _id,
    name,
    contest_description,
    details,
    task,
    date,
    img,
    price,
    prize,
    category,
  } = contest;

  //   console.log(contest);

  const handelContestUpdate = async (contestData) => {
    setLoading(() => true);
    const price = parseFloat(contestData.price);
    const prize = parseFloat(contestData.prize);

    if (typeof price !== "number" || isNaN(price)) {
      setLoading(() => false);
      return toast.error("Price must be a number!");
    }

    if (typeof prize !== "number" || isNaN(prize)) {
      setLoading(() => false);
      return toast.error("Price must be a number!");
    }

    const participation_count = 0;
    const winner = {
      name: "none",
      img: " ",
      email: " ",
    };

    const host = {
      name: user?.displayName,
      email: user?.email,
      img: user?.photoURL,
      role: "host",
    };

    const approved = "pending";

    const contestInfo = {
      ...contestData,
      img: img,
      price,
      prize,
      participation_count,
      winner,
      host,
      approved,
    };

    console.log(contestInfo);

    try {
      //   updating data
      const { data } = await axiosSecure.put(`/pending/${_id}`, {
        contestInfo,
      });

      console.log(data);

      toast.success(`${contestData.name} is updated!`);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(() => false);
    }
  };

  return (
    <div className="space-y-6 my-6">
      <H2Prime custom={"text-center text-[#283618]"}>Edit Contest</H2Prime>
      <H3Prime custom={"text-center text-[#283618]"}>
        You must update one field. Can not change image!
      </H3Prime>
      <div className="border-2 border-[#283618] w-3/4 mx-auto p-8 rounded-xl shadow-lg">
        <form
          onSubmit={handleSubmit(handelContestUpdate)}
          className="flex w-full mx-auto flex-col gap-4"
        >
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="name" value="Contest Name" />
              </div>
              <TextInput
                id="name"
                type="text"
                defaultValue={name}
                placeholder="Contest"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="categories" value="Category" />
              </div>
              <Select
                defaultValue={category}
                id="categories"
                {...register("category", { required: true })}
              >
                <option value="Article">Article</option>
                <option value="Medical Contest">Medical Contest</option>
                <option value="Business Contest">Business Contest</option>
                <option value="Games">Games</option>
              </Select>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="price" value="Price" />
              </div>
              <TextInput
                id="price"
                type="text"
                defaultValue={price}
                placeholder="$$$"
                {...register("price", { required: true })}
              />
              {errors.price && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="prize" value="Prize" />
              </div>
              <TextInput
                id="prize"
                type="text"
                defaultValue={prize}
                placeholder="$$$"
                {...register("prize", { required: true })}
              />
              {errors.prize && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
          </div>
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="date" value="Date" />
            </div>
            <input
              className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg"
              type="date"
              defaultValue={date}
              id="date"
              min={new Date().toISOString().split("T")[0]}
              {...register("date", { required: true })}
            />
            {errors.date && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="task" value="Task" />
            </div>
            <Textarea
              id="task"
              defaultValue={task}
              placeholder=""
              rows={4}
              {...register("task", { required: true })}
            />
            {errors.task && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="details" value="Your details" />
            </div>
            <Textarea
              id="details"
              defaultValue={details}
              placeholder=""
              {...register("details", { required: true })}
              rows={4}
            />
            {errors.details && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="description" value="Your description" />
            </div>
            <Textarea
              id="description"
              defaultValue={contest_description}
              placeholder=""
              {...register("contest_description", { required: true })}
              rows={4}
            />
            {errors.contest_description && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <Button type="submit" color="success">
            {loading ? <FaSpinner className="animate-spin" /> : "Update"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditPendingContest;
