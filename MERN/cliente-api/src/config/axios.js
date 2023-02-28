import axios from "axios";

const clienteAxios = axios.create({
  baseURL: "htpp://127.0.0.1:3000",
});

export default clienteAxios;
