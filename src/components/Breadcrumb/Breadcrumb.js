import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faHome } from '@fortawesome/free-solid-svg-icons';

import './Breadcrumb.scss';

const Breadcrumb = () => {
    const location = useLocation();
    const breadcrumbsItems = [
        { display: <FontAwesomeIcon icon={faHome} />, path: '/' }
    ];

    const pathArray = location.pathname.split('/');

    if(pathArray.includes('users')) {
        breadcrumbsItems.push({ display: 'Users List', path: '/users' });

        if(pathArray.includes('new')) {
            breadcrumbsItems.push({ display: 'Register User', path: '/users/new' });
        }
    }

    return (
        <div className="Breadcrumb">
            <Breadcrumbs
                separator={<FontAwesomeIcon className="separator" icon={faChevronRight} />}
                item={Link}
            />

            {breadcrumbsItems.map((item, key) => <BreadcrumbsItem key={key} to={item.path}>{item.display}</BreadcrumbsItem>)}
        </div>
    );
};

export default Breadcrumb;