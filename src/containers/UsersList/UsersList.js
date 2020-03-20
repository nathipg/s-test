import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import Table from '../../components/Table/Table';
import TableHead from '../../components/TableHead/TableHead';
import TableBody from '../../components/TableBody/TableBody';
import TableRow from '../../components/TableRow/TableRow';
import TableCell from '../../components/TableCell/TableCell';
import ClickableIcon from '../../components/ClickableIcon/ClickableIcon';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import Input from '../../components/Input/Input';

import { deleteUser } from '../../store/actions';

import { strIncludesStr } from '../../util/utility';

import './UsersList.scss';

const UsersList = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.user.users);
    const albums = useSelector(state => state.album.albums);
    const photos = useSelector(state => state.photo.photos);
    const posts = useSelector(state => state.post.posts);

    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [userListFilter, setUserListFilter] = useState('');
    const [userListFilterFocused, setUserListFilterFocused] = useState('');

    const renderUsersTable = () => {
        const usersFiltered = userListFilter === '' ? 
            users
            : users.filter(user => strIncludesStr(user.name, userListFilter) || strIncludesStr(user.username, userListFilter));

        const usersRows = usersFiltered.map(user => {
            const userAlbums = albums.filter(album => album.userId === user.id);
            const userAlbumsIds = userAlbums.map(album => album.id);

            return (
                <TableRow key={user.id}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>
                        <a href={`mailto:${user.email}`}>
                            {user.email}
                        </a>
                    </TableCell>
                    <TableCell highlighted>{user.city}</TableCell>
                    <TableCell>{user.rideInGroup}</TableCell>
                    <TableCell>{user.daysOfTheWeek}</TableCell>
                    <TableCell highlighted>{posts.filter(post => post.userId === user.id).length}</TableCell>
                    <TableCell highlighted>{userAlbums.length}</TableCell>
                    <TableCell>{photos.filter(photo => userAlbumsIds.includes(photo.albumId)).length}</TableCell>
                    <TableCell>
                        <ClickableIcon icon={faTrashAlt} clicked={() => {
                                setUserToDelete(user.id);
                                setShowDeleteUserModal(true);
                            }} />
                    </TableCell>
                </TableRow>
            );
        });

        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>E-mail</TableCell>
                        <TableCell>City</TableCell>
                        <TableCell>Ride in group</TableCell>
                        <TableCell>Day of the week</TableCell>
                        <TableCell>Posts</TableCell>
                        <TableCell>Albums</TableCell>
                        <TableCell>Photos</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usersRows}
                </TableBody>
            </Table>
        );
    }

    const renderDeleteUserModal = () => {
        return (
            <Modal
                show={showDeleteUserModal}
                modalClosed={() => setShowDeleteUserModal(false)}>
                    <p>Do you really want to delete the user?</p>
                    <Button 
                        type="primary"
                        clicked={() => setShowDeleteUserModal(false)}>No</Button>
                    <Button 
                        type="secondary"
                        clicked={() => deleteUserRow()}>Yes</Button>
            </Modal>
        );
    }

    const deleteUserRow = () => {
        dispatch(deleteUser(userToDelete));
        setUserToDelete(null);
        setShowDeleteUserModal(false);
    }

    return (
        <div className="UsersList">
            <SectionTitle title="Users">
                <Input 
                    name="userListFilter"
                    type="input"
                    config={{
                        type: 'text'
                    }}
                    icon={faSearch}
                    placeholder="Filter table content"
                    value={userListFilter}
                    inputFocused={userListFilterFocused}
                    changed={event => setUserListFilter(event.target.value)}
                    focused={event => setUserListFilterFocused(true)}
                    blured={event => setUserListFilterFocused(false)} />
            </SectionTitle>
            <Link to="/users/new">
                <Button
                    type="primary">Register User</Button>
            </Link>
            {renderUsersTable()}
            {renderDeleteUserModal()}
        </div>
    );
};

export default UsersList;