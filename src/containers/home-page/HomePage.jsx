import React from 'react';
import './HomePage.styles.scss';
import '../../assets/homepage/home-main-img.png';
import {withRouter} from 'react-router-dom';

const HomePage = (props) => {
  return (
    <div className='homepage-container'>
      <div className='homepage-row-1 row'>
        <div className='col-lg-7 col-12'>
          <div className='homepage-title'>  
            <h4>Come create your own</h4>
            <h1>Secret<br/>Recipe</h1>
            <button className='get-started-btn' type="button"
              onClick={() => props.history.push('/signin')}>
              <span className='get-started-text'>Get started!</span>
            </button>
          </div>
          <img alt='homepage_main_userimg' src={require('../../assets/homepage/home-main-img-left.png')} className='homepage-img-left'/>
        </div>
        <div className='col-lg-5 d-none d-lg-inline-block text-right'>
          <img alt='homepage_main_img-left' src={require('../../assets/homepage/home-main-img-right.png')} className='homepage-img-right'/>
        </div>
      </div>
      <div className='homepage-row-2'>
        <div className='homepage-row-2-img'>
          <img alt='homepage-img-1' src={require('../../assets/homepage/home-img-1.png')} />
        </div>
        <div className='homepage-row-2-text'>
          <h2>Create a recipe</h2>
          <p>Click the "Add New Recipe" button to start. Add an image and description to make it pop!</p>
        </div>
      </div>
      <div className='homepage-row-3'>
        <div className='homepage-row-3-text'>
          <h2>Discover</h2>
          <p>Discover others recipe in Explore! There's a lot of awesome recipes for you to create!</p>
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
          <h2>Keep them private</h2>
          <p>You can hide your recipes by labelling them private, or you can share them with the world by labelling them public. You can even switch a public recipe back to private at any time.</p>
        </div>
      </div>
    </div>
  );
}

export default withRouter(HomePage);