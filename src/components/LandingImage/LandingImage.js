import "./LandingImage.scss";

import Image from "../Image/Image";

const LandingImage = ({ imageSrc = "", children }) => {
  return (
    <div className="hero-image-container">
      <Image
        className="hero-image-container-image"
        src={imageSrc}
        alt="landing-image"
      />
      {children}
      <div className="black-layer"></div>
    </div>
  );
};

export default LandingImage;
