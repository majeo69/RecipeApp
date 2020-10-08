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

export const uploadProfileImage = (token, profilepic) => (dispatch) => {
	dispatch({ type: UserActionTypes.UPLOAD_PROFILE_PIC_PENDING })
	const formData = new FormData();
	formData.append("avatar", profilepic);
	fetch(cors_anywhere + 'https://chieh-recipe-manager.herokuapp.com/users/me/avatar',
	{
		method: 'POST',
		headers: {
			'Authorization': 'Bearer ' + token
		},
		body: formData
	})
	.then(response => 
		{
			if(response.ok) {
				return response.json();
			} else {
				dispatch({ type: UserActionTypes.UPLOAD_PROFILE_PIC_FAILED, payload: "Something went wrong..." })
			}
		}
	)
	.then(data => {
		if (data !== undefined) {
			dispatch({ type: UserActionTypes.UPLOAD_PROFILE_PIC_SUCCESS, payload: data })
		}
	})
	.catch(error => dispatch({ type: UserActionTypes.UPLOAD_PROFILE_PIC_FAILED, payload: error }))
}

export const uploadProfileImageTypeError = (data) => ({
	type: UserActionTypes.UPLOAD_PROFILE_PIC_FAILED,
	payload: data
});

export const deleteProfileImage = (token) => (dispatch) => {
	fetch(cors_anywhere + 'https://chieh-recipe-manager.herokuapp.com/users/me/avatar',
	{
		method: 'DELETE',
		headers: {
			'Authorization': 'Bearer ' + token
		},
	})
	.then(response => response.json())
	.then(data => {
		if (data !== undefined) {
			dispatch({ type: UserActionTypes.DELETE_PROFILE_PIC_SUCCESS, payload: data })
		}
	})
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