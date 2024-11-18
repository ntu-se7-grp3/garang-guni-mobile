import axios from "axios";

const BASE_URL = "";

const backEnd = axios.create({ baseURL: BASE_URL });

export default backEnd;
