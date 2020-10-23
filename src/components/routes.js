import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import storage from '../services/store';

const LandingPage = React.lazy(() => import('./pages/landing-page'));
const Login = React.lazy(() => import('./pages/login'));

const AppRoute = () => {
  const { store, persistor } = storage;

  const renderLoading = (
    <div>Loading</div>
  );

  const isLoggedIn = () => {
    return false;
  }

  const renderWithBaseLayout = (Component, props) => {
    if (!isLoggedIn()) {
      return (<Redirect to="/login" />)
    }
    return (<Component {...props} />)
  }

  const renderWithoutBaseLayout = (Component, props) => {
    if (!isLoggedIn()) {
      return (<Component {...props} />);
    }
    return (<Redirect to="/dashboard" />);
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Suspense fallback={renderLoading}>
          <Router>
            <Switch>
              <Route path="/" exact render={(props) => renderWithoutBaseLayout(LandingPage, props)} />
              <Route path="/login" render={(props) => renderWithoutBaseLayout(Login, props)} />
            </Switch>
          </Router>
        </Suspense>
      </PersistGate>
    </Provider>
  )
}

export default AppRoute;