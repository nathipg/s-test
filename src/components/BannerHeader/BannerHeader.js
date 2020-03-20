import React from 'react';

import './BannerHeader.scss';

const BannerHeader = props => {
    return (
        <div className="BannerHeader">
            {props.children}
        </div>
    );
};

export default BannerHeader;