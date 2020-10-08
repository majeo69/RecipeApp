export const addUserAvatar = (currentUser, avatarToAdd) => {
  currentUser.user = avatarToAdd
  return currentUser
}

export const deleteUserAvatar = (currentUser, avatarToDelete) => {
  currentUser.user = avatarToDelete
  return currentUser
}