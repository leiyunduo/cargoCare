
const pageInfo = {
  // baseUrl: 'http://192.168.1.100:8080/lxtd-cca-apis',
  baseUrl: 'http://47.93.90.229/test',
  flight_id: '',
}

let baseUrl = globalBaseUrl.baseUrl || pageInfo.baseUrl

// 分页
const bookPagination = new Pagination
const listPagination = new Pagination
const closePagination = new Pagination

let now_Flight_Info = {
  flight_no: '',
  plan_fry_date: '',
  departure_code: '',
  destination_code: '',
}

// 填充航班信息
let fillFlightInfo = context => {
  let {flight_no, plan_fry_date, departure_code, destination_code} = now_Flight_Info
  $(context).find('.no_2').val(flight_no.slice(0, 2))
  $(context).find('.num_4').val(flight_no.slice(2, 6))
  $(context).find('.plan_flight_date').val(plan_fry_date)
  $(context).find('.departure_code').val(departure_code)
  $(context).find('.destination_code').val(destination_code)
}

let fillBook = () => {
  // TODO
}

let fillList = () => {
  fillFlightInfo('.list')
}

let fillBegin = () => {
  fillFlightInfo('.begin')
}

let fillEnd = () => {
  fillFlightInfo('.end')
}

// 跳页面
let hideAll = () => {
  $(".stowagepage").hide()
}

let gotoBook = () => {
  hideAll()
  $(".stowage_booking").show()
}

let gotoList = () => {
  hideAll()
  $(".stowage_booking_list").show()
}

let gotoBegin = () => {
  hideAll()
  $(".beginning_of_manifest_information").show()
}

let gotoEnd = () => {
  hideAll()
  $(".ending_of_manifest_information").show()
}

let gotoClose = () => {
  hideAll()
  $(".flight_closed").show()
}

$('.gotoBooking').on('click', function () {
  gotoBook()
})

$('.gotoList').on('click', function () {
  gotoList()
})

$('.gotoBegin').on('click', function () {
  gotoBegin()
})

$('.gotoEnd').on('click', function () {
  gotoEnd()
})

$('.gotoClose').on('click', function () {
  gotoClose()
})