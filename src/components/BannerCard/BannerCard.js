import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './BannerCard.scss';

const BannerCard = props => {
    return (
        <div className="BannerCard">
            <h1>{props.title}</h1>
            <div className="content">
                <FontAwesomeIcon icon={props.icon} size="5x" />
                <p>{props.children}</p>
            </div>
        </div>
    );
};

export default BannerCard;