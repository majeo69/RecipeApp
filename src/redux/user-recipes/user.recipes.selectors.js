import { createSelector } from 'reselect';

const selectUserRecipes = state => state.userRecipes;

export const selectUserRecipesPending = createSelector(
  [selectUserRecipes],
  allUserRecipes => allUserRecipes.isPending
)

export const selectAllUserRecipes = createSelector(
  [selectUserRecipes],
  allUserRecipes => allUserRecipes.userRecipes
)

export const selectFilteredUserRecipes = createSelector(
  [selectUserRecipes],
  allUserRecipes => allUserRecipes.filteredUserRecipes
)

export const selectUserCurrentPage = createSelector(
  [selectUserRecipes],
  allUserRecipes => allUserRecipes.userCurrentPage
)

export const selectUserTotalPages = createSelector(
  [selectUserRecipes],
  allUserRecipes => allUserRecipes.userTotalPages
)

export const selectUsersTotalCount = createSelector(
  [selectUserRecipes],
  allUserRecipes => allUserRecipes.total_count
)

export const selectUsersPublicCount = createSelector(
  [selectUserRecipes],
  allUserRecipes => allUserRecipes.public_count
)