import { Button, Label, TextInput } from "flowbite-react";
import H1Prime from "../../components/Utils/H1Prime";
import Para from "../../components/Utils/Para";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import HelmetTitle from "../../components/Shared/HelmetTitle/HelmetTitle";

const Register = () => {
  const { createUser, updateUserProfile, setIsLoading, loginWithGoogle } =
    useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const [process, setProcess] = useState(() => false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitRegister = async (data) => {
    const name = data.name;
    const photo = data.photo;
    const email = data.email;
    const password = data.password;
    // console.log(name, photo, email, password);

    const profile = {
      displayName: name,
      photoURL: photo,
    };

    try {
      setProcess(() => true);
      const { user } = await createUser(email, password);
      if (user) {
        await updateUserProfile(profile);
        await axiosPublic.post("/users", {
          name,
          email,
          img: photo,
          role: "guest",
        });
        // console.log(userInfo);
        const { data } = await axiosSecure.post("/jwt", {
          email,
        });
        if (data) {
          reset();
          navigate(location?.state || "/", { replace: true });
          setProcess(() => false);
          toast.success("Registered!");
        }
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  //   google login
  const handelGoogleLogin = async () => {
    try {
      const { user } = await loginWithGoogle();
      if (user) {
        await axiosPublic.post("/users", {
          name: user.displayName,
          email: user.email,
          img: user.photoURL,
          role: "guest",
        });
        // console.log(userInfo);
        const { data } = await axiosSecure.post("/jwt", {
          email: user?.email,
        });
        if (data) {
          navigate(location?.state || "/", { replace: true });
          toast.success("Logged In!");
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col-reverse lg:flex-row justify-center items-center p-4 md:p-16 lg:p-32"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1681426482543-961331797352?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <HelmetTitle title="Contest Hub | Register" />
      <div className="flex-1 w-full hidden lg:block">
        <figure>
          <img
            className="w-full h-[802px] rounded-s-lg rounded-e-none"
            src="https://images.unsplash.com/photo-1506143925201-0252c51780b0?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        </figure>
      </div>
      <div className="w-4/5 lg:w-full bg-white border-2 border-[#606C38] p-4 md:p-8 lg:p-16 space-y-8 rounded-lg lg:rounded-e-lg lg:rounded-s-none flex-1">
        <H1Prime custom={"text-center"}>Register!</H1Prime>
        <form
          onSubmit={handleSubmit(submitRegister)}
          className="flex w-full flex-col gap-4"
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value="Your name" />
            </div>
            <TextInput
              id="name"
              type="text"
              placeholder="Name"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-600">This field is required*</span>
            )}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="photo" value="Photo URL" />
            </div>
            <TextInput
              id="photo"
              type="text"
              placeholder="Photo URL"
              {...register("photo")}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="name@flowbite.com"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-600">This field is required*</span>
            )}
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              placeholder="******"
              {...register("password", {
                required: true,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,32}$/i,
              })}
            />
            {errors.password && (
              <span className="text-red-600">
                *Password must contain number, A-Z, a-z ,and !@#$&
              </span>
            )}
          </div>
          <Button type="submit" color="success">
            {process ? (
              <span className="animate-spin">
                <ImSpinner9 size={24} />
              </span>
            ) : (
              "Register"
            )}
          </Button>
        </form>
        <hr />
        <div>
          <Button onClick={handelGoogleLogin} color="blue">
            Google
          </Button>
        </div>
        <Para>
          Already have an account? Please,{" "}
          <Link
            className="text-[#283618] font-DM-display"
            state={location?.state}
            to={"/login"}
            replace={true}
          >
            Login
          </Link>
        </Para>
      </div>
    </div>
  );
};

export default Register;
