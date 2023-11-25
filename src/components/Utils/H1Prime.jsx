import PropTypes from "prop-types";

const H1Prime = ({ children, custom }) => {
  return (
    <h1
      className={`text-5xl font-bold font-DM-display leading-tight ${
        custom ? custom : ""
      }`}
    >
      {children}
    </h1>
  );
};

H1Prime.propTypes = {
  children: PropTypes.node.isRequired,
  custom: PropTypes.string,
};

export default H1Prime;
