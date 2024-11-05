import { useContext, useEffect, useReducer, useRef, useState } from "react";
import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import cn from "classnames";
import { formReducer, INITIAL_STATE } from "./JournalForm.state";
import Input from "../input/Input";
import { UserContext } from "../../context/user.context";

function JournalForm({ clicked }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const textRef = useRef();
  const { userId } = useContext(UserContext);

  const focusError = ({ title, date, text }) => {
    switch (true) {
      case !title:
        titleRef.current.focus();
        break;
      case !date:
        dateRef.current.focus();
        break;
      case !text:
        textRef.current.focus();
        break;
    }
  };

  useEffect(() => {
    let timerId;
    if (!isValid.date || !isValid.title || !isValid.text) {
      focusError(isValid);
      timerId = setTimeout(() => {
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
  }, [isFormReadyToSubmit, clicked, isFormReadyToSubmit]);

  useEffect(() => {
    dispatchForm({ type: "SET_VALUES", payload: { userId } });
  }, [userId]);

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
      {userId}
      <div>
        <Input
          type="title"
          ref={titleRef}
          name="title"
          onChange={onChange}
          value={values.title}
          appearence="title"
          isValid={isValid.title}
        />
      </div>
      <div className={styles["form-row"]}>
        <label htmlFor="date" className={styles["form-label"]}>
          <img src="/Frame.svg" alt="" />
          <span className={styles["label-span"]}>Дата</span>
        </label>
        <Input
          type="date"
          ref={dateRef}
          name="date"
          id="date"
          onChange={onChange}
          value={values.date}
          isValid={isValid.date}
        />
      </div>

      <div className={styles["form-row"]}>
        <label htmlFor="date" className={styles["form-label"]}>
          <img src="/Frame-1.svg" alt="" />
          <span className={styles["label-span"]}>Метки</span>
        </label>
        <Input
          type="text"
          id="tag"
          name="tag"
          onChange={onChange}
          value={values.tag}
          isValid={isValid}
        />
      </div>
      <textarea
        cols={30}
        ref={textRef}
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
