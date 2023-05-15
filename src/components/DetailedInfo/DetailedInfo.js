import "./DetailedInfo.scss";
import Image1SRC from "../../assets/demo/1.png";
import Image2SRC from "../../assets/demo/2.png";
import Button from "../Button/Button";
import Image from "../Image/Image";

const DetailedInfo = () => {
  return (
    <div className="detailed-info">
      <h2 className="detailed-info-heading">Do you need detailed info?</h2>
      <div className="detailed-info-content">
        <Image
          src={Image1SRC}
          className="detailed-info-content-image"
          alt="img"
        />
        <Button className="detailed-info-content-btn">REQUEST DEMO</Button>
        <Image
          src={Image2SRC}
          className="detailed-info-content-image"
          alt="img"
        />
      </div>
    </div>
  );
};

export default DetailedInfo;
