import React from 'react';
import './EmptyMatch.styles.scss';

const EmptyMatch = ({ emptyMsg }) => {
  return (
    <div className='empty-match-page-container'>
      <h5>{emptyMsg}</h5>
      <div className='empty-match-img'>
        <img alt='default_userimg' src={require('../../assets/initial-user-page.png')} />
      </div>
    </div>
  )
}

export default EmptyMatch;
