import axios from "axios";

const Api = axios.create({
  baseURL: "https://api-antrian.rsreksawaluya.com.dev/", //untuk development
  // baseURL: "https://api-antrian.rsreksawaluya.com",
});

export default Api;
