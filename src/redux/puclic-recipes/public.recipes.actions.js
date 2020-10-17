import { apiCall } from '../../api/api';
import PublicRecipesTypes from './public.recipes.types';

export const requestAllPublicRecipes = () => (dispatch) => {
  dispatch({ type: PublicRecipesTypes.REQUEST_ALL_PUBLIC_RECIPES_PENGING })
  apiCall('https://chieh-recipe-manager.herokuapp.com/recipes/public',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(data => dispatch({ type: PublicRecipesTypes.REQUEST_ALL_PUBLIC_RECIPES_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: PublicRecipesTypes.REQUEST_ALL_PUBLIC_RECIPES_FAILED, payload: error }))
}

export const requestFilteredPublicRecipes = (keyword) => ({
  type: PublicRecipesTypes.REQUEST_FILTERED_PUBLIC_RECIPES,
  payload: keyword
})

export const setCurrentPage = (data) => ({
  type: PublicRecipesTypes.SET_CURRENT_PAGE,
  payload: data
})

export const setTotalPage = (data) => ({
  type: PublicRecipesTypes.SET_TOTAL_PAGE,
  payload: data
})