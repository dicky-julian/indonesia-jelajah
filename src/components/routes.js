import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import ReactNotification from 'react-notifications-component'
import Navbar from './layouts/navbar';
import storage from '../services/store';
import { FullSpinner } from './layouts/base/spinner';

import 'react-notifications-component/dist/theme.css'

const LandingPage = React.lazy(() => import('./pages/landing-page'));
const Destinasi = React.lazy(() => import('./pages/destinasi'));
const DestinasiDetail = React.lazy(() => import('./pages/destinasi-detail'));
const Article = React.lazy(() => import('./pages/article'));
const ArticleDetail = React.lazy(() => import('./pages/article-detail'));
const ArticleCreator = React.lazy(() => import('./pages/article-create'));
const Profile = React.lazy(() => import('./pages/profile'));
const Cart = React.lazy(() => import('./pages/cart'));

const AppRoute = () => {
  const { store, persistor } = storage;

  const isLoggedIn = () => {
    return true;
  }

  const renderComponent = (Component, props) => {
    if (!isLoggedIn()) {
      return (<Redirect to="/login" />)
    }
    return (<Component {...props} />)
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Suspense fallback={<FullSpinner />}>
          <Router>
            <Navbar />
            <ReactNotification />
            <Switch>
              <Route path="/" exact render={(props) => renderComponent(LandingPage, props)} />
              <Route path="/destinasi" exact render={(props) => renderComponent(Destinasi, props)} />
              <Route path="/destinasi/:id_destinasi" render={(props) => renderComponent(DestinasiDetail, props)} />
              <Route path="/cart" exact render={(props) => renderComponent(Cart, props)} />
              <Route path="/profile" exact render={(props) => renderComponent(Profile, props)} />
              <Route path="/artikel" exact render={(props) => renderComponent(Article, props)} />
              <Route path="/artikel/:id_artikel" render={(props) => renderComponent(ArticleDetail, props)} />
              <Route path="/article-create" render={(props) => renderComponent(ArticleCreator, props)} />
            </Switch>
          </Router>
        </Suspense>
      </PersistGate>
    </Provider>
  )
}

export default AppRoute;