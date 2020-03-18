import React from 'react';

import './Input.scss';

const Input = props => {
    return (
        <div className="Input">
            <label>{props.label}</label>
            <input type={props.type} value={props.value} />
        </div>
    );
};

export default Input;