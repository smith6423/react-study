import "./ContactList.css";
import ContactItem from "./ContactItem";

export default function ContactList({ list, dispatcher }) {
  return (
    <div className="ContactList">
      <div className="title">Contact List</div>
      {list.map((item) => {
        return (
          <ContactItem key={item.id} item={item} dispatcher={dispatcher} />
        );
      })}
    </div>
  );
}
