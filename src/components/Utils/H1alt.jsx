import PropTypes from "prop-types";

const H1Alt = ({ children, custom }) => {
  return (
    <h1
      className={`text-5xl text-[#FEFAE0] font-bold font-DM-display leading-tight ${
        custom ? custom : ""
      }`}
    >
      {children}
    </h1>
  );
};

H1Alt.propTypes = {
  children: PropTypes.node.isRequired,
  custom: PropTypes.string,
};

export default H1Alt;
