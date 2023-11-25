import PropTypes from "prop-types";

const MutedParaAlt = ({ children, custom }) => {
  return (
    <p
      className={`text-sm text-[#FEFAE0] leading-loose ${custom ? custom : ""}`}
    >
      {children}
    </p>
  );
};

MutedParaAlt.propTypes = {
  children: PropTypes.node.isRequired,
  custom: PropTypes.string,
};

export default MutedParaAlt;
