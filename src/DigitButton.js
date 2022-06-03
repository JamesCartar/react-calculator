import { useDispatch } from "react-redux";
import { calculatorSliceActions } from "./store";

export default function DigitButton({ digit, idForNumber }) {
  const dispatch = useDispatch();
  return (
    <button
      id={digit === "." ? "decimal" : idForNumber}
      className={`num ${digit === "." && "hein"}`}
      onClick={() => dispatch(calculatorSliceActions.addDigit(digit))}
    >
      {digit}
    </button>
  );
}
