import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import RadioButton from '../RadioButton/RadioButton';
import Checkbox from '../Checkbox/Checkbox';

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
                onBlur={props.blured}
                placeholder={props.placeholder ? props.placeholder : null} />;
            break;
        case 'radio':
            input = (
                <div className="radioGroup">
                    {props.config.options.map((option, key) => (
                        <RadioButton
                            key={key}
                            classes={classes}
                            label={option.displayValue}
                            id={props.name + "_" + option.value}
                            changed={props.changed}
                            value={option.value}
                            isSelected={props.value === option.value} />
                    ))}
                </div>
            );
            break;
        case 'checkbox':
                input = (
                    <div className="checkboxGroup">
                        {props.config.options.map((option, key) => (
                            <Checkbox
                                key={key}
                                classes={classes}
                                label={option.displayValue}
                                id={props.name + "_" + option.value}
                                changed={props.changed}
                                value={option.value}
                                isSelected={props.value.includes(option.value)} />
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

    const label = props.label ? 
        <div className="label">
            <label>{props.label}</label>
            {
                props.shouldValidate && !props.shouldValidate.required ?
                    <span className="optional">optional</span>
                    : null
            }
        </div>
        : null;

    let instruction = null;
    if(props.instruction) {
        instruction = <div style={{
            height: '2.2rem'
        }}>
            {props.inputFocused ? <p className="instruction">{props.instruction}</p> : null}
        </div>;
    }


    const inputGroup = props.icon ?
        <div className="inputGroup">
            {input}
            <div className="icon">
                <FontAwesomeIcon icon={props.icon} />
            </div>
        </div> : input;

    return (
        <div className="Input">
            {label}
            {inputGroup}
            {instruction}
        </div>
    );
};

export default Input;