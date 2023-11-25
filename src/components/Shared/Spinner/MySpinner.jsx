import { Spinner } from "flowbite-react";

const MySpinner = () => {
  return (
    <div className="text-center">
      <Spinner
        aria-label="Center-aligned spinner example"
        color="success"
        size="lg"
      />
    </div>
  );
};

export default MySpinner;
