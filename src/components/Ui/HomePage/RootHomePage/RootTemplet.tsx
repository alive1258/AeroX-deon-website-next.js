import AccessoriesSection from "../Drone/AccessoriesSection/AccessoriesSection";
import CaptureSection from "../Drone/CaptureSection/CaptureSection";
import DurabilitySection from "../Drone/DurabilitySection/DurabilitySection";
import FaqSection from "../Drone/FaqSection/FaqSection";
import FlightModesSection from "../Drone/FlightModesSection/FlightModesSection";
import GimbalBannerSection from "../Drone/GimbalBannerSection/GimbalBannerSection";
import HeroSection from "../Drone/HeroSection/HeroSection";
import PerformanceSection from "../Drone/PerformanceSection/PerformanceSection";
import PreorderBannerSection from "../Drone/PreorderBannerSection/PreorderBannerSection";
import TestimonialsSection from "../Drone/TestimonialsSection/TestimonialsSection";
import VideoShowcaseSection from "../Drone/VideoShowcaseSection/VideoShowcaseSection";

const RootHomePage = () => {
  return (
    <>
      <div id="home" className="scroll-mt-[100px]">
        <HeroSection />
      </div>

      <PerformanceSection />

      <CaptureSection />

      <FlightModesSection />

      <GimbalBannerSection />

      <DurabilitySection />

      <VideoShowcaseSection />

      <TestimonialsSection />

      <AccessoriesSection />

      <PreorderBannerSection />

      <FaqSection />
    </>
  );
};

export default RootHomePage;
