import { createSelector } from 'reselect';

const selectUser = state => state.user;

export const selectUserName = createSelector(
  [selectUser],
  user => user.currentUser.user.name
)

export const selectUserEmail = createSelector(
  [selectUser],
  user => user.currentUser.user.email
)

export const selectUserAvatar = createSelector(
  [selectUser],
  user => user.currentUser.user.avatar
)

export const selectUserId = createSelector(
  [selectUser],
  user => user.currentUser.user._id
)

export const selectUserToken = createSelector(
  [selectUser],
  user => user.currentUser.token
)

export const selectSignupErrormsg = createSelector(
  [selectUser],
  user => user.signupErrormsg
)

export const selectUploadProfilePicSuccess = createSelector(
  [selectUser],
  user => user.uploadProfilePicSuccessmsg
)

export const selectUploadProfilePicError = createSelector(
  [selectUser],
  user => user.uploadProfilePicErrormsg
)