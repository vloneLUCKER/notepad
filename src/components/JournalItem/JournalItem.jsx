import "./JournalItem.css";

function JournalItem({ title, date, text }) {
  const formatedDate = new Intl.DateTimeFormat("ru-RU").format(date);

  return (
    <>
      <h2 className="journal-item__Header">{title}</h2>
      <h2 className="journal-body">
        <div className="journal-body__date">{formatedDate}</div>
        <div className="journal-body__text">{text}</div>
      </h2>
    </>
  );
}

export default JournalItem;
