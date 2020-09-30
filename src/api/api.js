export const apiCall = (link, requestbody) =>
  fetch(link, requestbody).then(response => response.json())