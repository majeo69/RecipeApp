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

export const selectUserId = createSelector(
  [selectUser],
  user => user.currentUser.user._id
)

export const selectUserToken = createSelector(
  [selectUser],
  user => user.currentUser.token
)