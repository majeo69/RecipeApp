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

export const selectFilteredPublicKeyword = createSelector(
  [selectPublicRecipes],
  allPublicRecipes => allPublicRecipes.publicKeyword
)

export const selectPublicCurrentPage = createSelector(
  [selectPublicRecipes],
  allPublicRecipes => allPublicRecipes.currentPage
)

export const selectPublicTotalPages = createSelector(
  [selectPublicRecipes],
  allPublicRecipes => allPublicRecipes.totalPages
)