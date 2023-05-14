import "./Button.scss";

const Button = ({
  children,
  primary = true,
  className = "",
  onClick = () => {},
}) => {
  return (
    <button
      className={`app-button ${className} ${
        primary ? "button-primary" : "button-secondary"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
