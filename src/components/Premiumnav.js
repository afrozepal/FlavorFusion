import React from "react";
import icon from '../assets/icon.png';
// import { Link } from "react-router-dom";

function PNav() {
    return (
        <nav className="navbar navbar-expand-lg pnavbar">
        <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="/">Flavor Fusion</a>       
            </div>
            <ul className="nav justify-content-end">
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">About</a>
                </li>
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Contact</a>
                </li>
            </ul>
            <img src={icon} className="imageicon" alt="Icon" />
        </div>
        </nav>


    );
}

function PNav2() {
    return (
      <nav className="pnavbar2 navbar-dark">
      <div className="container-fluid d-flex justify-content-between ">
      <a className="navbar-brand" href="/">Recipe Generator</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
        <div className="offcanvas offcanvas-end text-bg-dark poffcanvas" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">DASHBOARD</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/Generator">Generate A Recipe</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/LikedRecipes">View Liked Recipes</a>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" href="/">Update Payment Plan</a>
              </li> */}
              <li className="nav-item">
                <a className="nav-link" href="/Login">Logout</a>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" href="/Login">Log Out</a>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
</nav>
    );
}

export {PNav,PNav2}
