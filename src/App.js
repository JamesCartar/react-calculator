import { useDispatch, useSelector } from "react-redux";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";
import { calculatorSliceActions } from "./store";
import "./style.css";

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

function formatOperand(operand) {
  if (operand === null || operand === undefined) return;
  const [integer, decimal] = operand.split(".");
  if (decimal === undefined) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function App() {
  const dispatch = useDispatch();

  const { currentOperand, previousOperand, operation } = useSelector(
    (state) => state
  );

  return (
    <div className="calculator-grid">
      <div className="output" id="display">
        <div className="previous-operand">
          {formatOperand(previousOperand)} {operation}
        </div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      <button
        className="span-two ac"
        id="clear"
        onClick={() => dispatch(calculatorSliceActions.clear())}
      >
        AC
      </button>
      <button onClick={() => dispatch(calculatorSliceActions.deleateDigit())}>
        DEL
      </button>
      <OperationButton operation="*" idForOperation="multiply" />
      <DigitButton digit="1" idForNumber="one" />
      <DigitButton digit="2" idForNumber="two" />
      <DigitButton digit="3" idForNumber="three" />
      <OperationButton operation="-" idForOperation="subtract" />
      <DigitButton digit="4" idForNumber="four" />
      <DigitButton digit="5" idForNumber="five" />
      <DigitButton digit="6" idForNumber="six" />
      <OperationButton operation="+" idForOperation="add" />
      <DigitButton digit="7" idForNumber="seven" />
      <DigitButton digit="8" idForNumber="eight" />
      <DigitButton digit="9" idForNumber="nine" />
      <DigitButton digit="." />
      <DigitButton digit="0" idForNumber="zero" />
      <OperationButton operation="/" idForOperation="divide" />
      <button
        className="eq"
        id="equals"
        onClick={() => dispatch(calculatorSliceActions.evaluate())}
      >
        =
      </button>
    </div>
  );
}

export default App;
