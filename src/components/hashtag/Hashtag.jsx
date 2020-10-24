import React from 'react';
import './Hashtag.scss';

const Hashtag = ({hashtag, public_private, food_category}) => {
  return (
    <div>
      <div className={`hashtag-pill ${public_private ? 'public_private-pill' : null } ${food_category ? 'food-category-pill' : null }`} >
        <span>{hashtag}</span>
      </div>
    </div>
  );
}

export default Hashtag;