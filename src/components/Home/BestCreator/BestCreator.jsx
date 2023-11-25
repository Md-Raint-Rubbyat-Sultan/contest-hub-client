import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectFlip, Pagination, Navigation } from "swiper/modules";
import { Card } from "flowbite-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import MySpinner from "../../Shared/Spinner/MySpinner";
import Para from "../../Utils/Para";
import MutedPara from "../../Utils/MutedPara";
import H2Prime from "../../Utils/H2Prime";
import H1Prime from "../../Utils/H1Prime";

const BestCreator = () => {
  const axiosPublic = useAxiosPublic();

  const { data: bestCreators, isPending } = useQuery({
    queryKey: ["best-creators"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/best-creator");
      return data;
    },
  });

  if (isPending) return <MySpinner />;

  return (
    <div>
      <H1Prime custom={"text-[#283618] text-center pb-10"}>
        All Time Bests
      </H1Prime>
      <div className="w-11/12 md:w-3/4 lg:w-1/2 mx-auto -mt-16">
        <Swiper
          effect={"flip"}
          grabCursor={true}
          pagination={true}
          navigation={true}
          modules={[EffectFlip, Pagination, Navigation]}
          className="mySwiper"
        >
          {bestCreators?.map((bests) => (
            <SwiperSlide key={bests?._id}>
              <div className="py-16 md:p-16">
                <Card
                  className="w-full"
                  // imgAlt="Meaningful alt text for an image that is not purely decorative"
                  // imgSrc={}
                >
                  <img
                    src={bests?.host?.img}
                    className="w-full h-52 md:h-[400px] xl:h-[550px] object-cover"
                  />
                  <H2Prime custom={"text-[#283618]"}>
                    {bests?.host?.name}
                  </H2Prime>
                  <Para>Contest: {bests?.name}</Para>
                  <MutedPara>
                    Description: {bests?.contest_description.slice(0, 150)}...
                  </MutedPara>
                </Card>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BestCreator;
