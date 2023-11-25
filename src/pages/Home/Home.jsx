import Banner from "../../components/Home/Banner/Banner";
import AOS from "aos";
AOS.init();

const Home = () => {
  return (
    <div className="overflow-hidden">
      <div
        data-aos="slide-up"
        data-aos-duration="4000"
        data-aos-easing="ease-in-out"
      >
        <Banner />
      </div>
    </div>
  );
};

export default Home;
