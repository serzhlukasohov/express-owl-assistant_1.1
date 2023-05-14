import "./Input.scss";

const Input = ({ className = "", value = "", setValue = () => {} }) => {
  return (
    <input
      className={`app-input ${className}`}
      value={value}
      onChange={(ev) => {
        setValue(ev.target.value);
      }}
    />
  );
};

export default Input;
