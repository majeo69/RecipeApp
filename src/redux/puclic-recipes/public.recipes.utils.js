export const addUpTotalTime = (publicRecipes) => {
  return publicRecipes.map(
    publicRecipe => ({...publicRecipe, total_time: parseInt(publicRecipe.preparation)+parseInt(publicRecipe.cook_time)})
  )
}

export const filterPublicRecipes = (keyword, publicRecipes) => {
  if (keyword === 'random') {
    return [publicRecipes[Math.floor(Math.random()*publicRecipes.length)]];
  } else {
    const filteredRecipes = publicRecipes.filter(publicRecipe => {
      return publicRecipe.title.toLowerCase().includes(keyword.toLowerCase());
    });
    if (filteredRecipes.length !== 0) {
      return filteredRecipes;
    } else {
      return "no matches found."
    }
  }
}