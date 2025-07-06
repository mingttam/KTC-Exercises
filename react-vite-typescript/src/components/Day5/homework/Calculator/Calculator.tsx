import React, { useState } from "react";
import styles from "./Calculator.module.css";

const buttonLayout = [
  ["AC", "±", "%", "÷"],
  ["7", "8", "9", "×"],
  ["4", "5", "6", "−"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];

type Operator = "+" | "−" | "×" | "÷" | null;

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState<string>("0");
  const [expression, setExpression] = useState<string>("");
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<Operator>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] =
    useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [justEvaluated, setJustEvaluated] = useState<boolean>(false);

  const handleButtonClick = (value: string) => {
    if (error) {
      // Reset on any button after error
      setDisplay("0");
      setExpression("");
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(false);
      setError(false);
      setJustEvaluated(false);
      if (/[0-9.]/.test(value)) {
        inputDigit(value);
      }
      return;
    }
    if (/^[0-9]$/.test(value)) {
      if (justEvaluated) {
        setDisplay(value);
        setExpression("");
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
        setError(false);
        setJustEvaluated(false);
        return;
      }
      inputDigit(value);
    } else if (value === ".") {
      if (justEvaluated) {
        setDisplay("0.");
        setExpression("");
        setFirstOperand(null);
        setOperator(null);
        setWaitingForSecondOperand(false);
        setError(false);
        setJustEvaluated(false);
        return;
      }
      inputDecimal();
    } else if (["+", "−", "×", "÷"].includes(value)) {
      handleOperator(value as Operator);
    } else if (value === "=") {
      handleEquals();
    } else if (value === "AC") {
      resetCalculator();
    } else if (value === "±") {
      toggleSign();
    } else if (value === "%") {
      percentage();
    }
  };

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay((prev) => (prev === "0" ? digit : prev + digit));
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay("0.");
      setWaitingForSecondOperand(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay((prev) => prev + ".");
    }
  };

  const handleOperator = (nextOperator: Operator) => {
    const inputValue = parseFloat(display);
    if (operator && waitingForSecondOperand) {
      setOperator(nextOperator);
      setExpression((prev) => prev.slice(0, -1) + nextOperator);
      return;
    }
    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      if (result === null) {
        setDisplay("Error");
        setError(true);
        setExpression("");
        return;
      }
      setDisplay(String(result));
      setFirstOperand(result);
    }
    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
    setExpression((prev) =>
      prev ? prev + display + nextOperator : display + nextOperator
    );
  };

  const handleEquals = () => {
    if (operator && firstOperand !== null && !waitingForSecondOperand) {
      const inputValue = parseFloat(display);
      const result = calculate(firstOperand, inputValue, operator);
      if (result === null) {
        setDisplay("Error");
        setError(true);
        setExpression("");
        return;
      }
      setDisplay(String(result));
      setExpression("");
      setFirstOperand(null);
      setOperator(null);
      setWaitingForSecondOperand(false);
      setJustEvaluated(true);
    }
  };

  const calculate = (
    first: number,
    second: number,
    op: Operator
  ): number | null => {
    switch (op) {
      case "+":
        return first + second;
      case "−":
        return first - second;
      case "×":
        return first * second;
      case "÷":
        if (second === 0) return null;
        return first / second;
      default:
        return second;
    }
  };

  const resetCalculator = () => {
    setDisplay("0");
    setExpression("");
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
    setError(false);
    setJustEvaluated(false);
  };

  const toggleSign = () => {
    if (display === "0") return;
    setDisplay((prev) => (prev.startsWith("-") ? prev.slice(1) : "-" + prev));
  };

  const percentage = () => {
    setDisplay((prev) => String(parseFloat(prev) / 100));
  };

  // Render buttons
  const renderButtons = () => {
    return buttonLayout.flatMap((row, rowIndex) =>
      row.map((btn, colIndex) => {
        let classNames = styles.button;
        if (btn === "0") classNames += ` ${styles.zero}`;
        if (["+", "−", "×", "÷"].includes(btn))
          classNames += ` ${styles.operator}`;
        if (["AC", "±", "%"].includes(btn)) classNames += ` ${styles.special}`;
        if (btn === "=") classNames += ` ${styles.equals}`;
        if (/^[0-9]$/.test(btn)) classNames += ` ${styles.number}`;
        // For = button, span all columns
        if (btn === "=") {
          return (
            <button
              key={btn}
              className={classNames}
              onClick={() => handleButtonClick(btn)}
              type="button"
            >
              {btn}
            </button>
          );
        }
        return (
          <button
            key={btn + rowIndex + colIndex}
            className={classNames}
            onClick={() => handleButtonClick(btn)}
            type="button"
          >
            {btn}
          </button>
        );
      })
    );
  };

  return (
    <div className={styles.calculator}>
      <div className={styles.display}>
        <div style={{ fontSize: "1rem", color: "#aaa", minHeight: 20 }}>
          {expression}
        </div>
        <div>{display}</div>
      </div>
      <div className={styles.buttons}>{renderButtons()}</div>
    </div>
  );
};

export default Calculator;
