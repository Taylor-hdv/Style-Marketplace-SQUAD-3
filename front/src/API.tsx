import axios from "axios";

const URL = "http://localhost:3333";

const API = axios.create({baseURL: URL, headers: {"Content-type":"application/json"}, timeout: 5000});

export default API;