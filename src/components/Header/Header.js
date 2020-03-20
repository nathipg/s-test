import React from 'react';

import { faPuzzlePiece, faTrophy, faMapSigns } from '@fortawesome/free-solid-svg-icons';

import MenuBar from '../MenuBar/MenuBar';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import BannerHeader from '../BannerHeader/BannerHeader';
import BannerHeaderCard from '../BannerHeaderCard/BannerHeaderCard';

const Header = () => {
    return (
        <div className="Header">
            <MenuBar />

            <Breadcrumb />

            <BannerHeader>
                <BannerHeaderCard icon={faPuzzlePiece} title="Sport type" subtitle="Cycling" />
                <BannerHeaderCard icon={faTrophy} title="Mode" subtitle="Advanced" />
                <BannerHeaderCard icon={faMapSigns} title="Route" subtitle="30 miles" />
            </BannerHeader>
        </div>
    );
};

export default Header;