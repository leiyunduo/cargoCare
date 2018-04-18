// 获取权限列表
let formatAuthData = d => d.map(item => {
  return {
    id: item.id,
    pId: item.parent_id,
    name: item.name, 
    checked: item.is_select,
    open: !item.parent_id,
  }
})

let getAuthList = () => new Promise((resolve, reject) => {
  LXHR.POST(baseUrl + '/def/auth_manage/get_system_auth').done(res => {
    if(res.status=== 200) {
      pageInfo.sysAuthList = res.data
      resolve( formatAuthData(res.data) )
    }
  })
})