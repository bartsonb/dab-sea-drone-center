import React from 'react';
import './Navbar.css';
import '../bulma/bulmaEvents';
import { Link } from "react-router-dom";

export interface NavbarProps {
    callback(): void,
    user: any
}

export const Navbar = (props: NavbarProps) => {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <h1>Sea Drone Center</h1>
                </a>

                <div role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false"
                   data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </div>
            </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <Link className='navbar-item nav-link' to={'/'}>Home</Link>
                    </div>

                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <p className={'navbar-item'}>{ props.user }</p>
                                <a className="button is-info" onClick={ props.callback }>
                                    <strong>Logout</strong>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
};