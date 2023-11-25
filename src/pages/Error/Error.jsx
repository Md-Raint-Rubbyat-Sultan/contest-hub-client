import { Link } from "react-router-dom";
import errorLogo from "../../assets/404.gif";
import HelmetTitle from "../../components/Shared/HelmetTitle/HelmetTitle";

const Error = () => {
  return (
    <div>
      <HelmetTitle title="La | Error" />
      <div className="text-center">
        <Link className="my-16 inline-block" to={"/"}>
          <h1 className="text-3xl md:text-5xl">&larr;Back to Home</h1>
        </Link>
        <figure>
          <img
            className="w-full md:w-3/4 lg:w-1/2 mx-auto"
            src={errorLogo}
            alt="error logo"
          />
        </figure>
      </div>
    </div>
  );
};

export default Error;
