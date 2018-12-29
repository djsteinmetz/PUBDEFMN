import React from "react";
import "../../css/style.css";

const Nav = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">MNPUBDEF</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            {props.isLoggedIn === false ? (<a className="nav-link" href="/login">Log-in</a>) : (<a className="nav-link" onClick={props.logout} href={null}>Logout</a>)}
          </li>
          <li className="nav-item">
            {props.isLoggedIn === false ? (<a className="nav-link" href="/register">Register</a>) : (null)}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
