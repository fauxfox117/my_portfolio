import headerLogo from "../assets/logo.png";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <img className="header__logo" src={headerLogo} alt="App Logo" />
      <h1 className="header__title">Hello Template!</h1>
    </div>
  );
}
export default Header;
