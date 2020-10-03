export const filterUserRecipes = (keywords, userRecipes) => {
  const filteredRecipes = userRecipes.filter(userRecipe => {
    return userRecipe.title.toLowerCase().includes(keywords.toLowerCase());
  });
  if (filteredRecipes.length !== 0) {
    return filteredRecipes;
  } else {
    return "no matches found"
  }
}