import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import TempRoute from './components/BackendTestComponents/RouteTemp';
import TempWorkout from './components/BackendTestComponents/WorkoutTemp';
import TempComment from './components/BackendTestComponents/CommentTemp';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import HomePage from './components/HomePage/HomePage';
import Routes from './components/UserRoutes/Routes';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/routes' exact={true} >
          <Routes />
        </ProtectedRoute>
        {/* test routes for backend */}
        <ProtectedRoute path='/routes/test' exact={true} >
          <TempRoute />
        </ProtectedRoute>
        <ProtectedRoute path='/workouts/test' exact={true} >
          <TempWorkout />
        </ProtectedRoute>
        <ProtectedRoute path='/comments/test' exact={true} >
          <TempComment />
        </ProtectedRoute>
        {/* test routes for backend */}
        <Route path='/' exact={true} >
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
