import { useEffect, useReducer, useState } from "react";
import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import cn from "classnames";
import { formReducer, INITIAL_STATE } from "./JournalForm.state";

function JournalForm({ clicked }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;

  useEffect(() => {
    let timerId;
    if (!isValid.date || !isValid.title || !isValid.text) {
      timerId = setTimeout(() => {
        // setFormValidState(INITIAL_STATE);
        dispatchForm({ type: "RESET_VALIDITY" });
      }, 2000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      clicked(values);
      dispatchForm({ type: "RESET" });
    }
  }, [isFormReadyToSubmit]);

  const onChange = (e) => {
    dispatchForm({
      type: "SET_VALUES",
      payload: { [e.target.name]: e.target.value },
    });
  };

  const addJournalItem = (e) => {
    e.preventDefault();
    dispatchForm({ type: "FILL" });
  };

  return (
    <form className={styles["journal-form"]} onSubmit={addJournalItem}>
      <div>
        <input
          type="title"
          name="title"
          onChange={onChange}
          value={values.title}
          className={cn(styles["input-title"], {
            [styles["invalid"]]: !formState.isValid.title,
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
          onChange={onChange}
          value={values.date}
          className={cn(styles["input"], {
            [styles["invalid"]]: !formState.isValid.date,
          })}
        />
      </div>

      <div className={styles["form-row"]}>
        <label htmlFor="date" className={styles["form-label"]}>
          <img src="/Frame.svg" alt="" />
          <span className={styles["label-span"]}>Метки</span>
        </label>
        <input
          type="text"
          id="tag"
          name="tag"
          onChange={onChange}
          value={values.tag}
          className={styles["input"]}
        />
      </div>
      <textarea
        cols={30}
        rows={10}
        name="text"
        onChange={onChange}
        id="text"
        value={values.text}
        className={cn(styles["input"], {
          [styles["invalid"]]: !formState.isValid.text,
        })}
      ></textarea>
      <Button text={"Сохранить"} />
    </form>
  );
}

export default JournalForm;
