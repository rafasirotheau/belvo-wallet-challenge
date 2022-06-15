import axios from "axios";

const instance = axios.create({
  baseURL: 'https://belvo-wallet-challenge-api.herokuapp.com/'
});

export default instance;
