import { useState } from "react";
import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import cn from "classnames";

function JournalForm({ clicked }) {
  const [formValidState, setFormValidState] = useState({
    title: true,
    text: true,
    date: true,
  });

  const addJournalItem = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    let isFormValid = true;
    if (!formProps.title.trim()) {
      setFormValidState((state) => ({ ...state, title: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, title: true }));
    }
    if (!formProps.text.trim()) {
      setFormValidState((state) => ({ ...state, text: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, text: true }));
    }
    if (!formProps.date) {
      setFormValidState((state) => ({ ...state, date: false }));
      isFormValid = false;
    } else {
      setFormValidState((state) => ({ ...state, date: true }));
    }
    if (!isFormValid) {
      return;
    }
    clicked(formProps);
  };

  return (
    <form className={styles["journal-form"]} onSubmit={addJournalItem}>
      <div>
        <input
          type="title"
          name="title"
          className={cn(styles["input-title"], {
            [styles["invalid"]]: !formValidState.title,
          })}
        />
      </div>
      <div className={styles["form-row"]}>
        <label htmlFor="date" className={styles["form-label"]}>
          <img src="/Frame.svg" alt="" />
          <span className={styles["label-span"]}>Дата</span>
        </label>
        <input
          type="date"
          name="date"
          id="date"
          className={cn(styles["input"], {
            [styles["invalid"]]: !formValidState.date,
          })}
        />
      </div>

      <div className={styles["form-row"]}>
        <label htmlFor="date" className={styles["form-label"]}>
          <img src="/Frame.svg" alt="" />
          <span className={styles["label-span"]}>Метки</span>
        </label>
        <input type="text" id="tag" name="tag" className={styles["input"]} />
      </div>
      <textarea
        cols={30}
        rows={10}
        name="text"
        id=""
        className={cn(styles["input"], {
          [styles["invalid"]]: !formValidState.text,
        })}
      ></textarea>
      <Button text={"Сохранить"} />
    </form>
  );
}

export default JournalForm;
