export const addUserAvatar = (currentUser, avatarToAdd) => {
  currentUser.user.avatar = avatarToAdd.avatar
  return currentUser
}
