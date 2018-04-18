// 拼单明细 ==============================================================================================
;(function(){
  let accountSumInfo = () => selectedList.reduce((item1, item2) => {
    let sum_piece = Decimal.add(item1.quantity,item2.quantity || 0).toNumber()
    let sum_weight = Decimal.add(item1.net_weight,item2.net_weight || 0).toNumber()
    let sum_volume = Decimal.add(item1.volume,item2.volume || 0).toNumber()
    return {
      quantity: sum_piece,
      net_weight: sum_weight,
      volume: sum_volume,
    }
  }, {quantity: 0, net_weight: 0, volume: 0,})

  let fillBindInfo = () => {
    let sumInfo = accountSumInfo()
    $('.main_order_info .bind_sum_piece').html('已拼总件数: ' + sumInfo.quantity)
    $('.main_order_info .bind_sum_weight').html('已拼总重量: ' + sumInfo.net_weight)
    $('.main_order_info .bind_sum_volume').html('已拼总体积: ' + sumInfo.volume)
  }

  // 渲染可选主单表格
  let renderSelectBill = data => {
    let departure_code = $('.d_departure_code').val()
    let destination_code = $('.d_destination_code').val()

    let str = data.map((item, index) => {

      return `
      <tr class="table-item" data-info='${JSON.stringify(item)}'>
        <td class="checkbox-wrap">
          <input type="checkbox" data-info='${JSON.stringify(item)}'>
          <span class="checkbox-mask"></span>
        </td>
        <td>${index + 1}</td>
        <td>${item.order_no}</td>
        <td>${departure_code}</td>
        <td>${destination_code}</td>
      </tr>
          `
    }).join('')

    $('.select_bill_table').html(str)
  }

  // 渲染已选主单
  let renderSelectedBill = data => {
    let departure_code = $('.d_departure_code').val()
    let destination_code = $('.d_destination_code').val()

    let orderStr = data.map((item, index) => {
      return item.order_no + `(${item.quantity || ''})`
    }).join()

    $('.d_correspond_order_no').val(orderStr)

    let str = data.map((item, index) => {
      return `
      <tr class="table-item" data-info='${JSON.stringify(item)}'>
        <td class="checkbox-wrap">
          <input type="checkbox" data-info='${JSON.stringify(item)}'>
          <span class="checkbox-mask"></span>
        </td>
        <td>${index + 1}</td>
        <td class="order_no">${item.order_no}</td>
        <td class="departure_code">${departure_code}</td>
        <td class="destination_code">${destination_code}</td>
        <td><input type="text" class="piece ipt" value="${item.quantity || ''}"></td>
      </tr>
          `
    }).join('')

    $('.selected_bill_table').html(str)
  }

  // 从a数组内移除与b数组相同的数据
  let removeRepeatData = (data, repeatData) => data.filter((item, index) => {
    return repeatData.every((repeatItem => repeatItem.order_no !== item.order_no))
  })

  // 获取可选主单
  let getSelectBill = () => {
    let url = baseUrl + '/def/receive/getUnSeclectedOrderNo'
    LXHR.POST(url, {expected_two_flight_code: $('.detail_flight_no ').val()}).done(res => {
      if(res.status === 200){
        selectList = res.data.map(item => {
          return {
            order_no: item
          }
        })

        selectList = removeRepeatData(selectList, selectedList)
        renderSelectBill(selectList)
      }else{
        LALERT.msg(res.message)
      }
    })
  }

  // 获取已选主单
  let getSelectedBill = () => {
    renderSelectedBill(selectedList)
  }

  //  检验已选单是否已存在添加单
  let isRepeat = (data) => {
    return selectedList.some(item => item.order_no === data) 
  }

  // 从可选单中去除已选单
  let removeAddFromSelect = (data) => {
    selectList.forEach((item, index) => {
      if(item === data){
        selectList.splice(index, 1)
        renderSelectBill(selectList)
      }
    })
  }

  // 添加到已选单
  let addSelectedBill = (data) => {
    if(isRepeat(data)){
      LALERT.msg('该单已被选中')
    }else{
      selectedList.push(data) 
      renderSelectedBill(selectedList)
      removeAddFromSelect(data)
      $('.bind_order_code').val('')
      $('.bind_order_num').val('')
    }
  }

  $('.d_correspond_order_no').on('keyup', function (evt) {
    if(evt.keyCode === 13) {
      gotoBind()
      $('.main_order_info .bind_order_no').html(pageInfo.type ? `分单号: ${pageInfo.order_no}` : `主单号: ${pageInfo.order_no}`)
      fillBindInfo()
      !selectList.length && getSelectBill()
      !selectList.length && getSelectedBill()
    }
  })

  $('.tabNav .bind').on('click', function(){
    $('.main_order_info .bind_order_no').html(pageInfo.type ? `分单号: ${pageInfo.order_no}` : `主单号: ${pageInfo.order_no}`)
    fillBindInfo()
    !selectList.length && getSelectBill()
    !selectList.length && getSelectedBill()
  })

  $('.search_select_btn').on('click', function (evt) {
    getSelectBill()
  })

  // 获取选中数据
  let getSelectData = className => {
    return Array.from( $(className).find('input:checked') ).map(item => $(item).data('info'))
  }

  $('.selected_bill_table').on('click', '.ipt', function() {
    return false
  })
  // 选中、取消选中
  $('.select_bill_table').on('click', '.table-item', function(evt){
    $(this).toggleClass('active')
    if( $(this).find(':checkbox').is(':checked') ){
      $(this).find(':checkbox').attr('checked', false)
    }else{
      $(this).find(':checkbox').attr('checked', true)
    }
  })

  $('.selected_bill_table').on('click', '.table-item', function(evt){
    $(this).toggleClass('active')
    if( $(this).find(':checkbox').is(':checked') ){
      $(this).find(':checkbox').attr('checked', false)
    }else{
      $(this).find(':checkbox').attr('checked', true)
    }
  })

  // 获取已拼件数
  $('.selected_bill_table').on('change', '.ipt', function () {
    Array.from( $('.selected_bill_table .ipt') ).forEach((item, index) => {
      selectedList[index].quantity = $(item).val()
      renderSelectedBill(selectedList)
    })
  })

  // 右移
  $('.selectBill').click(function () {
    let d = getSelectData('.select_bill_table')
    selectList = removeRepeatData(selectList, d)
    selectedList = selectedList.concat(d)
    fillBindInfo()
    renderSelectedBill(selectedList)
    renderSelectBill(selectList)
  })

  // 左移
  $('.cancelSelectBill').click(function () {
    let d = getSelectData('.selected_bill_table')
    selectedList = removeRepeatData(selectedList, d)
    selectList = selectList.concat(d)
    fillBindInfo()
    renderSelectedBill(selectedList)
    renderSelectBill(selectList)
  })

  $('.bind_back_detail').on('click', function () {
    if(selectedList.length) {
      LALERT.msg('明细件数,体积,重量与拼单有关，请确认一致')
    }
  })
})()
