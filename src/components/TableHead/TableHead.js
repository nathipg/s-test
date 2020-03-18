import React from 'react';

import './TableHead.scss';

const TableHead = props => {
    return (
        <thead className="TableHead">
            {props.children}
        </thead>
    );
};

export default TableHead;