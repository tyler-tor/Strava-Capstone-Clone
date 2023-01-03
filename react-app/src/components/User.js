import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
import './User.css'

function User() {
  const [user, setUser] = useState('');
  const [activity, setActivity] = useState([]);
  const { userId } = useParams();

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
      }).reverse())
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <div className='profile-container'>
      <div className='user-info'>
        <div className='user-propic-container'>
          <img src={user.profilePicture}
            className='user-pic'
            alt='User' />
        </div>
        <div className='user-info-item-container'>
          <ul>
            <li className='ui-item'>
              <strong>Username - </strong> {user.username}
            </li>
            <li className='ui-item'>
              <strong>Email - </strong> {user.email}
            </li>
            <li className='ui-item'>
              <strong>First Name - </strong> {user.firstName}
            </li>
            <li className='ui-item'>
              <strong>Last Name - </strong> {user.lastName}
            </li>
          </ul>
        </div>
        <div className='user-routes-list'>
          {user && activity.map(route => {
            return (
              <div className='user-page-route-container'
                key={`${route.id}${route.title}`}>
                {/* {console.log(route)} */}
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
      </div>
    </div>
  );
}
export default User;
