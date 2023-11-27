import { Button } from "flowbite-react";
import H1Prime from "../../Utils/H1Prime";
import Para from "../../Utils/Para";
import "./Banner.css";
import { useCallback, useEffect, useState } from "react";
import H3Alt from "../../Utils/H3Alt";
import AOS from "aos";
import { Link } from "react-router-dom";
AOS.init();

const images = [
  {
    img: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Games",
  },
  {
    img: "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Medical Contest",
  },
  {
    img: "https://images.unsplash.com/photo-1585241936939-be4099591252?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Article",
  },
];

const Banner = () => {
  const [currentImg, setCurrentImg] = useState(() => 0);

  const goToNext = useCallback(() => {
    currentImg >= images.length - 1
      ? setCurrentImg(() => 0)
      : setCurrentImg((prev) => prev + 1);
  }, [currentImg]);

  useEffect(() => {
    const timer = setTimeout(goToNext, 5000);

    return () => clearTimeout(timer);
  }, [goToNext]);

  return (
    <div
      data-aos="slide-up"
      data-aos-duration="5000"
      data-aos-easing="ease-in-out"
    >
      <div className=" flex flex-col lg:flex-row items-center gap-10">
        <div className="space-y-8 flex-1">
          <H1Prime custom={"text-[#283618]"}>
            Make your career more magnificent with the contest!
          </H1Prime>
          <Para>
            Ignite Your Passion for Winning! Explore Exciting Challenges, Show
            Your Skills, and Win Prizes on Our Vibrant Platform. Join Now for a
            World of Competitions and Fun
          </Para>
          <Link to={"/all-contests/?category=Article"} className="block">
            <Button color="success" className="text-[#FEFAE0]">
              Our Contest
            </Button>
          </Link>
        </div>
        <div className="flex-1 overflow-hidden relative bannerImg">
          <figure>
            <img className="object-cover" src={images[currentImg].img} />
          </figure>
          <div className="absolute left-0 right-0 top-0 bottom-0 flex justify-center items-center bg-black bg-opacity-40">
            <H3Alt custom={""}>{images[currentImg].title}</H3Alt>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
