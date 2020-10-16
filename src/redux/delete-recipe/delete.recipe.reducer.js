import DeleteRecipeTypes from './delete.recipe.types';

const INITIAL_STATE = {
  deleteRecipePending: false,
  deleteRecipeSuccess: false
}

const deleteUserRecipeReducer = (state = INITIAL_STATE, action={}) => {
  switch(action.type) {
    case DeleteRecipeTypes.DELETE_RECIPE_PENDING:
      return {
        ...state,
        deleteRecipePending: true,
        deleteRecipeSuccess: false
      }
    case DeleteRecipeTypes.DELETE_RECIPE_SUCCESS:
      return {
        ...state,
        deleteRecipePending: false,
        deleteRecipeSuccess: true
      }
    default:
      return state
  }
}

export default deleteUserRecipeReducer;