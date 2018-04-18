// 页面数据
const pageInfo = {
  id: 1049,
  userId: '',
  baseUrl: 'http://47.93.90.229/test',
  // baseUrl: 'http://192.168.1.112:8080/lxtd-cca-apis',
  searchItems: [],
  showItems: [],
  checkedSearchItems: [],
  checkedShowItems: [],
  dropdownItems: [],
}

let {baseUrl} = pageInfo
let {getStore} = Store

pageInfo.userId = getStore('userId')

$('.btn_clear').on('click', function () {
  clearSearch()
})