import "./Image.scss";

const Image = ({ src = "", className = "", alt = "img" }) => {
  return <img src={src} className={`app-image ${className}`} alt={alt} />;
};

export default Image;
