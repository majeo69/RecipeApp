import DeleteRecipeTypes from './delete.recipe.types';

export const deleteRecipe = (userToken, recipeID) => (dispatch) => {
  dispatch({ type: DeleteRecipeTypes.DELETE_RECIPE_PENDING })
  fetch(`https://chieh-recipe-manager.herokuapp.com/recipes/delete`,
  {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + userToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      _id: recipeID
    })
  }).then(response => dispatch({ type: DeleteRecipeTypes.DELETE_RECIPE_SUCCESS }))
}
