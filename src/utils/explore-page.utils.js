export const publicPagination = (publicRecipes, filteredPublicRecipes, currentPage, totalPage) => {
  if (typeof(filteredPublicRecipes) === 'string') {
    return filteredPublicRecipes;
  } else if (filteredPublicRecipes.length === 0) {
    if (currentPage === totalPage) {
      return publicRecipes.slice((currentPage-1)*8);
    } else {
      return publicRecipes.slice((currentPage-1)*8, (currentPage*8));
    }
  } else {
    if (currentPage === totalPage) {
      return filteredPublicRecipes.slice((currentPage-1)*8);
    } else {
      return filteredPublicRecipes.slice((currentPage-1)*8, (currentPage*8));
    }
  }
}