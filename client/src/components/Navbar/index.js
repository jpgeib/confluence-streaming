import React from "react";
import { Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "./style.css";

const Navbar = () => {
    return (
         <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <Image src="/path/to/logo.png" alt="Confluence Streaming" />
                </Link>
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/channels">Channels</Link>
                </li>
            </ul>
            <div className="navbar-search">
                <button className="search-icon" aria-label="Search">
                    <Icon name="search" size="large" />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;