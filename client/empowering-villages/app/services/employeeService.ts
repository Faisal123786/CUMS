import axios from "../lib/axios";

export const addEmployee = async(data: object) => {
    const response = await axios.post("/dashboard/add-new-employee", data);
  return response.data
};

export const getAllEmployee = async() => {
    const response = await axios.get("/dashboard/employee");
  return response.data
};

