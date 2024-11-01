import "./JournalAddButton.css";
import CardButton from "../CardButton/CardButton";

function JournalAddButton() {
  return (
    <CardButton className="journal-add">
      <img src="/add.svg" alt="" />
      Новое воспоминание
    </CardButton>
  );
}

export default JournalAddButton;
