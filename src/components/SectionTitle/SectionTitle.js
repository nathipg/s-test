import React from 'react';

import './SectionTitle.scss';

const SectionTitle = props => {
    return (
        <div className="SectionTitle">
            <h1>{props.title}</h1>
            <hr />
            {
                props.children ? 
                    <div className="sideElement">{props.children}</div>
                    : null
            }
        </div>
    );
};

export default SectionTitle;