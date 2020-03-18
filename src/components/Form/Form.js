import React from 'react';

import './Form.scss';

const Form = props => {
    return (
        <div className="Form">
            <form>
                {props.children}
            </form>
        </div>
    );
};

export default Form;