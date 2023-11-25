import PropTypes from "prop-types";

const Para = ({ children, custom }) => {
  return (
    <p className={`text-lg leading-loose ${custom ? custom : ""}`}>
      {children}
    </p>
  );
};

Para.propTypes = {
  children: PropTypes.node.isRequired,
  custom: PropTypes.string,
};

export default Para;
