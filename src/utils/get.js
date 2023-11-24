import axios from "axios";

export const get = async (query) => {
   const response = await axios.get(`${window.api}${query}`);
   return response.data;
};


