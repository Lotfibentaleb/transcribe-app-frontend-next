import axios from "axios"
import getConfig from "next/config";
import authHeader from "./auth-header";
const { publicRuntimeConfig } = getConfig();

const API_URL = publicRuntimeConfig.API_ENDPOINT;

class User {
  users() {
    return axios
      .get(API_URL + "users", { headers: authHeader() })
      .then(response => {
        return response.data;
      });
  }

  addUser(userInfo) {
    return axios
      .post(API_URL + "users/add", userInfo, { headers: authHeader() })
      .then(
        response => {
          return response.data;
        },
        error => {
          console.log(error)
        }
      )
  }

  deleteUser(id) {
    return axios
      .get(API_URL + "users/delete/" + id, { headers: authHeader() })
      .then(
        response => {
          return response.data;
        },
        error => {
          console.log(error)
        }
      )
  }

  editUser(userInfo, id) {
    return axios
      .post(API_URL + "users/edit/" + id, userInfo, { headers: authHeader() })
      .then(
        response => {
          return response.data;
        },
        error => {
          console.log(error)
        }
      )
  }
}

export default new User();