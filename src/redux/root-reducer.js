import { combineReducers } from 'redux';
import requestPublicRecipesReducer from './puclic-recipes/public.recipes.reducer'

const rootRuducer = combineReducers({
  publicRecipes: requestPublicRecipesReducer
})

export default rootRuducer;

