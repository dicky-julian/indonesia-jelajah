import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import Navbar from './layouts/navbar';
import Footer from './layouts/footer';
import storage from '../services/store';

const LandingPage = React.lazy(() => import('./pages/landing-page'));
const Destination = React.lazy(() => import('./pages/destinasi'));
const DestinasiDetail = React.lazy(() => import('./pages/destinasi-detail'));

const AppRoute = () => {
  const { store, persistor } = storage;

  const renderLoading = (
    <div className="d-flex justify-content-center align-items-center vw-100 vh-100 position-absolute">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );

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
        <Suspense fallback={renderLoading}>
          <Router>
            <Navbar />
            <Switch>
              <Route path="/" exact render={(props) => renderComponent(LandingPage, props)} />
              <Route path="/destinasi" exact render={(props) => renderComponent(Destination, props)} />
              <Route path="/destinasi/id_destinasi" render={(props) => renderComponent(DestinasiDetail, props)} />
            </Switch>
            <Footer />
          </Router>
        </Suspense>
      </PersistGate>
    </Provider>
  )
}

export default AppRoute;