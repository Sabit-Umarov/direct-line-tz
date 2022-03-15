import axios from "axios";
import { BASE_URL } from "@/constants";

export const getCategories = async (formdata) => {
  const response = await axios.post(`${BASE_URL}/api/v1/categories`, formdata);
  return response;
};
