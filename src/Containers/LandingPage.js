import DetailedInfo from "../components/DetailedInfo/DetailedInfo";
import ImageTextContainer from "../components/ImageTextContainer/ImageTextContainer";
import LandingImage from "../components/LandingImage/LandingImage";
import HeroImageSrc from "../assets/hero.png";
import { Fragment } from "react";
import OurSolution from "../components/OurSolution/OurSolution";

const LandingPage = () => {
  return (
    <Fragment>
      <LandingImage imageSrc={HeroImageSrc}>
        <div className="hero-text-container">
          <h1 className="hero-image-text">
            Meet your AI-powered Virtual Assistant for Software Development
            Teams
          </h1>
        </div>
      </LandingImage>
      <main>
        <OurSolution />
        <ImageTextContainer />
        <DetailedInfo />
      </main>
    </Fragment>
  );
};

export default LandingPage;
