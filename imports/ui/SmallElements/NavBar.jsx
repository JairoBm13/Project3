import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router-dom';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

//Un componente sin props ni sate, bien hecho de esta manera
const NavBar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNavBar">
    <div className="container">
      <Link className="navbar-brand" id="oi" to='/projects'>Open Innovation</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
              aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse " id="navbarResponsive">
        <div className="text-grey navBartext" style={{marginTop: '5px'}}>
          <AccountsUIWrapper id="hol"/>
        </div>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className=" navBartext " to='/projects'>Proyectos</Link>
          </li>
          <li className="nav-item">
            <Link className="navBartext" to='/ideas'>Oportunidades</Link>
          </li>
          <li className="nav-item">
            <Link className="navBartext" to='/projects/create'>Crear Proyecto</Link>
          </li>
          <li className="nav-item">
            <Link className="navBartext" to='/ideas/create'>Crear oportunidad</Link>
          </li>
          {/*<li className="nav-item" style={{textAlign:'left'}}>*/}
          {/*<div id="loginWrapper" className="pull-left">*/}
          {/*/!*<AccountsUIWrapper className="dropdown-menu-left !important" style={{position: 'static'}}/>*!/*/}
          {/*</div>*/}
          {/*</li>*/}
        </ul>
      </div>
    </div>
  </nav>
);

$(document).on('scroll', function (e) {
  let op = 1 - ($(document).scrollTop() / 5000);
  if (op > 0.65)
    $('#mainNavBar').css('opacity', op);
});

export default NavBar;