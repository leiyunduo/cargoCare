// 添加时改变状态
$('.btn_add').on('click', function(){
  pageInfo.isEdit = false
  $('.print_about').hide()
  $('.two_level_menu_head .title').html(pageInfo.type ? '国内收货分单添加' : '国内收货主单添加')
  resetAll()
  gotoDetail()
  $('.d_issuer').val(pageInfo.real_name)
})

// 获取收/发货人信息 ===========================================================================================
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
        $('.d_sender_address').val(d.address || '无')
        $('.d_receiver_code').focus()
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
        $('.d_receiver_address').val(d.address  || '无')
        $('.d_carrier_storage_remark').focus()
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

  let type = 1

  // 测试单号可用性
  $('.d_order_num').on('change', function () {
    let url = baseUrl + '/def/receive/orderNoUsed'
    LXHR.POST(url, {order_no: pageInfo.order_no}).done(res => {
      if(res.status !== 200) {
        $('.d_order_num').val('')
        $('.d_order_num').focus()
        clearError()
        LALERT.msg(res.message)
      }else{
        LALERT.success(res.message)
      }
    })
  })

  // 第一程反写
  $('.d_first_transfer_code').on('change', function () {
    LXHR.POST(urlObj['city'], {code: $(this).val(),}).done(res => {
      if(res.status === 200) {
        res.data && $('.d_first_transfer_name').val(res.data[0].cn_name)
        res.data && $('.d_air_transit').focus()
      }else{
        LALERT.msg(res.message)
      }
    })
  })

  // 第二程反写
  $('.d_second_transfer_code').on('change', function () {
    LXHR.POST(urlObj['city'], {code: $(this).val(),}).done(res => {
      if(res.status === 200) {
        res.data && $('.d_second_transfer_name').val(res.data[0].cn_name)
        res.data && $('.d_transshipment_unit').focus()
      }else{
        LALERT.msg(res.message)
      }
    })
  })

  // 品名反写
  $('.d_product_no').on('change', function () {
    LXHR.POST(urlObj['product'], {code: $(this).val(),}).done(res => {
      if(res.status === 200) {
        if(res.data) {
          let category = res.data[0].start_product_category
          categoryArr = category ? category.split('/') : ['','']
          let pkg = res.data[0].pkg
          pkgArr = pkg ? pkg.split('/') : ['','']

          $('.d_product_category_code').val(categoryArr[0])
          $('.d_product_category').val(categoryArr[1])
          $('.d_packaging_code').val(pkgArr[0])
          $('.d_packaging_name').val(pkgArr[1])
          $('.d_product_category_code').change()

          $('.d_product_name').val(res.data[0].name)
          $('.d_product_code').focus()
        }
      }else{
        LALERT.msg(res.message)
      }
    })
  })

  // 货物类别反写
  $('.d_product_category_code').on('change', function () {
    LXHR.POST(urlObj['productCategory'], {code: $(this).val(), type: type}).done(res => {
      if(res.status === 200) {
        if(res.data) {
          $('.d_product_category').val(res.data[0].name)
          $('.d_departure_priority').dropdown('set value', res.data[0].departure_priority)
          $('.d_departure_priority').dropdown('set text', res.data[0].departure_priority*1 ? '优先' : '普通')
          $('.d_your_category_code').focus()
        }
      }else{
        LALERT.msg(res.message)
      }
    })
  })

  // 自分类别反写
  $('.d_your_category_code').on('change', function () {
    LXHR.POST(urlObj['carrierCategory'], {code: $(this).val(), type: type,}).done(res => {
      if(res.status === 200) {
        if(res.data) {
          $('.d_your_category').val(res.data[0].name)
          $('.d_packaging_code').focus()
        }
      }else{
        LALERT.msg(res.message)
      }
    })
  })

  // 包装反写
  $('.d_packaging_code').on('change', function () {
    LXHR.POST(urlObj['package'], {code: $(this).val(),}).done(res => {
      if(res.status === 200) {
        if(res.data) {
          $('.d_packaging_name').val(res.data[0])
          $('.d_piece').focus()
        }
      }else{
        LALERT.msg(res.message)
      }
    })
  })
})()

// 计算补全单号 ================================================================================================
;(function(){
  // $('.d_order_num').on('input', function () {
  //   let val = $(this).val()
  //   if(val.length === 7){
  //     let eight = val.split('').reduce((n1, n2) => {
  //       return n1*1 + n2*1
  //     }, 0) % 7
  //     $(this).val(val + eight)
  //   }
  // })
})()

// 中转相关 ====================================================================================================
;(function(){
  // $('.d_destination_code').on('change', function () {
  //   $('.d_first_transfer_code').val($(this).val())
  // })

  // $('.d_air_transit').on('change', function () {
  //   let val = $('.d_destination_code').val()
  //   let v = $('.d_air_transit').dropdown('get value')*1
  //   if(v){
  //     $('.d_first_transfer_code').val('')
  //     $('.d_second_transfer_code').val(val)
  //   }else{
  //     $('.d_first_transfer_code').val(val)
  //     $('.d_second_transfer_code').val('')
  //   }
  // })
})()

// 判断对应单号是否可用
;(function(){
  // 按单号添加已选单
  let can_use_orderno = () => {
    let url = baseUrl + '/def/receive/getOrders2Seclected/'
    let params = {
      type: pageInfo.type,
      order_no: pageInfo.order_no,
      correspond_order_no: $('.d_correspond_order_no').val(),
      billing_location: $('.d_billing_location').dropdown('get text'),
      departure_code: $('.d_departure_code').val(),
      destination_code: $('.d_destination_code').val(),
      expected_flight_time: $('.d_expected_flight_time').val(),
      expected_flight_no: $('.detail_flight_no').val() + $('.detail_flight_num').val(),
    }

    LXHR.POST(url, params).done(res => {
      if(res.status === 200) {
        LALERT.success('对应单号可用')
      }else{
        LALERT.msg('对应单号不可用')
      }
    })
  }

  // $('.d_correspond_order_no').on('change', function () {
  //   can_use_orderno()
  // })
})()

// 保存开单明细 ===============================================================================================
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
      order_no: pageInfo.order_no,
      cust_service_type: pageInfo.type,
      state: item.state,
      content: item.content,
      entry_time: item.entry_time
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

  let ccaMainSingleList = selectedList.map(item => {
    return {
      order_no: item.order_no,
      correspond_order_no: pageInfo.order_no,
      destination_code: $('.d_destination_code').val(),
      departure_code: $('.d_departure_code').val(),
    }
  })

  ccaMainSingleList = ccaMainSingleList.length ? ccaMainSingleList : null

  return {
    "order_three_code": $('.d_order_code').val(),                                                // 三字码
    "order_num": $('.d_order_num').val(),                                                        // 8位数字
    "departure_code": $('.d_departure_code').val(),                                              // 始发站
    "destination_code": $('.d_destination_code').val(),                                          // 目的站
    "sender_code": $('.d_sender_code').val(),                                                    // 发货人
    "sender_name": $('.d_sender_name').val(),
    "receiver_code": $('.d_receiver_code').val(),                                                // 收货人
    "receiver_name": $('.d_receiver_name').val(),
    "sender_telephone": $('.d_sender_telephone').val(),                                          // 发货人电话
    "receiver_telephone": $('.d_receiver_telephone').val(),                                      // 收货人电话
    // "sender_fax": $('.d_sender_fax').val(),                                                      // 发货人传真                 
    // "receiver_fax": $('.d_receiver_fax').val(),                                                  // 收货人传真
    // "sender_sms_notification": $('.d_sender_sms_notification').dropdown('get value'),            // 短信通知
    // "receiver_sms_notification": $('.d_receiver_sms_notification').dropdown('get value'),
    "delivery_mode": $('.d_delivery_mode').dropdown('get value'),                                // 提货方式
    "sender_address": $('.d_sender_address').val(),                                              // 地址
    "receiver_address": $('.d_receiver_address').val(),
    "carrier_storage_remark": $('.d_carrier_storage_remark').val(),                              // 承运人储运备注
    "other_storage_remark": $('.d_other_storage_remark').val(),                                  // 其他储运备注
    "billing_remark": $('.d_billing_remark').val(),                                              // 结算备注
    "starting_point_operation": $('.d_starting_point_operation').val(),                          // 出发操作点
    "first_transfer_code": $('.d_first_transfer_code').val(),                                    // 第一程
    "first_transfer_name": $('.d_first_transfer_name').val(),
    "air_transit": $('.d_air_transit').dropdown('get value'),                                    // 空运中转
    "second_transfer_code": $('.d_second_transfer_code').val(),                                  // 第二程
    "second_transfer_name": $('.d_second_transfer_name').val(),
    "transshipment_unit": $('.d_transshipment_unit').val(),                                      // 中转理货单位
    "correspond_order_no": $('.d_correspond_order_no').val(),                                    // 对应单号
    "expected_flight_time": $('.d_expected_flight_time').val(),                                  // 预计航班日期
    "expected_two_flight_code": $('.d_expected_two_flight_code').val(),                          // 二字码
    "expected_flight_num": $('.d_expected_flight_num').val(),                                    // 数字
    "product_no": $('.d_product_no').val(),                                                      // 品名代码
    "product_name": $('.d_product_name').val(),                                                  // 中文名
    "product_code": $('.d_product_code').val(),                                                  // 商品代码                                            
    "product_category_code": $('.d_product_category_code').val(),                                // 货物类别
    "product_category": $('.d_product_category').val(), 
    "your_category_code": $('.d_your_category_code').val(),                                      // 自分类别
    "your_category": $('.d_your_category').val(),
    "packaging_code": $('.d_packaging_code').val(),                                              // 包装
    "packaging_name": $('.d_packaging_name').val(),
    "departure_priority": $('.d_departure_priority').val(),                                      // 出发优先级
    "quantity": $('.d_quantity').val(),                                                          // 件数
    "net_weight": $('.d_net_weight').val(),                                                      // 实重
    "volume": $('.d_volume').val(),                                                              // 体积
    "weight": $('.d_weight').val(),                                                              // 计重
    "price_species_name": $('.d_price_species_name').dropdown('get text'),                                      // 价种
    "price_species_code": $('.d_price_species_code').val(),                                      // 价种代码
    "invoice_price": $('.d_invoice_price').val(),                                                // 费率 开票价
    "clearing_unit_code": $('.d_clearing_unit_code').val(),                                      // 结算单位代码
    "clearing_unit": $('.d_clearing_unit').val(),                                                // 结算单位
    // "discount": $('.d_discount').val(),                                                          // 折扣
    "payment_method": $('.d_payment_method').dropdown('get value'),                              // 付款方式
    // "state": $('.d_state').dropdown('get value'),                                                // 状态
    // "receipt_type": $('.d_receipt_type').dropdown('get value'),                                  // 单据类型
    "service_record": $('.d_service_record').val(),                                              // 客服记录
    "billing_time": $('.d_billing_time').val(),                                                  // 开票时间
    "issuer": $('.d_issuer').val(),                                                              // 开票人
    "billing_location": $('.d_billing_location').dropdown('get text'),                          // 开票地点
    "update_time": $('.d_update_time').val(),                                                    // 修改时间
    "update_person": $('.d_update_person').val(),                                                // 修改人
    declared_value: $('.d_declared_value').val(),                                                // 申明价值
    insurance_value: $('.d_insurance_value').val(),                                              // 保险价值
    joint_cargo_pieces: pageInfo.bindNum,                                                        // 已拼件数
    "volumeList": volumeList, //体积
    "costItemList": costItemList, //费用
    "custServiceList": custServiceList, //客服
    "ccaMainSingleList": ccaMainSingleList, // 拼单
  }
}

let getMainParams = () => {
  let commonParams = getSaveParams()
  return Object.assign(commonParams, {
    receivable_check: $('.d_receivable_check').val(),   // 应收核对
    handle_check: $('.d_handle_check').val(),           // 应付核对
  })
}

let getSubParams = () => {
  let commonParams = getSaveParams()
  return Object.assign(commonParams, {
    delivery_payee: $('.d_delivery_payee').dropdown('get value'),    // 派送费付款方
    pre_arrive_pay: $('.d_pre_arrive_pay').dropdown('get value'),    // 是否预付
    joint_network_company: $('.d_joint_network_company').val(),      // 拼货网络公司
    signer_telephone: $('.d_signer_telephone').val(),                // 提货电话
    is_put: $('.d_pre_arrive_pay').dropdown('get value'),            // 是否放货
    ship_whereabouts: $('.d_ship_whereabouts').dropdown('get text'), // 发货去向
    sign_state: $('.d_sign_state').dropdown('get value'),            // 签收状态
    sign_num: $('.d_sign_num').val(),                                // 签收件数
    print_num: $('.d_print_num').val(),                              // 打印次数
  })
}

let saveReceiveDetail = () => {
  let url = baseUrl + '/def/receive/insertReceive'
  getTime()
  let params = pageInfo.type ? getSubParams() : getMainParams()

  if(pageInfo.isEdit){
    Object.assign(params, {order_no: pageInfo.order_no})
    url = baseUrl + '/def/receive/editReceive'
  }

  return new Promise(resolve => {
    let validate = $('.ui.form.detail_form').form('is valid')
    validate ? 
    LXHR.POST(url, JSON.stringify(params), {contentType: 'application/json'}).done(res => {
      if(res.status === 200){
        LALERT.success('保存成功')
        !pageInfo.status && getReceiveInfo()
        resolve()
        backMain()
      }else{
        LALERT.msg(res.message)
      }
    }) :
    failValidate()
  }) 
}

$('.btn_save').on('click', function () {
  saveReceiveDetail()
})

// 编辑前查询填充 =============================================================================================
let fillDetail = d => {
  if(!d) return
  $('.d_order_code').val(d.order_three_code)                                                // 三字码
  $('.d_order_num').val(d.order_num)                                                        // 8位数字
  $('.d_departure_code').val(d.departure_code)                                              // 始发站
  $('.d_destination_code').val(d.destination_code)                                          // 目的站
  $('.d_sender_code').val(d.sender_code)                                                    // 发货人
  $('.d_sender_name').val(d.sender_name)
  $('.d_receiver_code').val(d.receiver_code)                                                // 收货人
  $('.d_receiver_name').val(d.receiver_name)
  $('.d_sender_telephone').val(d.sender_telephone)                                          // 发货人电话
  $('.d_receiver_telephone').val(d.receiver_telephone)                                      // 收货人电话
  // $('.d_sender_fax').val(d.sender_fax)                                                      // 发货人传真                 
  // $('.d_receiver_fax').val(d.receiver_fax)                                                  // 收货人传真
  $('.d_sender_address').val(d.sender_address)                                              // 地址
  $('.d_receiver_address').val(d.receiver_address)
  $('.d_carrier_storage_remark').val(d.carrier_storage_remark)                              // 承运人储运备注
  $('.d_other_storage_remark').val(d.other_storage_remark)                                  // 其他储运备注
  $('.d_billing_remark').val(d.billing_remark)                                              // 结算备注
  $('.d_starting_point_operation').val(d.starting_point_operation)                          // 出发操作点
  $('.d_first_transfer_code').val(d.first_transfer_code)                                    // 第一程
  $('.d_first_transfer_name').val(d.first_transfer_name)
  $('.d_second_transfer_code').val(d.second_transfer_code)                                  // 第二程
  $('.d_second_transfer_name').val(d.second_transfer_name)
  $('.d_transshipment_unit').val(d.transshipment_unit)                                      // 中转理货单位
  $('.d_correspond_order_no').val(d.correspond_order_no)                                    // 对应单号
  $('.d_expected_flight_time').val(d.expected_flight_time)                                  // 预计航班日期
  $('.d_expected_two_flight_code').val(d.expected_two_flight_code)                          // 二字码
  $('.d_expected_flight_num').val(d.expected_flight_num)                                    // 数字
  $('.d_product_no').val(d.product_no)                                                      // 品名代码
  $('.d_product_name').val(d.product_name)                                                  // 中文名
  $('.d_product_code').val(d.product_code)                                                  // 商品代码                                            
  $('.d_product_category_code').val(d.product_category_code)                                // 货物类别
  $('.d_product_category').val(d.product_category) 
  $('.d_your_category_code').val(d.your_category_code)                                      // 自分类别
  $('.d_your_category').val(d.your_category)
  $('.d_packaging_code').val(d.packaging_code)                                              // 包装
  $('.d_packaging_name').val(d.packaging_name)
  $('.d_departure_priority').val(d.departure_priority)                                      // 出发优先级
  $('.d_quantity').val(d.quantity)                                                          // 件数
  $('.d_net_weight').val(d.net_weight)                                                      // 实重
  $('.d_volume').val(d.volume)                                                              // 体积
  $('.d_weight').val(d.weight)                                                              // 计重
  $('.d_price_species_name').val(d.price_species_name)                                      // 价种
  $('.d_price_species_code').val(d.price_species_code)                                      // 价种代码
  $('.d_invoice_price').val(d.invoice_price)                                                // 费率
  $('.d_clearing_unit_code').val(d.clearing_unit_code)                                      // 结算单位
  $('.d_clearing_unit').val(d.clearing_unit)                                                // 结算单位
  $('.d_discount').val(d.discount)                                                          // 折扣
  $('.d_service_record').val(d.service_record)                                              // 客服记录
  $('.d_billing_time').val(formatTime(d.billing_time))                                      // 开票时间
  $('.d_issuer').val(d.issuer)                                                              // 开票人
  $('.d_update_time').val(formatTime(d.update_time))                                        // 修改时间
  $('.d_update_person').val(d.update_person)                                                // 修改人
  $('.d_declared_value').val(d.declared_value)                                              // 申明价值
  $('.d_insurance_value').val(d.insurance_value)                                            // 保险价值

  // $('.d_sender_sms_notification').dropdown('set value', d.sender_sms_notification)	   
  // $('.d_sender_sms_notification').dropdown('set text', d.sender_sms_notification ? '是' : '否')
  // $('.d_receiver_sms_notification').dropdown('set value', d.receiver_sms_notification)	   
  // $('.d_receiver_sms_notification').dropdown('set text', d.receiver_sms_notification ? '是' : '否')
  $('.d_billing_location').dropdown('set value', d.billing_location)                                          // 开票地点
  $('.d_billing_location').dropdown('set text', d.billing_location)

  $('.d_delivery_mode').dropdown('set value', d.delivery_mode)                                // 提货方式
  var d_delivery_text = ''
  switch (true) {
    case d.delivery_mode == 0:
      d_delivery_text = '自提'
    break;
    case d.delivery_mode == 1:
      d_delivery_text = '配送'
    break;
    default: d_delivery_text = '中转'
  }
  $('.d_delivery_mode').dropdown('set text', d_delivery_text)
  
  $('.d_air_transit').dropdown('set value', d.air_transit)                                    // 空运中转
  $('.d_air_transit').dropdown('set text', d.air_transit ? '是' : '否')
  $('.d_payment_method').dropdown('set value', d.payment_method)                              // 付款方式
  $('.d_payment_method').dropdown('set text', d.payment_method ? '预付' : '现金')
  // $('.d_state').dropdown('set value', d.state)                                                // 状态
  // $('.d_state').dropdown('set text', d.state ? '已使用' : '未使用')
  // $('.d_receipt_type').dropdown('set value', d.receipt_type),                                  // 单据类型
  // $('.d_receipt_type').dropdown('set text', d.receipt_type ? '事后' : '即时')
}

let fillMain = d => {
  fillDetail(d)
  $('.d_receivable_check').val(d.receivable_check)   // 应收核对
  $('.d_handle_check').val(d.handle_check)           // 应付核对
}

let fillSub = d => {
  fillDetail(d)
  $('.d_joint_network_company').val(d.joint_network_company)      // 拼货网络公司
  $('.d_signer_telephone').val(d.signer_telephone)                // 提货电话
  $('.d_sign_num').val(d.sign_num)                                 // 签收件数
  $('.d_print_num').val(d.print_num)                              // 打印次数
  $('.d_joint_cargo_pieces').val(d.joint_cargo_pieces)            // 已拼货件数

  $('d_ship_whereabouts').dropdown('set text', d.ship_whereabouts)     // 发货去向
  $('d_pre_arrive_pay').dropdown('set value', d.is_put)                // 是否放货
  $('d_pre_arrive_pay').dropdown('set text', d.is_put ? '是' : '否')   // 是否放货
  $('.d_sign_state').dropdown('set value', d.sign_state)                // 签收状态
  $('.d_sign_state').dropdown('set text', d.sign_state ? '未签收' : '已签收')         // 签收状态
  $('d_delivery_payee').dropdown('set value', d.delivery_payee)          // 派送费付款方
  $('d_delivery_payee').dropdown('set text', d.delivery_payee ? '收货方付派送提货费' : '发货方付派送提货费') // 派送费付款方
  $('d_pre_arrive_pay').dropdown('set value', d.pre_arrive_pay)          // 是否预付

  $('d_pre_arrive_pay').dropdown('set text', d.pre_arrive_pay)          // 是否预付
  var pre_arrive_pay_text = ''
  switch (true) {
    case d.pre_arrive_pay == 0:
      pre_arrive_pay_text = '预付'
    break;
    case d.pre_arrive_pay == 1:
      pre_arrive_pay_text = '网络公司到付'
    break;
    case d.pre_arrive_pay == 2:
      pre_arrive_pay_text = '收货人到付'
    break;
    default: break;
  }
  $('.d_pre_arrive_pay').dropdown('set text', pre_arrive_pay_text)
}

let editSearch = () => {
  let url = baseUrl + '/def/receive/beforeEditReceive'

  LXHR.POST(url, {order_no: pageInfo.order_no}).done(res => {
    if(res.status !== 200){
      LALERT.msg(res.message)
      return
    }
    let d = res.data[0]
    pageInfo.type ? fillSub(d) : fillMain(d)
    $('.d_update_person').val(pageInfo.real_name)
    customInfo.change(d.custServiceList)
    volumeInfo.change(d.volumeList)
    selectedList = d.ccaMainSingleList

    getPriceSpecies()
  })
}

$('.receive_table').on('click', '.btn-edit', function () {
  gotoDetail()
  resetAll()
  pageInfo.isEdit = true
  pageInfo.order_no = $(this).data('order')
  $('.print_about').show()
  $('.two_level_menu_wrap').css({'display':'block'})
  $('.two_level_menu_head .title').html(pageInfo.type ? '国内分单收货编辑' : '国内主单收货编辑')
  editSearch()
})