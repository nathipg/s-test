import React from 'react';

import './Table.scss';

const Table = props => {
    return (
        <div className="Table">
            <table>
                {props.children}
            </table>
        </div>
    );
}

export default Table;