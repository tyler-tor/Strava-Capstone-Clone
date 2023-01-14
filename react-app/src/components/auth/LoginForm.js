import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoClick = async (e) => {
    e.preventDefault();
    let demoEmail = 'demo@aa.io'
    let demoPsswd = 'password'
    await dispatch(login(demoEmail, demoPsswd))
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='form-container'>
      <form onSubmit={onLogin} className='login-form'>
      <strong className='form-box-brand-text'>AKTIV
      <i className="fab fa-strava"></i>
      </strong>
      <p className='login-logo-text'>Login to start your adventure!</p>
        <div className='errors-container'>
          {errors.map((error, ind) => (
            <div key={ind}
              className='error-message'>{error}</div>
          ))}
        </div>
        <div className='form-item'>
          <label htmlFor='email' className='form-label'>Email</label>
          <input
            name='email'
            type='text'
            placeholder='Email'
            value={email}
            onChange={updateEmail}
            className='form-input'
          />
        </div>
        <div className='form-item'>
          <label htmlFor='password' className='form-label'>Password</label>
          <input
            name='password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={updatePassword}
            className='form-input'
          />
          <button type='submit'
          className='submit-btn'
          disabled={!email && !password}>Login</button>
          <button
          onClick={demoClick}
          type='submit'
          className='submit-btn'
          >DemoUser</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
