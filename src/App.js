import React, { useEffect, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import { BreadcrumbsProvider } from 'react-breadcrumbs-dynamic';

import {
    fetchUsers,
    fetchAlbums,
    fetchPhotos,
    fetchPosts
} from './store/actions';

import Header from './components/Header/Header';
import UsersList from './containers/UsersList/UsersList';
import UsersForm from './containers/UsersForm/UsersForm';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchAlbums());
        dispatch(fetchPhotos());
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <Fragment>
            <BreadcrumbsProvider>
                <Router>
                    <Header />
                    <Switch>
                        <Route exact path="/users" component={UsersList} />
                        <Route exact path="/users/new" component={UsersForm} />
                        <Redirect to="/users" />
                    </Switch>
                </Router>
            </BreadcrumbsProvider>
        </Fragment>
    );
}

export default App;
