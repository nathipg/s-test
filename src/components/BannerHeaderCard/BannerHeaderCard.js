import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './BannerHeaderCard.scss';

const BannerHeaderCard = props => {
    return (
        <div className="BannerHeaderCard">
            <FontAwesomeIcon icon={props.icon} size="3x" />
            <div className="content">
                <h1>{props.title}</h1>
                <h2>{props.subtitle}</h2>
            </div>
        </div>
    );
};

export default BannerHeaderCard;