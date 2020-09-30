import { apiCall } from '../../api/api';
import PublicRecipesTypes from './public.recipes.types';

const cors_anywhere = 'https://chieh-cors-anywhere.herokuapp.com/'

export const requestAllPublicRecipes = () => (dispatch) => {
  dispatch({ type: PublicRecipesTypes.REQUEST_ALL_PUBLIC_RECIPES_PENGING })
  apiCall(cors_anywhere + 'https://chieh-recipe-manager.herokuapp.com/recipes/public',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(data => dispatch({ type: PublicRecipesTypes.REQUEST_ALL_PUBLIC_RECIPES_SUCCESS, payload: data }))
    .catch(error => dispatch({ type: PublicRecipesTypes.REQUEST_ALL_PUBLIC_RECIPES_FAILED, payload: error }))
}