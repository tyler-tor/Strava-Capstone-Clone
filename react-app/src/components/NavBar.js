
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const user = useSelector((state) => state.session.user)

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <NavLink to='/' className='navbar-logo' onClick={closeMobileMenu}>
            AKTIV <i className="fab fa-strava"></i>
          </NavLink>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          {!user ? (
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <li className='nav-item'>
                <NavLink to='/' exact={true}
                  className='nav-links' onClick={closeMobileMenu}>
                  Login
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/sign-up' exact={true}
                  className='nav-links' onClick={closeMobileMenu}>
                  Sign Up
                </NavLink>
              </li>
            </ul>
          ) : (
            <>
              <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className='nav-item'>
                  <NavLink to='/' exact={true}
                    className='nav-links' onClick={closeMobileMenu}>
                    Home
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink to='/newRoute' exact={true}
                    className='nav-links' onClick={closeMobileMenu}>
                    + Route
                    <i class="fa-solid fa-hexagon-plus"></i>
                  </NavLink>
                </li>
                <li className='nav-item'>
                  <NavLink to='/sign-up' className='nav-links-mobile' onClick={closeMobileMenu}>
                    Sign Up
                  </NavLink>
                </li>
              </ul>
              {button && <LogoutButton buttonStyle='btn--outline' />}
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default NavBar;
