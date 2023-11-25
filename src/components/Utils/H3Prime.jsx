import PropTypes from "prop-types";

const H3Prime = ({ children, custom }) => {
  return (
    <h3
      className={`text-3xl font-bold font-DM-display leading-tight ${
        custom ? custom : ""
      }`}
    >
      {children}
    </h3>
  );
};

H3Prime.propTypes = {
  children: PropTypes.node.isRequired,
  custom: PropTypes.string,
};

export default H3Prime;
