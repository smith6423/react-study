import { createContext, useReducer, useRef } from "react";
import "./App.css";
import EditTransaction from "./pages/EditTransaction";
import Home from "./pages/Home";
import NewTransaction from "./pages/NewTransaction";
import { Route, Routes } from "react-router";

const mockData = [
  {
    id: 0,
    name: "마라탕 & 꿔바로우",
    amount: 59000,
    type: "expense",
    category: "🍚 식비",
    date: new Date().getTime() + 1,
  },
  {
    id: 1,
    name: "월세",
    amount: 500000,
    type: "expense",
    category: "🏠 생활",
    date: new Date().getTime() + 2,
  },
  {
    id: 2,
    name: "월급",
    amount: 3500000,
    type: "income",
    category: "🏢 급여",
    date: new Date().getTime() + 3,
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "INIT":
      return action.data;
    case "CRAETE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) => {
        String(action.data.id) === String(item.id) ? action.data : item;
      });
    case "DELETE":
      return state.filter((item) => {
        String(action.data.id) !== String(item.id);
      });
  }
  return state;
}
const TransactionStateContext = createContext();
const TransactionDispatchContext = createContext();

function App() {
  const [transactions, setTransactions] = useReducer(reducer, mockData);
  const id = useRef(3);
  const onCreateTransaction = (name, amount, type, category, date) => {
    setTransactions({
      type: "CREATE",
      data: {
        id: id.current++,
        amount,
        type,
        category,
        date,
      },
    });
  };

  const onUpdateTransaction = (id, name, amount, type, category, date) => {
    setTransactions({
      type: "UPDATE",
      data: {
        id,
        name,
        amount,
        type,
        category,
        date,
      },
    });
  };

  const onDeleteTransaction = (id) => {
    setTransactions({
      type: "DELETE",
      data: {
        id,
      },
    });
  };

  return (
    <TransactionStateContext.Provider value={transactions}>
      <TransactionDispatchContext.Provider
        value={{
          onCreateTransaction,
          onDeleteTransaction,
          onUpdateTransaction,
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-transaction" element={<NewTransaction />} />
          <Route path="/edit-transaction/:id" element={<EditTransaction />} />
        </Routes>
      </TransactionDispatchContext.Provider>
    </TransactionStateContext.Provider>
  );
}

export default App;
