let getBath = () => {
  let val = $('.detail_is_single').dropdown('get value')*1
  !val ? $('.detail_single_quantity').val(val) : $('.detail_single_quantity').val('')
}

// 添加时改变状态
$('.addBtn').on('click', function(){
  pageInfo.isEdit = false
  $('.two_level_menu_head .title').html('国内进港主单添加')
  gotoDetail()
  resetAll()
  getBath()
  $('.detail_keyboarder').val(pageInfo.real_name)
})

// 获取收/发货人信息 ===========================================================================================
;(function(){
  let getSenderReceiverUrl = baseUrl + '/def/basic/dic/getSenderReceiver'
  // 发货人
  $('.detail_sender_no').on('change', function () {
    LXHR.POST(getSenderReceiverUrl, {code: $(this).val()}).done(res => {
      if(res.status === 200){
        let d = res.data[0]
        $('.detail_sender_name').val(d.full_name)
        $('.detail_departure').focus()
      }else{
        LALERT.msg(res.message)
      }
    })
  })

  // 收货人
  $('.detail_receiver_code').on('change', function () {
    LXHR.POST(getSenderReceiverUrl, {code: $(this).val()}).done(res => {
      if(res.status === 200){
        let d = res.data[0]
        $('.detail_receiver_name').val(d.full_name)
        $('.detail_receiver_telephone').val(d.telephone)
        $('.detail_receiver_address').val(d.address  || '无')
        $('.detail_incur_expense').focus()
      }else{
        LALERT.msg(res.message)
      }
    })
  })
})()

// 获取反写信息 ================================================================================================
;(function(){
  // let url = baseUrl + '/def/receive/getName'
  let urlObj = {
    product: baseUrl + '/def/receive/getProduct',                     // 品名
    productCategory: baseUrl + '/def/receive/getProductCategory',     // 货物类别
    carrierCategory: baseUrl + '/def/receive/getCarrierCategory',     // 自分类别
    package: baseUrl + '/def/receive/getPackage',                     // 包装
    city: baseUrl + '/def/receive/getCity',                           // 城市
  }

  // 品名反写
  $('.detail_product_no').on('change', function () {
    LXHR.POST(urlObj['product'], {code: $(this).val(),}).done(res => {
      if(res.status === 200) {
        if(res.data) {
          let category = res.data[0].arrive_product_category
          categoryArr = category ? category.split('/') : ['','']
          let pkg = res.data[0].pkg
          pkgArr = pkg ? pkg.split('/') : ['','']
  
          $('.detail_product_name').val(res.data[0].name)
          $('.detail_product_category_code').val(categoryArr[0])
          $('.detail_product_category_name').val(categoryArr[1])
          $('.detail_packaging_code').val(pkgArr[0])
          $('.detail_packaging_name').val(pkgArr[1])
          $('.detail_quantity').focus()
        }
      }else{
        LALERT.msg(res.message)
      }
    })
  })
})()

// 保存开单明细 =================================================================================================
;(function(){
  let getSaveParams = () => {
    let custServiceList = customInfo.customList.map(item => {
      return {
        order_no: pageInfo.order_no,
        cust_service_type: 4,
        state: item.state,
        content: item.content,
      }
    })
    custServiceList = custServiceList.length ? custServiceList : null
    let is_batch = $('.detail_quantity').val() === $('.detail_arrive_quantity').val() ? 1 : 0
    return {
      type: $('.detail_type').dropdown('get value'),                                           // 模式
      transport_mode: $('.detail_transport_mode').dropdown('get value'),                       // 运输方式
      association_point: $('.detail_association_point').val(),	                               // 关联点
      start_code: $('.detail_start').val(),                                                         // 起飞站
      flight_date: $('.detail_flight_time').val(),                                             // 航班日期
      two_flight_code: $('.detail_flight_no').val(),                                           // 航班号代码
      flight_num: $('.detail_flight_num').val(),                                               // 航班号
      arrive_point_operation: $('.detail_arrive_point_operation').val(),                       // 到达操作点
      order_three_code: $('.detail_order_no_3').val(),
      order_num: $('.detail_order_no_8').val(),
      sender_code: $('.detail_sender_no').val(),                                               // 发货人代码
      sender_name: $('.detail_sender_name').val(),                                             // 发货人名称
      departure_code: $('.detail_departure').val(),                                                 //	始发站
      destination_code: $('.detail_destination').val(),                                             // 目的站
      product_no: $('.detail_product_no').val(),                                               // 品名代码
      product_name: $('.detail_product_name').val(),                                           // 品名
      product_category_code: $('.detail_product_category_code').val(),                         // 货物类别
      product_category_name: $('.detail_product_category_name').val(),                         // 货物类别中文名
      packaging_code: $('.detail_packaging_code').val(),                                                 // 包装
      packaging_name: $('.detail_packaging_name').val(),                                                 // 包装
      quantity: $('.detail_quantity').val(),                                                   // 件数
      net_weight: $('.detail_net_weight').val(),                                               // 实重
      weight: $('.detail_weight').val(),                                                       // 计重
      arrive_quantity: $('.detail_arrive_quantity').val(),                                     // 到达件数
      arrive_state: $('.detail_arrive_state').dropdown('get value'),                           // 到达状态
      arrive_weight: $('.detail_arrive_weight').val(),                                         // 到达重量
      receiver_code: $('.detail_receiver_code').val(),                                         // 收货人代码
      receiver_name: $('.detail_receiver_name').val(),                                         // 收货人姓名    
      state: $('.detail_state').dropdown('get value'),                                         // 货物状态
      receiver_telephone: $('.detail_receiver_telephone').val(),                               // 收货人电话
      receiver_address: $('.detail_receiver_address').val(),                                   // 收货人地址
      arrive_time: $('.detail_arrive_time').val(),                                             // 到达时间
      incur_expense: $('.detail_incur_expense').val(),                                         // 支出费用
      is_single: $('.detail_is_single').dropdown('get value'),                                 // 是否分单
      single_quantity: $('.detail_single_quantity').val(),                                     // 分单数
      expected_storeroom: $('.detail_expected_storeroom').val(),                               // 预计库房
      agency_fund: $('.detail_agency_fund').val(),                                             // 代收款
      remark: $('.detail_remark').val(),                                                       // 备注
      keyboarder: $('.detail_keyboarder').val(),                                               // 录入人
      keyboard_time: $('.detail_keyboard_time').val(),                                         // 录入日期
      update_person: $('.detail_update_person').val(),                                         // 修改人
      update_time: $('.detail_update_time').val(),                                             // 修改日期
      heir: $('.detail_heir').val(),                                                           // 交接人
      heir_time: $('.detail_heir_time').val(),                                                 // 交接日期
      excel: $('.detail_excel').val(),                                                         // EXCEL
      pick_up_table_weight: $('.detail_pick_weight').val(),                                    // 提货重量
      pick_up_table_quantity: $('.detail_pick_quantity').val(),                                // 提货件数
      custServiceList: custServiceList,                                                        // 客服记录列表
      is_batch: is_batch,                                                                      // 是否分批
    }
  }

  // 保存开单明细
  let saveArrivalsDetail = () => {
    let addArrivalsUrl = baseUrl + '/def/input/addInputSingle'
    let addArrivalsParams = getSaveParams()
    
    if(pageInfo.isEdit){
      Object.assign(addArrivalsParams, {order_no: pageInfo.order_no, id: pageInfo.editId})
      addArrivalsUrl = baseUrl + '/def/input/editInputSingle'
    }

    LXHR.POST(addArrivalsUrl, JSON.stringify(addArrivalsParams), {contentType: 'application/json'}).done(res => {
      if(res.status === 200){
        LALERT.success('保存成功')
        getArrivalsList()
        backMain()
      }else{
        LALERT.msg('保存失败')
      }
    })
  }

  $('.btn_save').on('click', function () {
    getTime()
    let validate = $('.ui.form.detail_form').form('is valid')
    validate ? saveArrivalsDetail() : failValidate()
  })
})()

$('.detail_is_single').on('change', function () {
  getBath()
})

// 编辑前查询 ===================================================================================================
;(function(){
  // 渲染到达情况
  let render_arrival_info_table = data => {
    let str = data.map((item, index) => {
      typeof item === 'object' && Object.keys(item).forEach(key => {
        item[key] = item[key] !== null ? item[key] : ''
        item[key] = item[key] !== undefined ? item[key] : ''
        if(key === 'arrive_state'){
          item[key] = item[key] ? '已到达' : '未到达'
        }
        if(key === 'transport_mode'){
          item[key] = '航空'
        }
      })
      
      return `
        <tr class="info-item">
          <td>${index + 1}</td>
          <td>${item.order_no}</td>
          <td>${item.flight_no}</td>
          <td>${item.departure}</td>
          <td>${item.destination}</td>
          <td>${item.product_category_name}</td>
          <td>${item.air_transit || ''}</td>
          <td>${item.is_nonstop || ''}</td>
          <td>${item.is_batch}</td>
          <td>${item.quantity}</td>
          <td>${item.net_weight}</td>
          <td>${item.arrive_weight}</td>
          <td>${item.arrive_quantity}</td>
          <td>${item.actual_fry_date}</td>
          <td>${formatTime(item.actual_fry_time)}</td>
          <td>${formatTime(item.arrive_time)}</td>
          <td>${item.arrive_state}</td>
          <td>${item.transport_mode}</td>
          <td>${item.remark}</td>
          <td>${formatTime(item.update_time)}</td>
          <td>${item.update_person}</td>
        </tr>`
      }
    ).join('')
    $('.arrival_info_table').html(str)
  }

  let fillDetail = d => {
    if(!d) return
    $('.detail_type').dropdown('set value', d.type)
    $('.detail_type').dropdown('set text', `${d.type ? '分单' : '主单'}`)                    // 模式
    $('.detail_transport_mode').val(d.transport_mode)                                       // 运输方式
    $('.detail_association_point').val(d.association_point)	                                // 关联点
    $('.detail_start').val(d.start_code)                                                    // 起飞站
    $('.detail_flight_time').val(formatDate(d.flight_date))                                 // 航班日期
    $('.detail_flight_no').val(d.two_flight_code)                                           // 航班号 
    $('.detail_flight_num').val(d.flight_num)                                               // 航班号                                          // 航班号
    $('.detail_arrive_point_operation').val(d.arrive_point_operation)                       // 到达操作点
    $('.detail_order_no_3').val(d.order_three_code)                                         // 主单号
    $('.detail_order_no_8').val(d.order_num)	                                              // 主单号
    $('.detail_sender_no').val(d.sender_code)                                               // 发货人
    $('.detail_sender_name').val(d.sender_name)                                             // 发货人
    $('.detail_departure').val(d.departure_code)                                            //	始发站
    $('.detail_destination').val(d.destination_code)                                        // 目的站
    $('.detail_product_name').val(d.product_name)                                           // 品名
    $('.detail_product_no').val(d.product_no)                                               // 品名代码
    $('.detail_product_category_code').val(d.product_category_code)                         // 货物类别
    $('.detail_product_category_name').val(d.product_category_name)                         // 货物类别中文名
    $('.detail_packaging_code').val(d.packaging_code)                                       // 包装
    $('.detail_packaging_name').val(d.packaging_name)                                       // 包装
    $('.detail_quantity').val(d.quantity)                                                   // 件数
    $('.detail_net_weight').val(d.net_weight)                                               // 实重
    $('.detail_weight').val(d.weight)                                                       // 计重
    $('.detail_arrive_quantity').val(d.arrive_quantity)                                     // 到达件数                
    $('.detail_arrive_state').dropdown('set value', d.arrive_state)                         // 到达状态
    $('.detail_arrive_state').dropdown('set text', `${d.arrive_state ? '已到达' : '未到达'}`)// 到达状态
    $('.detail_arrive_weight').val(d.arrive_weight)                                         // 到达重量
    $('.detail_receiver_code').val(d.receiver_code)                                         // 收货人代码
    $('.detail_receiver_name').val(d.receiver_name)                                         // 收货人名称      
    $('.detail_state').dropdown('set value', d.state)                                       // 货物状态
    $('.detail_state').dropdown('set text', `${d.state ? '已提货' : '已录入'}`)              // 货物状态
    $('.detail_receiver_telephone').val(d.receiver_telephone)                               // 收货人电话
    $('.detail_receiver_address').val(d.receiver_address)                                   // 收货人地址
    $('.detail_arrive_time').val(formatTime(d.arrive_time))                                 // 到达时间
    $('.detail_incur_expense').val(d.incur_expense)                                         // 支出费用
    $('.detail_is_single').dropdown('set value', d.is_single)                               // 是否分单
    $('.detail_is_single').dropdown('set text', `${d.is_single ? '分单' : '不分单'}`)        // 是否分单
    $('.detail_single_quantity').val(d.single_quantity)                                     // 分单数
    $('.detail_expected_storeroom').val(d.expected_storeroom)                               // 预计库房
    $('.detail_agency_fund').val(d.agency_fund)                                             // 代收款
    $('.detail_remark').val(d.remark)                                                       // 备注
    $('.detail_keyboarder').val(d.keyboarder)                                               // 录入人
    $('.detail_keyboard_time').val(formatTime(d.keyboard_time))                             // 录入日期
    $('.detail_update_person').val(d.update_person)                                         // 修改人
    $('.detail_update_time').val(formatTime(d.update_time))                                 // 修改日期
    $('.detail_heir').val(d.heir)                                                           // 交接人
    $('.detail_heir_time').val(formatTime(d.heir_time))                                     // 交接日期
    $('.detail_excel').val(d.excel)                                                         // EXCEL
    $('.detail_pick_weight').val(d.pick_up_table_weight)                                    // 提货重量
    $('.detail_pick_quantity').val(d.pick_up_table_quantity)                                // 提货件数
  }
  
  let editSearch = function (This) {
    let url = baseUrl + '/def/input/getInputSingleById'
    LXHR.POST(url, {"id": pageInfo.editId}).done(res => {
      if(res.status === 200){
        customInfo.change(res.data[0].custServiceList)
        let d = res.data[0]
        fillDetail(d)
        $('.detail_update_person').val(pageInfo.real_name)
        render_arrival_info_table(res.data)
      }else{
        LALERT.msg(res.message)
      }
    })
  }

  $('.inflight_main_table').on('click','.btn-edit',function(){
    pageInfo.isEdit = true
    pageInfo.order_no = $(this).data('order')
    pageInfo.editId = $(this).data('id')
    resetAll()
    $('.two_level_menu_wrap').css({'display':'block'})
    $('.two_level_menu_head .title').html('国内进港主单编辑')
    gotoDetail()
    editSearch()
  })
})()