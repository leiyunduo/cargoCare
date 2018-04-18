// 查询sign_no ===============================================================================================
let getSignNo = () => {
  const getSignNoUrl = baseUrl + '/def/pick_up/getSignNo'
  LXHR.POST(getSignNoUrl).done(res => {
    if(res.status === 200) {
      $('.sign_no').val(res.data[0])
      pageInfo.sign_no = res.data[0]
    }
  })
}

// 添加前查询 ===================================================================================================
;(function(){
  const beforeInsertUrl = baseUrl + '/def/pick_up/beforeInsertPickUpMain'

  $('.order_no').on('change', function () {
    if($('.detail_order_no_3').val() && $('.detail_order_no_8').val()){
      let order_no = $('.detail_order_no_3').val() + $('.detail_order_no_8').val()
      pageInfo.order_no = order_no
      !pageInfo.is_edit &&  LXHR.POST(beforeInsertUrl, {order_no}).done(res => {
        if(res.status !== 200){
          LALERT.msg(res.message)
          return
        }
        let d = res.data[0]
        if(!d) return
        $('.d_quantity').val(d.quantity)
        $('.d_net_weight').val(d.net_weight)
        $('.d_weight').val(d.weight)
        $('.d_destination_code').val(d.destination_code)
        $('.d_destination_name').val(d.destination_name)
        $('.d_product_no').val(d.product_no)
        $('.d_product_name').val(d.product_name)
        $('.d_product_category_code').val(d.product_category_code)
        $('.d_product_category_name').val(d.product_category_name)
        $('.d_packaging_name').val(d.packaging_name)
        $('.d_packaging_code').val(d.packaging_code)
        $('.d_departure_code').val(d.departure_code)
        $('.d_departure_name').val(d.departure_name)
        $('.d_transport_mode').val(d.transport_mode)
        $('.d_agency_fund').val(d.agency_fund)

        $('.d_receiver_code').val(d.receiver_code)
        $('.d_receiver_name').val(d.receiver_name)
        $('.d_receiver_telephone').val(d.receiver_telephone)
        $('.d_receiver_address').val(d.receiver_address)
        $('.d_sender_code').val(d.sender_code)
        $('.d_sender_name').val(d.sender_name)
        $('.d_arrive_point_operation').val(d.arrive_point_operation)
      })
    }
  })
})()

$('.addBtn').click(function(){
  pageInfo.is_edit = false
  $('.two_level_menu_head .title').html(pageInfo.type ? '国内分单提货添加' : '国内主单提货添加')
  gotoDetail()
  resetAll()
  getSignNo()
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
        $('.d_association_point_code').focus()
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
        $('.d_receiver_address').val(d.address  || '无')
        $('.d_billing_method').focus()
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
    area: baseUrl + '/def/pick_up/getArea',                           // 区域
  }

  // 品名反写
  $('.d_product_code').on('change', function () {
    LXHR.POST(urlObj['product'], {code: $(this).val(),}).done(res => {
      if(res.status === 200) {
        if(res.data) {
          let category = res.data[0].arrive_product_category
          categoryArr = category ? category.split('/') : ['','']
          let pkg = res.data[0].pkg
          pkgArr = pkg ? pkg.split('/') : ['','']
  
          $('.d_product_name').val(res.data[0].name)
          $('.d_product_category_code').val(categoryArr[0])
          $('.d_product_category_name').val(categoryArr[1])
          $('.d_packaging_code').val(pkgArr[0])
          $('.d_packaging_name').val(pkgArr[1])

          $('.d_departure_code').focus()
        }
      }else{
        LALERT.msg(res.message)
      }
    })
  })

  // 关联点反写
  $('.d_association_point_code').on('change', function () {
    LXHR.POST(urlObj['city'], {code: $(this).val(),}).done(res => {
      if(res.status === 200) {
        if(res.data) {
          $('.d_association_point_name').val(res.data[0].cn_name)
          $('.d_line').focus()
        }
      }else{
        LALERT.msg(res.message)
      }
    })
  })

  // 区域反写
  $('.d_area_code').on('change', function () {
    LXHR.POST(urlObj['area'], {code: $(this).val(),}).done(res => {
      if(res.status === 200) {
        if(res.data) {
          $('.d_area_name').val(res.data[0].name)
          $('.d_sender_code').focus()
        }
      }else{
        LALERT.msg(res.message)
      }
    })
  })
})()

// 添加 ========================================================================================================
;(function(){
  let getSaveParams = () => {
    let costItemList = costInfo.costList.map(item => {
      return {
        cost_name: item.cost_name,
        payer: item.payer,
        relevance_id: item.relevance_id,
        invoice_price: item.invoice_price,
        invoice_choice_way: item.invoice_choice_way,
        is_lock: item.is_lock ? item.is_lock : 0,
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
        cust_service_type: pageInfo.type ? 6 : 5,
        state: item.state,
        content: item.content,
      }
    })
    custServiceList = custServiceList.length ? custServiceList : null
    
    return {
      sign_no: pageInfo.sign_no,                                                          // 签收单号
      order_three_code: $('.detail_order_no_3').val(),                                    //	运单号三字码
      order_num: $('.detail_order_no_8').val(),	                                          // 运单号后缀
      single_order_code: $('.single_order_code').val(),	                                  // 分单号三字码
      single_order_num: $('.single_order_num').val(),	                                    // 分单号后缀
      quantity: $('.d_quantity').val(),                                                   // 件数
      net_weight: $('.d_net_weight').val(),                                               // 实重
      weight: $('.d_weight').val(),                                                       // 计重
      destination_code: $('.d_destination_code').val(),                                   // 目的站三字码
      destination_name: $('.d_destination_name').val(),                                   // 目的站中文名
      is_domestic: $('.d_is_domestic').dropdown('get value'),                             // 国内国际
      product_no: $('.d_product_code').val(),                                               // 商品代码
      product_name: $('.d_product_name').val(),                                           // 品名
      product_category_code: $('.d_product_category_code').val(),                         // 货物类别代码
      product_category_name: $('.d_product_category_name').val(),                         // 货物类别中文名
      packaging_name: $('.d_packaging_name').val(),                                       // 包装中文名
      packaging_code: $('.d_packaging_code').val(),                                       // 包装代码
      departure_code: $('.d_departure_code').val(),                                       // 起点三字码
      departure_name: $('.d_departure_name').val(),                                       // 起点中文名
      transport_mode: $('.d_transport_mode').dropdown('get value'),                       // 到达/运输方式
      state: $('.d_state').dropdown('get value'),  	                                      // 派送状态
      delivery_mode: $('.d_delivery_mode').dropdown('get value'),  	                      // 提货方式
      payer: $('.d_payer').val(),                                                         // 付款方
      agency_fund: $('.d_agency_fund').val(),	                                            // 代收款
      actual_sender: $('.d_actual_sender').val(),                                         // 实付发货人
      receiver_code: $('.d_receiver_code').val(),	                                        // 收货人代码
      receiver_name: $('.d_receiver_name').val(),	                                        // 收货人名称
      receiver_telephone: $('.d_receiver_telephone').val(),	                              // 收货人电话
      billing_method: $('.d_billing_method').dropdown('get value'),	                      // 结算方式
      receiver_certificate_category: $('.d_receiver_certificate_category').dropdown('get value'),	// 收货人证件类别
      receiver_certificate_no: $('.d_receiver_certificate_no').val(),	                    // 收货人证件号
      receiver_address: $('.d_receiver_address').val(),                                   // 收货人地址
      area_code: $('.d_area_code').val(),	                                                // 区域
      area_name: $('.d_area_name').val(),	                                                // 区域
      line: $('.d_line').val(),	                                                          // 线路
      car_number: $('.d_car_number').val(),                                               // 车号
      driver: $('.d_driver').val(),                                                       // 司机
      is_put: $('.d_is_put').dropdown('get value'),	                                      // 是否放货
      remark: $('.d_remark').val(),	                                                      // 备注
      signer: $('.d_signer').val(),	                                                      // 签收人
      signer_certificate_category: $('.d_signer_certificate_category').dropdown('get value'),	// 签收人证件类别
      signer_certificate_no: $('.d_signer_certificate_no').val(),	                        // 签收人证件号
      sign_time: $('.d_sign_time').val(),	                                                // 签收时间
      is_original_receipt: $('.d_is_original_receipt').dropdown('get value'),	            // 是否有原件签收单
      is_return_receipt: $('.d_is_return_receipt').dropdown('get value'),	                // 是否返回原件签收单
      sender_code: $('.d_sender_code').val(),                                             // 发货人代码
      sender_name: $('.d_sender_name').val(),	                                            // 发货人中文名
      pick_location: $('.d_pick_location').dropdown('get value'),	                        // 提货地点
      storeroom_name: $('.d_storeroom_name').val(),	                                          // 库房
      min_total_cost: $('.d_min_total_cost').val(),                                       // 最低总费用
      is_lock: $('.d_is_lock').dropdown('get value'),                                     // 是否锁定
      arrive_point_operation: $('.d_arrive_point_operation').val(),	                      // 到达操作点
      invoice_type: $('.d_invoice_type').dropdown('get value'),                           // 发票类型
      sale_unit: $('.d_sale_unit').val(),	                                                // 销售单位
      local_transfer: $('.d_local_transfer').val(),	                                      // 本地中转人
      receivable_check: $('.d_receivable_check').val(),	                                  // 应收核对情况
      handle_check: $('.d_handle_check').val(),	                                          // 应付核对情况
      association_point_code: $('.d_association_point_code').val(),	                      // 关联点
      association_point_name: $('.d_association_point_name').val(),	                      // 关联点
      arrive_record: $('.d_arrive_record').val(),                                         // 到达情况
      should_re_sender: $('.d_should_re_sender').val(),                                   // 应收发货人
      actual_re_sender: $('.d_actual_re_sender').val(),                                   // 实收发货人
      should_re_receiver: $('.d_should_re_receiver').val(),                               // 应收收货人
      actual_re_receiver: $('.d_actual_re_receiver').val(),                               // 实收收货人
      should_transiter: $('.d_should_transiter').val(),                                   // 应付中转人
      service_record: $('.d_service_record').val(),	                                      // 客服记录
      type: pageInfo.type,                                                                // 运单类型
      costItemList: costItemList,                                                         // 费用列表
      custServiceList: custServiceList,                                                   // 客服列表
    }
  }

  let savePickUpDetail = () => {
    let insertPickUpUrl = baseUrl + '/def/pick_up/insertPickUp' 
  
    let insertPickUpParams = getSaveParams()

    if(pageInfo.is_edit){
      insertPickUpUrl = baseUrl + '/def/pick_up/editPickUp' 
      Object.assign(insertPickUpParams, {
        id: pageInfo.editId,
        pick_up_state: pageInfo.editState
      })
    }

    LXHR.POST(insertPickUpUrl, JSON.stringify(insertPickUpParams), {contentType: 'application/json'}).done( res => {
      if(res.status === 200){
        LALERT.success('保存成功')
        getPickUpList()
        backMain()
      }else{
        LALERT.msg('保存失败')
      }
    })
  }

  $('.btn_save').click(function () {
    // getTime()
    let validate = $('.ui.form.detail_form').form('is valid')
    validate ? savePickUpDetail() : failValidate()
  })
})()

// 编辑前查询 ==================================================================================================
;(function(){
  let fillDetail = d => {
    if(!d) return
    $('.detail_order_no_3').val(d.order_three_code)                                    //	运单号三字码
    $('.detail_order_no_8').val(d.order_num)	                                          // 运单号后缀
    $('.single_order_code').val(d.single_order_code)	                                  // 分单号三字码
    $('.single_order_num').val(d.single_order_num)	                                    // 分单号后缀
    $('.d_quantity').val(d.quantity)                                                   // 件数
    $('.d_net_weight').val(d.net_weight)                                               // 实重
    $('.d_weight').val(d.weight)                                                       // 计重
    $('.d_destination_code').val(d.destination_code)                                   // 目的站三字码
    $('.d_destination_name').val(d.destination_name)                                   // 目的站中文名
    $('.d_product_code').val(d.product_no)                                             // 商品代码
    $('.d_product_name').val(d.product_name)                                           // 品名
    $('.d_product_category_code').val(d.product_category_code)                         // 货物类别代码
    $('.d_product_category_name').val(d.product_category_name)                         // 货物类别中文名
    $('.d_packaging_name').val(d.packaging_name)                                       // 包装中文名
    $('.d_packaging_code').val(d.packaging_code)                                       // 包装代码
    $('.d_payer').val(d.payer)                                                         // 付款方
    $('.d_actual_sender').val(d.actual_sender)                                         // 实付发货人
    $('.d_departure_code').val(d.departure_code)                                       // 起点三字码
    $('.d_departure_name').val(d.departure_name)                                       // 起点中文名
    $('.d_agency_fund').val(d.agency_fund)	                                            // 代收款
    $('.d_receiver_code').val(d.receiver_code)	                                        // 收货人代码
    $('.d_receiver_name').val(d.receiver_name)	                                        // 收货人名称
    $('.d_receiver_telephone').val(d.receiver_telephone)	                              // 收货人电话
    $('.d_receiver_certificate_no').val(d.receiver_certificate_no)	                    // 收货人证件号
    $('.d_receiver_address').val(d.receiver_address)                                    // 收货人地址
    $('.d_area_code').val(d.area_code)	                                                // 区域
    $('.d_area_name').val(d.area_name)
    $('.d_line').val(d.line)	                                                          // 线路
    $('.d_car_number').val(d.car_number)                                                // 车号
    $('.d_driver').val(d.driver)                                                        // 司机
    $('.d_remark').val(d.remark)	                                                      // 备注
    $('.d_signer').val(d.signer)	                                                      // 签收人
    $('.d_signer_certificate_no').val(d.signer_certificate_no)	                        // 签收人证件号
    $('.d_sign_time').val(formatTime(d.sign_time))	                                    // 签收时间
    $('.d_sender_code').val(d.sender_code)                                              // 发货人代码
    $('.d_sender_name').val(d.sender_name)	                                            // 发货人中文名
    $('.d_storeroom_name').val(d.storeroom_name),	                                      // 库房
    $('.d_min_total_cost').val(d.min_total_cost),                                       // 最低总费用
    $('.d_arrive_point_operation').val(d.arrive_point_operation)	                      // 到达操作点
    $('.d_sale_unit').val(d.sale_unit)	                                                // 销售单位
    $('.d_local_transfer').val(d.local_transfer)	                                      // 本地中转人
    $('.d_receivable_check').val(d.receivable_check)	                                  // 应收核对情况
    $('.d_handle_check').val(d.handle_check)	                                          // 应付核对情况
    $('.d_association_point_code').val(d.association_point_code)	                      // 关联点
    $('.d_association_point_name').val(d.association_point_name)	                      // 关联点
    $('.d_arrive_record').val(d.arrive_record)                                         // 到达情况
    $('.d_should_re_sender').val(d.should_re_sender)                                   // 应收发货人
    $('.d_actual_re_sender').val(d.actual_re_sender)                                   // 实收发货人
    $('.d_should_re_receiver').val(d.should_re_receiver)                               // 应收收货人
    $('.d_actual_re_receiver').val(d.actual_re_receiver)                               // 实收收货人
    $('.d_should_transiter').val(d.should_transiter)                                   // 应付中转人
    $('.d_service_record').val(d.service_record)	                                      // 客服记录

    $('.d_is_domestic').dropdown('set value', d.is_domestic)                             // 国内国际
    $('.d_is_domestic').dropdown('set text', d.is_domestic ? '国际' : '国内')              // 国内国际
    $('.d_transport_mode').dropdown('set value', d.transport_mode)                       // 到达/运输方式
    $('.d_transport_mode').dropdown('set text', '航空')                                   // 到达/运输方式
    $('.d_is_lock').dropdown('set value', d.is_lock)                                     // 是否锁定
    $('.d_is_lock').dropdown('set text', d.is_lock ? '锁定' : '未锁定')                   // 是否锁定
    $('.d_state').dropdown('set value', d.state)                                         // 派送状态
    var d_state_text = ''
    switch (true) {
      case d.state == 0:
        d_state_text = '可提货'
      break;
      case d.state == 1:
        d_state_text = '已派送'
      break;
      default: d_state_text = '已中转'
    }
    $('.d_state').dropdown('set text', d_state_text)

    $('.d_delivery_mode').dropdown('set value', d.delivery_mode)  	                      // 提货方式
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

    $('.d_billing_method').dropdown('set value', d.billing_method)	                      // 结算方式
    $('.d_billing_method').dropdown('set text', d.billing_method ? '现金' : '发方月结')	     // 结算方式
    $('.d_receiver_certificate_category').dropdown('set value', d.receiver_certificate_category)	// 收货人证件类别
    $('.d_receiver_certificate_category').dropdown('set text', d.receiver_certificate_category*1 ? '驾驶证' : '身份证')	// 收货人证件类别
    $('.d_is_put').dropdown('set value', d.is_put)	                                      // 是否放货
    $('.d_is_put').dropdown('set text', d.is_put ? '未放货' : '放货')	                                      // 是否放货
    $('.d_signer_certificate_category').dropdown('set value', d.signer_certificate_category)	// 签收人证件类别
    $('.d_signer_certificate_category').dropdown('set text', d.signer_certificate_category*1 ? '驾驶证' : '身份证')	// 签收人证件类别
    $('.d_is_original_receipt').dropdown('set value', d.is_original_receipt)	            // 是否有原件签收单
    $('.d_is_original_receipt').dropdown('set text', d.is_original_receipt ? '是' : '否')	            // 是否有原件签收单
    $('.d_is_return_receipt').dropdown('set value', d.is_return_receipt)	       // 是否返回原件签收单
    $('.d_is_return_receipt').dropdown('set text', d.is_return_receipt ? '已返回' : '未返回')	       // 是否返回原件签收单
    $('.d_pick_location').dropdown('set value', d.pick_location)	                        // 提货地点
    $('.d_pick_location').dropdown('set text', d.pick_location)	                        // 提货地点
    $('.d_delivery_state').dropdown('set value', d.out_storeroom_state)	                      // 出库状态
    $('.d_delivery_state').dropdown('set text', d.delivery_state ? '未入库' : '已入库')	                      // 出库状态
    $('.d_invoice_type').dropdown('set value', d.invoice_type)                           // 发票类型
    $('.d_invoice_type').dropdown('set text', d.invoice_type ? '增值税专用发票' : '增值税普通发票')
  }

  let editSearch = () => {
    let url = baseUrl + '/def/pick_up/beforeEditPickUpById'
    LXHR.POST(url, {id: pageInfo.editId, pick_up_state: pageInfo.editState}).done(res => {
      if(res.status !== 200){
        LALERT.msg(res.message)
        return
      }
      customInfo.change(res.data[0].custServiceList)
      let d = res.data[0].pickUp
      fillDetail(d)
    })
  }

  $('.pick_up_page').on('click','.btn-edit',function(){
    gotoDetail()
    $('.two_level_menu_wrap').css({'display':'block'})
    $('.two_level_menu_head .title').html(pageInfo.type ? '国内分单提货编辑' : '国内主单提货编辑')
    resetAll()
    pageInfo.is_edit = true
    pageInfo.sign_no = $(this).data('sign')
    pageInfo.order_no = $(this).data('order')
    pageInfo.editId = $(this).data('id')
    pageInfo.editState = $(this).data('state')
    !pageInfo.editState && getSignNo() 
    $('.sign_no').val(pageInfo.sign_no)
    editSearch()
  })
})()