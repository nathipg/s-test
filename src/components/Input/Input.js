import React from 'react';

import RadioButton from '../RadioButton/RadioButton';

import './Input.scss';

const Input = props => {
    let input = null;
    const classes = [];

    if(props.invalid && props.shouldValidate && props.touched) {
        classes.push('invalid');
    }

    switch(props.type) {
        case 'input':
            input = <input 
                className={classes.join(' ')} 
                {...props.config}
                name={props.name}
                value={props.value}
                onChange={props.changed}
                onFocus={props.focused}
                onBlur={props.blured} />;
            break;
        case 'radio':
            input = (
                <div className="radioGroup">
                    {props.config.options.map((option, key) => (
                        <RadioButton
                            key={key}
                            label={option.displayValue}
                            id={props.name + "_" + option.value}
                            changed={props.changed}
                            value={option.value}
                            isSelected={props.value === option.value} />
                    ))}
                </div>
            );
            break;
        default:
            input = <input 
                className={classes.join(' ')} 
                {...props.config} 
                name={props.name}
                value={props.value}
                onChange={props.changed}
                onFocus={props.focused}
                onBlur={props.blured} />;
            break;
    }

    return (
        <div className="Input">
            <div className="label">
                <label>{props.label}</label>
                {
                    !props.shouldValidate.required ?
                        <span className="optional">optional</span>
                        : null
                }
            </div>
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