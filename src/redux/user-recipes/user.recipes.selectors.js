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