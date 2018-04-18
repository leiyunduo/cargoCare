
// 添加时改变状态
$('.addBtn').on('click', function(){
  pageInfo.isEdit = false
  pageInfo.reset = true
  $('.two_level_menu_head .title').html('国内民航管理添加')
  resetAll()
  gotoDetail()
})

// 获取收/发货人信息 =============================================================================================
;(function(){
  let getSenderReceiverUrl = baseUrl + '/def/basic/dic/getSenderReceiver'
  // 发货人
  $('.detail_sender_code').on('change', function () {
    LXHR.POST(getSenderReceiverUrl, {code: $(this).val()}).done(res => {
      if(res.status === 200){
        let d = res.data[0]
        $('.detail_sender_name').val(d.full_name)
        $('.detail_sender_telephone').val(d.telephone)
        $('.detail_sender_fax').val(d.fax)
        $('.detail_sender_email').val(d.email)
        $('.detail_sender_address').val(d.address)
        $('.detail_area_code').val(d.area_code)
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
        $('.detail_receiver_fax').val(d.fax)
        $('.detail_receiver_email').val(d.email)
        $('.detail_receiver_address').val(d.address)
      }else{
        LALERT.msg(res.message)
      }
    })
  })
})()

// 保存开单明细 ==================================================================================================
;(function(){
  let getSaveParams = () => {
    let costItemList = costInfo.costList.map(item => {
      return {
        cost_name: item.cost_name,
        payer: item.payer,
        relevance_id: item.relevance_id,
        invoice_price: item.invoice_price,
        invoice_choice_way: item.invoice_choice_way,
        is_lock: item.is_lock,
        absolute_cost: item.absolute_cost,
        actual_cost: item.actual_cost,
        remark: item.remark,
        is_sys_cost: item.is_sys_cost,
        payee: item.payee,
        related_type: item.related_type,
      }
    })
    costItemList = costItemList.length ? costItemList : null

    let custServiceList = customInfo.customList.map(item => {
      return {
        order_no: pageInfo.edit_order_no,
        cust_service_type: 3,
        state: item.state,
        content: item.content,
      }
    })
    custServiceList = custServiceList.length ? custServiceList : null

    let volumeList = volumeInfo.volumeList.map(item => {
      item = Object.assign(item, {order_no: pageInfo.edit_order_no})
      return {
        "order_no": item.order_no,
        "length": item.length,
        "width": item.width,
        "height": item.height,
        "quantity": item.quantity, 
        "volume": item.volume,
        "volume_weight": item.volume_weight,
      }
    })
    volumeList = volumeList.length ? volumeList : null

    return {
      //============================================================================================  运单信息
      order_three_code: $('.detail_order_three_code').val(),                     // 运单号三字码
      order_num: $('.detail_order_num').val(),                                   // 运单号8位数字
      departure_code: $('.detail_departure_code').val(),                         // 始发站3字码
      departure_name: '',                                                        // 始发站名称
      destination_code: $('.detail_destination_code').val(),                     // 目的站3字码
      destination_name: '',                                                      // 目的站名称
      sender_code: $('.detail_sender_code').val(),                               // 发货人
      sender_name: $('.detail_sender_name').val(),                               // 发货人名称
      receiver_code: $('.detail_receiver_code').val(),                           // 收货人
      receiver_name: $('.detail_receiver_name').val(),                           // 收货人名称
      area_code: $('.detail_area_code').val(),                                   // 区域
      //============================================================================================ 发货人、收货人信息
      sender_telephone: $('.detail_sender_telephone').val(),	                   // 发货人电话
      receiver_telephone: $('.detail_receiver_telephone').val(),	               // 收货人电话
      sender_fax: $('.detail_sender_fax').val(),                                 // 发货人传真
      receiver_fax: $('.detail_receiver_fax').val(),                             // 收货人传真
      sender_email: $('.detail_sender_email').val(),                             // 发货人邮箱
      receiver_email: $('.detail_receiver_email').val(),                         // 收货人邮箱
      sender_address: $('.detail_sender_address').val(),                         // 发货人地址
      receiver_address: $('.detail_receiver_address').val(),	                   // 收货人地址
      other_storage_remark: $('.detail_other_storage_remark').val(),             // 储运备注
      billing_remark: $('.detail_billing_remark').val(),                         // 结算备注
      starting_point_operation: $('.detail_starting_point_operation').val(),     // 出发操作点
      ship_whereabouts: $('.detail_ship_whereabouts').val(),                     // 发货去向
      expected_flight_time: $('.detail_expected_flight_time').val(),             // 预计航班日期
      expected_two_flight_code: $('.detail_expected_two_flight_code').val(),     // 预计航班号2字码
      expected_flight_num: $('.detail_expected_flight_num').val(),               // 预计航班号4位数字
      //============================================================================================ 货物信息
      product_no: $('.detail_product_no').val(),                                   // 品名代码
      product_name: $('.detail_product_name').val(),                               // 品名名称
      product_category_code: $('.detail_product_category_code').val(),             // 货物类别代码
      product_category: $('.detail_product_category').val(),	                     // 货物类别名称
      packaging_code: $('.detail_packaging_code').val(),	                         // 包装代码
      packaging_name: $('.detail_packaging_name').val(),                           // 包装名称
      pre_arrive_pay: $('.detail_pre_arrive_pay').dropdown('get value'),           // 预付、到付
      quantity: $('.detail_quantity').val(),	                                     // 件数
      net_weight: $('.detail_net_weight').val(),	                                 // 实重
      volume: $('.detail_net_volume').val(),                                       // 体积
      volumeList: volumeList,                                                      // 体积数据列表
      weight: $('.detail_weight').val(),	                                         // 计重
      base_weight: $('.detail_base_weight').val(),                                 // 基本重量
      incr_weight: $('.detail_incr_weight').val(),                                 // 递增重量
      joint_cargo_pieces: $('.detail_joint_cargo_pieces').val(),                   // 已拼货件数
      correspond_order_no: $('.detail_correspond_order_no').val(),                 // 对应单号
      sign_state: $('.detail_sign_state').dropdown('get value'),                   // 签收状态
      sign_quantity: $('.detail_sign_quantity').val(),                             // 签收件数
      costItemList: costItemList,                                                  // 费用列表
      payment_method: $('.detail_payment_method').dropdown('get value'),	         // 付款方式
      declared_value: $('.detail_declared_value').val(),                           // 申明价值
      receivable_check: $('.detail_receivable_check').val(),	                     // 应收核对情况
      handle_check: $('.detail_handle_check').val(),                               // 应付核对情况
      billing_time: $('.detail_billing_time').val(),                               // 开票时间
      issuer: $('.detail_issuer').val(),                                           // 开票人
      billing_location: $('.detail_billing_location').val(),	                     // 开票地点
      update_time: $('.detail_update_time').val(),                                 // 修改时间
      update_person: $('.detail_update_person').val(),                             // 修改人
      service_record: $('.detail_service_record').val(),                           // 客服记录
      custServiceList: custServiceList,                                            // 客服记录列表
    }
  }

  let saveDetail = () => {
    let addUrl = baseUrl + '/def/express/ca/insertCA/'
    let detailParams = getSaveParams()

    if(pageInfo.isEdit){
      Object.assign(detailParams, {order_no: pageInfo.edit_order_no})
      addUrl = baseUrl + '/def/express/ca/editCA/'
    }

    // 添加
    LXHR.POST(addUrl, JSON.stringify(detailParams), {contentType: 'application/json'}).done( res => {
      if(res.status === 200){
        LALERT.success('保存成功')
        searchMainList()
        backMain()
      }else{
        LALERT.msg(res.message)
      }
    })
  }


  $('.btn-save-detail').click(function(){ 
    getTime()
    let validate = $('.ui.form.detail_form').form('is valid')
    validate ? saveDetail() : failValidate()
  })
})()

// 编辑前查询 =====================================================================================================

let fillDetail = d => {
  if(!d) return
  //================================================================================================ 运单信息
  $('.detail_order_three_code').val(d.order_three_code)                     // 运单号三字码
  $('.detail_order_num').val(d.order_num)                                   // 运单号8位数字
  $('.detail_departure_code').val(d.departure_code)                         // 始发站3字码
  $('.detail_destination_code').val(d.destination_code)                     // 目的站3字码
  $('.detail_sender_code').val(d.sender_code)                               // 发货人
  $('.detail_sender_name').val(d.sender_name)                               // 发货人名称
  $('.detail_receiver_code').val(d.receiver_code)                           // 收货人
  $('.detail_receiver_name').val(d.receiver_name)                           // 收货人名称
  $('.detail_area_code').val(d.area_code)                                   // 区域
  //================================================================================================ 发货人、收货人信息
  $('.detail_sender_telephone').val(d.sender_telephone)	                   // 发货人电话
  $('.detail_receiver_telephone').val(d.receiver_telephone)	               // 收货人电话
  $('.detail_sender_fax').val(d.sender_fax)                                 // 发货人传真
  $('.detail_receiver_fax').val(d.receiver_fax)                             // 收货人传真
  $('.detail_sender_email').val(d.sender_email)                             // 发货人邮箱
  $('.detail_receiver_email').val(d.receiver_email)                         // 收货人邮箱
  $('.detail_sender_address').val(d.sender_address)                         // 发货人地址
  $('.detail_receiver_address').val(d.receiver_address)	                   // 收货人地址
  $('.detail_other_storage_remark').val(d.other_storage_remark)             // 储运备注
  $('.detail_billing_remark').val(d.billing_remark)                         // 结算备注
  $('.detail_starting_point_operation').val(d.starting_point_operation)     // 出发操作点
  $('.detail_ship_whereabouts').val(d.ship_whereabouts)                     // 发货去向
  $('.detail_expected_flight_time').val(formatDate(d.expected_flight_time)) // 预计航班日期
  // $('.detail_expected_two_flight_code').val(d.expected_two_flight_code)     // 预计航班号2字码
  // $('.detail_expected_flight_num').val(d.expected_flight_num)               // 预计航班号4位数字
  $('.detail_expected_two_flight_code').val(d.expected_flight_no && d.expected_flight_no.slice(0, 2))     // 预计航班号2字码
  $('.detail_expected_flight_num').val(d.expected_flight_no && d.expected_flight_no.slice(2, 6))               // 预计航班号4位数字
  //================================================================================================ 货物信息
  $('.detail_product_no').val(d.product_no)                                   // 品名代码
  $('.detail_product_name').val(d.product_name)                               // 品名名称
  $('.detail_product_category_code').val(d.product_category_code)             // 货物类别代码
  $('.detail_product_category').val(d.product_category)	                     // 货物类别名称
  $('.detail_packaging_code').val(d.packaging_code)	                         // 包装代码
  $('.detail_packaging_name').val(d.packaging_name)                           // 包装名称
  $('.detail_pre_arrive_pay').dropdown('set value', d.pre_arrive_pay)         // 预付、到付
  $('.detail_pre_arrive_pay').dropdown('set text', `${d.pre_arrive_pay ? '到付' : '预付'}`)  // 预付、到付
  $('.detail_quantity').val(d.quantity)	                                     // 件数
  $('.detail_net_weight').val(d.net_weight)	                                 // 实重
  $('.detail_net_volume').val(d.volume)                                       // 体积
  $('.detail_weight').val(d.weight)	                                         // 计重
  $('.detail_base_weight').val(d.base_weight)                                 // 基本重量
  $('.detail_incr_weight').val(d.incr_weight)                                 // 递增重量
  $('.detail_joint_cargo_pieces').val(d.joint_cargo_pieces)                   // 已拼货件数
  $('.detail_correspond_order_no').val(d.correspond_order_no)                 // 对应单号
  $('.detail_sign_state').dropdown('set value', d.sign_state)                 // 签收状态
  $('.detail_sign_state').dropdown('set text', `${d.sign_state ? '已签收' : '未签收'}`) // 签收状态
  $('.detail_sign_quantity').val(d.sign_quantity)                             // 签收件数
  $('.detail_payment_method').dropdown('set value', d.payment_method)         // 付款方式

  var detail_payment_method_text = ''
  switch (true) {
    case d.payment_method == 0:
      detail_payment_method_text = '现金'
    break;
    case d.payment_method == 1:
      detail_payment_method_text = '预付'
    break;
    default: detail_payment_method_text = '月结'
  }

  $('.detail_payment_method').dropdown('set text', detail_payment_method_text)   // 付款方式      
  $('.detail_declared_value').val(d.declared_value)                           // 申明价值
  $('.detail_receivable_check').val(d.receivable_check)	                     // 应收核对情况
  $('.detail_handle_check').val(d.handle_check)                               // 应付核对情况
  $('.detail_billing_time').val(formatTime(d.billing_time))                   // 开票时间
  $('.detail_issuer').val(d.issuer)                                           // 开票人
  $('.detail_billing_location').val(d.billing_location)	                     // 开票地点
  $('.detail_update_time').val(formatTime(d.update_time))                     // 修改时间
  $('.detail_update_person').val(d.update_person)                             // 修改人
  $('.detail_service_record').val(d.service_record)                           // 客服记录
}
 
let editSearch = () => {
  let url = baseUrl + '/def/express/ca/beforeEditCA/'
  // 编辑前查询
  LXHR.POST(url, {"order_no": pageInfo.edit_order_no}).done(res => {
    if(res.status === 200){
      let d = res.data[0]
      fillDetail(d)
      // 查询费用相关
      LXHR.POST(getCaPriceSpeciesUrl, {destination_code:d.destination_code}).done(res => {
        if(res.status === 200) {
          render_price_species_selection(res.data)
        }
      })
    }
  })
}

$('.table-list').on('click','.btn-edit',function(){
  resetAll()
  clearIpt()
  clearError()
  gotoDetail()
  pageInfo.isEdit = true
  pageInfo.edit_order_no = $(this).data('order')
  $('.two_level_menu_wrap').css({'display':'block'})
  $('.two_level_menu_head .title').html('国内民航管理编辑')
  editSearch()
})