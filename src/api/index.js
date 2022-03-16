import axios from "axios";
import { BASE_URL } from "@/constants";

export const getCategories = async (formdata, filterName) => {
  const response = await axios.post(
    `${BASE_URL}/api/v1/${filterName}`,
    formdata
  );
  return response;
};
