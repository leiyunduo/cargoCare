// 页面数据
const pageInfo = {
  baseUrl: 'http://47.93.90.229/test',
  // baseUrl: 'http://192.168.1.108:8080/lxtd-cca-apis',
  isEdit: false,
  id: '',
  isAdmin: '',
  departId: '',
  sysAuthList: null,
}

let baseUrl = globalBaseUrl.baseUrl || pageInfo.baseUrl

let {getStore} = Store
pageInfo.isAdmin = getStore('admin')
pageInfo.departId = getStore('departId')

$('.btn_clear').click(function () {
  clearIpt()
})

$('.btn_clear_main').click(function () {
  clearSearch()
})

let resetAll = () => {
  clearIpt()
  clearError()
}