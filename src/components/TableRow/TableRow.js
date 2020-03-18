import React from 'react';

import './TableRow.scss';

const TableRow = props => {
    return (
        <tr className="TableRow">
            {props.children}
        </tr>
    );
};

export default TableRow;