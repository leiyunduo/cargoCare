/**
 * 出港-出港作业航班
 */

// 请求地址

const reqUrl =  'http://47.93.90.229/test/def/output/booking/getFlightList'

// 分页
const pagination = new Pagination

// toUpperCase
toUpper()
// 渲染表格
let renderTable = data => {
  let str = data.map((item, index) => {
    typeof item === 'object' && Object.keys(item).forEach(key => {
      item[key] = item[key] !== null ? item[key] : ''
    })
    return `
      <tr class="table-item" data-id="${item.id}">
        <td><input type="checkbox" data-id="${item.id}"></td>
        <td>${(pagination.nowNum - 1) * 10 + index + 1}</td>
        <td>${item.flight_no}</td>
        <td>${item.actual_fry_date}</td>
        <td>${item.destination_code}</td>
        <td>${item.std}</td>
        <td>${item.etd}</td>
        <td>${item.atd}</td>
        <td>${item.model_code}</td>
        <td>${item.aircraft_no}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td>${item.week}</td>
        <td>${item.is_domestic}</td>
        <td>${item.pub}</td>
        <td>${item.can}</td>
        <td>${item.ffm}</td>
        <td>${item.man}</td>
        <td>${item.pre}</td>
        <td>${item.com}</td>
        <td>${item.rep}</td>
        <td>${item.dls}</td>
        <td>${item.dep}</td>
        <td>${item.ofd}</td>
      </tr>`
    }
  ).join('')
  $('.departure_flight_table').html(str)
}

// 请求参数
let params = {
  two_flight_code: '',
  flight_num: '',
  model_code: '',
  plan_fry_date: '',
  plan_fry_time_start: '',
  plan_fry_time_end: '',
  destination_code: '',
  currPage: 1,
}

// 发送请求
$('.departure_flight_wrap .btn-search').click(function(){
  let parent = 'departure_flight_wrap'
  if($(this).data('type') === 'flight_closed'){
    parent = 'flight_closed'
  }

  params = {
    two_flight_code: $(`.${parent} .flight_no_2`).val(),
    flight_num: $(`.${parent} .flight_no_4`).val(),
    model_code: $(`.${parent} .model_code`).val(),
    plan_fry_date: $(`.${parent} .plan_fry_date`).val(),
    plan_fry_time_start: $(`.${parent} .plan_fry_time_start`).val(),
    plan_fry_time_end: $(`.${parent} .plan_fry_time_end`).val(),
    destination_code: $(`.${parent} .destination_code`).val(),
    currPage: 1,
  }

  LXHR.POST(reqUrl, params).done( res => {
    if(res.status === 200){
      pagination.init('.pageBox', res.data[0], params, reqUrl, renderTable)
      renderTable(res.data[0].list)
    }else{
      LALERT.msg(res.message)
    }
  })
})

$('.btn_clear').on('click', function () {
  clearSearch()
})