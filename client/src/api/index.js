import axios from "axios"; 

const Api  = axios.create({
  baseURL : 'https://cloud-pic-app-api.vercel.app/api/cloud-pic',
  headers: {
    ContentType: "application/json",
  }, 
});

export default Api;
