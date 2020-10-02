import { combineReducers } from 'redux';
import requestPublicRecipesReducer from './puclic-recipes/public.recipes.reducer';
import userReducer from './user/user.reducer';

const rootRuducer = combineReducers({
  publicRecipes: requestPublicRecipesReducer,
  user: userReducer
})

export default rootRuducer;

