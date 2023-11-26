import { Navigate, useLocation } from "react-router-dom";

import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import MySpinner from "../components/Shared/Spinner/MySpinner";

const PrivetRoute = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <MySpinner />;

  if (user) return children;

  return <Navigate state={location?.pathname} to={"/login"} replace={true} />;
};

PrivetRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivetRoute;
