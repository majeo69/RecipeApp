import { UserActionTypes } from './user.types'

const INITIAL_STATE = {
	currentUser: {},
	signupErrormsg: ''
}

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case UserActionTypes.SET_CURRENT_USER:
			return {
				...state,
				currentUser: action.payload
			}
		case UserActionTypes.LOGOUT_CURRENT_USER:
			return {
				...state,
				currentUser: action.payload
			}
		case UserActionTypes.SIGNUP_NEW_USER_SUCCESS:
			return {
				...state,
				currentUser: action.payload
			}
		case UserActionTypes.SIGNUP_NEW_USER_FAILED:
			return {
				...state,
				signupErrormsg: action.payload
			}
		default:
			return state;
	}
}

export default userReducer;