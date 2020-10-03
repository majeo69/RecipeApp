import UserRecipesTypes from './user.recipes.types';

const INITIAL_STATE = {
  isPending: true,
  userRecipes: []
}

const requestUserRecipesReducer = (state = INITIAL_STATE, action={}) => {
  switch(action.type) {
    case UserRecipesTypes.REQUEST_ALL_USER_RECIPES_PENGING:
      return {
        ...state,
        isPending: true
      }
    case UserRecipesTypes.REQUEST_ALL_USER_RECIPES_SUCCESS:
      return {
        ...state,
        userRecipes: action.payload,
        isPending: !state.isPending
      }
    case UserRecipesTypes.REQUEST_ALL_USER_RECIPES_FAILED:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

export default requestUserRecipesReducer;