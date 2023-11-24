import axios from "axios";

export const post = async (query, data) => {
   const response = await axios.post(`${window.api}${query}`, data, {
      headers: { "Content-Type": "application/json" },
   });
   return response.data;
};
