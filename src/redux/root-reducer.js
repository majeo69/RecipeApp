import { combineReducers } from 'redux';
import requestPublicRecipesReducer from './puclic-recipes/public.recipes.reducer';
import requestUserRecipesReducer from './user-recipes/user.recipes.reducer';
import createUserRecipeReducer from './create-recipe/create.recipe.reducer';
import updateUserRecipeReducer from './update-recipe/update.recipe.reducer';
import deleteUserRecipeReducer from './delete-recipe/delete.recipe.reducer';
import userReducer from './user/user.reducer';

import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'


const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['user', 'updateRecipe']
}

const StatsPersistConfig = {
  key: 'stats',
  storage: storageSession,
  whitelist: ['public_count', 'total_count']
};

const selectedPublicPersistConfig = {
  key: 'selectedType',
  storage: storageSession,
  whitelist: ['selectedType', 'totalPages']
}

const rootRuducer = combineReducers({
  publicRecipes: persistReducer(selectedPublicPersistConfig, requestPublicRecipesReducer),
  userRecipes: persistReducer(StatsPersistConfig, requestUserRecipesReducer),
  user: userReducer,
  createRecipe: createUserRecipeReducer,
  updateRecipe: updateUserRecipeReducer,
  deleteRecipe: deleteUserRecipeReducer
})

export default persistReducer(persistConfig, rootRuducer)
