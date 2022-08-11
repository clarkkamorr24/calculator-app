import "./styles.css";

export const CalculatorButton = ({ value, className, id, onClick }) => {
  return (
    <button className={"button " + className} id={id} onClick={onClick}>
      <p>{value}</p>
    </button>
  );
};
