/**
 * 跳转页面
 */

let fill_detail = d => {
  if(!d) return
  if(d.correspond_order_no) {
    $('.d_order_code').val(pageInfo.order_no.slice(0, 3))                                             // 三字码
    $('.d_order_num').val(pageInfo.order_no.slice(3, 11))                                             // 8位数字
  }
  
  $('.d_departure_code').val(d.departure_code)                                              // 始发站
  $('.d_destination_code').val(d.destination_code)                                          // 目的站
  $('.d_sender_code').val(d.sender_code)                                                    // 发货人
  $('.d_sender_name').val(d.sender_name)
  $('.d_receiver_code').val(d.receiver_code)                                                // 收货人
  $('.d_receiver_name').val(d.receiver_name)
  $('.d_sender_telephone').val(d.sender_telephone)                                          // 发货人电话
  $('.d_receiver_telephone').val(d.receiver_telephone)                                      // 收货人电话
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
  $('.d_correspond_order_no').val(d.order_three_code + d.order_num)                         // 对应单号
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

  $('.d_declared_value').val(d.declared_value)                                              // 申明价值
  $('.d_insurance_value').val(d.insurance_value)                                            // 保险价值
  $('.d_billing_time').val(formatTime(d.billing_time))                                      // 开票时间
  $('.d_issuer').val(d.issuer)                                                              // 开票人
  $('.d_update_person').val(d.update_person)                                                // 修改人

  $('.d_billing_location').dropdown('set value', d.billing_location)                        // 开票地点
  $('.d_billing_location').dropdown('set text', d.billing_location)

  $('.d_delivery_mode').dropdown('set value', d.delivery_mode)                              // 提货方式
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
}

// 跳转过来直接进入开单明细 编辑
$(function () {
  if( parent.$('#route_iframe').attr('routechange') ) {
    let d = pageInfo.type ? JSON.parse(Store.getStore('main_detail')) : JSON.parse(Store.getStore('sub_detail'))
    let volumeList = JSON.parse(Store.getStore('volumeList'))

    if(d.correspond_order_no) {
      let order_no = d.correspond_order_no.split(',')[0].slice(0, 11)
      pageInfo.order_no = order_no
      pageInfo.isEdit = true
      editSearch()
      $('.print_about').show()
      $('.two_level_menu_head .title').html(pageInfo.type ? '国内分单收货编辑' : '国内主单收货编辑')
    }

    fill_detail(d)
    d.volumeList.length && volumeInfo.change(d.volumeList)
    $('.two_level_menu_wrap').show()
    gotoDetail()
  }
})

// 跳转主单分单
let gotoMainOrder = () => {
  parent.open_or_change({
    name: '收货主单管理',
    alt: 'receiving_middle_management',
    active: 1,
  })
  parent.$('#route_iframe').attr('src', './html/receiving_middle_management.html')
}

let gotoSubOrder = () => {
  parent.open_or_change({
    name: '收货分单管理',
    alt: 'receiving_middle_sub_management',
    active: 1,
  })
  parent.$('#route_iframe').attr('src', './html/receiving_middle_sub_management.html')
}

// 右键菜单
$('.detail_form').on('contextmenu', function (evt) {
  $('#menu').length && $('#menu').remove()
  $(this).append(
    `<div id="menu">
      <div class="save_and_leave">${pageInfo.type ? '保存并跳到主单' : '保存并跳到分单'}</div>
    </div>`
  )

  $('#menu').css({
    left: evt.pageX - 50,
    top: $('.tabBox.detail').scrollTop() + evt.clientY - 100,
  })
  return false
})

$(document).on('click', function () {
  $('#menu').remove()
})

let save_and_leave = () => {
  pageInfo.status = 'jump'
  let detail = getSaveParams()
  saveReceiveDetail().then(() => {
    Store.setStore('volumeList', volumeInfo.volumeList)
    if(pageInfo.type) {
      Store.setStore('sub_detail', detail)
      gotoMainOrder()
    }else{
      Store.setStore('main_detail', detail)
      gotoSubOrder()
    }
    parent.$('#route_iframe').attr('routechange', '1')
  })
}

$('.detail_form').on('click', '.save_and_leave', function () {
  save_and_leave()
})