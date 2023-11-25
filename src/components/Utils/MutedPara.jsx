import PropTypes from "prop-types";

const MutedPara = ({ children, custom }) => {
  return (
    <p className={`text-sm leading-loose ${custom ? custom : ""}`}>
      {children}
    </p>
  );
};

MutedPara.propTypes = {
  children: PropTypes.node.isRequired,
  custom: PropTypes.string,
};

export default MutedPara;
