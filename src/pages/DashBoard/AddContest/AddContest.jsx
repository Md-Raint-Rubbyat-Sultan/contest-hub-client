import { useForm } from "react-hook-form";
import {
  Button,
  FileInput,
  Label,
  Select,
  TextInput,
  Textarea,
} from "flowbite-react";
import H2Prime from "../../../components/Utils/H2Prime";
import useCategories from "../../../hooks/useCategories";
import useAuth from "../../../hooks/useAuth";
import MySpinner from "../../../components/Shared/Spinner/MySpinner";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-hot-toast";
import axios from "axios";

const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const AddContest = () => {
  const [loading, setLoading] = useState(() => false);
  const { user } = useAuth();
  const [category, isPending] = useCategories();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handelContestSubmit = async (contestData) => {
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
      price,
      prize,
      participation_count,
      winner,
      host,
      approved,
    };

    const image = { image: contestData.img[0] };

    try {
      const { data: imageURL } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imageHostingKey}`,
        image,
        {
          headers: { "content-type": "multipart/form-data" },
        }
      );
      reset();
      console.log(imageURL.data.display_url);
      console.log({ ...contestInfo, img: imageURL.data.display_url });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(() => false);
    }
  };

  if (isPending) return <MySpinner />;

  return (
    <div className="space-y-6 my-6">
      <H2Prime custom={"text-center text-[#283618]"}>Add A New Contest</H2Prime>
      <div className="border-2 border-[#283618] w-3/4 mx-auto p-8 rounded-xl shadow-lg">
        <form
          onSubmit={handleSubmit(handelContestSubmit)}
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
                defaultValue={category[0]}
                id="categories"
                {...register("category")}
              >
                {category?.map((cate, idx) => (
                  <option key={idx} value={cate}>
                    {cate}
                  </option>
                ))}
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
                placeholder="$$$"
                {...register("prize", { required: true })}
              />
              {errors.prize && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <div className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="date" value="Date" />
              </div>
              <input
                className="w-full bg-gray-50 border-2 border-gray-200 rounded-lg"
                type="date"
                id="date"
                min={new Date().toISOString().split("T")[0]}
                {...register("date", { required: true })}
              />
              {errors.date && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
            <div id="fileUpload" className="w-full">
              <div className="mb-2 block">
                <Label htmlFor="image" value="Upload image" />
              </div>
              <FileInput
                id="image"
                accept="image/*"
                {...register("img", { required: true })}
              />
              {errors.img && (
                <span className="text-red-600">This field is required</span>
              )}
            </div>
          </div>
          <div className="w-full">
            <div className="mb-2 block">
              <Label htmlFor="task" value="Task" />
            </div>
            <Textarea
              id="task"
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
              placeholder=""
              {...register("contest_description", { required: true })}
              rows={4}
            />
            {errors.contest_description && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>
          <Button type="submit" color="success">
            {loading ? <FaSpinner className="animate-spin" /> : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddContest;
