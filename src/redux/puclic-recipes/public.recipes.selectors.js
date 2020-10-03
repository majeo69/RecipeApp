import { createSelector } from 'reselect';

const selectPublicRecipes = state => state.publicRecipes

export const selectPublicRecipesPending = createSelector(
  [selectPublicRecipes],
  allPublicRecipes => allPublicRecipes.isPending
)

export const selectAllPublicRecipes = createSelector(
  [selectPublicRecipes],
  allPublicRecipes => allPublicRecipes.publicRecipes
)

export const selectFilteredPublicRecipes = createSelector(
  [selectPublicRecipes],
  allPublicRecipes => allPublicRecipes.filteredPublicRecipes
)