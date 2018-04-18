// 页面数据
const pageInfo = {
  baseUrl: 'http://47.93.90.229/test',
  // baseUrl: 'http://192.168.1.108:8080/lxtd-cca-apis',
  isEdit: false,
  id: '',
  authId: '',
  authList: [],
  nowUser: null,
  isAdmin: '',
  departId: '',
}

let baseUrl = globalBaseUrl.baseUrl || pageInfo.baseUrl
let {getStore} = Store

pageInfo.isAdmin = getStore('admin')
pageInfo.departId = getStore('departId')

$('.btn_clear_main').click(function () {
  clearSearch()
})

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
      resolve( formatAuthData(res.data) )
    }
  })
})