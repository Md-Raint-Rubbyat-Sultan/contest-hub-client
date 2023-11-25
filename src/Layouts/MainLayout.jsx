import { Outlet } from "react-router-dom";
import NavBar from "../components/Shared/Navbar/Navbar";
import Container from "../components/Utils/Container";
import PageFooter from "../components/Shared/Footer/PageFooter";

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <div className="mt-36">
        <Container>
          <Outlet />
        </Container>
      </div>
      <PageFooter />
    </div>
  );
};

export default MainLayout;
