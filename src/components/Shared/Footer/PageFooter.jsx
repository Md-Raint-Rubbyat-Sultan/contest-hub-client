import { Footer } from "flowbite-react";
import logo from "../../../assets/logo.png";

const PageFooter = () => {
  return (
    <Footer container className="bg-[#FEFAE0] rounded-none">
      <div className="w-full text-center">
        <div className="w-full flex justify-center items-center">
          <Footer.Brand
            src={logo}
            alt="Logo"
            name="Contest Hub"
            className="w-12 h-12"
          />
        </div>
        <Footer.Divider />
        <Footer.Copyright by="Contest Hub TM" year={2023} />
      </div>
    </Footer>
  );
};

export default PageFooter;
