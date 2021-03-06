import { UserActionTypes } from './user.types';
import { updateUser } from './user.utils';

const INITIAL_STATE = {
	currentUser: { user: {_id: 'no-user'} },
	signinPending: false,
	signinErrormsg: '',
	signupPending: false,
	signupErrormsg: '',
	uploadProfilePicPending: false,
	uploadProfilePicSuccessmsg: '',
	uploadProfilePicErrormsg: '',
	onEditProfile: false,
	editProfilePending: false,
	editProfileErrormsg: '',
	deleteProfilePicPending: false
}

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case UserActionTypes.SIGN_IN_USER_PENDING:
			return {
				...state,
				signinPending: true,
				currentUser: { user: {_id: 'no-user'} },
				signinErrormsg: ''
			}
		case UserActionTypes.SIGN_IN_USER_SUCCESS:
			return {
				...state,
				signinPending: false,
				currentUser: action.payload,
				signinErrormsg: ''
			}
		case UserActionTypes.SIGN_IN_USER_FAILED:
			return {
				...state,
				signinPending: false,
				currentUser: { user: {_id: 'no-user'} },
				signinErrormsg: action.payload
			}
		case UserActionTypes.LOGOUT_CURRENT_USER:
			return {
				...state,
				currentUser: action.payload
			}
		case UserActionTypes.SIGNUP_NEW_USER_PENDING:
			return {
				...state,
				signupPending: true,
				currentUser: { user: {_id: 'no-user'} },
				signupErrormsg: ''
			}
		case UserActionTypes.SIGNUP_NEW_USER_SUCCESS:
			return {
				...state,
				signupPending: false,
				currentUser: action.payload,
				signupErrormsg: ''
			}
		case UserActionTypes.SIGNUP_NEW_USER_FAILED:
			return {
				...state,
				signupPending: false,
				currentUser: { user: {_id: 'no-user'} },
				signupErrormsg: action.payload,
			}
		case UserActionTypes.UPLOAD_PROFILE_PIC_PENDING:
			return {
				...state,
				uploadProfilePicPending: true,
				uploadProfilePicErrormsg: ''
			}
		case UserActionTypes.UPLOAD_PROFILE_PIC_SUCCESS:
			return {
				...state,
				currentUser: updateUser(state.currentUser, action.payload),
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
		case UserActionTypes.DELETE_PROFILE_PIC_PENDING:
			return {
				...state,
				deleteProfilePicPending: true
			}
		case UserActionTypes.DELETE_PROFILE_PIC_SUCCESS:
			return {
				...state,
				currentUser: updateUser(state.currentUser, action.payload),
				deleteProfilePicPending: false
			}
		case UserActionTypes.CHANGE_EDIT_STATUS:
			return {
				...state,
				onEditProfile: !state.onEditProfile
			}
		case UserActionTypes.UPDATE_USER_INFO_PENDING:
			return {
				...state,
				editProfilePending: true
			}
		case UserActionTypes.UPDATE_USER_INFO_SUCCESS:
			return {
				...state,
				editProfilePending: false,
				currentUser: updateUser(state.currentUser, action.payload),
				onEditProfile: false,
				editProfileErrormsg: ''
			}
		case UserActionTypes.UPDATE_USER_INFO_FAILED:
			return {
				...state,
				editProfilePending: false,
				editProfileErrormsg: action.payload
			}
		default:
			return state;
	}
}

export default userReducer;