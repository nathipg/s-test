import React from 'react';

import './Input.scss';

const Input = props => {
    return (
        <div className="Input">
            <label>{props.label}</label>
            <input type={props.type} value={props.value} />
            <p>{props.instruction}</p>
        </div>
    );
};

export default Input;