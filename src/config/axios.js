const baseURL = "https://api.github.com";

export const axiosConfig = {
  paths: {
    USERS: `${baseURL}/search/users`,
    REPOS: `${baseURL}/search/repositories`,
  },
};
