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


export const getVillageDetailById = async(id:string) => {
   const response = await axios.get(`/dashboard/village-detail/${id}`);
  return response.data
};

export const getAllvillageswithoutEmployee = async() => {
   const response = await axios.get("/dashboard/villages/unassigned/");
  return response.data
};

