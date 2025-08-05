import axios from "../lib/axios";

export const addVillage = async(data: FormData) => {
    const response = await axios.post("/dashboard/add-new-village", data, {
       headers: { "Content-Type": "multipart/form-data" },
    });
  return response.data
};

export const getAllvillages = async() => {
   const response = await axios.get("/dashboard/villages");
  return response.data
};

