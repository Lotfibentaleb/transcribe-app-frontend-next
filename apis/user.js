import axios from "axios"

const API_URL = process.env.API_ENDPOINT;

class User {
  users() {
    return axios
      .get(API_URL + "users")
      .then(response => {
        return response.data;
      });
  }

  addUser(userInfo) {
    return axios
      .post(API_URL + "users/add", userInfo)
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