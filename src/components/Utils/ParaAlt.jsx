import PropTypes from "prop-types";

const ParaAlt = ({ children, custom }) => {
  return (
    <p
      className={`text-lg text-[#FEFAE0] leading-loose ${custom ? custom : ""}`}
    >
      {children}
    </p>
  );
};

ParaAlt.propTypes = {
  children: PropTypes.node.isRequired,
  custom: PropTypes.string,
};

export default ParaAlt;
