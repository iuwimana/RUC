import http from "./httpService";
import  apiUrl  from "../config.json";

const apiEndpoint = apiUrl.apiUrl + "/auth/register";

export function register(Email,Password,FullName) {
  return http.post(apiEndpoint, {
    Email,
    Password,
    FullName
  });
}
