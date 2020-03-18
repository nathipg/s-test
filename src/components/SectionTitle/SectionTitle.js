import React from 'react';

import './SectionTitle.scss';

const SectionTitle = props => {
    return (
        <div className="SectionTitle">
            <h1>{props.title}</h1>
            <hr />
            {props.children ? props.children : null}
        </div>
    );
};

export default SectionTitle;