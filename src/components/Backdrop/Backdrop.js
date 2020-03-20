import React from 'react';

import './Backdrop.scss';

const Backdrop = props => (
    props.show ? <div 
        className="Backdrop"
        onClick={props.clicked}
        style={{
            backgroundColor: props.bgColor ? props.bgColor : 'rgba(0, 0, 0, 0.5)'
        }}
    ></div> : null
);

export default Backdrop;