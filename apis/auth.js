import axios from "axios"
import authHeader from './auth-header';


const API_URL = process.env.API_ENDPOINT;

class Auth {
  login(authInfo) {
    return axios
      .post(API_URL + "auth/login", authInfo)
      .then(response => {        
        if (response.data.token) {          
          localStorage.setItem("user", JSON.stringify(response.data));          
        }
        return response.data;
      });      
  }

  logout() {
    localStorage.clear();
  }

  register(name, email, password) {    
    return axios
    .post(API_URL + "register", {
      name,
      email,
      password
    })
    .then(response => {      
      return response.data;
    });
  }

  
}

export default new Auth();