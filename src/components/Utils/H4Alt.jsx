import PropTypes from "prop-types";

const H4Alt = ({ children, custom }) => {
  return (
    <h4
      className={`text-2xl text-[#FEFAE0] font-bold font-DM-display leading-tight ${
        custom ? custom : ""
      }`}
    >
      {children}
    </h4>
  );
};

H4Alt.propTypes = {
  children: PropTypes.node.isRequired,
  custom: PropTypes.string,
};

export default H4Alt;
