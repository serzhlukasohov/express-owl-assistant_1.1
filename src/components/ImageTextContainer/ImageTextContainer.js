import "./ImageTextContainer.scss";
import { imageAndTextsMock } from "../../constants/imageAndTexts.mock";
import ImageAndText from "../ImageAndText/ImageAndText";

const ImageTextContainer = () => {
  return (
    <div className="image-text-container">
      {imageAndTextsMock.map((el, idx) => {
        const { imageUrl, heading, text } = el;
        return (
          <ImageAndText
            reverse={idx % 2 === 0}
            imageUrl={imageUrl}
            text={text}
            heading={heading}
            primary={idx % 2 === 0}
            key={idx}
          />
        );
      })}
    </div>
  );
};

export default ImageTextContainer;
