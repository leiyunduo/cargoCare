/**
 * 开单明细相关
 */

// 提货明细
let fillPickUpDetail = d => {
  if(!d) return
  $('.pick_up .sign_no').val(d.sign_no)
  $('.pick_up .detail_order_no_3').val(d.order_three_code)                                    //	运单号三字码
  $('.pick_up .detail_order_no_8').val(d.order_num)	                                          // 运单号后缀
  $('.pick_up .single_order_code').val(d.single_order_code)	                                  // 分单号三字码
  $('.pick_up .single_order_num').val(d.single_order_num)	                                    // 分单号后缀
  $('.pick_up .d_quantity').val(d.quantity)                                                   // 件数
  $('.pick_up .d_net_weight').val(d.net_weight)                                               // 实重
  $('.pick_up .d_weight').val(d.weight)                                                       // 计重
  $('.pick_up .d_destination_code').val(d.destination_code)                                   // 目的站三字码
  $('.pick_up .d_destination_name').val(d.destination_name)                                   // 目的站中文名
  $('.pick_up .d_product_code').val(d.product_no)                                             // 商品代码
  $('.pick_up .d_product_name').val(d.product_name)                                           // 品名
  $('.pick_up .d_product_category_code').val(d.product_category_code)                         // 货物类别代码
  $('.pick_up .d_product_category_name').val(d.product_category_name)                         // 货物类别中文名
  $('.pick_up .d_packaging_name').val(d.packaging_name)                                       // 包装中文名
  $('.pick_up .d_packaging_code').val(d.packaging_code)                                       // 包装代码
  $('.pick_up .d_payer').val(d.payer)                                                         // 付款方
  $('.pick_up .d_actual_sender').val(d.actual_sender)                                         // 实付发货人
  $('.pick_up .d_departure_code').val(d.departure_code)                                       // 起点三字码
  $('.pick_up .d_departure_name').val(d.departure_name)                                       // 起点中文名
  $('.pick_up .d_state').val(d.state)  	                                                      // 派送状态
  $('.pick_up .d_agency_fund').val(d.agency_fund)	                                            // 代收款
  $('.pick_up .d_receiver_code').val(d.receiver_code)	                                        // 收货人代码
  $('.pick_up .d_receiver_name').val(d.receiver_name)	                                        // 收货人名称
  $('.pick_up .d_receiver_telephone').val(d.receiver_telephone)	                              // 收货人电话
  $('.pick_up .d_receiver_certificate_no').val(d.receiver_certificate_no)	                    // 收货人证件号
  $('.pick_up .d_receiver_address').val(d.receiver_address)                                    // 收货人地址
  $('.pick_up .d_area_code').val(d.area_code)	                                                // 区域
  $('.pick_up .d_line').val(d.line)	                                                          // 线路
  $('.pick_up .d_car_number').val(d.car_number)                                                // 车号
  $('.pick_up .d_driver').val(d.driver)                                                        // 司机
  $('.pick_up .d_remark').val(d.remark)	                                                      // 备注
  $('.pick_up .d_signer').val(d.signer)	                                                      // 签收人
  $('.pick_up .d_signer_certificate_no').val(d.signer_certificate_no)	                        // 签收人证件号
  $('.pick_up .d_sign_time').val(formatTime(d.sign_time))	                                    // 签收时间
  $('.pick_up .d_sender_code').val(d.sender_code)                                              // 发货人代码
  $('.pick_up .d_sender_name').val(d.sender_name)	                                            // 发货人中文名
  $('.pick_up .d_store_time').val(formatTime(d.store_time))	                                  // 入库时间
  $('.pick_up .d_storeroom_code').val(d.storeroom_code)	                                      // 库房
  $('.pick_up .d_storeroom_name').val(d.storeroom_name),	                                      // 库房
  $('.pick_up .d_store_person').val(d.store_person)	                                          // 入库人
  $('.pick_up .d_store_termination').val(formatTime(d.store_termination))	                    // 终止库存时间
  $('.pick_up .d_delivery_time').val(formatTime(d.out_storeroom_time))	                            // 出库时间
  $('.pick_up .d_delivery_person').val(d.out_storeroom_person)	                                    // 出库人
  $('.pick_up .d_min_total_cost').val(d.min_total_cost),                                       // 最低总费用
  $('.pick_up .d_arrive_point_operation').val(d.arrive_point_operation)	                      // 到达操作点
  $('.pick_up .d_sale_unit').val(d.sale_unit)	                                                // 销售单位
  $('.pick_up .d_local_transfer').val(d.local_transfer)	                                      // 本地中转人
  $('.pick_up .d_receivable_check').val(d.receivable_check)	                                  // 应收核对情况
  $('.pick_up .d_handle_check').val(d.handle_check)	                                          // 应付核对情况
  $('.pick_up .d_association_point').val(d.association_point)	                                // 关联点
  $('.pick_up .d_issuer').val(d.issuer)	                                                      // 开票人
  $('.pick_up .d_billing_time').val(formatTime(d.billing_time))	                              // 开票时间
  $('.pick_up .d_update_person').val(d.update_person)	                                        // 修改人
  $('.pick_up .d_update_time').val(formatTime(d.update_time))	                                // 更新时间
  $('.pick_up .d_creater').val(d.creater)	                                                    // 生成人
  $('.pick_up .d_create_time').val(formatTime(d.create_time))                                  // 生成时间
  $('.pick_up .d_sign_print_num').val(d.sign_print_num)                                       // 签收单打印次数
  $('.pick_up .d_arrive_record').val(d.arrive_record)                                         // 到达情况
  $('.pick_up .d_should_re_sender').val(d.should_re_sender)                                   // 应收发货人
  $('.pick_up .d_actual_re_sender').val(d.actual_re_sender)                                   // 实收发货人
  $('.pick_up .d_should_re_receiver').val(d.should_re_receiver)                               // 应收收货人
  $('.pick_up .d_actual_re_receiver').val(d.actual_re_receiver)                               // 实收收货人
  $('.pick_up .d_should_transiter').val(d.should_transiter)                                   // 应付中转人
  $('.pick_up .d_service_record').val(d.service_record)	                                      // 客服记录

  $('.pick_up .d_is_domestic').dropdown('set value', d.is_domestic)                             // 国内国际
  $('.pick_up .d_is_domestic').dropdown('set text', d.is_domestic ? '国际' : '国内')              // 国内国际
  $('.pick_up .d_transport_mode').dropdown('set value', d.transport_mode)                       // 到达/运输方式
  $('.pick_up .d_transport_mode').dropdown('set text', '航空')                                   // 到达/运输方式
  $('.pick_up .d_is_lock').dropdown('set value', d.is_lock)                                     // 是否锁定
  $('.pick_up .d_is_lock').dropdown('set text', d.is_lock ? '锁定' : '未锁定')                   // 是否锁定
  $('.pick_up .d_state').dropdown('set value', d.state)                                         // 派送状态
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
  $('.pick_up .d_state').dropdown('set text', d_state_text)

  $('.pick_up .d_delivery_mode').dropdown('set value', d.delivery_mode)  	                      // 提货方式
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
  $('.pick_up .d_delivery_mode').dropdown('set text', d_delivery_text)

  $('.pick_up .d_billing_method').dropdown('set value', d.billing_method)	                      // 结算方式
  $('.pick_up .d_billing_method').dropdown('set text', d.billing_method ? '现金' : '发方月结')	     // 结算方式
  $('.pick_up .d_receiver_certificate_category').dropdown('set value', d.receiver_certificate_category)	// 收货人证件类别
  $('.pick_up .d_receiver_certificate_category').dropdown('set text', d.receiver_certificate_category ? '驾驶证' : '身份证')	// 收货人证件类别
  $('.pick_up .d_is_put').dropdown('set value', d.is_put)	                                      // 是否放货
  $('.pick_up .d_is_put').dropdown('set text', d.is_put ? '未放货' : '放货')	                                      // 是否放货
  $('.pick_up .d_signer_certificate_category').dropdown('set value', d.signer_certificate_category)	// 签收人证件类别
  $('.pick_up .d_signer_certificate_category').dropdown('set text', d.signer_certificate_category ? '驾驶证' : '身份证')	// 签收人证件类别
  $('.pick_up .d_is_original_receipt').dropdown('set value', d.is_original_receipt)	            // 是否有原件签收单
  $('.pick_up .d_is_original_receipt').dropdown('set text', d.is_original_receipt ? '是' : '否')	            // 是否有原件签收单
  $('.pick_up .d_is_return_receipt').dropdown('set value', d.is_return_receipt)	       // 是否返回原件签收单
  $('.pick_up .d_is_return_receipt').dropdown('set text', d.is_return_receipt ? '已返回' : '未返回')	       // 是否返回原件签收单
  $('.pick_up .d_pick_location').dropdown('set value', d.pick_location)	                        // 提货地点
  $('.pick_up .d_pick_location').dropdown('set text', d.pick_location)	                        // 提货地点
  $('.pick_up .d_delivery_state').dropdown('set value', d.out_storeroom_state)	                      // 出库状态
  $('.pick_up .d_delivery_state').dropdown('set text', d.delivery_state ? '未入库' : '已入库')	                      // 出库状态
  $('.pick_up .d_invoice_type').dropdown('set value', d.invoice_type)                           // 发票类型
  $('.pick_up .d_invoice_type').dropdown('set text', d.invoice_type ? '增值税专用发票' : '增值税普通发票')
}

// 收货明细
let fillReciveDetail = d => {
  if(!d) return
  $('.receive .d_order_code').val(d.order_three_code)                                                // 三字码
  $('.receive .d_order_num').val(d.order_num)                                                        // 8位数字
  $('.receive .d_departure_code').val(d.departure_code)                                              // 始发站
  $('.receive .d_destination_code').val(d.destination_code)                                          // 目的站
  $('.receive .d_sender_code').val(d.sender_code)                                                    // 发货人
  $('.receive .d_sender_name').val(d.sender_name)
  $('.receive .d_receiver_code').val(d.receiver_code)                                                // 收货人
  $('.receive .d_receiver_name').val(d.receiver_name)
  $('.receive .d_sender_telephone').val(d.sender_telephone)                                          // 发货人电话
  $('.receive .d_receiver_telephone').val(d.receiver_telephone)                                      // 收货人电话
  $('.receive .d_sender_fax').val(d.sender_fax)                                                      // 发货人传真                 
  $('.receive .d_receiver_fax').val(d.receiver_fax)                                                  // 收货人传真
  $('.receive .d_sender_address').val(d.sender_address)                                              // 地址
  $('.receive .d_receiver_address').val(d.receiver_address)
  $('.receive .d_carrier_storage_remark').val(d.carrier_storage_remark)                              // 承运人储运备注
  $('.receive .d_other_storage_remark').val(d.other_storage_remark)                                  // 其他储运备注
  $('.receive .d_billing_remark').val(d.billing_remark)                                              // 结算备注
  $('.receive .d_starting_point_operation').val(d.starting_point_operation)                          // 出发操作点
  $('.receive .d_first_transfer_code').val(d.first_transfer_code)                                    // 第一程
  $('.receive .d_first_transfer_name').val(d.first_transfer_name)
  $('.receive .d_second_transfer_code').val(d.second_transfer_code)                                  // 第二程
  $('.receive .d_second_transfer_name').val(d.second_transfer_name)
  $('.receive .d_transshipment_unit').val(d.transshipment_unit)                                      // 中转理货单位
  $('.receive .d_correspond_order_no').val(d.correspond_order_no)                                    // 对应单号
  $('.receive .d_expected_flight_time').val(d.expected_flight_time)                                  // 预计航班日期
  $('.receive .d_expected_two_flight_code').val(d.expected_two_flight_code)                          // 二字码
  $('.receive .d_expected_flight_num').val(d.expected_flight_num)                                    // 数字
  $('.receive .d_product_no').val(d.product_no)                                                      // 品名代码
  $('.receive .d_product_name').val(d.product_name)                                                  // 中文名
  $('.receive .d_product_code').val(d.product_code)                                                  // 商品代码                                            
  $('.receive .d_product_category_code').val(d.product_category_code)                                // 货物类别
  $('.receive .d_product_category').val(d.product_category) 
  $('.receive .d_your_category_code').val(d.your_category_code)                                      // 自分类别
  $('.receive .d_your_category').val(d.your_category)
  $('.receive .d_packaging_code').val(d.packaging_code)                                              // 包装
  $('.receive .d_packaging_name').val(d.packaging_name)
  $('.receive .d_departure_priority').val(d.departure_priority)                                      // 出发优先级
  $('.receive .d_quantity').val(d.quantity)                                                          // 件数
  $('.receive .d_net_weight').val(d.net_weight)                                                      // 实重
  $('.receive .d_volume').val(d.volume)                                                              // 体积
  $('.receive .d_weight').val(d.weight)                                                              // 计重
  $('.receive .d_price_species_name').val(d.price_species_name)                                      // 价种
  $('.receive .d_price_species_code').val(d.price_species_code)                                      // 价种代码
  $('.receive .d_invoice_price').val(d.invoice_price)                                                // 费率
  $('.receive .d_clearing_unit_code').val(d.clearing_unit_code)                                      // 结算单位
  $('.receive .d_clearing_unit').val(d.clearing_unit)                                                // 结算单位
  $('.receive .d_discount').val(d.discount)                                                          // 折扣
  $('.receive .d_service_record').val(d.service_record)                                              // 客服记录
  $('.receive .d_billing_time').val(d.billing_time)                                                  // 开票时间
  $('.receive .d_issuer').val(d.issuer)                                                              // 开票人
  $('.receive .d_billing_location').val(d.billing_location)                                          // 开票地点
  $('.receive .d_update_time').val(d.update_time)                                                    // 修改时间
  $('.receive .d_update_person').val(d.update_person)                                                // 修改人

  
  $('.receive .d_sender_sms_notification').dropdown('set value', d.sender_sms_notification)	   
  $('.receive .d_sender_sms_notification').dropdown('set text', d.sender_sms_notification ? '是' : '否')
  $('.receive .d_receiver_sms_notification').dropdown('set value', d.receiver_sms_notification)	   
  $('.receive .d_receiver_sms_notification').dropdown('set text', d.receiver_sms_notification ? '是' : '否')

  $('.receive .d_delivery_mode').dropdown('set value', d.delivery_mode)                                // 提货方式
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
  $('.receive .d_delivery_mode').dropdown('set text', d_delivery_text)
  
  $('.receive .d_air_transit').dropdown('set value', d.air_transit)                                    // 空运中转
  $('.receive .d_air_transit').dropdown('set text', d.air_transit ? '是' : '否')
  $('.receive .d_payment_method').dropdown('set value', d.payment_method)                              // 付款方式
  $('.receive .d_payment_method').dropdown('set text', d.payment_method ? '预付' : '现金')
  $('.receive .d_state').dropdown('set value', d.state)                                                // 状态
  $('.receive .d_state').dropdown('set text', d.state ? '未使用' : '已使用')
  $('.receive .d_receipt_type').dropdown('set value', d.receipt_type),                                  // 单据类型
  $('.receive .d_receipt_type').dropdown('set text', d.receipt_type ? '事后' : '即时')
}

// 快件明细
let fillFastMailDetail = d => {
  if(!d) return
  //================================================================================================ 运单信息
  $('.fast_mail .detail_order_three_code').val(d.order_three_code)                     // 运单号三字码
  $('.fast_mail .detail_order_num').val(d.order_num)                                   // 运单号8位数字
  $('.fast_mail .detail_departure_code').val(d.departure_code)                         // 始发站3字码
  $('.fast_mail .detail_destination_code').val(d.destination_code)                     // 目的站3字码
  $('.fast_mail .detail_sender_code').val(d.sender_code)                               // 发货人
  $('.fast_mail .detail_sender_name').val(d.sender_name)                               // 发货人名称
  $('.fast_mail .detail_receiver_code').val(d.receiver_code)                           // 收货人
  $('.fast_mail .detail_receiver_name').val(d.receiver_name)                           // 收货人名称
  $('.fast_mail .detail_area_code').val(d.area_code)                                   // 区域
  //================================================================================================ 发货人、收货人信息
  $('.fast_mail .detail_sender_telephone').val(d.sender_telephone)	                   // 发货人电话
  $('.fast_mail .detail_receiver_telephone').val(d.receiver_telephone)	               // 收货人电话
  $('.fast_mail .detail_sender_fax').val(d.sender_fax)                                 // 发货人传真
  $('.fast_mail .detail_receiver_fax').val(d.receiver_fax)                             // 收货人传真
  $('.fast_mail .detail_sender_email').val(d.sender_email)                             // 发货人邮箱
  $('.fast_mail .detail_receiver_email').val(d.receiver_email)                         // 收货人邮箱
  $('.fast_mail .detail_sender_address').val(d.sender_address)                         // 发货人地址
  $('.fast_mail .detail_receiver_address').val(d.receiver_address)	                   // 收货人地址
  $('.fast_mail .detail_other_storage_remark').val(d.other_storage_remark)             // 储运备注
  $('.fast_mail .detail_billing_remark').val(d.billing_remark)                         // 结算备注
  $('.fast_mail .detail_starting_point_operation').val(d.starting_point_operation)     // 出发操作点
  $('.fast_mail .detail_ship_whereabouts').val(d.ship_whereabouts)                     // 发货去向
  $('.fast_mail .detail_expected_flight_time').val(formatDate(d.expected_flight_time)) // 预计航班日期
  // $('.fast_mail .detail_expected_two_flight_code').val(d.expected_two_flight_code)     // 预计航班号2字码
  // $('.fast_mail .detail_expected_flight_num').val(d.expected_flight_num)               // 预计航班号4位数字
  $('.fast_mail .detail_expected_two_flight_code').val(d.expected_flight_no && d.expected_flight_no.slice(0, 2))     // 预计航班号2字码
  $('.fast_mail .detail_expected_flight_num').val(d.expected_flight_no && d.expected_flight_no.slice(2, 6))               // 预计航班号4位数字
  //================================================================================================ 货物信息
  $('.fast_mail .detail_product_no').val(d.product_no)                                   // 品名代码
  $('.fast_mail .detail_product_name').val(d.product_name)                               // 品名名称
  $('.fast_mail .detail_product_category_code').val(d.product_category_code)             // 货物类别代码
  $('.fast_mail .detail_product_category').val(d.product_category)	                     // 货物类别名称
  $('.fast_mail .detail_packaging_code').val(d.packaging_code)	                         // 包装代码
  $('.fast_mail .detail_packaging_name').val(d.packaging_name)                           // 包装名称
  $('.fast_mail .detail_pre_arrive_pay').dropdown('set value', d.pre_arrive_pay)         // 预付、到付
  $('.fast_mail .detail_pre_arrive_pay').dropdown('set text', `${d.pre_arrive_pay ? '到付' : '预付'}`)  // 预付、到付
  $('.fast_mail .detail_quantity').val(d.quantity)	                                     // 件数
  $('.fast_mail .detail_net_weight').val(d.net_weight)	                                 // 实重
  $('.fast_mail .detail_net_volume').val(d.volume)                                       // 体积
  $('.fast_mail .detail_weight').val(d.weight)	                                         // 计重
  $('.fast_mail .detail_base_weight').val(d.base_weight)                                 // 基本重量
  $('.fast_mail .detail_incr_weight').val(d.incr_weight)                                 // 递增重量
  $('.fast_mail .detail_joint_cargo_pieces').val(d.joint_cargo_pieces)                   // 已拼货件数
  $('.fast_mail .detail_correspond_order_no').val(d.correspond_order_no)                 // 对应单号
  $('.fast_mail .detail_sign_state').dropdown('set value', d.sign_state)                 // 签收状态
  $('.fast_mail .detail_sign_state').dropdown('set text', `${d.sign_state ? '已签收' : '未签收'}`) // 签收状态
  $('.fast_mail .detail_sign_quantity').val(d.sign_quantity)                             // 签收件数
  $('.fast_mail .detail_payment_method').dropdown('set value', d.payment_method)         // 付款方式

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

  $('.fast_mail .detail_payment_method').dropdown('set text', detail_payment_method_text)   // 付款方式      
  $('.fast_mail .detail_declared_value').val(d.declared_value)                           // 申明价值
  $('.fast_mail .detail_receivable_check').val(d.receivable_check)	                     // 应收核对情况
  $('.fast_mail .detail_handle_check').val(d.handle_check)                               // 应付核对情况
  $('.fast_mail .detail_billing_time').val(formatTime(d.billing_time))                   // 开票时间
  $('.fast_mail .detail_issuer').val(d.issuer)                                           // 开票人
  $('.fast_mail .detail_billing_location').val(d.billing_location)	                     // 开票地点
  $('.fast_mail .detail_update_time').val(formatTime(d.update_time))                     // 修改时间
  $('.fast_mail .detail_update_person').val(d.update_person)                             // 修改人
  $('.fast_mail .detail_service_record').val(d.service_record)                           // 客服记录
}

// 邮件明细
let fillMailDetail = d => {
  //============================================================================================  运单信息
  $('.mail .d_order_three_code').val(d.order_three_code)                     // 运单号三字码
  $('.mail .d_order_num').val(d.order_num)                                   // 运单号8位数字
  $('.mail .d_departure_code').val(d.departure_code)                         // 始发站3字码                                                     // 始发站名称
  $('.mail .d_destination_code').val(d.destination_code)                     // 目的站3字码                                                // 目的站名称
  $('.mail .d_sender_code').val(d.sender_code)                               // 发货人
  $('.mail .d_sender_name').val(d.sender_name)                               // 发货人名称
  $('.mail .d_receiver_code').val(d.receiver_code)                           // 收货人
  $('.mail .d_receiver_name').val(d.receiver_name)                           // 收货人名称                                // 区域
  //============================================================================================ 发货人、收货人信息
  $('.mail .d_sender_fax').val(d.sender_fax)                                 // 发货人传真
  $('.mail .d_sender_telephone').val(d.sender_telephone)	                   // 发货人电话                                              // 短信通知
  $('.mail .d_sender_email').val(d.sender_email)                           // 发货人邮箱
  $('.mail .d_sender_address').val(d.sender_address)                         // 发货人地址      
  $('.mail .d_receiver_fax').val(d.receiver_fax)                             // 收货人传真      
  $('.mail .d_receiver_telephone').val(d.receiver_telephone)	               // 收货人电话
  $('.mail .d_receiver_address').val(d.receiver_address)	                   // 收货人地址
  //============================================================================================ 承运人信息
  $('.mail .d_other_storage_remark').val(d.other_storage_remark)                   // 储运备注
  $('.mail .d_billing_remark').val(d.billing_remark)                               // 结算备注
  $('.mail .d_starting_point_operation').val(d.starting_point_operation)           // 出发操作点
  $('.mail .d_first_transfer_code').val(d.first_transfer_code)                     // 第一程三字码
  $('.mail .d_first_transfer_name').val(d.first_transfer_name)                     // 第一程中文名
  $('.mail .d_second_transfer_code').val(d.second_transfer_code)                  // 第二程三字码
  $('.mail .d_second_transfer_name').val(d.second_transfer_name)                  // 第二程中文名
  $('.mail .d_expected_flight_time').val(d.expected_flight_time)                  // 预计航班日期
  $('.mail .d_expected_two_flight_code').val(d.expected_two_flight_code)           // 预计航班号
  $('.mail .d_expected_flight_num').val(d.expected_flight_num)                     // 预计航班号
  //============================================================================================ 货物信息
  $('.mail .d_packaging_code').val(d.packaging_code)	                         // 包装代码
  $('.mail .d_packaging_name').val(d.packaging_name)                           // 包装名称
  $('.mail .d_quantity').val(d.quantity)	                                     // 件数
  $('.mail .d_net_weight').val(d.net_weight)	                                 // 实重
  $('.mail .d_net_volume').val(d.volume)                                       // 体积
  $('.mail .d_weight').val(d.weight)	                                         // 计重
  $('.mail .d_price_species_code').val(d.price_species_code)                   // 价种代码
  $('.mail .d_billing_incr_price').val(d.billing_incr_price)                         // 开票价
  //  结算单位代码
  //  结算单位中文名
  $('.mail .d_sale_price').val(d.sale_price)                                        // 销售价
  //============================================================================================ 开单信息
  // 状态
  $('.mail .d_declared_value').val(d.declared_value)                                // 申明价值
  $('.mail .d_insurance_value').val(d.insurance_value)                               // 保险价值
  $('.mail .d_receivable_check').val(d.receivable_check)	                           // 应收核对情况
  $('.mail .d_handle_check').val(d.handle_check)                                    // 应付核对情况
  $('.mail .d_billing_time').val(formatTime(d.billing_time))                                    // 开票时间
  $('.mail .d_issuer').val(d.issuer)                                                // 开票人
  $('.mail .d_billing_location').val(d.billing_location)	                           // 开票地点
  $('.mail .d_update_time').val(formatTime(d.update_time))                                      // 修改时间
  $('.mail .d_update_person').val(d.update_person)                                  // 修改人
  $('.mail .d_service_record').val(d.service_record)                                // 客服记录

  $('.mail .d_price_species_name').dropdown('set value', d.price_species_name)   // 价种
  $('.mail .d_price_species_name').dropdown('set text', d.price_species_name)
  $('.mail .d_sender_sms_notification').dropdown('set value', d.sender_sms_notification) 
  $('.mail .d_sender_sms_notification').dropdown('set text', d.sender_sms_notification ? '是' : '否')
  $('.mail .d_receiver_sms_notification').dropdown('set value', d.receiver_sms_notification)    
  $('.mail .d_receiver_sms_notification').dropdown('set text', d.receiver_sms_notification ? '是' : '否')                                         // 短信通知
  $('.mail .d_delivery_mode').dropdown('set value', d.delivery_mode)                                  // 提货方式
  $('.mail .d_delivery_mode').dropdown('set text', d.delivery_mode ? '配送' : '自提')
  $('.mail .d_air_transit').dropdown('set value', d.air_transit)                     // 空运中转
  $('.mail .d_air_transit').dropdown('set text', d.air_transit ? '是' : '否')
  $('.mail .d_is_lock').dropdown('set value', d.is_lock)                               // 是否锁定
  $('.mail .d_is_lock').dropdown('set text', d.is_lock ? '已锁定' : '未锁定')
  $('.mail .d_payment_method').dropdown('set value', d.payment_method)	               // 付款方式
  $('.mail .d_payment_method').dropdown('set text', d.payment_method ? '预付' : '现金')
}

let urlObj = {
  '提货主单': '/def/pick_up/beforeEditPickUpById',
  '提货分单': '/def/pick_up/beforeEditPickUpById',
  '收货主单': '/def/receive/beforeEditReceive',
  '收货分单': '/def/receive/beforeEditReceive',
  '邮件': '/def/express/mail/beforeEditMail',
  '民航快递': '/def/express/ca/beforeEditCA/',
}

let getParamsObj = () => {
  let d = pageInfo.nowData

  return {
    '提货主单': {
                  id: d.id,
                  pick_up_state: 1,
                },
    '提货分单': {
                  id: d.id,
                  pick_up_state: 1,
                },
    '收货主单': {
                  order_no: d.order_no,
                },
    '收货分单': {
                  order_no: d.order_no,
                },
        '邮件': {
                  order_no: d.order_no,
                },
    '民航快递': {
                  order_no: d.order_no,
                },
  }
}

let fillDetail = {
  '提货主单': fillPickUpDetail,
  '提货分单': fillPickUpDetail,
  '收货主单': fillReciveDetail,
  '收货分单': fillReciveDetail,
  '邮件': fillMailDetail,
  '民航快递': fillFastMailDetail,
}

let dataType = {
  '提货主单': 1,
  '提货分单': 1,
  '收货主单': 0,
  '收货分单': 0,
  '邮件': 0,
  '民航快递': 0,
}

let classObj = {
  '提货主单': '.pick_up',
  '提货分单': '.pick_up',
  '收货主单': '.receive',
  '收货分单': '.receive',
  '邮件': '.mail',
  '民航快递': '.fast_mail',
}

let getNowForm = () => {
  return $(classObj[pageInfo.nowData.type])
}

let changeTab = nowForm => {
  $('.detail_form').hide()
  nowForm.show()
}

let checkDetail = () => {
  let url = baseUrl + urlObj[pageInfo.nowData.type]
  let params = getParamsObj()[pageInfo.nowData.type]
  changeTab( getNowForm() )
  LXHR.POST(url, params).done(res => {
    if(res.status !== 200){
      LALERT.msg(res.message)
      return
    }

    let d = dataType[pageInfo.nowData.type] ? res.data[0].pickUp : res.data[0]
    fillDetail[pageInfo.nowData.type](d)
  })
}