import React from "react";

import "./RadioButton.scss";

const RadioButton = (props) => {
    return (
        <div className="RadioButton">
            <input id={props.id} onChange={props.changed} value={props.value} type="radio" checked={props.isSelected} />
            <label className={props.classes.join(' ')} htmlFor={props.id}>{props.label}</label>
        </div>
    );
}

export default RadioButton;