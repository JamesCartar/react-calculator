import { useDispatch } from "react-redux";
import { calculatorSliceActions } from "./store";

export default function OperationButton({ operation, idForOperation }) {
  const dispatch = useDispatch();
  return (
    <button
      id={idForOperation}
      onClick={() =>
        dispatch(calculatorSliceActions.chooseOperation(operation))
      }
    >
      {operation}
    </button>
  );
}
