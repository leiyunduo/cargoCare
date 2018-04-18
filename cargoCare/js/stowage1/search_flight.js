/**
 * 查询出港作业航班
 */

let renderFlightTable = (data, num) => {
  let str = data.map((item, index) => {
    typeof item === 'object' && Object.keys(item).forEach(key => {
      item[key] = item[key] !== null ? item[key] : ''
    })
    return `
      <tr class="table_item" data-id="${item.id}">
        <td class="checkbox-wrap">
          <div class="ui checked checkbox check_item">
            <input type="checkbox" data-info='${item.id}'>
            <label></label>
          </div>
          <span class="checkbox-mask"></span>
        </td>
        <td>${(num - 1) * 10 + index + 1}</td>
        <td>
          <div class="roundBg borderRaidus blueBg check_list" data-info='${JSON.stringify(item)}'>
            <i class="unhide icon margin-Left5" title="查看订舱列表"></i>
          </div>
        </td>
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

let getFlightParams = () => {
  return {
    two_flight_code: $('.close .flight_no_2').val(),
    flight_num: $('.close .flight_no_4').val(),
    model_code: $('.close .model_code').val(),
    plan_fry_date: $('.close .plan_fry_date').val(),
    plan_fry_time_start: $('.close .plan_fry_time_start').val(),
    plan_fry_time_end: $('.close .plan_fry_time_end').val(),
    destination_code: $('.close .destination_code').val(),
    currPage: 1,
  }
}

let searchFlightList = () => {
  let url = baseUrl + '/def/output/booking/getFlightList'
  let params = getFlightParams()

  LXHR.POST(url, params).done(res => {
    if(res.status === 200){
      closePagination.init('.close .pageBox', res.data[0], params, url, renderFlightTable)
      renderFlightTable(res.data[0].list, 1)
    }else{
      LALERT.msg(res.message)
    }
  })
}