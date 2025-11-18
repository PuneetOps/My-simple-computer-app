import { useState, useEffect, useRef } from "react";
import { calculate } from "./api";

const App = () => {
  const [display, setDisplay] = useState("");
  const [a, setA] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input field automatically
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleNumber = (num: string) => setDisplay((prev) => prev + num);

  const handleOperator = (op: string) => {
    if (display === "") return;
    setA(display);
    setOperator(op);
    setDisplay("");
  };

  const handleClear = () => {
    setDisplay("");
    setA(null);
    setOperator(null);
  };

  const handleBackspace = () => setDisplay(display.slice(0, -1));

  const handleCalculate = async () => {
    if (!a || !operator || display === "") return;
    try {
      const result = await calculate(
        operator,
        parseFloat(a),
        parseFloat(display),
      );
      setDisplay(result.toString());
      setA(null);
      setOperator(null);
    } catch {
      setDisplay("Error");
    }
  };

  // Keyboard support
  const handleKey = (e: KeyboardEvent) => {
    const key = e.key;
    if (/^\d$/.test(key)) handleNumber(key);
    else if (["+", "-", "*", "/"].includes(key)) handleOperator(key);
    else if (key === "Enter") handleCalculate();
    else if (key === "Backspace") handleBackspace();
    else if (key === "Escape") handleClear();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  const buttons = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "=",
    "+",
  ];

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <h1 className="text-4xl mb-6 font-semibold tracking-tight text-sky-300 drop-shadow-lg">
        Puneet's Calculator
      </h1>
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6 w-80">
        <input
          ref={inputRef}
          type="text"
          value={display}
          readOnly
          className="w-full text-right bg-transparent text-3xl font-mono mb-4 p-2 border-b border-white/30 focus:outline-none text-sky-200"
        />
        <div className="grid grid-cols-4 gap-3">
          {buttons.map((btn) => (
            <button
              key={btn}
              onClick={() => {
                if (btn === "=") handleCalculate();
                else if (["+", "-", "*", "/"].includes(btn))
                  handleOperator(btn);
                else handleNumber(btn);
              }}
              className={`py-3 text-lg rounded-xl font-semibold transition-all duration-200 ${
                ["+", "-", "*", "/", "="].includes(btn)
                  ? "bg-sky-500/80 hover:bg-sky-600 shadow-md"
                  : "bg-slate-700/70 hover:bg-slate-600"
              }`}
            >
              {btn}
            </button>
          ))}
          <button
            onClick={handleBackspace}
            className="col-span-2 bg-rose-500/80 hover:bg-rose-600 text-lg rounded-xl py-3 font-semibold transition-all duration-200"
          >
            ⌫
          </button>
          <button
            onClick={handleClear}
            className="col-span-2 bg-yellow-500/80 hover:bg-yellow-600 text-lg rounded-xl py-3 font-semibold transition-all duration-200"
          >
            C
          </button>
        </div>
      </div>
      <p className="mt-4 text-xs text-slate-400">
        Use keyboard: numbers, + - * /, Enter, ⌫, Esc
      </p>
    </div>
  );
};

export default App;
