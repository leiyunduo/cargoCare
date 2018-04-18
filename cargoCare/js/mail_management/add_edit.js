/**
 * 快件-国内民航管理
 */

// 添加时改变状态
$('.addBtn').on('click', function(){
  pageInfo.isEdit = false
  $('.two_level_menu_head .title').html('邮件管理添加')
  resetAll()
  gotoDetail()
})

// 获取收/发货人信息 =============================================================================================
;(function(){
  let getSenderReceiverUrl = baseUrl + '/def/basic/dic/getSenderReceiver'
  // 发货人
  $('.d_sender_code').on('change', function () {
    LXHR.POST(getSenderReceiverUrl, {code: $(this).val()}).done(res => {
      if(res.status === 200){
        let d = res.data[0]
        $('.d_sender_name').val(d.full_name)
        $('.d_sender_telephone').val(d.telephone)
        $('.d_sender_fax').val(d.fax)
        $('.d_sender_email').val(d.email)
        $('.d_sender_address').val(d.address)
      }else{
        LALERT.msg(res.message)
      }
    })
  })
  // 收货人
  $('.d_receiver_code').on('change', function () {
    LXHR.POST(getSenderReceiverUrl, {code: $(this).val()}).done(res => {
      if(res.status === 200){
        let d = res.data[0]
        $('.d_receiver_name').val(d.full_name)
        $('.d_receiver_telephone').val(d.telephone)
        $('.d_receiver_fax').val(d.fax)
        $('.d_receiver_address').val(d.address)
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
        cust_service_type: 4,
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
      order_three_code: $('.d_order_three_code').val(),                     // 运单号三字码
      order_num: $('.d_order_num').val(),                                   // 运单号8位数字
      departure_code: $('.d_departure_code').val(),                         // 始发站3字码                                                     // 始发站名称
      destination_code: $('.d_destination_code').val(),                     // 目的站3字码                                                // 目的站名称
      sender_code: $('.d_sender_code').val(),                               // 发货人
      sender_name: $('.d_sender_name').val(),                               // 发货人名称
      receiver_code: $('.d_receiver_code').val(),                           // 收货人
      receiver_name: $('.d_receiver_name').val(),                           // 收货人名称                                // 区域
      //============================================================================================ 发货人、收货人信息
      sender_fax: $('.d_sender_fax').val(),                                 // 发货人传真
      sender_telephone: $('.d_sender_telephone').val(),	                   // 发货人电话
      sender_sms_notification: $('.d_sender_sms_notification').dropdown('get value'),                                               // 短信通知
      sender_email: $('.d_sender_email').val(),                           // 发货人邮箱
      sender_address: $('.d_sender_address').val(),                         // 发货人地址      
      receiver_fax: $('.d_receiver_fax').val(),                             // 收货人传真      
      receiver_telephone: $('.d_receiver_telephone').val(),	               // 收货人电话
      receiver_sms_notification: $('.d_receiver_sms_notification').dropdown('get value'),                                             // 短信通知
      delivery_mode: $('d_delivery_mode').dropdown('get value'),                                  // 提货方式
      receiver_address: $('.d_receiver_address').val(),	                   // 收货人地址
      //============================================================================================ 承运人信息
      other_storage_remark: $('d_other_storage_remark').val(),                   // 储运备注
      billing_remark: $('d_billing_remark').val(),                               // 结算备注
      starting_point_operation: $('d_starting_point_operation').val(),           // 出发操作点
      first_transfer_code: $('d_first_transfer_code').val(),                     // 第一程三字码
      first_transfer_name: $('d_first_transfer_name').val(),                     // 第一程中文名
      air_transit: $('d_air_transit').dropdown('get value'),                     // 空运中转
      second_transfer_code: $('.d_second_transfer_code').val(),                  // 第二程三字码
      second_transfer_name: $('.d_second_transfer_name').val(),                  // 第二程中文名
      expected_flight_time: $('.d_expected_flight_time').val(),                  // 预计航班日期
      expected_two_flight_code: $('d_expected_two_flight_code').val(),           // 预计航班号
      expected_flight_num: $('d_expected_flight_num').val(),                     // 预计航班号
      //============================================================================================ 货物信息
      packaging_code: $('.d_packaging_code').val(),	                         // 包装代码
      packaging_name: $('.d_packaging_name').val(),                           // 包装名称
      quantity: $('.d_quantity').val(),	                                     // 件数
      net_weight: $('.d_net_weight').val(),	                                 // 实重
      volume: $('.d_net_volume').val(),                                       // 体积
      weight: $('.d_weight').val(),	                                         // 计重
      price_species_name: $('.d_price_species_name').dropdown('get text'),   // 价种
      price_species_code: $('.d_price_species_code').val(),                   // 价种代码
      billing_incr_price: $('d_billing_incr_price').val(),                         // 开票价
      //  结算单位代码
      //  结算单位中文名
      sale_price: $('.d_sale_price').val(),                                        // 销售价
      is_lock: $('d_is_lock').dropdown('get value'),                               // 是否锁定
      //============================================================================================ 开单信息
      payment_method: $('.d_payment_method').dropdown('get value'),	               // 付款方式
      // 状态
      declared_value: $('.d_declared_value').val(),                                // 申明价值
      insurance_value: $('d_insurance_value').val(),                               // 保险价值
      receivable_check: $('.d_receivable_check').val(),	                           // 应收核对情况
      handle_check: $('.d_handle_check').val(),                                    // 应付核对情况
      billing_time: $('.d_billing_time').val(),                                    // 开票时间
      issuer: $('.d_issuer').val(),                                                // 开票人
      billing_location: $('.d_billing_location').val(),	                           // 开票地点
      update_time: $('.d_update_time').val(),                                      // 修改时间
      update_person: $('.d_update_person').val(),                                  // 修改人
      service_record: $('.d_service_record').val(),                                // 客服记录
      custServiceList: custServiceList,                                            // 客服记录列表
      volumeList: volumeList,                                                      // 体积数据列表
      costItemList: costItemList,                                                  // 费用列表
    }
  }

  let saveDetail = () => {
    let addUrl = baseUrl + '/def/express/mail/insertMail/'
    let detailParams = getSaveParams()
    
    if(pageInfo.isEdit){
      Object.assign(detailParams, {order_no: pageInfo.order_no})
      addUrl = baseUrl + '/def/express/mail/editMail'
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

// 编辑前查询 ===================================================================================================
;(function(){
  let fillDetail = d => {
    //============================================================================================  运单信息
    $('.d_order_three_code').val(d.order_three_code)                     // 运单号三字码
    $('.d_order_num').val(d.order_num)                                   // 运单号8位数字
    $('.d_departure_code').val(d.departure_code)                         // 始发站3字码                                                     // 始发站名称
    $('.d_destination_code').val(d.destination_code)                     // 目的站3字码                                                // 目的站名称
    $('.d_sender_code').val(d.sender_code)                               // 发货人
    $('.d_sender_name').val(d.sender_name)                               // 发货人名称
    $('.d_receiver_code').val(d.receiver_code)                           // 收货人
    $('.d_receiver_name').val(d.receiver_name)                           // 收货人名称                                // 区域
    //============================================================================================ 发货人、收货人信息
    $('.d_sender_fax').val(d.sender_fax)                                 // 发货人传真
    $('.d_sender_telephone').val(d.sender_telephone)	                   // 发货人电话                                              // 短信通知
    $('.d_sender_email').val(d.sender_email)                           // 发货人邮箱
    $('.d_sender_address').val(d.sender_address)                         // 发货人地址      
    $('.d_receiver_fax').val(d.receiver_fax)                             // 收货人传真      
    $('.d_receiver_telephone').val(d.receiver_telephone)	               // 收货人电话
    $('.d_receiver_address').val(d.receiver_address)	                   // 收货人地址
    //============================================================================================ 承运人信息
    $('.d_other_storage_remark').val(d.other_storage_remark)                   // 储运备注
    $('.d_billing_remark').val(d.billing_remark)                               // 结算备注
    $('.d_starting_point_operation').val(d.starting_point_operation)           // 出发操作点
    $('.d_first_transfer_code').val(d.first_transfer_code)                     // 第一程三字码
    $('.d_first_transfer_name').val(d.first_transfer_name)                     // 第一程中文名
    $('.d_second_transfer_code').val(d.second_transfer_code)                  // 第二程三字码
    $('.d_second_transfer_name').val(d.second_transfer_name)                  // 第二程中文名
    $('.d_expected_flight_time').val(d.expected_flight_time)                  // 预计航班日期
    $('.d_expected_two_flight_code').val(d.expected_two_flight_code)           // 预计航班号
    $('.d_expected_flight_num').val(d.expected_flight_num)                     // 预计航班号
    //============================================================================================ 货物信息
    $('.d_packaging_code').val(d.packaging_code)	                         // 包装代码
    $('.d_packaging_name').val(d.packaging_name)                           // 包装名称
    $('.d_quantity').val(d.quantity)	                                     // 件数
    $('.d_net_weight').val(d.net_weight)	                                 // 实重
    $('.d_net_volume').val(d.volume)                                       // 体积
    $('.d_weight').val(d.weight)	                                         // 计重
    $('.d_price_species_code').val(d.price_species_code)                   // 价种代码
    $('d_billing_incr_price').val(d.billing_incr_price)                         // 开票价
    //  结算单位代码
    //  结算单位中文名
    $('.d_sale_price').val(d.sale_price)                                        // 销售价
    //============================================================================================ 开单信息
    // 状态
    $('.d_declared_value').val(d.declared_value)                                // 申明价值
    $('.d_insurance_value').val(d.insurance_value)                               // 保险价值
    $('.d_receivable_check').val(d.receivable_check)	                           // 应收核对情况
    $('.d_handle_check').val(d.handle_check)                                    // 应付核对情况
    $('.d_billing_time').val(formatTime(d.billing_time))                                    // 开票时间
    $('.d_issuer').val(d.issuer)                                                // 开票人
    $('.d_billing_location').val(d.billing_location)	                           // 开票地点
    $('.d_update_time').val(formatTime(d.update_time))                                      // 修改时间
    $('.d_update_person').val(d.update_person)                                  // 修改人
    $('.d_service_record').val(d.service_record)                                // 客服记录

    $('.d_price_species_name').dropdown('set value', d.price_species_name)   // 价种
    $('.d_price_species_name').dropdown('set text', d.price_species_name)
    $('.d_sender_sms_notification').dropdown('set value', d.sender_sms_notification) 
    $('.d_sender_sms_notification').dropdown('set text', d.sender_sms_notification ? '是' : '否')
    $('.d_receiver_sms_notification').dropdown('set value', d.receiver_sms_notification)    
    $('.d_receiver_sms_notification').dropdown('set text', d.receiver_sms_notification ? '是' : '否')                                         // 短信通知
    $('.d_delivery_mode').dropdown('set value', d.delivery_mode)                                  // 提货方式
    $('.d_delivery_mode').dropdown('set text', d.delivery_mode ? '配送' : '自提')
    $('.d_air_transit').dropdown('set value', d.air_transit)                     // 空运中转
    $('.d_air_transit').dropdown('set text', d.air_transit ? '是' : '否')
    $('.d_is_lock').dropdown('set value', d.is_lock)                               // 是否锁定
    $('.d_is_lock').dropdown('set text', d.is_lock ? '已锁定' : '未锁定')
    $('.d_payment_method').dropdown('set value', d.payment_method)	               // 付款方式
    $('.d_payment_method').dropdown('set text', d.payment_method ? '预付' : '现金')
  }

  let editSearch = () => {
    let url = baseUrl + '/def/express/mail/beforeEditMail'
    // 编辑前查询
    LXHR.POST(url, {"order_no": pageInfo.order_no}).done(res => {
      if(res.status === 200){
        let d = res.data[0]
        if(!d) return
        fillDetail(d)   
      }
    })
  }

  $('.mail_table_list').on('click','.btn-edit',function(){
    resetAll()
    gotoDetail()
    $('.two_level_menu_wrap').css({'display':'block'})
    $('.two_level_menu_head .title').html('邮件管理添加编辑')
    pageInfo.isEdit = true
    pageInfo.order_no = $(this).data('order')
    editSearch()
  })
})()