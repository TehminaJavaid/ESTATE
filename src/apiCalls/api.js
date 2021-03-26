import { routes } from "./apiConfig";
import axios from "axios";

const login = async () => {
  try {
    const res = fetch(
      "https://estate92.herokuapp.com/api/list/project/regions"
    );
    return res;
  } catch (err) {
    throw err.response;
  }
};
const city = async (dropvalue) => {
  try {
    const res = fetch(
      "https://estate92.herokuapp.com/api/list/project/cities/" + dropvalue
    );
    console.log("city", res);
    return res;
  } catch (err) {
    throw err.response;
  }
};
const area = async (dropvalue) => {
  try {
    const res = fetch(
      "https://estate92.herokuapp.com/api/list/project/areas/" + dropvalue
    );
    console.log("area", res);
    return res;
  } catch (err) {
    throw err.response;
  }
};

export default {
  login,
  city,
  area,
};
