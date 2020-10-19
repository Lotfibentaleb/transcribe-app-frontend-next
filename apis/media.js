import axios from "axios"
import getConfig from "next/config";
import authHeader from "./auth-header";
const { publicRuntimeConfig } = getConfig();

const API_URL = publicRuntimeConfig.API_ENDPOINT;

class Media {
  medias() {
    return axios
      .get(API_URL + "medias")
      .then(
        response => {
          return response.data;
        },
        error => {
          return error
        }
      );
  }

  deleteMedia(id) {
    return axios
      .get(API_URL + "medias/delete/" + id)
      .then(
        response => {
          return response.data;
        },
        error => {
          return error
        }
      )
  }
}

export default new Media();