import { apiCall } from '../../api/api';
import { UserActionTypes } from './user.types'

const cors_anywhere = 'https://chieh-cors-anywhere.herokuapp.com/'

export const setCurrentUser = user => ({
	type: UserActionTypes.SET_CURRENT_USER,
	payload: user
});

export const logoutCurrentUser = (token) => (dispatch) => {
	apiCall(cors_anywhere + 'https://chieh-recipe-manager.herokuapp.com/users/logout',
	{
		method: 'POST',
		headers: {
			'Authorization': 'Bearer ' + token,
			'Content-Type': 'application/json'
		}
	})
	.then(dispatch({ type: UserActionTypes.LOGOUT_CURRENT_USER, payload: {} }))
};