import React from 'react';

import './TableBody.scss';

const TableBody = props => {
    return (
        <tbody className="TableBody">
            {props.children}
        </tbody>
    );
};

export default TableBody;