/**
 * 收付款-收款-到达收款
 */

// 获取收款方式
let renderPayMethod = data => {
  let optionsStr = data.map(item => {
    return `<option class="item" data-value='${item.id}'>${item.name}</option>`
  }).join('')

  let str = `
            <input type="hidden" value="${data[0].id}">
            <div class="default text">${data[0].name}</div>
            <i class="dropdown icon"></i>
            <div class="menu">
              ${optionsStr}
            </div>`
  $('.payMethod').html(str)
  $('.ui.dropdown.payMethod').dropdown()
}

let getPayMethod = () => {
  let url = baseUrl + '/def/finance/getPayMethod'
  LXHR.POST(url).done(res => {
    if(res.status === 200) {
      renderPayMethod(res.data)
    }
  })
}

// 收付款 ===========================================================================================================
;(function(){
  
  // 获取参数
  let getReceiptParams = (data) => {
    let list = data.map(item => {
      return {
        order_id: item.id,
        total_cost: item.total_cost,
        received_cost: item.received_cost,
        this_time_receipt: item.this_time_receipt,
        payee: item.payee,
        payer: item.payer,
        clearing_unit: pageInfo.deparrType ? item.settlement_unit : item.payer,
      }
    })

    return {
      departure_arrival_type: pageInfo.deparrType,
      type: pageInfo.recpayType,
      total_single: data.length,
      billItemlist: list,
    }
  }

  // 获取本次收款数据
  let getThisReceipt = () => {
    $('.receipt_table').find('.this_time_receipt').each((index, item) => {
      checkedData[index].this_time_receipt = $(item).val()
    })
  }

  // 获取本次默认收款数据
  let getDefaultThisReceipt = () => {
    checkedData.forEach(item => {
      item.this_time_receipt = item.total_cost - item.received_cost
    })
  } 

  let hasReject = () => {
    return checkedData.some(item => item.check_state !== '审核通过')
  }

  // 计算合计
  let countReceipt = data => data.reduce((item1, item2) => {
    return [
      Decimal.add([item1[0], item2.total_cost]).toNumber(),
      Decimal.add([item1[1], item2.received_cost]).toNumber(),
      Decimal.add([item1[2], item2.this_time_receipt]).toNumber()
    ]
  }, [0, 0, 0])
  
  // 收款
  let receipt = (params) => {
    let url = baseUrl + '/def/finance/addBillPayOrReceipt'
    LXHR.POST(url, JSON.stringify(params), {contentType: 'application/json'}).done(res => {
      if(res.status === 200) {
        LALERT.success(res.message)
        gotoMain()
        getOrderList()
      }else{
        LALERT.msg(res.message)
      }
    })
  }

  // 全部收款
  let receiptAll = () => {
    let url = baseUrl + '/def/finance/addBillAllPayOrReceipt'
    let params = getSearchParams()
    params = Object.assign(params, {
      list_received_total_cost: $('.mul_received_cost').val(),
      list_should_total_cost: $('.mul_actual_received').val(),
      list_total_cost: $('.mul_total_cost').val(),
      payMethod: $('.mul_payMethod').dropdown('get value'),
      capital_flows: $('.mul_capital_flows').val(),
    })
  
    LXHR.POST(url, params).done(res => {
      if(res.status === 200) {
        LALERT.success(res.message)
        gotoMain()
        getOrderList()
      }else{
        LALERT.msg(res.message)
      }
    })
  }

  // 渲染收款表格
  let renderReceiptTable = data => {
    let str = data.map((item, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${item.payee}</td>
        <td>${item.payer}</td>
        <td>${item.type}</td>
        <td>${item.order_no}</td>
        <td>${item.total_cost}</td>
        <td>${item.received_cost}</td>
        <td>
          <input type="text" class="this_time_receipt" data-max="${item.total_cost - item.received_cost}" value="${item.this_time_receipt}">
        </td>
        <td>${pageInfo.deparrType ? item.settlement_unit : item.payer}</td>
      </tr>
    `)
    str += `<tr>
              <td>合计</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td class="all_should_receipt"></td>
              <td class="all_have_receipt"></td>
              <td class="all_actual_receipt"></td>
              <td></td>
            </tr>`
    $('.receipt_table').html(str)
  }

  // 填充合计
  let fillSumInfo = () => {
    getThisReceipt()
    let [should_receipt, have_receipt, actual_receipt] = countReceipt(checkedData)
    renderReceiptTable(checkedData)
    $('.all_should_receipt').html(should_receipt)
    $('.all_have_receipt').html(have_receipt)
    $('.all_actual_receipt').html(actual_receipt)

    $('.selected_price').html(should_receipt)

    $('.mul_total_cost').val(should_receipt)
    $('.mul_received_cost').val(have_receipt)
    $('.mul_actual_received').val(actual_receipt)
  }

  let fillReceipt = () => {
    clearReceiptDetail()
    getDefaultThisReceipt()
    $('.receipt_table_wrap').show()
    $('.multiple_receipt_btn').data('status', '多条')
    $('.selected_num').html(checkedData.length)
    getPayMethod()
    fillSumInfo()
  }

  let fillReceiptAll = () => {
    clearReceiptDetail()
    getDefaultThisReceipt()
    $('.receipt_table_wrap').hide()
    $('.multiple_receipt_btn').data('status', '全部')
    $('.selected_num').html(pageInfo.total)
    $('.selected_price').html(pageInfo.allData.list_total_cost)
    $('.mul_total_cost').val(pageInfo.allData.list_total_cost)
    $('.mul_received_cost').val(pageInfo.allData.list_received_total_cost)
    $('.mul_actual_received').val(pageInfo.allData.list_should_total_cost)
    getPayMethod()
  }

  // 判断实际收款是否超出范围
  let isBeyond = (This) => {
    return This.val() > This.data('max')
  }

  // 实时计算实际收款
  $('.receipt_table').on('change', '.this_time_receipt', function () {
    if( isBeyond($(this)) ) {
      LALERT.msg('本次收款超出最大可收款')
      $(this).val( $(this).data('max') )
      $(this).focus()
    }else{
      fillSumInfo()
    }
  })

  // 跳到已选收款
  $('.receipt_btn').click(function () {
    if(hasReject()) {
      LALERT.msg('全部审核通过后才可收款')
      return
    }
    if(!checkedData.length) {
      LALERT.msg('请选择')
      return
    }

    fillReceipt()
    $('.multiple_receivables_wrap').show()
  })

  // 跳到全部收款
  $('.all_receipt_btn').click(function () {
    if(pageInfo.click_receipt_able) {
      LALERT.msg('全部审核通过后才可收款')
      return
    }

    if(!pageInfo.allData) {
      LALERT.msg('请先查询')
      return
    }

    fillReceiptAll()
    $('.multiple_receivables_wrap').show()
  })

  // 单条收款
  $('.detail_receipt_btn').click(function () {
    if(pageInfo.nowData.check_state !== '审核通过') {
      LALERT.msg('审核通过后才能收款')
      return
    }else if(!$('.sure_right').checkbox('is checked')) {
      LALERT.msg('请确认无误后再点击收款')
      return
    }else{
      pageInfo.nowData.this_time_receipt = $('.actual_received').val()
      let params = getReceiptParams([pageInfo.nowData])
      let remainParams = {
        list_total_cost: $('.total_cost').val(),
        payMethod: $('.single_payMethod').dropdown('get value'),
      }
      params = Object.assign(params, remainParams)
      receipt(params)
    }
  })

  // 多条收款
  $('.multiple_receipt_btn').click(function () {
    if(!$('.mul_sure_right').checkbox('is checked')) {
      LALERT.msg('请确认无误后再点击收款')
      return
    }else {
      if($(this).data('status') === '多条') {
        let params = getReceiptParams(checkedData)
        let remainParams = {
          list_total_cost: $('.mul_total_cost').val(),
          payMethod: $('.mul_payMethod').dropdown('get value'),
        }
        params = Object.assign(params, remainParams)
        receipt(params)
      }else {
        receiptAll()
      }
    }
  })

})()