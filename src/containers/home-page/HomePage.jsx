import React from 'react';
import './HomePage.styles.scss';
import '../../assets/homepage/home-main-img.png';
import {withRouter} from 'react-router-dom';


const HomePage = (props) => {
  return (
    <div className='homepage-container'>
      <div className='homepage-col-1'>
        <img alt='homepage_main_userimg' src={require('../../assets/homepage/home-main-img.png')} />
      </div>
      <button className='get-started-btn' type="button"
        onClick={() => props.history.push('/signin')}>
        <div className='get-started-text'><span>Get started!</span></div>
      </button>
    </div>
  );
}

export default withRouter(HomePage);