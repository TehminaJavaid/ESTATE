import { routes } from "./apiConfig";
import axios from "axios";
const instance = axios.create();

const login = async () => {
  try {
    const res = instance.get(
      "https://estate92.herokuapp.com/api/list/project/regions"
    );
    return res;
  } catch (err) {
    throw err.response;
  }
};
const city = (dropvalue) => {
  try {
    const res = instance.get(
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
    const res = instance.get(
      "https://estate92.herokuapp.com/api/list/project/areas/" + dropvalue
    );
    console.log("area", res);
    return res;
  } catch (err) {
    throw err.response;
  }
};
const addproject = async (projectform) => {
  try {
    const res = instance.post(
      "https://estate92.herokuapp.com/api/test",
      projectform
    );

    console.log("pro", res);
    return res;
  } catch (err) {
    throw err.response;
  }
};
export default {
  login,
  city,
  area,
  addproject,
};
