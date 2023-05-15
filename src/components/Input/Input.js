import "./Input.scss";

const Input = ({
  className = "",
  value = "",
  setValue = () => {},
  placeholder = "",
}) => {
  return (
    <input
      className={`app-input ${className}`}
      value={value}
      onChange={(ev) => {
        setValue(ev.target.value);
      }}
      placeholder={placeholder}
    />
  );
};

export default Input;
