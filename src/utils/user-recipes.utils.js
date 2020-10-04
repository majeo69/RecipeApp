export const userPagination = (userRecipes, filteredUserRecipes, currentPage, totalPage) => {
  if (typeof(filteredPublicRecipes) === 'string') {
    return filteredUserRecipes;
  } else if (filteredUserRecipes.length === 0) {
    if (currentPage === totalPage) {
      return userRecipes.slice((currentPage-1)*6);
    } else {
      return userRecipes.slice((currentPage-1)*6, (currentPage*6));
    }
  } else {
    if (currentPage === totalPage) {
      return filteredUserRecipes.slice((currentPage-1)*6);
    } else {
      return filteredUserRecipes.slice((currentPage-1)*6, (currentPage*6));
    }
  }
}