import axios from "axios";

axios.defaults.baseURL = "https://etivities-czytest.colourlife.com";
axios.interceptors.response.use(result => result.data);

//=>查看列表
export let getList = (obj) => {
  let {now_page, page_size} = obj;
  return axios.get('/backend/activity/list', {
      params: {
        adminId: '3',
        adminToken: 'bc4f4018a91aaaad7eb78327ee6d2949',
        page: now_page,
        page_size: page_size
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

//=>查看活动详情
export let detail = (num) => {
  return axios.get('/backend/activity/detail', {
    params: {
      adminId: '3',
      adminToken: 'bc4f4018a91aaaad7eb78327ee6d2949',
      id: num
    },
  })
};


//=>活动上下架
export let update = (id, num) => {
  return axios.post('/backend/activity/status/update', {
    adminId: '3',
    adminToken: 'bc4f4018a91aaaad7eb78327ee6d2949',
    id: id,
    status: num,

  })
};

//=>获取活动资源列表
export let activity = (a, b) => {
  return axios.get('/backend/activity/detail', {
    params: {
      adminId: '3',
      adminToken: 'bc4f4018a91aaaad7eb78327ee6d2949',
      category_id: a,
      number: b,
      page_size: 500,
      page: 1
    },
  })
};

//=>获取活动资源列表
export let awardList = (a, b) => {
  return axios.get('/backend/activity/award/list', {
    params: {
      adminId: '3',
      adminToken: 'bc4f4018a91aaaad7eb78327ee6d2949',
    },
  })
};

//=>获取活动资源列表
export let awardset = () => {
  return axios.get('/backend/resource/activity/list', {
    params: {
      adminId: '3',
      adminToken: 'bc4f4018a91aaaad7eb78327ee6d2949',
      page_size: 500,
      page: 1
    },
  })
};

