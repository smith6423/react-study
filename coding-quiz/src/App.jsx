import { useReducer, useRef } from "react";
import "./App.css";
import ContactEditor from "./components/ContactEditor";
import ContactList from "./components/ContactList";
function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.data];
    case "DELETE":
      return state.filter((item) => item.id !== action.data);
    default:
      return state;
  }
}
function App() {
  const [state, dispatcher] = useReducer(reducer, []);
  const keyRef = useRef(0);
  return (
    <div className="App">
      <h2>Contact List</h2>
      <section>
        <ContactEditor index={keyRef} dispatcher={dispatcher} />
      </section>
      <section>
        <ContactList list={state} dispatcher={dispatcher} />
      </section>
    </div>
  );
}

export default App;
