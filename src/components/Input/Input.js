import React from 'react';

import './Input.scss';

const Input = props => {
    let input = null;
    const classes = [];

    if(props.invalid && props.shouldValidate && props.touched) {
        classes.push('invalid');
    }

    switch(props.elementType) {
        case 'input':
            input = <input 
                className={classes.join(' ')} 
                {...props.config} 
                value={props.value}
                onChange={props.changed}
                onFocus={props.focused}
                onBlur={props.blured} />;
            break;
        case 'textarea':
            input = <textarea 
                className={classes.join(' ')} 
                {...props.config} 
                value={props.value}
                onChange={props.changed} />;
            break;
        case 'select':
            input = (
                <select 
                    className={classes.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.config.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            input = <input 
                className={classes.join(' ')} 
                {...props.config} 
                value={props.value}
                onChange={props.changed}
                onFocus={props.focused}
                onBlur={props.blured} />;
            break;
    }

    return (
        <div className="Input">
            <label>{props.label}</label>
            {input}
            {
                props.inputFocused && props.instruction ?
                <p className="instruction">{props.instruction}</p>
                : null
            }
        </div>
    );
};

export default Input;