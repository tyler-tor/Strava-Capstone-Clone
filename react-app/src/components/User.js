import React, { useState, useEffect } from 'react';
import { useParams,NavLink  } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './User.css'

function User() {
  const [user, setUser] = useState('');
  const { userId } = useParams();
  const dispatch = useDispatch()

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }
  // console.log(user)

  return (
    <div className='profile-container'>
      <div className='user-info'>
        <div className='user-propic-container'>
          <img src={user.profilePicture}
            className='user-pic' />
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
          {user && user.routes.map(route => {
            return (
              <div className='user-page-route-container'
                key={route.id}>
                {/* {console.log(route)} */}
                <div className='user-route-pic-container'>
                  <img src={route.imageUrl}
                    className='user-route-pic' />
                </div>
                <div className='user-route-item-container'>
                  <ul>
                    <li className='uri-item'>
                      <strong>Title - </strong>
                      <NavLink to={`/routes/${route.id}`}
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
                    <li className='uri-item'>
                      <strong>Travel Type - </strong> {route.travelMode}
                    </li>
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
