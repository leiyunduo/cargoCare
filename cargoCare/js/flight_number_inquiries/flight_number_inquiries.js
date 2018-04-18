$('.two_level_menu_head_close').on('click',function(){
	$('.flight_moved_information').hide()
})

const pageInfo = {
	// baseUrl: 'http://192.168.1.105:8080/lxtd-cca-apis',
  baseUrl: 'http://47.93.90.229/test',
}

let {baseUrl} = pageInfo

// 分页
const pagination = new Pagination

let renderTable = data => {
  let str = data.map((item, index) => {
    typeof item === 'object' && Object.keys(item).forEach(key => {
      item[key] = item[key] !== null ? item[key] : ''
    })
    return `
      <tr class="table-item" data-id="${item.id}">
        <td>${(pagination.nowNum - 1) * 10 + index + 1}</td>
        <td class="flexCenter">
          <div class="roundBg borderRaidus blueBg look search_info" data-id=${item.id}>
            <i class="unhide icon margin-Left5" title="查看"></i>
          </div>
        </td>
        <td>${item.flight_no}</td>
        <td>${item.departure_name}</td>
        <td>${item.destination_name}</td>
        <td>${item.plan_fry_date}</td>
        <td>${item.actual_fry_date}</td>
        <td>${item.plan_drop_date}</td>
        <td>${item.actual_drop_date}</td>
      </tr>`
    }
  ).join('')
  $('.flight_info_table').html(str)
}

const getFlightListUrl = baseUrl + '/def/output/booking/getFlightList'

let getFlightList = () => {
	let params = {
    two_flight_code: $(`.flight_no_2`).val(),
    flight_num: $(`.flight_no_4`).val(),
    departure_name: $(`.departure_name`).val(),
    destination_name: $(`.destination_name`).val(),
    plan_fry_date: $(`.plan_fry_time_start`).val(),
    plan_drop_date: $(`.plan_fry_time_end`).val(),
    // state: $('.state').dropdown('get value'),
    currPage: 1,
	}
  
  LXHR.POST(getFlightListUrl, params).done( res => {
    if(res.status === 200){
      pagination.init('.pageBox', res.data[0], params, getFlightListUrl, renderTable)
      renderTable(res.data[0].list)
    }else{
      LALERT.msg(res.status + res.message)
    }
  })
}

$('.main_page .search').click(function () {
  getFlightList()
})

let formatData = d => {
  let startInfo = {
    name: d.departure_city_name || '',
    weather: d.departure_weather || '',
    temperature: d.departure_temperature || '',
    planFlyDate: d.plan_fry_date || '',
    expectedDate: d.expected_fly_date || '',
    actualDate: d.actual_fry_date || '',
    planFlyTime: d.plan_fry_time || '',
    expectedTime: d.expected_fly_time || '',
    actualTime: d.actual_fry_time || '',
    state: d.departure_flight_state || '',
  }

  let endInfo = {
    name: d.destination_city_name || '',
    weather: d.destination_weather || '',
    temperature: d.destination_temperature || '',
    planFlyDate: d.plan_drop_date || '',
    expectedDate: d.expected_arrival_date || '',
    actualDate: d.actual_drop_date || '',
    planFlyTime: d.plan_drop_time || '',
    expectedTime: d.expected_arrival_time || '',
    actualTime: d.actual_drop_time || '',
    state: d.destination_flight_state || '',
  }

  let flightInfoList = [startInfo, endInfo]
  let flightInfo = {
    his_on_time_probability: d.his_on_time_probability || '',
    model_code: d.model_code || '',
    flight_company_name: d.flight_company_name || '',
    flight_no: d.flight_no || '',
    full_mileage: d.full_mileage,
    full_time: d.full_time || '',
    list: flightInfoList,
  }

  return flightInfo
}

let render_detail = data => {
  $('.two_level_menu_head .title').html(data.flight_company_name + ' ' + data.flight_no)

  let flight_info_detail_str = `
    <span>全程<i>${data.full_mileage}</i>公里</span> 
    <span>${data.full_time}</span> 
    <span>历史准点率：<i>${data.his_on_time_probability}</i></span> 
    <span>机型：<i>${data.model_code}</i></span>
  `
  $('.flight_info_detail').html(flight_info_detail_str)

  let stations_info_str = data.list.map(item => `
    <div class="station">
      <span class="blue_circle"></span>
      <span>${item.name}</span>
      <span></span>
    </div>`
  ).join('')

  $('.stations_info').html(
    `<div class="flight_line"></div>
    ${stations_info_str}
    <div class="bluePlane">
      <img src="../images/bluePlane.png">
    </div>`
  )
}

let renderDetailTable = data => {
  let theadStr =data.map(item => `
      <th>
      <div class="overflowHidden flex">
        <div class="block40px">
          ${item.weather}
        </div>
        <div class="marginTop10 marginLeft20">
          <div>${item.weather} ${item.temperature}</div>
          <div>${item.state}</div>
        </div>
      </div>
    </th>`
  ).join('')
  $('.detail_table_head').html(theadStr)

  let tbodyStr1 = `<tr>${data.map(item => `<td>计划起飞：${item.planFlyTime}</td>`).join('')}</tr>`
  let tbodyStr2 = `<tr>${data.map(item => `<td>预计起飞：${item.expectedTime}</td>`).join('')}</tr>`
  let tbodyStr3 = `<tr>${data.map(item => `<td>实际起飞：${item.actualTime}</td>`).join('')}</tr>`
  let tbodyStr = tbodyStr1 + tbodyStr2 + tbodyStr3
  $('.detail_table_body').html(tbodyStr)
}

let getFlightDetailUrl = baseUrl + '/def/flight_manage/getFlightDetailById'
$('.flight_info_table').on('click', '.search_info', function () {
  $('.flight_moved_information').show()

  LXHR.POST(getFlightDetailUrl, {id: $(this).data('id')}).done(res => {
    if(res.status === 200){
      let d = res.data[0]
      let flightInfo = formatData(d)
      console.log(flightInfo)
      render_detail(flightInfo)
      renderDetailTable(flightInfo.list)
    }else{
      LALERT.msg(res.status + res.message)
    }
  })
})
