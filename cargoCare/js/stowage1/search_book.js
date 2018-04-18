/**
 * 查询可配载单
 */

let renderStowageTable = (data, num) => {
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
          <td>${item.goods_route}</td>
          <td>${item.order_no}</td>
          <td>${item.batch}</td>
          <td>${item.rdy}</td>
          <td>${item.remain_quantity}</td>
          <td>${item.weight}</td>
          <td>${item.volume}</td>
          <td>${item.departure_code}</td>
          <td>${item.destination_code}</td>
          <td>${item.product_name}</td>
          <td>${item.good_pull_down}</td>
          <td>${item.special_order_code}</td>
          <td>${item.arrival_date}</td>
          <td>${item.warehouse}/${item.warehouse_quantity}</td>
        </tr>`
      }
    ).join('')
  $('.stowage_booking_table').html(str)
  $('.stowage_booking .checkAll').data('size', data.length)
}

let getStowageListParams = () => {
  return {
    two_flight_code: $('.stowage_booking .carriage_code').val(),        // 承运人两字码
    departure_code: $('.stowage_booking .departure_code').val(),	        // 始发站三字码
    destination_code: $('.stowage_booking .destination_code').val(),	      // 目的站三字码
    goods_status: $('.stowage_booking .goods_status').dropdown('get value'),	          // 货物状态
    product_category_code: $('.stowage_booking .product_category_code').dropdown('get value'),  // 货物类别
  }
}

let searchOrderList = () => {
  let url = baseUrl + '/def/output/stowage/getOrderList'
  let params = getStowageListParams()

  LXHR.POST(url, params).done(res => {
    if(res.status === 200){
      bookPagination.init('.stowage_booking .pageBox', res.data[0], params, url, renderStowageTable)
      renderStowageTable(res.data[0].list, 1)
    }else{
      LALERT.msg(res.message)
    }
  })
}