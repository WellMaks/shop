export function getToken() {
  return localStorage.getItem("token");
}

export function isTokenExist() {
  return getToken() !== null;
}
