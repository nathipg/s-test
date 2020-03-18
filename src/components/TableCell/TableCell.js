import React from 'react';

import './TableCell.scss';

const TableCell = props => {
    const classes = ['TableCell'];

    if(props.highlighted) {
        classes.push('highlighted');
    }

    return (
        <td className={classes.join(' ')}>
            {props.children}
        </td>
    );
};

export default TableCell;