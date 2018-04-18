/**
 * 进港作业航班
 */

const pageInfo = {
  // baseUrl: 'http://192.168.1.112:8080/lxtd-cca-apis',
  baseUrl: 'http://47.93.90.229/test',
}

let baseUrl = globalBaseUrl.baseUrl || pageInfo.baseUrl

const getFlightOperationListUrl = baseUrl + '/def/FlightOperation/pageFlightOperationMain'
let getFlightOperationListParams = {
  two_flight_code: '',
  flight_num: '',
  flight_no: '',
  plan_fry_date: '',
  billing_time_start: '',
  billing_time_end: '',
  model_code: '',
  departure_name: ''
}

let renderTable = data => {
  data = data || []
  let str = data.map((item, index) => {
    typeof item === 'object' && Object.keys(item).forEach(key => {
      item[key] = item[key] !== null ? item[key] : ''
      if(key === 'is_domestic' || key === 'is_overtime'){
        if(typeof item[key] === 'number'){
          item[key] = item[key] ? '否' : '是'
        }
      }
    })
    return  `
      <tr class="table-item">
        <td>${(pagination.nowNum - 1) * 10 + index + 1}</td>
        <td>${item.flight_no}</td>
        <td>${item.actual_fry_date}</td>
        <td>${item.actual_drop_date}</td>
        <td>${item.sta}</td>
        <td>${item.eta}</td>
        <td>${item.ata}</td>
        <td>${item.model_code}</td>
        <td>${item.aircraft_no}</td>
        <td>${item.departure_name}</td>
        <td>${item.is_overtime}</td>
        <td>${item.is_domestic}</td>
        <td>${item.pub}</td>
        <td>${item.cah}</td>
        <td>${item.ffm}</td>
        <td>${item.man}</td>
        <td>${item.com}</td>
        <td>${item.rep}</td>
        <td>${item.fdl}</td>
      </tr>`
    }
  ).join('')
  $('.inflight_main_table').html(str)
}

// 分页
const pagination = new Pagination

$('.btn_search').on('click', function () {
  getFlightOperationListParams = {
    two_flight_code: $('.flight_code_2').val(),
    flight_num: $('.flight_code_4').val(),
    flight_no: $('.flight_code_2').val() && $('.flight_code_4').val() && $('.flight_code_2').val() + $('.flight_code_4').val(),
    plan_fry_date: $('.plan_fry_date').val(),
    billing_time_start: $('.billing_time_start').val(),
    billing_time_end: $('.billing_time_end').val(),
    model_code: $('.model_code').val(),
    departure_name: $('.departure_name').val()
  }

  LXHR.POST(getFlightOperationListUrl, getFlightOperationListParams).done(res => {
    if(res.status === 200){
      pagination.init('.pageWrap', res.data[0], getFlightOperationListParams, getFlightOperationListUrl, renderTable)
      renderTable(res.data[0].list)
    }
  })
})

$('.btn_clear').on('click', function () {
  clearSearch()
})