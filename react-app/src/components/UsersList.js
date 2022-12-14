import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllUsers } from '../store/users';

function UsersList() {
  const dispatch = useDispatch()
  const users = Object.values(useSelector(state => state.users))

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch]);

  const userComponents = users.map((user) => {
    return (
      <li key={user.id}>
        <NavLink to={`/users/${user.id}`}>{user.username}</NavLink>
      </li>
    );
  });

  return (
    <>
      <h1>User List: </h1>
      <ul>{userComponents}</ul>
    </>
  );
}

export default UsersList;
