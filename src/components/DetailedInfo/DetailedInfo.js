import "./DetailedInfo.scss";
import ImageSRC from "../../assets/section-image.png"
import Button from "../Button/Button";
import Image from "../Image/Image";

const DetailedInfo = () => {
  return (
    <div className="detailed-info">
      <h2 className="detailed-info-heading">Do you need detailed info?</h2>
      <div className="detailed-info-content">
        <Image src={ImageSRC} className="detailed-info-content-image" alt="img" />
        <Button className="detailed-info-content-btn">REQUEST DEMO</Button>
        <Image src={ImageSRC} className="detailed-info-content-image" alt="img" />
      </div>
    </div>
  );
};

export default DetailedInfo;
