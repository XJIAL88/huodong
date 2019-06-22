import axios from "axios";

axios.defaults.baseURL = "https://etivities-czytest.colourlife.com";
axios.interceptors.response.use(result => result.data.content);

//=>新建活动
// export let getCreate =()=>{
//   return axios.post("/backend/activity/create", {
//     adminId:'3',
//     adminToken:'bc4f4018a91aaaad7eb78327ee6d2949'
//   });
// };

//=>查看活动
// prizeSet.vue

//=>获取资源列表
// export let getCategory = () => {
//   return axios.get('/backend/category/list/get',{
//     params: {
//       adminId: '3',
//     },
//   })
// };
