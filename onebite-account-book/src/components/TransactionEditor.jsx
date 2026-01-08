import { useContext, useEffect, useState } from "react";
import "./TransactionEditor.css";
import { useNavigate } from "react-router";
import { TransactionDispatchContext } from "../App";

const categories = ["🍚 식비", "💧 구독", "🏠 생활", "🏢 급여", "💰 금융"];

export default function TransactionEditor({ type, initData }) {
  const [transaction, setTransactions] = useState({
    type: "expense",
    name: "",
    amount: "",
    category: "🍚 식비",
    date: new Date().toISOString().slice(0, 10),
  });
  const nav = useNavigate();
  const onClickCancelButton = () => {
    nav("/");
  };
  const { onCreateTransaction, onUpdateTransaction } = useContext(
    TransactionDispatchContext
  );
  const onClickSubmitButton = () => {
    if (
      !transaction.name ||
      !transaction.amount ||
      !transaction.category ||
      !transaction.date
    ) {
      return;
    }
    console.log(transaction);
    if (type === "NEW") {
      onCreateTransaction(
        transaction.name,
        transaction.amount,
        transaction.type,
        transaction.category,
        transaction.date
      );
    } else {
      console.log("t", initData.id);
      onUpdateTransaction(
        initData.id,
        transaction.name,
        transaction.amount,
        transaction.type,
        transaction.category,
        transaction.date
      );
    }
    nav("/", { replace: true });
  };

  useEffect(() => {
    if (type === "EDIT" && initData) {
      setTransactions({
        ...initData,
        date: new Date(initData.date).toISOString().slice(0, 10),
      });
    }
  }, [type, initData]);

  return (
    <div className="TransactionEditor">
      <div>
        <div className="description">분류</div>
        <select
          name="type"
          onChange={(e) => {
            setTransactions({ ...transaction, type: e.target.value });
          }}
        >
          <option value="expense">지출</option>
          <option value="income">수입</option>
        </select>
      </div>
      <div>
        <div className="description">지출/수입 이름</div>
        <input
          type="text"
          id="name"
          value={transaction.name}
          onChange={(e) =>
            setTransactions({ ...transaction, name: e.target.value })
          }
          placeholder="지출 & 수입 이름을 입력하세요 ..."
        />
      </div>
      <div>
        <div className="description">지출/수입 금액</div>
        <input
          type="number"
          id="amount"
          value={transaction.amount}
          onChange={(e) =>
            setTransactions({ ...transaction, amount: e.target.value })
          }
          placeholder="금액을 입력하세요"
        />
      </div>
      <div>
        <div className="description">카테고리</div>
        <select
          onChange={(e) => {
            setTransactions({ ...transaction, category: e.target.value });
          }}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div>
        <div className="description">날짜</div>
        <input
          type="date"
          id="date"
          value={transaction.date}
          onChange={(e) =>
            setTransactions({ ...transaction, date: e.target.value })
          }
        />
      </div>
      <div className="button_container">
        <button className="submit_button" onClick={onClickSubmitButton}>
          저장
        </button>
        <button className="cancel_button" onClick={onClickCancelButton}>
          취소
        </button>
      </div>
    </div>
  );
}
