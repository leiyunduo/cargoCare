// 拼单明细 ==============================================================================================
;(function(){
  // 渲染开票地点
  /*
  let renderBillingLocation = data => {
    let optionsStr = data.map(item => {
      return `<option class="item" data-value='${item}'>${item}</option>`
    }).join('')

    let str = `
              <input type="hidden">
              <div class="default text">${data[0]}</div>
              <i class="dropdown icon"></i>
              <div class="menu">
                ${optionsStr}
              </div>`

    $('.billingLocation').html(str)
    $('.billingLocation').dropdown()
  }
  */
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
    pageInfo.bindNum = sumInfo.quantity
    pageInfo.type && $('.d_joint_cargo_pieces').val(sumInfo.quantity)
    $('.main_order_info .bind_sum_piece').html('已拼总件数: ' + sumInfo.quantity)
    $('.main_order_info .bind_sum_weight').html('已拼总重量: ' + sumInfo.net_weight)
    $('.main_order_info .bind_sum_volume').html('已拼总体积: ' + sumInfo.volume)
  }

  fillBindInfo()
  
  // 渲染可选分单表格
  let renderSelectBill = data => {
    let str = data.map((item, index) => {
      typeof item === 'object' && Object.keys(item).forEach(key => {
        item[key] = item[key] !== null ? item[key] : ''
      })

      return `
      <tr class="table-item" data-info='${JSON.stringify(item)}'>
        <td class="checkbox-wrap">
          <input type="checkbox" data-info='${JSON.stringify(item)}'>
          <span class="checkbox-mask"></span>
        </td>
        <td>${index + 1}</td>
        <td>${item.order_no}</td>
        <td>${item.destination}</td>
        <td>${item.quantity}</td>
        <td>${item.net_weight}</td>
        <td>${item.joint_cargo_pieces}</td>
        <td>${item.sender}</td>
        <td>${item.ship_whereabouts}</td>
        <td>${item.product_name}</td>
        <td>${item.expected_flight_no}</td>
      </tr>
          `
    }).join('')

    $('.select_bill_table').html(str)
  }

  // 渲染已选分单
  let renderSelectedBill = data => {
    let orderStr = data.map((item, index) => {
      return item.order_no + `(${item.quantity || 0})`
    }).join()

    $('.d_correspond_order_no').val(orderStr)

    let str = data.map((item, index) => {
      typeof item === 'object' && Object.keys(item).forEach(key => {
        item[key] = item[key] !== null ? item[key] : ''
      })

      return `
      <tr class="table-item" data-info='${JSON.stringify(item)}'>
        <td class="checkbox-wrap">
          <input type="checkbox" data-info='${JSON.stringify(item)}'>
          <span class="checkbox-mask"></span>
        </td>
        <td>${index + 1}</td>
        <td>${item.order_no}</td>
        <td>${item.destination}</td>
        <td><input style="width:auto;" type="text" class="piece ipt" value="${item.quantity || ''}"></td>
        <td>${item.net_weight}</td>
        <td>${item.volume}</td>
        <td>${item.sender}</td>
        <td>${item.update_person}</td>
      </tr>
          `
    }).join('')

    $('.selected_bill_table').html(str)
  }

  $('.selected_bill_table').on('click', '.ipt', function() {
    return false
  })

   // 获取已拼件数
   $('.selected_bill_table').on('change', '.ipt', function () {
    Array.from( $('.selected_bill_table .ipt') ).forEach((item, index) => {
      selectedList[index].quantity = $(item).val()
      renderSelectedBill(selectedList)
    })
  })

  // 从a数组内移除与b数组相同的数据
  let removeRepeatData = (data, repeatData) => data.filter((item, index) => {
    return repeatData.every((repeatItem => repeatItem.order_no !== item.order_no))
  })

  let getSelectParams = (location) => {
    return {
      type: pageInfo.type,
      order_no: pageInfo.order_no,
      billing_location: location,
      departure_code: $('.d_departure_code').val(),
      destination_code: $('.d_destination_code').val(),
      expected_flight_time: $('.d_expected_flight_time').val(),
      expected_flight_no: $('.detail_flight_no').val() + $('.detail_flight_num').val(),
    }
  }

  // 获取可选分单
  let getSelectBill = (location) => {
    let url = baseUrl + '/def/receive/getUnSeclected/'
    let params = getSelectParams(location)

    let {departure_code:dep, destination_code:des, expected_flight_time:eft, expected_flight_no:efn} = params

    if(dep && des && eft && efn) {
      LXHR.POST(url, params).done(res => {
        if(res.status === 200){
          selectList = removeRepeatData(res.data, selectedList)
          if(!selectList.length){
            LALERT.msg('无可选单')
          }
          renderSelectBill(selectList)
        }else{
          LALERT.msg(res.message)
        }
      })
    }else{
      LALERT.msg('条件不足，无法查询')
    }
  }

  // 获取已选分单
  let getSelectedBill = () => {
    renderSelectedBill(selectedList)
  }

  // 获取开票地点
  /*
  let getBillingLocation = () => {
    let url = baseUrl + '/def/receive/getBillingLocation/'
    LXHR.POST(url).done(res => {
      if(res.status === 200){
        renderBillingLocation(res.data)
      }
    })
  }
  */

  // getBillingLocation()

  //  检验已选单是否已存在添加单
  let isRepeat = (data) => {
    return selectedList.some(item => item.order_no === data.order_no) 
  }

  // 从可选单中去除已选单
  let removeAddFromSelect = (data) => {
    selectList.forEach((item, index) => {
      if(item.order_no === data.order_no){
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

  // 按单号添加已选单
  let getAndAdd = () => {
    let url = baseUrl + '/def/receive/getOrderSeclected/'
    let params = {
      type: pageInfo.type,
      order_no: pageInfo.order_no,
      correspond_order_no: $('.bind_order_code').val() + $('.bind_order_num').val(),
      billing_location: $('.d_billing_location').dropdown('get text'),
      departure_code: $('.d_departure_code').val(),
      destination_code: $('.d_destination_code').val(),
      expected_flight_time: $('.d_expected_flight_time').val(),
      expected_flight_no: $('.detail_flight_no').val() + $('.detail_flight_num').val(),
    }

    LXHR.POST(url, params).done(res => {
      if(res.status === 200) {
        let d = res.data
        if(d.length){
          addSelectedBill(d[0])
        }else{
          LALERT.msg('该单号不存在')
        }
      }else{
        LALERT.msg(res.message)
      }
    })
  }
  
  $('.add_by_order').on('click', function () {
    getAndAdd()
  })

  $('.d_correspond_order_no').on('keyup', function (evt) {
    if(evt.keyCode === 13) {
      gotoBind()
      $('.main_order_info .bind_order_no').html(pageInfo.type ? `分单号: ${pageInfo.order_no}` : `主单号: ${pageInfo.order_no}`)
      fillBindInfo()
      !selectList.length && getSelectBill($('.d_billing_location').dropdown('get text'))
      !selectList.length && getSelectedBill()
      !selectList.length && $('.billingLocation').dropdown('set text', $('.d_billing_location').dropdown('get text'))
    }
  })

  $('.tabNav .bind').on('click', function(){
    $('.main_order_info .bind_order_no').html(pageInfo.type ? `分单号: ${pageInfo.order_no}` : `主单号: ${pageInfo.order_no}`)
    fillBindInfo()
    !selectList.length && getSelectBill($('.d_billing_location').dropdown('get value'))
    !selectList.length && getSelectedBill()
    !selectList.length && $('.billingLocation').dropdown('set text', $('.d_billing_location').dropdown('get text'))
  })

  $('.search_select_btn').on('click', function (evt) {
    let location = $('.billingLocation').dropdown('get text')
    getSelectBill(location)
  })

  // 获取选中数据
  let getSelectData = className => {
    return Array.from( $(className).find('input:checked') ).map(item => $(item).data('info'))
  }

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