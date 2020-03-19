import React, { useEffect, useState, useCallback } from 'react';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt, faSmile, faLifeRing } from '@fortawesome/free-regular-svg-icons';

import Table from './components/Table/Table';
import TableHead from './components/TableHead/TableHead';
import TableBody from './components/TableBody/TableBody';
import TableRow from './components/TableRow/TableRow';
import TableCell from './components/TableCell/TableCell';
import ClickableIcon from './components/ClickableIcon/ClickableIcon';
import Modal from './components/Modal/Modal';
import Button from './components/Button/Button';
import SectionTitle from './components/SectionTitle/SectionTitle';
import Banner from './components/Banner/Banner';
import BannerCard from './components/BannerCard/BannerCard';
import Input from './components/Input/Input';
import Form from './components/Form/Form';
import FormFields from './components/FormFields/FormFields';

import { getUsers, getUserRideInGroup, getUserDayOfTheWeek } from './services/user';
import { getPosts } from './services/post';
import { getAlbums } from './services/album';
import { getPhotos } from './services/photo';

import { updateObject, checkValidity } from './util/utility';

import './App.scss';

const App = () => {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [albums, setAlbuns] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [registerUserForm, setRegisterUserForm] = useState({
        formIsValid: false,
        fields: {
            username: {
                type: 'input',
                config: {
                    type: 'text',
                },
                label: 'Username',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                inputFocused: false,
                instruction: 'Type your username'
            },
            city: {
                type: 'input',
                config: {
                    type: 'text',
                },
                label: 'City',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                inputFocused: false,
                instruction: 'Type your city name'
            },
            name: {
                type: 'input',
                config: {
                    type: 'text',
                },
                label: 'Name',
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                inputFocused: false,
                instruction: 'Type your name'
            },
            //rideInGroup: {},
            email: {
                type: 'input',
                config: {
                    type: 'email',
                },
                label: 'E-mail',
                value: '',
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                inputFocused: false,
                instruction: 'Type your e-mail'
            },
            //daysOfTheWeek: {}
        }
    });

    const fetchUsers = useCallback(async () => {
        const response = await getUsers();
        const treatedUsers = response.data.map(user => {
            return {
                ...user,
                rideInGroup: getUserRideInGroup(),
                daysOfTheWeek: getUserDayOfTheWeek()
            };
        });
        setUsers(treatedUsers);
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

    const renderUsersTable = () => {
        const usersRows = users.map(user => {
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
                        clicked={() => deleteUser()}>Yes</Button>
            </Modal>
        );
    }

    const renderFormUser = () => {
        const inputArray = [];

        for(let key in registerUserForm.fields) {
            inputArray.push({
                id: key,
                config: registerUserForm.fields[key]
            });
        }

        return (
            <Form submitted={registerUser}>
                <FormFields>
                    {inputArray.map(input => (
                        <Input 
                            key={input.id}
                            label={input.config.label}
                            type={input.config.type} 
                            config={input.config.config}  
                            value={input.config.value}
                            invalid={!input.config.valid}
                            shouldValidate={input.config.validation}
                            inputFocused={input.config.inputFocused}
                            instruction={input.config.instruction}
                            touched={input.config.touched}
                            changed={event => inputChangedHandler(event, input.id)}
                            focused={event => inputFocused(event, input.id)}
                            blured={event => inputBlured(event, input.id)} />
                    ))}
                </FormFields>

                <Button 
                    type="primary"
                    clicked={() => console.log('TODO')}>Save</Button>
                <Button 
                    type="secondary"
                    clicked={() => discardForm()}>Discard</Button>
            </Form>
        );
    }

    const inputFocused = (event, inputIdentifier) => {
        const updatedInput = updateObject(registerUserForm.fields[inputIdentifier], {
            inputFocused: true
        });

        const updatedRegisterUserForm = updateObject(registerUserForm.fields, {
            [inputIdentifier]: updatedInput
        });

        setRegisterUserForm({
            fields: updatedRegisterUserForm,
            formIsValid: registerUserForm.formIsValid
        });
    }

    const inputBlured = (event, inputIdentifier) => {
        const updatedInput = updateObject(registerUserForm.fields[inputIdentifier], {
            inputFocused: false
        });

        const updatedRegisterUserForm = updateObject(registerUserForm.fields, {
            [inputIdentifier]: updatedInput
        });

        setRegisterUserForm({
            fields: updatedRegisterUserForm,
            formIsValid: registerUserForm.formIsValid
        });
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedInput = updateObject(registerUserForm.fields[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, registerUserForm.fields[inputIdentifier].validation),
            touched: true
        });

        const updatedRegisterUserForm = updateObject(registerUserForm.fields, {
            [inputIdentifier]: updatedInput
        });

        let formIsValid = true;
        for(let inputIdentifier in updatedRegisterUserForm) {
            formIsValid = updatedRegisterUserForm[inputIdentifier].valid && formIsValid;
        }

        setRegisterUserForm({
            fields: updatedRegisterUserForm,
            formIsValid
        });
    }

    const deleteUser = () => {
        setUsers(users.filter(user => user.id !== userToDelete));
        setUserToDelete(null);
        setShowDeleteUserModal(false);
    }

    const registerUser = () => {

    }

    const discardForm = () => {

    }
    
    return (
        <div className="App">
            <SectionTitle title="Users" />
            {renderUsersTable()}
            {renderDeleteUserModal()}

            <SectionTitle title="Registration" />

            <Banner>
                <BannerCard title="Need help?" icon={faLifeRing}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </BannerCard>
                <BannerCard title="Why register?" icon={faHeartbeat}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </BannerCard>
                <BannerCard title="What people are saying..." icon={faSmile}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </BannerCard>
            </Banner>

            {renderFormUser()}
        </div>
    );
}

export default App;
