import { UserActionTypes } from './user.types'

const cors_anywhere = 'https://chieh-cors-anywhere.herokuapp.com/'

export const setCurrentUser = user => ({
	type: UserActionTypes.SET_CURRENT_USER,
	payload: user
});

export const signupNewUser = (displayName, email, password) => (dispatch) => {
	fetch(cors_anywhere + 'https://chieh-recipe-manager.herokuapp.com/users',
		{
			method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: displayName,
        email: email,
        password: password
      })
		})
		.then(response => {
			if(response.ok) {
				return response.json();
			} else {
				dispatch({ type: UserActionTypes.SIGNUP_NEW_USER_FAILED, payload: "Something went wrong..." })
			}
		})
		.then(data => {
			if (data !== undefined) {
				dispatch({ type: UserActionTypes.SIGNUP_NEW_USER_SUCCESS, payload: data })
			}
		})
		.catch(error => dispatch({ type: UserActionTypes.SIGNUP_NEW_USER_FAILED, payload: error }))
}

export const logoutCurrentUser = (token) => (dispatch) => {
	fetch(cors_anywhere + 'https://chieh-recipe-manager.herokuapp.com/users/logout',
	{
		method: 'POST',
		headers: {
			'Authorization': 'Bearer ' + token,
			'Content-Type': 'application/json'
		}
	})
	.then(dispatch({ type: UserActionTypes.LOGOUT_CURRENT_USER, payload: {} }))
};