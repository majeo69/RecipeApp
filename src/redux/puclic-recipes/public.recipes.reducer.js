import PublicRecipesTypes from './public.recipes.types';

const INITIAL_STATE = {
  isPending: true,
  publicRecipes: []
}

const requestPublicRecipesReducer = (state = INITIAL_STATE, action={}) => {
  switch (action.type) {
    case PublicRecipesTypes.REQUEST_ALL_PUBLIC_RECIPES_PENGING:
      return {
        ...state,
        isPending: true
      }
    case PublicRecipesTypes.REQUEST_ALL_PUBLIC_RECIPES_SUCCESS:
      return {
        ...state,
        publicRecipes: action.payload,
        isPending: !state.isPending
      }
    case PublicRecipesTypes.REQUEST_ALL_PUBLIC_RECIPES_FAILED:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

export default requestPublicRecipesReducer;