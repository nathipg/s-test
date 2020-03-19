import React from 'react';

import './Form.scss';

const Form = props => {
    return (
        <div className="Form">
            <form onSubmit={props.submitted}>
                {props.children}
            </form>
        </div>
    );
};

export default Form;