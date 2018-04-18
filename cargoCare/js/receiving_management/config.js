// 页面数据
const pageInfo = {
  isEdit: false,
  isPrice: false,
  order_no: '',
  editId: '',
  type: $('.receive_page').data('type'), // 0 主单 1 分单
  bindNum: 0, 
  status: '',
  real_name: Store.getStore('real_name'),
  baseUrl: 'http://192.168.1.115:8080/lxtd-cca-apis',
  // baseUrl: 'http://47.93.90.229/test',
}

// 拼单数据
let selectList = []
let selectedList = []

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
  costInfo.change()
  customInfo.change()
  volumeInfo.change()
  arriveInfo.reset()
  pageInfo.isPrice = false
  clearIpt()
  $('.price_species').html('')
  clearError()
  pageInfo.order_no = ''

  selectList = []
  selectedList = []

  if(pageInfo.type){
    $('.d_order_code').val('SJW')
  }
  $(".tabBox.detail").scrollTop(0)
}

// toUpperCase
toUpper()

// 获取单号
$('.order_no').on('change', function () {
  if($('.d_order_code').val() && $('.d_order_num').val()){
    pageInfo.order_no = $('.d_order_code').val() + $('.d_order_num').val()
  }
})