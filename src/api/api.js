import axios from 'axios';
// 获取活动模块列表
export const reqActiveModuleLists = (activity_id) => {
  return axios.get('/backend/module/list',{
    params: {
      adminId: '3',
      adminToken:'bc4f4018a91aaaad7eb78327ee6d2949',
      activity_id,
    }
  })
};

// 新建活动模块
export const reqCreateActiveModule = (activity_id, name, type_id) => {
  return axios.post('/backend/module/create',{
    adminId: '3',
    adminToken:'bc4f4018a91aaaad7eb78327ee6d2949',
    activity_id,
    name,
    type_id,
  })
};

// 获取活动模块列表
export const reqModuleTypeList = () => {
  return axios.get('/backend/module/type/list',{
    params: {
      adminId: '3',
      adminToken:'bc4f4018a91aaaad7eb78327ee6d2949'
    }
  })
};

// 上传用户限制包
export const reqUserPackageUpload = (module_id, file) => {
  return axios.post('/backend/user/package/upload',{
    adminId: '3',
    adminToken:'bc4f4018a91aaaad7eb78327ee6d2949',
    module_id,
    package: file
  })
};

// 配置模块
export const reqConfigModule = (activity_id, module_id, name, start_at, end_at,desc,number_daily,
                                number_weekly,number_total,limit_type,limit_register_time,limit_login_time,
                                limit_no_login_time,has_limit_user_package,has_limit_signed
) => {
  return axios.post('/backend/module/edit',{
    adminId: '3',
    adminToken:'bc4f4018a91aaaad7eb78327ee6d2949',
    activity_id,  // 活动ID
    module_id,  // 模块ID
    name,  // 模块名称
    start_at,  // 活动模块开始时间
    end_at,  // 活动模块结束时间
    desc,  // 活动模块描述
    number_daily,  // 每日可参加次数
    number_weekly,  // 每周可参加次数
    number_total,  // 总共可参加次数
    limit_type,  // 限制类型
    limit_register_time, // 限制注册时间
    limit_login_time, // 限制登录时间
    limit_no_login_time, // 限制未登录时间
    has_limit_user_package, // 是否上传用户限制包
    has_limit_signed // 是否设置签到
  })
};
