// 渲染表格
let renderTable = (data, num) => {
  let str = data.map((item, index) => {
    let pick_up_state = item.pick_up_state
    typeof item === 'object' && Object.keys(item).forEach(key => {
      item[key] = item[key] !== null ? item[key] : ''

      if(key === 'state'){
        item[key] = item[key] ? '已使用' : '未使用'
      }

      if(key === 'departure_status'){
        if(item[key] === 0){
          item[key] = '未出港'
        }else if(item[key] === 1){
          item[key] = '部分出港'
        }else if(item[key] === 2){
          item[key] = '已出港'
        }
      }
    })
    return `
      <tr>
        <td>${(num - 1) * 10 + index + 1}</td>
        <td class="flexCenter padding0 ">
          <div class="roundBg borderRaidus greenBg btn-edit" 
            data-order='${item.order_no}' 
            data-id='${item.id}'
          >
            <i class="edit icon margin-Left5" title="编辑"></i>
          </div>
        </td>
        <td>${item.order_no}</td>
        <td>${item.departure}</td>
        <td>${item.destination}</td>
        <td>${item.state}</td>
        <td>${item.sender_name}</td>
        <td>${item.receiver_name}</td>
        <td>${formatTime(item.billing_time)}</td>
        <td>${item.receiver_telephone}</td>
        <td>${item.departure_status}</td>
        <td>${item.correspond_order_no}</td>
        <td>${item.sender_telephone}</td>
      </tr>`
    }
  ).join('')
  $('.receive_table').html(str)
}

// 获取参数
let getSearchParams = () => {
  return {
    type: pageInfo.type,
    "order_three_code": $('.order_three_code').val(),
    "order_num": $('.order_num').val(),
    "receipt_type": $('.receipt_type').dropdown('get value'),
    "easy_flag": $('.easy_flag').dropdown('get value'),
    "departure_status": $('.departure_status').dropdown('get value'),
    "departure": $('.departure_code').val(),
    "destination": $('.destination_code').val(),
    "sender": $('.sender_code').val(),
    "receiver": $('.receiver_code').val(),
    "billing_time_start": $('.billing_time_start').val(),
    "billing_time_end": $('.billing_time_end').val(),
    "currPage": 1,
  }
}

// 查询列表
let getReceiveInfo = () => {
  let url = baseUrl + '/def/receive/pageQueryReceive'
  let params = getSearchParams()
  LXHR.POST(url, params).done(res => {
    if(res.status === 200){
      paginationMain.init('.receive_main_pageBox', res.data[0], params, url, renderTable)
      renderTable(res.data[0].list, 1)
    }else{
      LALERT.msg(res.message)
    }
  })
}

$('.btn_search').on('click', function () {
  getReceiveInfo()
})