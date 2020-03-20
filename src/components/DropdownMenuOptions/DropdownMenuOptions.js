import React from 'react';
import { Link } from 'react-router-dom';

import './DropdownMenuOptions.scss';

const DropdownMenuOptions = props => {
    return (
        <Link className="DropdownMenuOptions" to={props.to}>
            {props.children}
        </Link>
    );
};

export default DropdownMenuOptions;