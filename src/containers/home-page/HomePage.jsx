import React from 'react';
import './HomePage.styles.scss';
import '../../assets/homepage/home-main-img.png';
import {withRouter} from 'react-router-dom';


const HomePage = (props) => {
  return (
    <div className='homepage-container'>
      <div className='homepage-row-1'>
        <img alt='homepage_main_userimg' src={require('../../assets/homepage/home-main-img.png')} />
        <button className='get-started-btn' type="button"
          onClick={() => props.history.push('/signin')}>
          <div className='get-started-text'><span>Get started!</span></div>
        </button>
      </div>

      <div className='homepage-row-2'>
        <div className='homepage-row-2-img'>
          <img alt='homepage-img-1' src={require('../../assets/homepage/home-img-1.png')} />
        </div>
        <div className='homepage-row-2-text'>
          <h2>Create your recipes</h2>
          <p>Simply create your recipes by clicking Add New Recipe button. Upload an image for your new recipe and makes it look awesome and delicious!</p>
        </div>
      </div>

      <div className='homepage-row-3'>
        <div className='homepage-row-3-text'>
          <h2>Create your recipes</h2>
          <p>Simply create your recipes by clicking Add New Recipe button. Upload an image for your new recipe and makes it look awesome and delicious!</p>
        </div>
        <div className='homepage-row-3-img'>
          <img alt='homepage-img-2' src={require('../../assets/homepage/home-img-2.png')} />
        </div>
      </div>

      <div className='homepage-row-4'>
        <div className='homepage-row-4-img'>
          <img alt='homepage-img-3' src={require('../../assets/homepage/home-img-3.png')} />
        </div>
        <div className='homepage-row-4-text'>
          <h2>Create your recipes</h2>
          <p>Simply create your recipes by clicking Add New Recipe button. Upload an image for your new recipe and makes it look awesome and delicious!</p>
        </div>
      </div>
    </div>
  );
}

export default withRouter(HomePage);


// <img alt='homepage_main_userimg' src={require('../../assets/homepage/home-main-img.png')} />