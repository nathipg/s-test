import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBiking } from '@fortawesome/free-solid-svg-icons';

import './Logo.scss';

const Logo = () => {
    return (
        <div className="Logo">
            <div className="iconContainer">
                <FontAwesomeIcon icon={faBiking} size="2x" />
            </div>
            <h1>Venturus Sports</h1>
        </div>
    );
};

export default Logo;