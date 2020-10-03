import { combineReducers } from 'redux';
import requestPublicRecipesReducer from './puclic-recipes/public.recipes.reducer';
import requestUserRecipesReducer from './user-recipes/user.recipes.reducer';
import userReducer from './user/user.reducer';

import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'


const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['user']
}

const rootRuducer = combineReducers({
  publicRecipes: requestPublicRecipesReducer,
  userRecipes: requestUserRecipesReducer,
  user: userReducer
})

export default persistReducer(persistConfig, rootRuducer)
