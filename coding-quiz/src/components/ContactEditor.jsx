import { useRef, useState } from "react";
import "./ContactEditor.css";

export default function ContactEditor({ index, dispatcher }) {
  const [state, setState] = useState({ id: 0, name: "", contact: "" });

  const onClickAdd = () => {
    if (state.name === "" || state.contact === "")
      return alert("name, contact 입력하세요");
    dispatcher({
      type: "ADD",
      data: { id: ++index.current, name: state.name, contact: state.contact },
    });
  };
  const onChangeInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="ContactEditor">
      <div className="title">Add Contact</div>
      <div className="input_wrapper">
        <input
          name="name"
          className="name"
          onChange={onChangeInput}
          placeholder="이름 ..."
        />
        <input
          name="contact"
          className="contact"
          onChange={onChangeInput}
          placeholder="연락처(이메일) ..."
        />
      </div>
      <button onClick={onClickAdd}>Add</button>
    </div>
  );
}
