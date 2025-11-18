import axios from "axios";
const API_BASE = "http://localhost:8000";

export async function calculate(operation: string, a: number, b: number) {
  const res = await axios.get(`${API_BASE}/${getEndpoint(operation)}`, {
    params: { a, b },
  });
  return res.data.result;
}

function getEndpoint(op: string): string {
  switch (op) {
    case "+":
      return "add";
    case "-":
      return "subtract";
    case "*":
      return "multiply";
    case "/":
      return "divide";
    default:
      throw new Error("Invalid operator");
  }
}
