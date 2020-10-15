import UpdateRecipeTypes from './update.recipe.types';

const INITIAL_STATE = {
  recipeToBeUpdate: {},
  updateRecipePending: false,
  updateRecipeSuccess: false,
  updateRecipeFailed: false
}

const updateUserRecipeReducer = (state = INITIAL_STATE, action={}) => {
  switch(action.type) {
    case UpdateRecipeTypes.RECIPE_TO_BE_UPDATE:
      return {
        ...state,
        recipeToBeUpdate: action.payload
      }
    case UpdateRecipeTypes.RESET_UPDATE_RECIPE:
      return {
        ...state,
        recipeToBeUpdate: {}
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
        updateRecipePending: true,
        updateRecipeSuccess: false,
        updateRecipeFailed: action.payload
      }
    default:
      return state
  }
}

export default updateUserRecipeReducer;