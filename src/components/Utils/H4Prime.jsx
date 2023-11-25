import PropTypes from "prop-types";

const H4Prime = ({ children, custom }) => {
  return (
    <h4
      className={`text-2xl font-bold font-DM-display leading-tight ${
        custom ? custom : ""
      }`}
    >
      {children}
    </h4>
  );
};

H4Prime.propTypes = {
  children: PropTypes.node.isRequired,
  custom: PropTypes.string,
};

export default H4Prime;
