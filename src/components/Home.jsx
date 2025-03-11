import HeroSection from "./HeroSection";
import UserTestoMonial from "./UserTestomonial";
import ReviewMotion from "./ReviewMotion";

const Home = () => {
  return (
    <div className=" bg-linear-to-r/srgb from-slate-50 to-slate-100 lg:px-[10%] md:px-[5%] px-[3%] mt-[57px]">
      <HeroSection />
      <UserTestoMonial />
      {/* <ReviewMotion/> */}
    </div>
  );
};

export default Home;
