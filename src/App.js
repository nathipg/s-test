import React, { useEffect, useState, useCallback } from 'react';
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

import Table from './components/Table/Table';
import TableHead from './components/TableHead/TableHead';
import TableBody from './components/TableBody/TableBody';
import TableRow from './components/TableRow/TableRow';
import TableCell from './components/TableCell/TableCell';
import ClickableIcon from './components/ClickableIcon/ClickableIcon';
import Modal from './components/Modal/Modal';
import Button from './components/Button/Button';

import { getUsers, getUserRideInGroup, getUserDayOfTheWeek } from './services/user';
import { getPosts } from './services/post';
import { getAlbums } from './services/album';
import { getPhotos } from './services/photo';

import './App.scss';

const App = () => {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [albums, setAlbuns] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const fetchUsers = useCallback(async () => {
        const response = await getUsers();
        setUsers(response.data);
    }, []);

    const fetchPosts = useCallback(async () => {
        const response = await getPosts();
        setPosts(response.data);
    }, []);

    const fetchAlbums = useCallback(async () => {
        const response = await getAlbums();
        setAlbuns(response.data);
    }, []);

    const fetchPhotos = useCallback(async () => {
        const response = await getPhotos();
        setPhotos(response.data);
    }, []);

    useEffect(() => {
        fetchUsers();
        fetchPosts();
        fetchAlbums();
        fetchPhotos();
    }, [fetchUsers, fetchPosts, fetchAlbums, fetchPhotos]);

    const renderUsersRows = () => {
        return users.map(user => {
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
                    <TableCell highlighted>{user.address.city}</TableCell>
                    <TableCell>{getUserRideInGroup()}</TableCell>
                    <TableCell>{getUserDayOfTheWeek()}</TableCell>
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
    }

    const renderDeleteUserModal = () => {
        return (
            <Modal
                show={showDeleteUserModal}
                modalClosed={() => setShowDeleteUserModal(false)}>
                    <p>Do you really want to delete the user?</p>
                    <Button 
                        type="danger"
                        clicked={() => deleteUser()}>Yes</Button>
                    <Button 
                        type="success"
                        clicked={() => setShowDeleteUserModal(false)}>No</Button>
            </Modal>
        );
    }

    const deleteUser = () => {
        setUsers(users.filter(user => user.id !== userToDelete));
        setUserToDelete(null);
        setShowDeleteUserModal(false);
    }
    
    return (
        <div className="App">
            {renderDeleteUserModal()}
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
                    {renderUsersRows()}
                </TableBody>
            </Table>
        </div>
    );
}

export default App;
