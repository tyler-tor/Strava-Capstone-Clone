import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import usersReducer from './users';
import commentsReducer from './comments';
import friendsReducer from './friends';
import workoutReducer from './workouts';
import routesReducer from './routes';
import friendsActivityReducer from './friendsActivity';
import currentRouteReducer from './currentRoute';
import mapReducer from './map';

const rootReducer = combineReducers({
  session,
  users: usersReducer,
  comments: commentsReducer,
  friends: friendsReducer,
  workouts: workoutReducer,
  routes: routesReducer,
  friendsActivity: friendsActivityReducer,
  mapKey: mapReducer,
  currentRoute: currentRouteReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
