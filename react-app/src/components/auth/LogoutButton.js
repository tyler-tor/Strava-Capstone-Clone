import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/session';
import './Buttons.css'

const STYLES = ['btn--primary', 'btn--outline'];
const SIZES = ['btn--medium', 'btn--large'];

const LogoutButton = ({ type, buttonStyle, buttonSize }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')
  };

  return <button onClick={onLogout} type={type}
    className={`btn ${checkButtonStyle} ${checkButtonSize}`}>Logout</button>;
};

export default LogoutButton;
