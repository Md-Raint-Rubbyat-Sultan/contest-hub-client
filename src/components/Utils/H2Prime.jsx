import PropTypes from "prop-types";

const H2Prime = ({ children, custom }) => {
  return (
    <h2
      className={`text-4xl font-bold font-DM-display leading-tight ${
        custom ? custom : ""
      }`}
    >
      {children}
    </h2>
  );
};

H2Prime.propTypes = {
  children: PropTypes.node.isRequired,
  custom: PropTypes.string,
};

export default H2Prime;
