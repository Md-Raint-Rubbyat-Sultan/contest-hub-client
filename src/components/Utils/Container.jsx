import PropTypes from "prop-types";

const Container = ({ children }) => {
  return (
    <div className="max-w-[2050px] mx-auto px-4 md:px-8 lg:px-16 xl:px-20">
      {children}
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
