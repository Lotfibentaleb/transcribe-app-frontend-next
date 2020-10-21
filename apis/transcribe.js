import axios from "axios";
import getConfig from "next/config";
import authHeader from "./auth-header";
const { publicRuntimeConfig } = getConfig();

const API_URL = publicRuntimeConfig.API_ENDPOINT;

class Transcribe {
  transcribe (s3_url, mediaId) {
    var jsonObj = {s3_url : "", lang: ""}
    jsonObj.s3_url = s3_url;
    jsonObj.lang = "en-US";
    jsonObj.index = 0;
    return axios
      .post(API_URL + "transcribe/" + mediaId, jsonObj)
      .then(
        response => {
          return response.data;
        },
        error => {
          console.log('error', error)
          var json = '{"msg":"S3 upload failure", "success": "false", "index": 0, "error":' + error + '}';
          return JSON.parse(json);
        }
      )
  };
  
  multitranscribes (s3_url, mediaId, index, spokenLanguage) {
    console.log(s3_url)
    console.log(mediaId)
    console.log(index)
    var jsonObj = {s3_url : "", lang: ""}
    jsonObj.s3_url = s3_url;
    jsonObj.lang = spokenLanguage;
    jsonObj.index = index;
    
    return axios
      .post(API_URL + "transcribe/" + mediaId, jsonObj)
      .then(
        response => {
          return response.data;
        },
        error => {
          console.log('error', error)
          var json = '{"msg":"S3 upload failure", "success": "false", "index": ' + index + ', "error":' + error + '}';
          return JSON.parse(json);
        }
      )
  }
}

export default new Transcribe();