// 页面数据
const pageInfo = {
  id: $('.page_info').data('id'),
  userId: '',
  baseUrl: 'http://47.93.90.229/test',
  // baseUrl: 'http://192.168.1.106:8080/lxtd-cca-apis',
  searchItems: [{name: '单号', en_name: 'order_no', is_select: 1,}],
  showItems: [{name: '单号', en_name: 'order_no', is_select: 1,}],
  checkedSearchItems: [],
  checkedShowItems: [],
  dropdownItems: [],
  print: false,
  haveBasis: $('.page_info').data('havebasis'),
}

let baseUrl = globalBaseUrl.baseUrl || pageInfo.baseUrl
let {getStore} = Store

pageInfo.userId = getStore('userId')

$('.btn_clear').on('click', function () {
  clearSearch()
})