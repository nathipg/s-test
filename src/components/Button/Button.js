import React from 'react';

import './Button.scss';

const Button = props => {
    const classes = ['Button', props.type];

    return (
        <button
            className={classes.join(' ')}
            onClick={props.clicked}>
            {props.children}
        </button>
    );
}

export default Button;