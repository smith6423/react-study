import { useParams } from "react-router";
import TransactionEditor from "../components/TransactionEditor";
import { useContext } from "react";
import { TransactionStateContext } from "../App";

export default function EditTransaction() {
  const params = useParams();
  const { id } = params;

  const transtaction = useContext(TransactionStateContext);
  const currentTransaction = transtaction.find(
    (transaction) => transaction.id === Number(id)
  );

  return (
    <div className="NewTransaction">
      <header>
        <h1>기록 수정하기</h1>
      </header>
      <TransactionEditor type={"EDIT"} initData={currentTransaction} />
    </div>
  );
}
