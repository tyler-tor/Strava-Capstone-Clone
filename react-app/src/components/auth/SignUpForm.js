import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import ImageUploadComponent from '../ImageUploadComponenet';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [url, setUrl] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, url));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='suf-container'>
      <div className='suf-container-inner'>
      <strong className='form-box-brand-text'>AKTIV
      <i className="fab fa-strava"></i>
      </strong>
      <p className='login-logo-text'>Adventure awaits, signup and join!</p>
        <div className='suf-item-container'>
          <label className='suf-label'>Profile Picture <> </></label>
          <ImageUploadComponent setUrl={setUrl} />
        </div>
        <form onSubmit={onSignUp}
          className='signup-form'>
          <div className='errors-container'>
            {errors.map((error, ind) => (
              <div key={ind} className='error-message'>{error}</div>
            ))}
          </div>
          <div className='suf-item-container'>
            <label className='suf-label'>User Name</label>
            <input
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
              className='suf-input'
            ></input>
          </div>
          <div className='suf-item-container'>
            <label className='suf-label'>Email</label>
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
              className='suf-input'
            ></input>
          </div>
          <div className='suf-item-container'>
            <label className='suf-label'>Password</label>
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              className='suf-input'
            ></input>
          </div>
          <div className='suf-item-container'>
            <label className='suf-label'>Repeat Password</label>
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
              className='suf-input'
            ></input>
          </div>
          <button type='submit' className='submit-btn'>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
