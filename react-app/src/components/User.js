import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AdjustFriendStatusModal from './AdjustFriendStatus/AdjustFriendStatusModal';
// import { getAllUsers } from '../store/users';
// import { authenticate } from '../store/session';
import './User.css'

function User() {
  const currUser = useSelector(state => state.session.user)
  const [user, setUser] = useState('');
  const [activity, setActivity] = useState([]);
  const [status, setStatus] = useState(false)
  const { userId } = useParams();
  // const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
      setActivity([...user.routes, ...user.workouts].sort((a, b) => {
        if (a.createdAt < b.createdAt) {
          return -1;
        } else if (a.createdAt > b.createdAt) {
          return 1;
        } else {
          return 0;
        };
      }).reverse());
      currUser.friends.forEach(friend => {
        if (friend.userId === parseInt(userId)) {
          setStatus(true)
        }
      })

    })();
  }, []);
  // useEffect(() => {
  //   dispatch(authenticate())
  // }, [])

  // useEffect(() => {
  //   (async () => {
  //     await dispatch(getAllUsers())
  //     const response = await fetch(`/api/users/${userId}`);
  //     const user = await response.json();
  //     setUser(user);
  //   })()
  // }, [])

  if (!user) {
    return null;
  }
  // console.log('user', user)

  return user && (
    <div className='profile-container'>
      <div className='user-info'>
        <div className='user-propic-container'>
          <img src={user.profilePicture}
            className='user-pic'
            alt='User' />
          <h1 className='ui-item'>
              {user.firstName} {user.lastName}
          </h1>
          {parseInt(userId) !== currUser.id && (
          <AdjustFriendStatusModal userId={userId} status={status} setStatus={setStatus} />
          )}
        </div>
        <div className='user-routes-list'>
          <h1 className='user-act-title'>All User Activity: </h1>
          {user && activity.map(route => {
            return (
              <div className='user-page-route-container'
                key={`${route.id}${route.title}`}>
                <div className='user-route-pic-container'>
                  <img src={route.imageUrl}
                    alt='route'
                    className='user-route-pic' />
                </div>
                <div className='user-route-item-container'>
                  <ul>
                    <li className='uri-item'>
                      <strong>Title - </strong>
                      <NavLink to={route.startingPoint ? `/routes/${route.id}` : `/workouts/${route.id}`}
                        className='title-link'>
                        {route.title}
                      </NavLink>
                    </li>
                    <li className='uri-item'>
                      <strong>description - </strong> {route.description}
                    </li>
                    <li className='uri-item'>
                      <strong>Distance - </strong> {route.distance}
                    </li>
                    {route.travelMode ? (
                      <li className='uri-item'>
                        <strong>Travel Type - </strong> {route.travelMode}
                      </li>
                    ) : (
                      <li className='uri-item'>
                        <strong>Workout Type - </strong> {route.type}
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
        <div className='nonfriend-container'>
                <h2
                className='nonfriend-wrapper-title'>Friends: </h2>
                {user.friends.map(friend => {
                    return (
                        <div className='nonfriend-info-container'
                            key={friend.userId}>
                            <img src={friend.profilePicture} alt='non friend pic'
                            className='non-friend-pic' />
                            <NavLink className='non-friend-text'
                            to={`/users/${friend.id}`}>{friend.username}</NavLink>
                        </div>
                    )
                })}
            </div>
      </div>
    </div>
  );
}
export default User;
