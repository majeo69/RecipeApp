import UpdateRecipeTypes from './update.recipe.types';

const INITIAL_STATE = {
  recipeToBeUpdate: {},
  updateRecipePending: false,
  updateRecipeSuccess: false,
  updateRecipeFailed: false,
  deleteRecipePenging: false,
  deleteRecipeSuccess: false
}

const updateUserRecipeReducer = (state = INITIAL_STATE, action={}) => {
  switch(action.type) {
    case UpdateRecipeTypes.RECIPE_TO_BE_UPDATE:
      return {
        ...state,
        recipeToBeUpdate: action.payload,
        updateRecipePending: false,
        updateRecipeSuccess: false,
        updateRecipeFailed: false
      }
    case UpdateRecipeTypes.RESET_UPDATE_RECIPE:
      return {
        ...state,
        recipeToBeUpdate: {},
        updateRecipePending: false,
        updateRecipeSuccess: false,
        updateRecipeFailed: false
      }
    case UpdateRecipeTypes.UPDATE_RECIPE_PENDING:
      return {
        ...state,
        updateRecipePending: true,
        updateRecipeSuccess: false,
        updateRecipeFailed: false
      }
    case UpdateRecipeTypes.UPDATE_RECIPE_SUCCESS:
      return {
        ...state,
        updateRecipePending: false,
        updateRecipeSuccess: true,
        updateRecipeFailed: false
      }
    case UpdateRecipeTypes.UPDATE_RECIPE_FAILED:
      return {
        ...state,
        updateRecipePending: false,
        updateRecipeSuccess: false,
        updateRecipeFailed: action.payload
      }
    case UpdateRecipeTypes.DELETE_RECIPE_PENDING:
      return {
        ...state,
        deleteRecipePenging: true,
        deleteRecipeSuccess: false
      }
    case UpdateRecipeTypes.DELETE_RECIPE_SUCCESS:
      return {
        ...state,
        deleteRecipePenging: false,
        deleteRecipeSuccess: true
      }
    default:
      return state
  }
}

export default updateUserRecipeReducer;