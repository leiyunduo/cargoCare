const pageInfo = {
  isEdit: false,
  order_no: '',
  editId: '',
  real_name: Store.getStore('real_name'),
  // baseUrl: 'http://192.168.1.112:8080/lxtd-cca-apis',
  baseUrl: 'http://47.93.90.229/test',
  render_relate_flight: true,
}

let baseUrl = globalBaseUrl.baseUrl || pageInfo.baseUrl

$('.btn_clear').click(function () {
  clearIpt()
})

$('.btn_clear_main').click(function () {
  clearSearch()
})

// 分页
const pagination = new Pagination
const paginationMain = new Pagination

// 客服记录
const customInfo = new CustomInfo

// 相关航班信息
const flightInfo = new FlightInfo

customInfo.init('.service_info_table')
flightInfo.init('.relate_flight_info_table', baseUrl, pagination)

// 重置
let resetAll = () => {
  clearError()
  clearIpt()
  customInfo.change()
  $(".tabBox.detail").scrollTop(0)
}

// toUpperCase
toUpper()

// 获取单号
$('.order_no').on('change', function () {
  if($('.detail_order_no_3').val() && $('.detail_order_no_8').val()){
    let order_no = $('.detail_order_no_3').val() + $('.detail_order_no_8').val()
    pageInfo.order_no = order_no
  }
})