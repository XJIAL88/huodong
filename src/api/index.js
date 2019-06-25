import axios from "axios";

axios.defaults.baseURL = "https://etivities-czytest.colourlife.com";
axios.interceptors.response.use(result => result.data);

//=>查看列表
export let getList = () => {
  return axios.get('/backend/activity/list', {
      params: {
        adminId: '3',
        adminToken: 'bc4f4018a91aaaad7eb78327ee6d2949',
      }
    }
  );
};

//=>获取资源类型列表
export let getCategory = () => {
  return axios.get('/backend/category/list/get', {
    params: {
      adminId: '3',
      adminToken: 'bc4f4018a91aaaad7eb78327ee6d2949'
    },
  })
};

//=>获取资源列表
export let getResource = (num) => {
  return axios.get('/backend/resource/list/get', {
    params: {
      adminId: '3',
      adminToken: 'bc4f4018a91aaaad7eb78327ee6d2949',
      category_id: num
    },
  })
};

//=>新建活动
export let create = (a, b, c, d, e) => {
  return axios.post('/backend/activity/create', {
    adminId: '3',
    adminToken: 'bc4f4018a91aaaad7eb78327ee6d2949',
    name: a,
    start_at: b,
    end_at: c,
    rule: d,
    resource: e

  })
};
