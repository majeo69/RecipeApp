export const addUpTotalTime = (userRecipes) => {
  return userRecipes.map(
    userRecipe => ({...userRecipe, total_time: parseInt(userRecipe.preparation)+parseInt(userRecipe.cook_time)})
  )
}

export const countPublicStats = (userRecipes) => {  
  let count = 0;
  for (let i = 0; i < userRecipes.length; i++) {
    if (userRecipes[i].public){
      count = count + 1;
    } 
  }
  return count;
}

export const filterUserRecipes = (keywords, userRecipes) => {
  const filteredRecipes = userRecipes.filter(userRecipe => {
    return userRecipe.title.toLowerCase().includes(keywords.toLowerCase());
  });
  if (filteredRecipes.length !== 0) {
    return filteredRecipes;
  } else {
    return "no matches found. Please search with other keywords."
  }
}