import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <div className='footer-container'>
        <section className='social-media'>
            <div className='social-media-wrap'>
                <div className='footer-logo'>
                    <Link to='/' className='social-logo'>
                        AKTIV <i className='fab fa-strava'></i>
                    </Link>
                </div>
                <small className='website-rights'>Capstone Strava Clone</small>
                <div className='social-icons'>
                    <a href='https://www.linkedin.com/in/derek-torrero-02823018a/'
                    target='_blank'
                    rel="noreferrer"
                    className='social-icon-link linkedin'
                    aria-label='Facebook'>
                        <i className='fab fa-linkedin'></i>
                    </a>
                    <a href='https://github.com/tyler-tor'
                    target='_blank'
                    rel="noreferrer"
                    className='social-icon-link github'
                    aria-label='GitHub'>
                        <i className='fab fa-github'></i>
                    </a>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Footer
