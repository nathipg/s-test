import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import { faSmile, faLifeRing } from '@fortawesome/free-regular-svg-icons';

import SectionTitle from '../../components/SectionTitle/SectionTitle';
import Banner from '../../components/Banner/Banner';
import BannerCard from '../../components/BannerCard/BannerCard';
import Input from '../../components/Input/Input';
import Form from '../../components/Form/Form';
import FormFields from '../../components/FormFields/FormFields';
import Button from '../../components/Button/Button';

import { registerUser } from '../../store/actions';

import { updateObject, checkValidity, weekDaysGroup, capitalize } from '../../util/utility';

import './UsersForm.scss';

const UsersForm = () => {
    const users = useSelector(state => state.user.users);
    const dispatch = useDispatch();
    
    const [initialRegisterUserForm, ] = useState({
        formIsValid: false,
        fields: {
            username: {
                type: 'input',
                config: {
                    type: 'text',
                },
                label: 'Username',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                inputFocused: false,
                instruction: 'Type your username'
            },
            city: {
                type: 'input',
                config: {
                    type: 'text',
                },
                label: 'City',
                value: '',
                validation: {
                    required: false
                },
                valid: false,
                touched: false,
                inputFocused: false,
                instruction: 'Type your city name'
            },
            name: {
                type: 'input',
                config: {
                    type: 'text',
                },
                label: 'Name',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                inputFocused: false,
                instruction: 'Type your name'
            },
            rideInGroup: {
                type: 'radio',
                config: {
                    options: [
                        {value: 'always', displayValue: 'Always'},
                        {value: 'sometimes', displayValue: 'Sometimes'},
                        {value: 'never', displayValue: 'Never'}
                    ]
                },
                label: 'Ride in group?',
                value: 'always',
                validation: {
                    required: true
                },
                valid: true,
                touched: false
            },
            email: {
                type: 'input',
                config: {
                    type: 'email',
                },
                label: 'E-mail',
                value: '',
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                inputFocused: false,
                instruction: 'Type your e-mail'
            },
            daysOfTheWeek: {
                type: 'checkbox',
                config: {
                    options: [
                        {value: 'sun', displayValue: 'Sun'},
                        {value: 'mon', displayValue: 'Mon'},
                        {value: 'tue', displayValue: 'Tue'},
                        {value: 'wed', displayValue: 'Wed'},
                        {value: 'thu', displayValue: 'Thu'},
                        {value: 'fri', displayValue: 'Fri'},
                        {value: 'sat', displayValue: 'Sat'}
                    ]
                },
                label: 'Days of the week',
                value: [],
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        }
    });
    const [registerUserForm, setRegisterUserForm] = useState({...initialRegisterUserForm});

    const renderFormUser = () => {
        const inputArray = [];

        for(let key in registerUserForm.fields) {
            inputArray.push({
                id: key,
                config: registerUserForm.fields[key]
            });
        }

        return (
            <Form submitted={saveUser}>
                <FormFields>
                    {inputArray.map(input => (
                        <Input 
                            key={input.id}
                            name={input.id}
                            label={input.config.label}
                            type={input.config.type} 
                            config={input.config.config}  
                            value={input.config.value}
                            invalid={!input.config.valid}
                            shouldValidate={input.config.validation}
                            inputFocused={input.config.inputFocused}
                            instruction={input.config.instruction}
                            touched={input.config.touched}
                            changed={event => inputChangedHandler(event, input.id)}
                            focused={event => inputFocused(event, input.id)}
                            blured={event => inputBlured(event, input.id)} />
                    ))}
                </FormFields>

                <Button 
                    type="primary">Save</Button>
                <Button 
                    type="secondary"
                    clicked={() => discardForm()}>Discard</Button>
            </Form>
        );
    }

    const saveUser = event => {
        event.preventDefault();

        if(!registerUserForm.formIsValid) {
            changeAllFields('touched', true);
            return false;
        }

        const formData = {};

        formData['id'] = users.length + 1; // Because there's no real database

        for(let inputIdentifier in registerUserForm.fields) {
            formData[inputIdentifier] = registerUserForm.fields[inputIdentifier].value;
        }

        formData['rideInGroup'] = capitalize(formData['rideInGroup']);
        formData['daysOfTheWeek'] = weekDaysGroup(formData['daysOfTheWeek']);

        dispatch(registerUser(formData));

        discardForm();
    }

    const discardForm = () => {
        setRegisterUserForm({...initialRegisterUserForm});
    }

    const changeAllFields = (prop, value) => {
        let currentFormFields = {...registerUserForm.fields};

        for(let inputIdentifier in currentFormFields) {
            const updatedInput = updateObject(currentFormFields[inputIdentifier], {
                [prop]: value
            });
    
            currentFormFields = updateObject(currentFormFields, {
                [inputIdentifier]: updatedInput
            });
        }

        setRegisterUserForm({
            fields: currentFormFields,
            formIsValid: registerUserForm.formIsValid
        });
    }

    const inputFocused = (event, inputIdentifier) => {
        const updatedInput = updateObject(registerUserForm.fields[inputIdentifier], {
            inputFocused: true
        });

        const updatedRegisterUserForm = updateObject(registerUserForm.fields, {
            [inputIdentifier]: updatedInput
        });

        setRegisterUserForm({
            fields: updatedRegisterUserForm,
            formIsValid: registerUserForm.formIsValid
        });
    }

    const inputBlured = (event, inputIdentifier) => {
        const updatedInput = updateObject(registerUserForm.fields[inputIdentifier], {
            inputFocused: false
        });

        const updatedRegisterUserForm = updateObject(registerUserForm.fields, {
            [inputIdentifier]: updatedInput
        });

        setRegisterUserForm({
            fields: updatedRegisterUserForm,
            formIsValid: registerUserForm.formIsValid
        });
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        const value = event.target.type === 'checkbox' ?
            registerUserForm.fields[inputIdentifier].value.includes(event.target.value) ?
                [...registerUserForm.fields[inputIdentifier].value.filter(e => e !== event.target.value)] // Remove value
                : [...registerUserForm.fields[inputIdentifier].value, event.target.value] // Add value
            : event.target.value;

        const updatedInput = updateObject(registerUserForm.fields[inputIdentifier], {
            value,
            valid: checkValidity(value, registerUserForm.fields[inputIdentifier].validation),
            touched: true
        });

        const updatedRegisterUserForm = updateObject(registerUserForm.fields, {
            [inputIdentifier]: updatedInput
        });

        let formIsValid = true;
        for(let inputIdentifier in updatedRegisterUserForm) {
            formIsValid = updatedRegisterUserForm[inputIdentifier].valid && formIsValid;
        }

        setRegisterUserForm({
            fields: updatedRegisterUserForm,
            formIsValid
        });
    }

    return (
        <div className="UsersForm">
            <SectionTitle title="Registration" />

            <Banner>
                <BannerCard title="Need help?" icon={faLifeRing}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </BannerCard>
                <BannerCard title="Why register?" icon={faHeartbeat}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </BannerCard>
                <BannerCard title="What people are saying..." icon={faSmile}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </BannerCard>
            </Banner>

            {renderFormUser()}
        </div>
    );
};

export default UsersForm;