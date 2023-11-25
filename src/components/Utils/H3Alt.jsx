import PropTypes from "prop-types";

const H3Alt = ({ children, custom }) => {
  return (
    <h3
      className={`text-3xl text-[#FEFAE0] font-bold font-DM-display leading-tight ${
        custom ? custom : ""
      }`}
    >
      {children}
    </h3>
  );
};

H3Alt.propTypes = {
  children: PropTypes.node.isRequired,
  custom: PropTypes.string,
};

export default H3Alt;
