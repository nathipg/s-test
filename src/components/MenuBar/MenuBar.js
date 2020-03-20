import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBiking } from '@fortawesome/free-solid-svg-icons';

import DropdownMenu from '../DropdownMenu/DropdownMenu';
import DropdownMenuOptions from '../DropdownMenuOptions/DropdownMenuOptions';
import DropdownSeparator from '../DropdownMenuSeparator/DropdownMenuSeparator';

import './MenuBar.scss';

const MenuBar = () => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="MenuBar">
            <div className="logo">
                <div className="iconContainer">
                    <FontAwesomeIcon icon={faBiking} size="2x" />
                </div>
                <h1>Venturus Sports</h1>
            </div>
            <DropdownMenu show={showMenu} clicked={() => setShowMenu(!showMenu)}>
                <DropdownMenuOptions to="/friends-list">Friends List</DropdownMenuOptions>
                <DropdownMenuOptions to="/saved-items">Saved Items</DropdownMenuOptions>
                <DropdownMenuOptions to="/notifications">Notifications</DropdownMenuOptions>
                <DropdownMenuOptions to="/user-preferences">User Preferences</DropdownMenuOptions>
                <DropdownSeparator />
                <DropdownMenuOptions to="/logout">Log out</DropdownMenuOptions>
            </DropdownMenu>
        </div>
    );
};

export default MenuBar;