import PropTypes from "prop-types";

const H2Alt = ({ children, custom }) => {
  return (
    <h2
      className={`text-4xl text-[#FEFAE0] font-bold font-DM-display leading-tight ${
        custom ? custom : ""
      }`}
    >
      {children}
    </h2>
  );
};

H2Alt.propTypes = {
  children: PropTypes.node.isRequired,
  custom: PropTypes.string,
};

export default H2Alt;
