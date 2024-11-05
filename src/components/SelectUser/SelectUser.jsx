import { useContext } from "react";
import styles from "./SelectUser.module.css";
import { UserContext } from "../../context/user.context.jsx";

function Select({}) {
  const { userId, setUserId } = useContext(UserContext);

  const changeUser = (e) => {
    setUserId(Number(e.target.value));
  };

  return (
    <select name="user" id="user" value={userId} onChange={changeUser}>
      <option value="1">vasya</option>
      <option value="2">anton</option>
    </select>
  );
}

export default Select;
