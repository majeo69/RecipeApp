import React from 'react';
import './SignInSignUpPage.styles.scss';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import SignIn from '../../components/sign-in/SignIn';
import SignUp from '../../components/sign-up/SignUp';

function SignInSignUpPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  var styles = {
    default_tab:{
      minWidth: "40%",
      color:"#7b7b7b",
      outline: "none"
    }
  }

  return (
    <div className='signin-signup-page-container'>
      <div className='signin-signup-form-container'>
        <Tabs
          value={value}
          TabIndicatorProps={{style: { background: "#7f94a9" }}}
          textColor="primary"
          onChange={handleChange}
          centered
        >
          <Tab style={styles.default_tab} label="Sign in" />
          <Tab style={styles.default_tab} label="Sign up" />
        </Tabs>
        {
          value === 0 ?
          <div>
            <SignIn />
          </div> 
          :
          <div>
            <SignUp />
          </div>
        }
      </div>
    </div>
  );
}

export default SignInSignUpPage;