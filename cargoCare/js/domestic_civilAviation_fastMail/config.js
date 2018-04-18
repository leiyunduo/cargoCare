const pageInfo = {
  isEdit: false,
  reset: false,
  edit_order_no: '',
  // baseUrl: 'http://192.168.1.112:8080/lxtd-cca-apis',
  baseUrl: 'http://47.93.90.229/test',
}

let baseUrl = globalBaseUrl.baseUrl || pageInfo.baseUrl

$('.btn_clear').click(function () {
  clearIpt()
})

$('.btn_clear_main').click(function () {
  clearSearch()
})

// 组件====================================================================================================
// 分页
const paginationMain = new Pagination
const pagination = new Pagination

// 费用
const costInfo = new CostInfo

// 客服情况
const customInfo = new CustomInfo

// 体积情况
const volumeInfo = new VolumeInfo

// 到达情况
const arriveInfo = new ArriveInfo

// 相关航班信息
const flightInfo = new FlightInfo

costInfo.init('.cost_info_table')
volumeInfo.init('.volume_info_table')
customInfo.init('.service_info_table')
arriveInfo.init('.arrival_info_table', baseUrl)
flightInfo.init('.relate_flight_info_table', baseUrl, pagination)

// 重置
let resetAll = () => {
  clearIpt()
  clearError()
  costInfo.change()
  customInfo.change()
  volumeInfo.change()
  flightInfo.change()
  $('.detail_order_three_code').val('CAE')
  $(".tabBox.detail").scrollTop(0)
}

// toUpperCase
toUpper()

// 获取单号
$('.order_no').on('change', function () {
  if($('.detail_order_three_code').val() && $('.detail_order_num').val()){
    pageInfo.edit_order_no = $('.detail_order_three_code').val() + $('.detail_order_num').val()
  }
})

