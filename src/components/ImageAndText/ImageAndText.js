import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Image from "../Image/Image";
import "./ImageAndText.scss";

const ImageAndText = ({
  reverse = false,
  imageUrl = "",
  text = "",
  heading = "",
  primary = true,
}) => {
  return (
    <div
      className={`image-text-item${reverse ? " flex-reverse" : ""}${
        primary
          ? " image-text-item-primary-bg"
          : " image-text-item-secondary-bg"
      }`}
    >
      <div className="image-container">
        <Image src={imageUrl} alt="image" className="image-container-image" />
      </div>
      <div className="text-container">
        <h2 className="heading">{heading}</h2>
        <pre className="text">{text}</pre>
        <Link to="/service">
          <Button>GET STARTED NOW</Button>
        </Link>
      </div>
    </div>
  );
};

export default ImageAndText;
