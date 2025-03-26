const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (error) {
    console.log(error);
    return null;
  }
};

const isTokenExpired = (token) => {
  const decodeToken = parseJwt(token);
  if (!decodeToken) return true;

  const currentTime = Math.floor(Date.now() / 1000);

  return decodeToken.exp < currentTime;
};

export const getValidToken = () => {
  const token = localStorage.getItem("token");
  if (!token || isTokenExpired(token)) {
    localStorage.removeItem("token");
    return null;
  }

  return token;
};

export const clearAuth = () => {
  localStorage.removeItem("token");
};
