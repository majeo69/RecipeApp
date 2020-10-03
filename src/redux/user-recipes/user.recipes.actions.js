import { apiCall } from '../../api/api';
import UserRecipesTypes from './user.recipes.types';

const cors_anywhere = 'https://chieh-cors-anywhere.herokuapp.com/'

export const requestAllUserRecipes = (token) => (dispatch) => {
  dispatch({ type: UserRecipesTypes.REQUEST_ALL_USER_RECIPES_PENGING })
  apiCall(cors_anywhere + 'https://chieh-recipe-manager.herokuapp.com/recipes',
    {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
    .then(data => dispatch({ type: UserRecipesTypes.REQUEST_ALL_USER_RECIPES_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: UserRecipesTypes.REQUEST_ALL_USER_RECIPES_FAILED, payload: error }))
}

export const requestFilteredUserRecipes = keyword => ({
  type: UserRecipesTypes.REQUEST_FILTERED_USER_RECIPES,
  payload: keyword
})