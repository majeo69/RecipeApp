import { createSelector } from 'reselect';

const selectCreateRecipe = state => state.createRecipe;

export const selectCreateRecipePending = createSelector(
  [selectCreateRecipe],
  createdRecipe => createdRecipe.createRecipePending
)

export const selectCreatedRecipeId = createSelector(
  [selectCreateRecipe],
  createdRecipe => createdRecipe.newRecipe._id
)

export const selectCreateRecipeSuccess = createSelector(
  [selectCreateRecipe],
  createRecipe => createRecipe.createSuccessStatus
)

export const selectCreateRecipeErrormsg = createSelector(
  [selectCreateRecipe],
  createRecipe => createRecipe.createRecipeErrormsg
)

export const selectUploadFoodimgPending = createSelector(
  [selectCreateRecipe],
  createRecipe => createRecipe.uploadFoodimgPending
)

export const selectUploadFoodimgSuccess = createSelector(
  [selectCreateRecipe],
  createRecipe => createRecipe.uploadFoodimgSuccess
)

export const selectUploadFoodimgErrormsg = createSelector(
  [selectCreateRecipe],
  createRecipe => createRecipe.uploadFoodimgErrormsg
)

export const selectUploadedFoodimg = createSelector(
  [selectCreateRecipe],
  createdRecipe => createdRecipe.newRecipe.img
)