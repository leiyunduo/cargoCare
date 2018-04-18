const pageInfo = {
  sign_no: '',
  is_edit: false,
  type: $('.pick_up_page').data('type'),  // 0 主单 1 分单 
  order_no: '',
  editId: '',
  editState: '',
  flight_time: '',
  flight_no: '',
  arrive_record: '',
  // baseUrl: 'http://192.168.1.110:8080/lxtd-cca-apis',
  session_id: '',
  baseUrl: 'http://47.93.90.229/test',
}

let baseUrl = globalBaseUrl.baseUrl || pageInfo.baseUrl
let {getStore} = Store
pageInfo.session_id = getStore('session_id')

$('.btn_clear').click(function () {
  clearIpt()
})

$('.btn_clear_main').click(function () {
  clearSearch()
})

// 分页
const pagination = new Pagination

// 费用
const costInfo = new CostInfo

// 客服
const customInfo = new CustomInfo

costInfo.init('.cost_info_table')
customInfo.init('.service_info_table')

// 重置
let resetAll = () => {
  costInfo.change()
  customInfo.change()
  pageInfo.order_no = ''
  clearIpt()
  clearError()
  $(".tabBox.detail").scrollTop(0)
}

// toUpperCase
toUpper()

$('.order_no').on('change', function () {
  if($('.detail_order_no_3').val() && $('.detail_order_no_8').val()){
    let order_no = $('.detail_order_no_3').val() + $('.detail_order_no_8').val()
    pageInfo.order_no = order_no
  }
})