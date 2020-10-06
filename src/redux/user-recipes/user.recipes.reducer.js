import UserRecipesTypes from './user.recipes.types';
import { filterUserRecipes } from './user.recipes.utils';

const INITIAL_STATE = {
  isPending: true,
  userRecipes: [],
  filteredUserRecipes: [],
  userCurrentPage: 1,
  userTotalPages: 0,
  createRecipeErrormsg: '',
  newRecipe: {}
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
    case UserRecipesTypes.REQUEST_FILTERED_USER_RECIPES:
      return {
        ...state,
        filteredUserRecipes: filterUserRecipes(action.payload, state.userRecipes)
      }
    case UserRecipesTypes.SET_CURRENT_PAGE:
      return {
        ...state,
        userCurrentPage: action.payload
      }
    case UserRecipesTypes.SET_TOTAL_PAGE:
      return {
        ...state,
        userTotalPages: action.payload
      }
    case UserRecipesTypes.CREATE_NEW_RECIPE_FAILED:
      return {
        ...state,
        createRecipeErrormsg: action.payload
      }
    case UserRecipesTypes.CREATE_NEW_RECIPE_SUCCESS:
      return {
        ...state,
        newRecipe: action.payload,
        createRecipeErrormsg: ''
      }
    default:
      return state
  }
}

export default requestUserRecipesReducer;