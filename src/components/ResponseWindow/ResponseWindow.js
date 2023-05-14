import "./ResponseWindow.scss";
import OwlImageSRC from "../../assets/owl.png";
// import TriangleSRC from "../../assets/triangle.png";
import Image from "../Image/Image";

const ResponseWindow = () => {
  const gptres = localStorage.getItem("gpt-response");
  return (
    <div className="response-window-container">
      <div className="response-window-container-inner">
        <pre className="response-window">{gptres}</pre>
        <Image src={OwlImageSRC} className="response-window-container-img" />
      </div>
    </div>
  );
};

export default ResponseWindow;
