import { createSelector } from 'reselect';

const selectDeletedRecipe = state => state.deleteRecipe;

export const selectDeleteRecipePending = createSelector(
  [selectDeletedRecipe],
  deleteRecipe => deleteRecipe.deleteRecipePending
)

export const selectDeleteRecipeSuccess = createSelector(
  [selectDeletedRecipe],
  deleteRecipe => deleteRecipe.deleteRecipeSuccess
)