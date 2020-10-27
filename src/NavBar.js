import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li><NavLink to="/">HomePage</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/articles-list">Articles</NavLink></li>
            </ul>
        </nav>
    );
};

export default NavBar;