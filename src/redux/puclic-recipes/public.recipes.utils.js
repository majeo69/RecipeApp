export const addUpTotalTime = (publicRecipes) => {
  return publicRecipes.map(
    publicRecipe => ({...publicRecipe, total_time: parseInt(publicRecipe.preparation)+parseInt(publicRecipe.cook_time)})
  )
}

export const filterPublicRecipes = (keywords, publicRecipes) => {
  const filteredRecipes = publicRecipes.filter(publicRecipe => {
    return publicRecipe.title.toLowerCase().includes(keywords.toLowerCase());
  });
  if (filteredRecipes.length !== 0) {
    return filteredRecipes;
  } else {
    return "no matches found. Please search with other keywords."
  }
}