import React from 'react';
import './MainPage.css';
import logo from './Big_Sales-Logo.png';

export default function MainPage() {
  return (
    <div>
      <div className="MainPage__content">
        <div className="MainPage__contentLeft">
          <img src={logo} className="MainPage__logo" alt=""/>
        </div>
        <div className="MainPage__contentRight">
          <div className="ui six item secondary menu" style={{position: "absolute", top: 0}}>
            <a className="item" href="/dashboard" style={{color: "white"}}>Editorials</a>
            <a className="item" href="/dashboard" style={{color: "white"}}>Reviews</a>
            <a className="item" href="/dashboard" style={{color: "white"}}>Upcoming Events</a>
          </div>
          <h2 className="ui icon header">
            <i className="shopping bag icon" style={{color: "white"}}/>
            <div className="content" style={{color: "white"}}>
              Bienvenido
              <div className="sub header" style={{color: "white"}}>Clientes, Trabajadores y Emprendedores mejor conectados.</div>
            </div>
          </h2>
        </div>
      </div>
    </div>
  )
}
