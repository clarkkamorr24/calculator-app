import React, { createContext, useState } from "react";

export const VerifyContext = createContext();
const { Provider } = VerifyContext;

export const VerifyContextProvider = ({ children }) => {
  const [state, setState] = useState({
    displayValue: "0",
    lastValue: 0,
    calculatorState: 1,
    currentOperator: null,
    expectingSecondNumber: false,
  });

  return <Provider value={{ state, setState }}>{children}</Provider>;
};
