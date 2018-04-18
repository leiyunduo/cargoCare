// 查询进港信息

let renderTable = (data, num) => {
  let str = data.map((item, index) => {
    typeof item === 'object' && Object.keys(item).forEach(key => {
      item[key] = item[key] !== null ? item[key] : ''

      if(key === 'arrive_state'){
        item[key] = item[key] ? '已到达' : '未到达'
      }
    })

    return `
      <tr class="table-item">
        <td>${(num - 1) * 10 + index + 1}</td>
        <td class="flexCenter padding0">
          <div class="roundBg borderRaidus greenBg btn-edit" data-order='${item.order_no}' data-id='${item.id}'>
            <i class="edit icon margin-Left5" title="编辑"></i>
          </div>
          <div class="roundBg borderRaidus tealBg">
            <i class="icon-printer margin-Left5" title="打印"></i>
          </div>
        </td>
        <td>${item.order_no}</td>
        <td>${formatTime(item.arrive_time)}</td>
        <td>${item.departure_code}</td>
        <td>${item.destination_code}</td>
        <td>${item.association_point}</td>
        <td>${item.product_name}</td>
        <td>${item.quantity}</td>
        <td>${item.net_weight}</td>
        <td>${item.weight}</td>
        <td>${item.arrive_quantity}</td>
        <td>${item.arrive_weight}</td>
        <td>${item.remark}</td>
        <td>${item.arrive_state}</td>
        <td>${item.sender_name}</td>
        <td>${item.receiver_name}</td>
        <td>${item.expected_storeroom}</td>
        <td>${item.incur_expense}</td>
      </tr>`
    }
  ).join('')
  $('.inflight_main_table').html(str)
}

let getSearchParams = () => {
  return {
    order_three_code: $('.order_no_3').val(),
    order_num: $('.order_num_8').val(),
    order_no: $('.order_no_3').val() && $('.order_num_8').val() && $('.order_no_3').val() + $('.order_num_8').val(),
    type: $('.inflight_type').dropdown('get value'),
    billing_time_start: $('.start_keyboard_date').val(),
    billing_time_end: $('.end_keyboard_date').val(),
    expected_storeroom: $('.expected_storeroom').val(),
    arrive_state: $('.arrive_state').dropdown('get value'),
    departure_code: $('.departure_code').val()
  }
}

let getArrivalsList = () => {
  let url = baseUrl + '/def/input/getInputSingleList'
  let params = getSearchParams()

  LXHR.POST(url, params).done(res => {
    if(res.status === 200){
      paginationMain.init('.inflight_main_pageBox', res.data[0], params, url, renderTable)
      renderTable(res.data[0].list, 1)
    }else{
      LALERT.msg(res.message)
    }
  })
}

$('.inflight_management_main .btn_search').on('click', function () {
  getArrivalsList()
})