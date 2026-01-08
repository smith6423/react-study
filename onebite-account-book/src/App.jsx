import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import NewTransaction from "./pages/NewTransaction";
import EditTransaction from "./pages/EditTransaction";
import { createContext, useReducer, useRef } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "INIT":
      // State 초기화
      // action.data로 transaction State 값 교체
      return action.data;

    case "CREATE":
      // 새로운 아이템 추가,
      // action.data에 담긴 새로운 요소를 transactions State에 추가
      return [...state, action.data];

    case "UPDATE":
      // 기존 아이템 수정
      // action.data.id번 아이디를 갖는 아이템을 action.data에 담긴 값으로 수정
      return state.map((transaction) =>
        transaction.id === action.data.id ? action.data : transaction
      );

    case "DELETE":
      // 기존 아이템 삭제
      // action.id번 아이디를 갖는 아이템을 transactions State에서 삭제
      return state.filter((transaction) => transaction.id !== action.id);

    default:
      return state;
  }
}

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

export const TransactionStateContext = createContext();
export const TransactionDispatchContext = createContext();

function App() {
  const [transactions, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onCreateTransaction = (name, amount, type, category, date) => {
    // 새로운 아이템을 추가하는 함수
    dispatch({
      type: "CREATE",
      data: { id: idRef.current++, name, amount, type, category, date },
    });
  };

  const onUpdateTransaction = (id, name, amount, type, category, date) => {
    // 기존 아이템을 수정하는 함수
    dispatch({
      type: "UPDATE",
      data: { id, name, amount, type, category, date },
    });
  };

  const onDeleteTransaction = (id) => {
    // 기존 아이템을 삭제하는 함수
    dispatch({ type: "DELETE", id });
  };

  return (
    <TransactionStateContext.Provider value={transactions}>
      <TransactionDispatchContext.Provider
        value={{
          onCreateTransaction,
          onUpdateTransaction,
          onDeleteTransaction,
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
