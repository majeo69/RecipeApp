export const publicPagination = (publicRecipes, filteredPublicRecipes, currentPage, totalPage) => {
  if (typeof(filteredPublicRecipes) === 'string') {
    return filteredPublicRecipes;
  } else if (filteredPublicRecipes.length === 0) {
    if (currentPage === totalPage) {
      return publicRecipes.slice((currentPage-1)*9);
    } else {
      return publicRecipes.slice((currentPage-1)*9, (currentPage*9));
    }
  } else {
    if (currentPage === totalPage) {
      return filteredPublicRecipes.slice((currentPage-1)*9);
    } else {
      return filteredPublicRecipes.slice((currentPage-1)*9, (currentPage*9));
    }
  }
}