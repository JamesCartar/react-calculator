import { configureStore, createSlice } from "@reduxjs/toolkit";

const calculatorSlice = createSlice({
  name: "calculator",
  initialState: {
    currentOperand: null,
    previousOperand: null,
    operation: null,
  },
  reducers: {
    addDigit(state, { payload: digit }) {
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: digit,
          overwrite: false,
        };
      }
      if (digit == "0" && state.currentOperand == "0") {
        return state;
      }
      if (digit == "." && state.currentOperand.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${digit}`,
      };
    },
    clear(state, action) {
      return {};
    },
    chooseOperation(state, { payload: operation }) {
      if (state.currentOperand === null && state.previousOperand === null) {
        return state;
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: operation,
        };
      }

      if (state.previousOperand === null) {
        return {
          ...state,
          operation: operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        currentOperand: null,
        operation: operation,
      };
    },
    deleateDigit(state) {
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand === null) return state;
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null,
        };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    },
    evaluate(state, action) {
      if (
        state.operation === null ||
        state.currentOperand === null ||
        state.previousOperand === null
      ) {
        return state;
      }

      return {
        ...state,
        operation: null,
        overwrite: true,
        previousOperand: null,
        currentOperand: evaluate(state),
      };
    },
  },
});

const evaluate = ({ currentOperand, previousOperand, operation }) => {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
      break;
    case "*":
      computation = prev * current;
      break;
      break;
    case "/":
      computation = prev / current;
      break;
  }

  return computation.toString();
};

export const calculatorSliceActions = calculatorSlice.actions;
export const store = configureStore({ reducer: calculatorSlice.reducer });
