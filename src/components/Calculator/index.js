import React, { useContext, useCallback } from "react";
import "./styles.css";
import { VerifyContext } from "../VerifyContextProvider";
import { CalculatorButton } from "../CalculatorButton";

export const Calculator = () => {
  const VerifyData = useContext(VerifyContext);
  const { state, setState } = VerifyData;

  const addFloatingPoint = () => {
    const { displayValue } = state;
    if (!/\./.test(displayValue)) {
      setState({
        displayValue: displayValue + ".",
      });
    }
  };

  const applyPercentage = useCallback(() => {
    let displayValue = state.displayValue;
    setState({ displayValue: displayValue / 100 });
  }, [state, setState]);

  const changeSign = () => {
    setState({ displayValue: state.displayValue * -1 });
  };

  const enterDigit = useCallback(
    (digit) => {
      if (state.calculatorState === 2 && state.displayValue.length > 10) {
        return;
      }
      let calculatorState = state.calculatorState;
      if (state.expectingSecondNumber || state.displayValue === "0") {
        setState({
          ...state,
          displayValue: digit,
          expectingSecondNumber: false,
        });
      } else {
        setState({ ...state, displayValue: state.displayValue + digit });
      }

      if (calculatorState === 1) {
        setState({ ...state, displayValue: digit, calculatorState: 2 });
      }
    },
    [state, setState]
  );

  const handleOperatorPress = (operator) => {
    let calculatorState = state.calculatorState;
    let displayValue = state.displayValue;
    let result = state.lastValue;
    let currentOperator = state.currentOperator;
    let lastValue = 0;

    if (calculatorState === 1) {
      return;
    } else {
      if (calculatorState === 2) {
        calculatorState = 3;
      }
      if (operator === "equals") {
        switch (currentOperator) {
          case "plus":
            result += parseFloat(displayValue);
            break;
          case "minus":
            result -= parseFloat(displayValue);
            break;
          case "multiply":
            result *= parseFloat(displayValue);
            break;
          case "divide":
            result /= parseFloat(displayValue);
            break;
          default:
            return;
        }
        displayValue = result;
        currentOperator = null;
      } else {
        currentOperator = operator;
        lastValue = parseFloat(displayValue);
      }
    }
    setState({
      displayValue: displayValue,
      lastValue: lastValue,
      currentOperator: currentOperator,
      calculatorState: calculatorState,
      expectingSecondNumber: true,
    });
  };

  const clearData = () => {
    setState({
      displayValue: "0",
      lastValue: 0,
      calculatorState: 1,
      currentOperator: null,
      expectingSecondNumber: false,
    });
  };

  const getFontSize = () => {
    if (state.displayValue.length > 16) {
      return 20;
    } else if (state.displayValue.length > 14) {
      return 25;
    } else if (state.displayValue.length > 12) {
      return 30;
    } else if (state.displayValue.length > 10) {
      return 35;
    } else if (state.displayValue.length > 8) {
      return 40;
    } else if (state.displayValue.length > 6) {
      return 45;
    } else {
      return 50;
    }
  };

  return (
    <div id="calculator">
      <div id="output">
        <div id="screen">
          <div id="output-text" style={{ fontSize: getFontSize() }}>
            {state.displayValue}
          </div>
        </div>
      </div>
      <div id="buttons">
        <div id="layer1">
          <CalculatorButton value={"AC"} onClick={() => clearData()} />
          <CalculatorButton value={"\u00B1"} onClick={() => changeSign()} />
          <CalculatorButton value={"%"} onClick={() => applyPercentage()} />
          <CalculatorButton
            value={"\u00F7"}
            className={"operator-btn"}
            onClick={() => handleOperatorPress("divide")}
          />
        </div>
        <div id="layer2">
          <CalculatorButton value={"7"} onClick={() => enterDigit("7")} />
          <CalculatorButton value={"8"} onClick={() => enterDigit("8")} />
          <CalculatorButton value={"9"} onClick={() => enterDigit("9")} />
          <CalculatorButton
            value={"x"}
            className={"operator-btn"}
            onClick={() => handleOperatorPress("multiply")}
          />
        </div>
        <div id="layer3">
          <CalculatorButton value={"4"} onClick={() => enterDigit("4")} />
          <CalculatorButton value={"5"} onClick={() => enterDigit("5")} />
          <CalculatorButton value={"6"} onClick={() => enterDigit("6")} />
          <CalculatorButton
            value={"-"}
            className={"operator-btn"}
            onClick={() => handleOperatorPress("minus")}
          />
        </div>
        <div id="layer4">
          <CalculatorButton value={"1"} onClick={() => enterDigit("1")} />
          <CalculatorButton value={"2"} onClick={() => enterDigit("2")} />
          <CalculatorButton value={"3"} onClick={() => enterDigit("3")} />
          <CalculatorButton
            value={"+"}
            className={"operator-btn"}
            onClick={() => handleOperatorPress("plus")}
          />
        </div>
        <div id="layer5">
          <CalculatorButton
            value={"0"}
            id={"zero-btn"}
            onClick={() => enterDigit("0")}
          />
          <CalculatorButton value={"."} onClick={() => addFloatingPoint()} />
          <CalculatorButton
            value={"="}
            className={"equals-btn"}
            onClick={() => handleOperatorPress("equals")}
          />
        </div>
      </div>
    </div>
  );
};
