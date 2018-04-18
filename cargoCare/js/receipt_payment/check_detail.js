// 查看开单明细/费用明细 =============================================================================================
;(function(){
  // 费用明细
  let renderPriceTable = data => {
    let str = data.list.map((item, index) => {
      typeof item === 'object' && Object.keys(item).forEach(key => {
        item[key] = item[key] !== null ? item[key] : ''
      })
      
      return `
      <tr>
        <td>${index + 1}</td>
        <td>${item.cost_name}</td>
        <td>${item.payee}</td>
        <td>${item.payer}</td>
        <td>${item.actual_cost}</td>
        <td>${pageInfo.deparrType ? item.settlement_unit : item.payer}</td>
      </tr>
      `
    }).join('')

    str += `<tr>
      <td>总计</td>
      <td></td>
      <td></td>
      <td></td>
      <td>${data.total_cost}</td>
      <td></td>
    </tr>`
    $('.price_detail_table').html(str)
  }

  let fillPrice = data => {
    renderPriceTable(data)
    $('.total_cost').val(data.total_cost)
    $('.received_cost').val(data.received_cost)
    $('.actual_received').val(data.actual_received)
    $('.price_info').html(
      `<span>单号：${pageInfo.nowData.order_no}</span>
      <span>审核状态：${pageInfo.nowData.check_state}</span> 
      <span>收付款状态: ${pageInfo.nowData.receipt_state}</span>`
    )
  }

  let checkPrice = () => {
    let url = baseUrl + '/def/finance/getCostItemByOrderNo'
    let params = {
      departure_arrival_type: pageInfo.deparrType,
      order_no: pageInfo.nowData.order_no,
    }

    LXHR.POST(url, params).done(res => {
      if(res.status !== 200){
        LALERT.msg(res.message)
        return
      }

      fillPrice(res.data[0])
    })
  }

  let checkAllDetail = () => {
    reset()
    getPayMethod()
    checkDetail()
    checkPrice()
  }

  $('.main_table').on('click', '.check_detail', function () {
    pageInfo.nowData = $(this).data('info')
    checkAllDetail()
  })

  $('.main_table').on('click', '.check_price', function () {
    pageInfo.nowData = $(this).data('info')
    checkAllDetail()
  })
})()