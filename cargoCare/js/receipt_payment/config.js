const pageInfo = {
  // baseUrl: 'http://192.168.1.110:8080/lxtd-cca-apis',
  baseUrl: 'http://47.93.90.229/test',
  nowData: null,
  pendingState: '',
  click_check_able: '',
  click_receipt_able: '',
  recpayType: $('.page').data('recpay'),    // 0 收款 1 付款
  allData: null,
  total: '',
  deparrType: $('.page').data('deparr'),    // 0 出发 1 到达
}

let baseUrl = globalBaseUrl.baseUrl || pageInfo.baseUrl
let checkedData = []

let clearPriceDetail = () => {
  $('.price_detail input').val('')
  $('.price_detail .ui.checkbox').checkbox('uncheck')
}

let clearReceiptDetail = () => {
  $('.receipt_detail input').val('')
  $('.receipt_detail .ui.checkbox').checkbox('uncheck')
}

let gotoMain = () => {
  $('.two_level_menu_wrap').hide()
  $('.multiple_receivables_wrap').hide()
}

let reset = () => {
  clearIpt()
  clearPriceDetail()
}