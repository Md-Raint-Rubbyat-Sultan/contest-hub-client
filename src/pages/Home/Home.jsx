import Advertises from "../../components/Home/Advertises/Advertises";
import Banner from "../../components/Home/Banner/Banner";
import BestCreator from "../../components/Home/BestCreator/BestCreator";
import PopularContest from "../../components/Home/PopularContest/PopularContest";
import HelmetTitle from "../../components/Shared/HelmetTitle/HelmetTitle";

const Home = () => {
  return (
    <div className="overflow-hidden space-y-24 mb-24">
      <HelmetTitle title="Contest Hub | Home" />
      <div>
        <Banner />
      </div>
      <div>
        <PopularContest />
      </div>
      <div
        className="h-[50vh] bg-fixed"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1487777266562-c209de215ec2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
      <div>
        <Advertises />
      </div>
      <div>
        <BestCreator />
      </div>
    </div>
  );
};

export default Home;
