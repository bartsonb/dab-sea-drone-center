import React from 'react';
import './Navbar.css';
import '../bulma/bulmaEvents';
import { Link } from "react-router-dom";

export interface NavbarProps {

}

export const Navbar = (props: NavbarProps) => {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <h1>Sea Drone Center</h1>
                </a>

                <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false"
                   data-target="navbarBasicExample" href="#">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <Link className='navbar-item' to={'/'}>Home</Link>
                        <Link className='navbar-item' to={'/boats'}>Boats</Link>
                        <Link className='navbar-item' to={'/map'}>Map</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
};