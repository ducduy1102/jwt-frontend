import axios from "../utils/axios";

const createRole = (roles) => {
  return axios.post("/api/v1/role/create", [...roles]);
};

export { createRole };
