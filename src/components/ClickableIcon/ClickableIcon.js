import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './ClickableIcon.scss';

const ClickableIcon = props => {
    return (
        <button className="ClickableIcon">
            <FontAwesomeIcon icon={props.icon} onClick={props.clicked} size="lg" />
        </button>
    );
};

export default ClickableIcon;