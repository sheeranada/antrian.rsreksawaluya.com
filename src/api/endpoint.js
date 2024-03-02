import axios from "axios";

const Api = axios.create({
  baseURL: "https://api-antrian.rsreksawaluya.com.dev/",
});

export default Api;
