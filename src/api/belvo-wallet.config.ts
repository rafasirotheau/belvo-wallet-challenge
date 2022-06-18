import axios from "axios";

const belvoApiInstance = axios.create({
  baseURL: "https://belvo-wallet-challenge-api.herokuapp.com/",
});

export function setToken(token: string, instance = belvoApiInstance) {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default belvoApiInstance;
