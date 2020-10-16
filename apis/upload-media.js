import axios from "axios"
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const API_URL = publicRuntimeConfig.API_ENDPOINT;

class UploadMedia {
  upload(fileUploadInfo, callback) {
    return axios
      .post(API_URL + "transcribe/upload", fileUploadInfo, { onUploadProgress: function processcallback(progressEvent){      
        var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        callback(percentCompleted);
      }})
      .then(response => {
        console.log('response', response)
        return response.data;
      });
  }
}

export default new UploadMedia();