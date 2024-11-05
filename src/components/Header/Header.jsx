import "./Header.css";
import Select from "../SelectUser/SelectUser";

function Header() {
  return (
    <>
      <img className="logo" src="/logo.svg" alt="logo " />
      <Select />
    </>
  );
}

export default Header;
