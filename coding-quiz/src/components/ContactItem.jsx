import "./ContactItem.css";

export default function ContactItem({ item, dispatcher }) {
  const onClickDelete = () => {
    dispatcher({ type: "DELETE", data: item.id });
  };
  console.log("item.id" + item.id);
  return (
    <div className="ContactItem">
      <div className="name">{item.name}</div>
      <div className="contact">{item.contact}</div>
      <button onClick={onClickDelete}>🗑️ Remove</button>
    </div>
  );
}
