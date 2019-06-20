import axios from "axios";

axios.defaults.baseURL = "https://etivities-czytest.colourlife.com";
axios.interceptors.response.use(result=>result.data);
export let getList =()=>{
  return axios.get("/backend/activity/list",{
    params: {
      id:'3',
      token:'bc4f4018a91aaaad7eb78327ee6d2949'
    }
  });
};
