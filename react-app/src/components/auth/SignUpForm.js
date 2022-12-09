import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import ImageUploadComponent from '../ImageUploadComponenet';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [url, setUrl] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory('/')

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password, url, firstName, lastName));
      // console.log(data)
      if (data) {
        setErrors(data)
      }else {
        history.push('/')
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
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

  console.log(user)
  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='suf-container'>
      <div className='suf-container-inner'>
      <strong className='form-box-brand-text'>AKTIV
      <i className="fab fa-strava"></i>
      </strong>
      <p className='login-logo-text'>Adventure awaits, signup and join today!</p>
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
              placeholder='Username'
              value={username}
              className='suf-input'
            ></input>
          </div>
          <div className='suf-item-container'>
            <label className='suf-label'>First Name</label>
            <input
              type='text'
              name='firstName'
              onChange={updateFirstName}
              placeholder='First Name'
              value={firstName}
              className='suf-input'
            ></input>
          </div>
          <div className='suf-item-container'>
            <label className='suf-label'>Last Name</label>
            <input
              type='text'
              name='lastName'
              onChange={updateLastName}
              placeholder='Last Name'
              value={lastName}
              className='suf-input'
            ></input>
          </div>
          <div className='suf-item-container'>
            <label className='suf-label'>Email</label>
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              placeholder='Email'
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
              placeholder='Password'
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
              placeholder='Repeat Password'
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
