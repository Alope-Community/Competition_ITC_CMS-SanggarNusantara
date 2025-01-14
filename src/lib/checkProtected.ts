const checkAuthToken = () => {
  const authToken = localStorage.getItem("authToken");

  if (authToken) {
    return true;
  }

  return false;
};

export default checkAuthToken;
