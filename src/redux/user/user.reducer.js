import { UserActionTypes } from './user.types';
import { addUserAvatar } from './user.utils';

const INITIAL_STATE = {
	currentUser: {},
	signupErrormsg: '',
	uploadProfilePicPending: true,
	uploadProfilePicSuccessmsg: '',
	uploadProfilePicErrormsg: ''
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
		case UserActionTypes.UPLOAD_PROFILE_PIC_PENDING:
			return {
				...state,
				uploadProfilePicPending: true
			}
		case UserActionTypes.UPLOAD_PROFILE_PIC_SUCCESS:
			return {
				...state,
				currentUser: addUserAvatar(state.currentUser, action.payload),
				uploadProfilePicSuccessmsg: 'Upload Success! Please refresh your webpage.',
				uploadProfilePicPending: false,
				uploadProfilePicErrormsg: '',
			}
		case UserActionTypes.UPLOAD_PROFILE_PIC_FAILED:
			return {
				...state,
				uploadProfilePicPending: false,
				uploadProfilePicErrormsg: action.payload
			}
		default:
			return state;
	}
}

export default userReducer;