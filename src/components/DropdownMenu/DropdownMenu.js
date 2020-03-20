import React, { Fragment, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import Backdrop from '../Backdrop/Backdrop';

import { getName } from '../../services/login';

import { getInitialLetters } from '../../util/utility';

import './DropdownMenu.scss';

const DropdownMenu = props => {
    const userName = getName();

    useEffect(() => {
        document.addEventListener('keydown', event => {
            if(event.keyCode === 27) {
                console.log('ESC');
                props.clicked();
            }
        }, false);
    }, [props]);

    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.clicked} bgColor="transparent" />
            <div className="DropdownMenu" onClick={props.clicked}>
                <div className="initials">
                    <span>{getInitialLetters(userName)}</span>
                </div>
                <span>{userName}</span>
                <FontAwesomeIcon icon={faChevronDown} />
                {
                    props.show ?
                        <div className="options">{props.children}</div>
                        : null
                }
            </div>
        </Fragment>
    );
};

export default DropdownMenu;