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

export const createNewRecipe = (props) => (dispatch) => {
  dispatch({ type: UserRecipesTypes.CREATE_NEW_RECIPE_PENDING })
  fetch(cors_anywhere + 'https://chieh-recipe-manager.herokuapp.com/recipes',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + props.token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: props.title,
      preparation: props.preparation,
      cook_time: props.cook_time,
      servings: props.servings,
      ingredients: props.ingredients,
      steps: props.steps,
      public: props.public
    })
  }).then(response => {
    if(response.ok) {
      return response.json();
    } else {
      dispatch({ type: UserRecipesTypes.CREATE_NEW_RECIPE_FAILED, payload: 'Something went wrong, please submit it again' })
    }
  }).then(data => {
    if (data !== undefined) {
      dispatch({ type: UserRecipesTypes.CREATE_NEW_RECIPE_SUCCESS, payload: data })
    }
  }).catch(error => dispatch({ type: UserRecipesTypes.CREATE_NEW_RECIPE_FAILED, payload: error }))
}

export const requestFilteredUserRecipes = keyword => ({
  type: UserRecipesTypes.REQUEST_FILTERED_USER_RECIPES,
  payload: keyword
})

export const setUserCurrentPage = (data) => ({
  type: UserRecipesTypes.SET_CURRENT_PAGE,
  payload: data
})

export const setUserTotalPage = (data) => ({
  type: UserRecipesTypes.SET_TOTAL_PAGE,
  payload: data
})