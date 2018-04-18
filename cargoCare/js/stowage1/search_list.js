/**
 * 查询配载订舱列表
 */

let renderStowageOrderList = (data, num) => {
  let str = data.map((item, index) => {
    typeof item === 'object' && Object.keys(item).forEach(key => {
      item[key] = item[key] !== null ? item[key] : ''
    })
    return `
      <tr data-info='${JSON.stringify(item)}' class="table_item">
        <td class="checkbox-wrap">
          <div class="ui checked checkbox check_item">
            <input type="checkbox" data-info='${JSON.stringify(item)}'>
            <label></label>
          </div>
          <span class="checkbox-mask"></span>
        </td>
        <td>${(num - 1) * 10 + index + 1}</td>
        <td>${item.order_no}</td>
        <td>${item.batch}</td>
        <td>${item.stowage_quantity}</td>
        <td>${item.weight}</td>
        <td>${item.product_name}</td>
        <td>${item.special_order_code}</td>
        <td>${item.departure_code}</td>
        <td>${item.destination_code}</td>
        <td></td>
        <td>${item.good_pull_down}</td>
        <td>${item.special_order_code}</td>
        <td>${item.volume}</td>
        <td>${item.warehouse}/${item.warehouse_quantity}</td>
      </tr>`
    }
  ).join('')
  $('.StowageOrderList_table').html(str)
  $('.stowage_booking_list .checkAll').data('size', data.length)
}

let getListParams = () => {
  return {
    flight_no: $('.stowage_booking_list .flight_no_2').val() + $('.stowage_booking_list .flight_no_4').val(),              // 航班号
    departure_code: $('.stowage_booking_list .list_departure_code').val(),	        // 始发站三字码
    destination_code: $('.stowage_booking_list .list_destination_code').val(),	      // 目的站三字码
    plan_fry_date: $('.stowage_booking_list .list_plan_fry_date').val(),          // 航班日期
  }
}

let searchStowageOrderList = () => {
  let url = baseUrl + '/def/output/stowage/getStowageOrderListByFlight'
  let params = getListParams()
  LXHR.POST(url, params).done(res => {
    if(res.status === 200){
      listPagination.init('.stowage_booking_list .pageBox', res.data[0].result, params, url, renderStowageOrderList, 1)
      renderStowageOrderList(res.data[0].result.list, 1)
      pageInfo.flight_id = res.data[0].flight_id
      !res.data[0].result.list.length && LALERT.msg('暂无数据')
    }else{
      LALERT.msg(res.message)
    }
  })
}