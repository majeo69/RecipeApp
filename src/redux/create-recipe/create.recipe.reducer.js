import CreateRecipesTypes from './create.recipe.types';

const INITIAL_STATE = {
  createRecipeErrormsg: '',
  createRecipePending: false,
  newRecipe: {},
  createSuccessStatus: false,
  uploadFoodimgPending: false,
  uploadFoodimgSuccess: false,
  uploadFoodimgErrormsg: ''
}

const createUserRecipeReducer = (state = INITIAL_STATE, action={}) => {
  switch(action.type) {
    case CreateRecipesTypes.CREATE_NEW_RECIPE_PENDING:
      return {
        ...state,
        createRecipePending: true,
        createSuccessStatus: false,
        createRecipeErrormsg: '',
        newRecipe: {}
      }
    case CreateRecipesTypes.CREATE_NEW_RECIPE_SUCCESS:
      return {
        ...state,
        newRecipe: action.payload,
        createRecipePending: false,
        createSuccessStatus: true,
        createRecipeErrormsg: '',
        uploadFoodimgPending: false,
        uploadFoodimgSuccess: false,
        uploadFoodimgErrormsg: ''
      }
    case CreateRecipesTypes.CREATE_NEW_RECIPE_FAILED:
      return {
        ...state,
        createRecipePending: false,
        createSuccessStatus: false,
        createRecipeErrormsg: action.payload,
      }
    case CreateRecipesTypes.CREATE_NEW_RECIPE_RESET_STATE:
      return {
        createRecipeErrormsg: '',
        createRecipePending: false,
        newRecipe: {},
        createSuccessStatus: false,
        uploadFoodimgPending: false,
        uploadFoodimgSuccess: false,
        uploadFoodimgErrormsg: ''
      }
    case CreateRecipesTypes.UPLOAD_RECIPE_PIC_PENDING:
      return {
        ...state,
        newRecipe: {},
        uploadFoodimgPending: true,
        uploadFoodimgSuccess: false,
        uploadFoodimgErrormsg: ''
      }
    case CreateRecipesTypes.UPLOAD_RECIPE_PIC_SUCCESS:
      return {
        ...state,
        newRecipe: action.payload,
        uploadFoodimgSuccess: true,
        uploadFoodimgPending: false,
        uploadFoodimgErrormsg: '',
      }
    case CreateRecipesTypes.UPLOAD_RECIPE_PIC_FAILED:
      return {
        ...state,
        newRecipe: {},
        uploadFoodimgPending: false,
        uploadFoodimgSuccess: false,
        uploadFoodimgErrormsg: action.payload
      }
    case CreateRecipesTypes.SET_ON_EDIT_RECIPE_FOR_PHOTO:
      return {
        ...state,
        newRecipe: action.payload,
        uploadFoodimgPending: false,
        uploadFoodimgSuccess: false,
        uploadFoodimgErrormsg: ''
      }
    default:
      return state
  }
}

export default createUserRecipeReducer;

