import React from "react";

import "./Checkbox.scss";

const Checkbox = (props) => {
    return (
        <div className="Checkbox">
            <input id={props.id} onChange={props.changed} value={props.value} type="checkbox" checked={props.isSelected} />
            <label htmlFor={props.id}>{props.label}</label>
        </div>
    );
}

export default Checkbox;