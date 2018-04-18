// 分页
const paginationMain = new Pagination

// 获取开单列表
let renderTable = (data, num) => {
  let str = data.map((item, index) => {
    typeof item === 'object' && Object.keys(item).forEach(key => {
      item[key] = item[key] !== null ? item[key] : ''
      
      if(key === 'type') {
        if(pageInfo.deparrType) {
          item[key] = item[key] ? '提货分单' : '提货主单'
        }else {
          switch (true) {
            case item[key] === 0:
              item[key] = '收货主单'
            break;
            case item[key] === 1:
              item[key] = '收货分单'
            break;
            case item[key] === 2:
              item[key] = '邮件'
            break;
            case item[key] === 3:
              item[key] = '民航快递'
            break;
            default: break;
          }
        }
      }

      if(key === 'receipt_state') {
        if(pageInfo.recpayType) {
          item[key] = item[key] ? '已付' : '未付'
        }else {
          item[key] = item[key] ? '已收' : '未收'
        }
      }

      if(key === 'check_state') {
        if(item[key] === 0) {
          item[key] = '未审核'
        }else if(item[key] === 2) {
          item[key] = '审核通过'
        }else if(item[key] === 3) {
          item[key] = '审核未通过'
        }
      }       
    })

    return `
    <tr class="table_item" data-info='${JSON.stringify(item)}'>
        <td>${(num - 1) * 10 + index + 1}</td>
        <td class="checkbox-wrap">
          <div class="ui checked checkbox check_item">
            <input type="checkbox">
            <label></label>
          </div>
          <span class="checkbox-mask"></span>
        </td>
        <td class="flexCenter padding0 ">
          <div class="roundBg borderRaidus blueBg check_billing_details_btn check_detail" data-info='${JSON.stringify(item)}'>
            <i class="unhide icon margin-Left5" title="查看开单明细"></i>
          </div>
          <div class="roundBg borderRaidus redBg check_expense_details_btn check_price" data-info='${JSON.stringify(item)}'>
            <i class="yen icon margin-Left5" title="开单明细与收款"></i>
          </div>
        </td>
        <td>${item.payee}</td>
        <td>${item.payer}</td>
        <td>${item.type}</td>
        <td>${item.order_no}</td>
        <td>${item.total_cost}</td>
        <td>${item.check_person}</td>
        <td>${item.check_state}</td>
        <td>${item.receipt_state}</td>
        <td>${item.received_cost}</td>
      </tr>`
    }
  ).join('')
  $('.main_table').html(str)
  $('.main_table').data('list', data)
}

let getSearchParams = () => {
  return {
    departure_arrival_type: pageInfo.deparrType,
    order_three_code: $('.order_code').val(),
    order_num: $('.order_num').val(),
    checklist_time_start: $('.start_time').val(),
    checklist_time_end: $('.end_time').val(),
    departure_code: $('.departure_code').val(),
    destination_code: $('.destination_code').val(),
    sender_name: $('.sender_name').val(),
    receiver_name: $('.receiver_name').val(),
    check_state: $('.check_state').dropdown('get value'),
    receipt_state: $('.receipt_state').dropdown('get value'),
    type: $('.type').dropdown('get value'),
    settlement_unit: $('.settlement_unit').val(),
  }
}

let getOrderList = () => {
  let url = baseUrl + '/def/finance/getOrderList'
  let params = getSearchParams()

  LXHR.POST(url, params).done(res => {
    if(res.status === 200) {
      paginationMain.init('.pageWrap', res.data[0], params, url, renderTable)
      renderTable(res.data[0].list, 1)
      pageInfo.total = res.data[0].total
      $('.total_num').html(pageInfo.total)
      $('.total_price').html(res.data[0].list[0].list_should_total_cost)
      pageInfo.click_check_able = res.data[0].list[0].click_check_able
      pageInfo.click_receipt_able = res.data[0].list[0].click_receipt_able
      pageInfo.allData = res.data[0].list[0]
      checkedData = []
    }else{
      LALERT.msg(res.message)
    }
  })
}

$('.btn_search').click(function () {
  getOrderList()
})