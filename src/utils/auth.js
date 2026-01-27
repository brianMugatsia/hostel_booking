// Returns the currently logged-in user from localStorage
export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser"));
};
