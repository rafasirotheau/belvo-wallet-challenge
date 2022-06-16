import axios from "axios";

const instance = axios.create({
  baseURL: "https://belvo-wallet-challenge-api.herokuapp.com/",
});

export function setToken(token: string) {
  instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default instance;
