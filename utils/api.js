import axios from "axios";
import { _getStoreData } from "./localStorage";


const instance = axios.create({
  baseURL: "https://api.pote.dev/",
});

export const addToken = async () => {
  const xsrfToken = await _getStoreData('xsrfToken');
  const accessToken = await _getStoreData('accessToken')
  instance.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
  instance.defaults.headers.common["x-xsrf-token"] = xsrfToken;

  console.log(instance.defaults.headers);
}

export default instance