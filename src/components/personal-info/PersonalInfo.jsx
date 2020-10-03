import React from 'react';
import './PersonalInfo.styles.scss';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUserName, selectUserEmail } from '../../redux/user/user.selectors';

const mapStateToProps = createStructuredSelector({
  currentUserName: selectUserName,
  currentUserEmail: selectUserEmail
})

const PersonalInfo = ({ currentUserName, currentUserEmail }) => {
  return (
    <div>
      <h4>{currentUserName}</h4>
      <h6>{currentUserEmail}</h6>
    </div>
  );
}

export default connect(mapStateToProps)(PersonalInfo);