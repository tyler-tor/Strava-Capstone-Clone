import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import TempRoute from './components/BackendTestComponents/RouteTemp';
// import TempWorkout from './components/BackendTestComponents/WorkoutTemp';
// import TempComment from './components/BackendTestComponents/CommentTemp';
import ActivityFeed from './components/ActivityFeed';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import HomePage from './components/HomePage/HomePage';
import Routes from './components/UserRoutes/Routes';
import RouteDisplay from './components/RouteDisplay/RouteDisplay';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import { getAllRoutes } from './store/routes';
import WorkoutDisplay from './components/WorkoutDisplay/WorkoutDisplay';
import NewRoute from './components/NewMap/NewRoute';

function App() {
  const [loaded, setLoaded] = useState(false);
  const user = useSelector((state) => state.session.user)
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      if (user) {

        await dispatch(getAllRoutes());
      }
      // await dispatch(getAllUsers());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return loaded && (
    <BrowserRouter>
      <NavBar />
      <Switch>
        {/* <Route path='/' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route> */}
        {user ? (
          <>
            <ProtectedRoute path='/users' exact={true} >
              <UsersList />
            </ProtectedRoute>
            <ProtectedRoute path='/users/:userId' exact={true} >
              <User />
            </ProtectedRoute>
            <ProtectedRoute path='/routes' exact={true} >
              <Routes />
            </ProtectedRoute>
            <ProtectedRoute path='/activity' exact={true} >
              <ActivityFeed />
            </ProtectedRoute>
            <ProtectedRoute path='/routes/:routeId' exact={true} >
              <RouteDisplay />
            </ProtectedRoute>
            <ProtectedRoute path='/workouts/:workoutId' exact={true} >
              <WorkoutDisplay />
            </ProtectedRoute>
            {/* test routes for backend */}
            {/* <ProtectedRoute path='/routes/test' exact={true} >
              <TempRoute />
            </ProtectedRoute>
            <ProtectedRoute path='/workouts/test' exact={true} >
              <TempWorkout />
            </ProtectedRoute>
            <ProtectedRoute path='/comments/test' exact={true} >
              <TempComment />
            </ProtectedRoute> */}
            {/* test routes for backend */}
            <ProtectedRoute path='/newRoute' exact={true} >
              <NewRoute />
            </ProtectedRoute>
            <Route path='/' exact={true} >
              <HomePage />
            </Route>
          </>
        ) : (
          <>
            <Route path='/' exact={true}>
              <LoginForm />
            </Route>
            <Route path='/sign-up' exact={true}>
              <SignUpForm />
            </Route>
          </>
        )}
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
