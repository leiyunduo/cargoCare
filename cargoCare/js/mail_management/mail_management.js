//快件-邮件管理
const pageInfo = {
    isEdit: false,
    isPrice: false,
    order_no: '',
    editId: '',
    //baseUrl: 'http://192.168.1.112:8080/lxtd-cca-apis',
    baseUrl: 'http://47.93.90.229/test',
}
let {baseUrl} = pageInfo
$('.btn_clear').click(function () {
    clearIpt()
})

$('.btn_clear_main').click(function () {
    clearSearch()
})
// 组件====================================================================================================
// 分页
const paginationMain = new Pagination
const pagination = new Pagination
// 费用
const costInfo = new CostInfo
// 客服情况
const customInfo = new CustomInfo
// 体积情况
const volumeInfo = new VolumeInfo
// 到达情况
const arriveInfo = new ArriveInfo
// 相关航班信息
const flightInfo = new FlightInfo
costInfo.init('.cost_info_table')
volumeInfo.init('.volume_info_table')
customInfo.init('.service_info_table')
arriveInfo.init('.arrival_info_table', baseUrl)
flightInfo.init('.relate_flight_info_table', baseUrl, pagination)
// 重置
let resetAll = () => {
    costInfo.change()
  customInfo.change()
  volumeInfo.change()
  
  clearIpt()
  clearError()
  pageInfo.order_no = ''
  pageInfo.isPrice = false
    pageInfo.type = 0

  selectList = []
  selectedList = []

  if(pageInfo.type){
    $('.d_order_code').val('000')
  }
  $(".tabBox.detail").scrollTop(0)
}

// toUpperCase
toUpper()

// toUpperCase
// 获取单号
$('.order_no').on('change', function () {
    if ($('.d_order_code').val() && $('.d_order_num').val()) {
        pageInfo.order_no = $('.d_order_code').val() + $('.d_order_num').val()
    }
})
//查询
let renderTable = (data, num) => {
    let str = data.map((item, index) => {
            let pick_up_state = item.pick_up_state
            typeof item === 'object' && Object.keys(item).forEach(key => {
                item[key] = item[key] !== null ? item[key] : ''

                if (key === 'state') {
                    item[key] = item[key] ? '已使用' : '未使用'
                }

                if (key === 'departure_status') {
                    if (item[key] === 0) {
                        item[key] = '未出港'
                    } else if (item[key] === 1) {
                        item[key] = '部分出港'
                    } else if (item[key] === 2) {
                        item[key] = '已出港'
                    }
                }

                if (key === 'receipt_type') {
                    if (item[key] === 0) {
                        item[key] = '即时'
                    } else if (item[key] === 1) {
                        item[key] = '事后'
                    }
                }
            })
            return `
      <tr>
        <td>${(num - 1) * 10 + index + 1}</td>
        <td class="flexCenter padding0 ">
          <div class="roundBg borderRaidus greenBg btn-edit" data-order='${item.order_no}' data-id='${item.id}'>
            <i class="edit icon margin-Left5" title="编辑"></i>
          </div>
    
        </td>
        <td>${item.order_no}</td>
        <td>${item.departure}</td>
        <td>${item.destination}</td>
        <td>${item.sender_name}</td>
        <td>${item.receiver_name}</td>
        <td>${item.billing_time}</td>
        <td>${item.receipt_type}</td>
        <td>${item.state}</td>
        <td>${item.billing_location}</td>
        <td>${item.issuer}</td>
      </tr>`
        }
    ).join('')
    $('.mail_table').html(str)
}
// 获取参数
let getSearchParams = () => {
    return {
        "order_three_code": $('.order_three_code').val(),
        "order_num": $('.order_num').val(),
        "receipt_type": $('.receipt_type').val(),
        "easy_flag": $('.easy_flag').val(),
        "departure_status": $('.departure_status').val(),
        "departure": $('.departure_code').val(),
        "destination": $('.destination_code').val(),
        "sender": $('.sender_code').val(),
        "receiver": $('.receiver_code').val(),
        "billing_time_start": $('.billing_time_start').val(),
        "billing_time_end": $('.billing_time_end').val(),
        "currPage": 1,
    }
}
// 查询列表
let getReceiveInfo = () => {
    let url = baseUrl + '/def/express/mail/pageQueryForMail/'
    let params = getSearchParams()

    LXHR.POST(url, params).done(res => {
        if (res.status === 200) {
            paginationMain.init('.receive_main_pageBox', res.data[0], params, url, renderTable)
            renderTable(res.data[0].list, 1)
        } else {
            LALERT.msg(res.message)
        }
    })
}
$('.btn_search').on('click', function () {
    getReceiveInfo()
})
// 费用相关 =================================================================================================
let getCostInfo = () => {
    const url = baseUrl + '/def/receive/getCostItem'
    let params = {
        type: 2,
        id: $('.price_species').dropdown('get value'),
        weight: $('.d_weight').val(),
        quantity: $('.d_quantity').val(),
        order_no: pageInfo.order_no,
    }

    if (!params.id || params.id == 0) {
        return
    }

    LXHR.POST(url, params).done(res => {
        if (res.status === 200) {
            costInfo.change(res.data)
        }
    })
}
// 价种相关查询
let render_price_species_selection = data => {
    let optionsStr = data.map(item => {
        return `<option class="item" data-value="${item.id}" data-info='${JSON.stringify(item)}'>${item.price_species}</option>`
    }).join('')

    let str = `
            <input type="hidden" value="${data[0].id}">
            <div class="default text">${data[0].price_species}</div>
            <i class="dropdown icon"></i>
            <div class="menu">
              ${optionsStr}
            </div>`
    $('.price_species').html(str)

    $('.d_price_species_code').val(data[0].price_code)    // 价种代码
    $('.d_invoice_price').val(data[0].invoice_price)      // 费率
    $('.d_sale_price').val(data[0].sale_price)
    $('.d_clearing_unit_code').val(data[0].clearing_unit_code)
    $('.d_clearing_unit').val(data[0].clearing_unit_name)

    $('.ui.dropdown.price_species')
        .dropdown({
            onChange: function (value, text, $selectedItem) {
                if ($selectedItem) {
                    let nowData = $selectedItem.data('info')
                    $('.d_price_species_code').val(nowData.price_code)
                    $('.d_invoice_price').val(nowData.invoice_price)
                    $('.d_sale_price').val(nowData.sale_price)//2017.10.17 为项目演示 未经允许 擅自更改代码
                    $('.d_clearing_unit_code').val(nowData.clearing_unit_code)
                    $('.d_clearing_unit').val(nowData.clearing_unit_name)
                    getCostInfo()
                    gotoCost()
                }
            }
        })
}

// 清空价种
let clearPrice = () => {
    $('.price_species').html('')
    $('.d_price_species_code').val('')
    $('.d_sale_price').val('')
    $('.d_invoice_price').val('')
    $('.d_clearing_unit_code').val('')
    $('.d_clearing_unit').val('')
}
let getPriceSpecies = () => {
    if (pageInfo.isPrice) {
        return
    }

    let isAllInput = Array.from($('.price_must')).some((item, index) => {
        return !!$(item).val()
    })
    if (!isAllInput) {
        LALERT.msg('当运单号，目的站，计重，件数全部输入完成后才可获取价种')
        return
    }

    let url = baseUrl + '/def/receive/getMainSingleFlightRate'
    let params = {
        type: 2,                                                        // 必填
        order_three_code: $('.d_order_code').val(),                     // 三字码 必填
        destination_code: $('.d_destination_code').val(),               // 目的站 必填
        weight: $('.d_weight').val(),                                   // 计重 必填
        quantity: $('.d_quantity').val(),                               // 件数 必填
        flight_num: $('.d_expected_flight_num').val(),
        "sender_code": $('.d_sender_code').val(),
        "sender_name": $('.d_sender_name').val(),
        "two_flight_code": $('.d_expected_two_flight_code').val(),
    }

    LXHR.POST(url, params).done(res => {
        if (res.status === 200) {
            pageInfo.isPrice = true
            render_price_species_selection(res.data)
        } else {
            $('.price_species').html('')
            LALERT.msg(res.message)
        }
    })
}
$('.dropdown').dropdown()
$('.price_species').on('focus', function () {
    getPriceSpecies()
})
$('.price_about').on('change', function () {
    if (pageInfo.isPrice) {
         LALERT.msg('价种依赖的数据发生变化，请点击价种框重新获取')
        clearPrice()
        pageInfo.isPrice = false
    }
})
// 添加时改变状态
$('.btn_add').on('click', function () {
    $(".tabNav>div>a").removeClass('tabColor')
    $(".tabNav .detail").addClass('tabColor')
    pageInfo.isEdit = false
    $('.two_level_menu_head .title').html('邮件管理添加')
    resetAll()
    gotoDetail();
})
// 获取收/发货人信息 =============================================================================================
;
(function () {
    let getSenderReceiverUrl = baseUrl + '/def/basic/dic/getSenderReceiver'
    // 发货人
    $('.d_sender_code').on('change', function () {
        LXHR.POST(getSenderReceiverUrl, {code: $(this).val()}).done(res => {
            if (res.status === 200) {
                let d = res.data[0]
                $('.d_sender_name').val(d.full_name)
                $('.d_sender_telephone').val(d.telephone)
                $('.d_sender_fax').val(d.fax)
                $('.d_sender_address').val(d.address || '无')
            } else {
                LALERT.msg(res.message)
            }
        })
    })

    // 收货人
    $('.d_receiver_code').on('change', function () {
        LXHR.POST(getSenderReceiverUrl, {code: $(this).val()}).done(res => {
            if (res.status === 200) {
                let d = res.data[0]
                $('.d_receiver_name').val(d.full_name)
                $('.d_receiver_telephone').val(d.telephone)
                $('.d_receiver_fax').val(d.fax)
                $('.d_receiver_address').val(d.address || '无')
            } else {
                LALERT.msg(res.message)
            }
        })
    })

    $('.d_sender_name').on('change', function () {
        $('.d_sender_name').val($(this).val())
    })

    $('.d_receiver_name').on('change', function () {
        $('.d_receiver_name').val($(this).val())
    })
})()

// 获取反写信息 ================================================================================================
;(function(){
  //let url = baseUrl + '/def/receive/getName';
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
          LALERT.msg(res.message)
      }
    })
  })
  // 第一程反写
  $('.d_first_transfer_code').on('change', function () {
      let yUrl = baseUrl + '/def/receive/getCity';
    LXHR.POST(yUrl, {code: $(this).val()}).done(res => {
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
      let yUrl = baseUrl + '/def/receive/getCity';
    LXHR.POST(yUrl, {code: $(this).val()}).done(res => {
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
      let pUrl = baseUrl + '/def/receive/getPackage';
    LXHR.POST(pUrl, {code: $(this).val()}).done(res => {
      if(res.status === 200) {
        res.data && $('.d_product_name').val(res.data[0])
        res.data && $('.d_product_code').focus()
      }else{
          LALERT.msg(res.message)
      }
    })
  })

  // 货物类别反写
  $('.d_product_category_code').on('change', function () {
      let hUrl = baseUrl + '/def/receive/getProductCategory';
    LXHR.POST(hUrl, {code: $(this).val(),type: 1}).done(res => {
      if(res.status === 200) {
        res.data && $('.d_product_category').val(res.data[0])
        res.data && $('.d_your_category_code').focus()
      }else{
          LALERT.msg(res.message)
      }
    })
  })

  // 自分类别反写
  $('.d_your_category_code').on('change', function () {
      let zUrl = baseUrl + '/def/receive/getCarrierCategory';
    LXHR.POST(zUrl, {code: $(this).val(),type: 1}).done(res => {
      if(res.status === 200) {
        res.data && $('.d_your_category').val(res.data[0])
        res.data && $('.d_packaging_code').focus()
      }else{
          LALERT.msg(res.message)
      }
    })
  })

  // 包装反写
  $('.d_packaging_code').on('change', function () {
      let bUrl = baseUrl + '/def/receive/getPackage';
    LXHR.POST(bUrl, {code: $(this).val()}).done(res => {
      if(res.status === 200) {
        res.data && $('.d_packaging_name').val(res.data[0])
        res.data && $('.d_departure_priority').focus()
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


// 保存开单明细 ===============================================================================================
let getSveParams = () => {
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
            cust_service_type: 2,
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
        "sender_fax": $('.d_sender_fax').val(),                                                      // 发货人传真
        "receiver_fax": $('.d_receiver_fax').val(),                                                  // 收货人传真
        "sender_sms_notification": $('.d_sender_sms_notification').val(),            // 短信通知
        "receiver_sms_notification": $('.d_receiver_sms_notification').val(),
        "delivery_mode": $('.d_delivery_mode').val(),                                // 提货方式
        "sender_address": $('.d_sender_address').val(),                                              // 地址
        "receiver_address": $('.d_receiver_address').val(),
        "carrier_storage_remark": $('.d_carrier_storage_remark').val(),                              // 承运人储运备注
        "other_storage_remark": $('.d_other_storage_remark').val(),                                  // 其他储运备注
        "billing_remark": $('.d_billing_remark').val(),                                              // 结算备注
        "starting_point_operation": $('.d_starting_point_operation').val(),                          // 出发操作点
        "first_transfer_code": $('.d_first_transfer_code').val(),                                    // 第一程
        "first_transfer_name": $('.d_first_transfer_name').val(),
        "air_transit": $('.d_air_transit').val(),                                    // 空运中转
        "second_transfer_code": $('.d_second_transfer_code').val(),                                  // 第二程
        "second_transfer_name": $('.d_second_transfer_name').val(),
       // "transshipment_unit": $('.d_transshipment_unit').val(),                                      // 中转理货单位
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
        "price_species_name": $('.d_price_species_name').val(),                                      // 价种
        "price_species_code": $('.d_price_species_code').val(),                                      // 价种代码
        "invoice_price": $('.d_invoice_price').val(),                                                // 费率
        "clearing_unit_code": $('.d_clearing_unit_code').val(),                                      // 结算单位
        "clearing_unit": $('.d_clearing_unit').val(),                                                // 结算单位
        "sale_price": $('.d_sale_price').val(),                                                          // 销售价
        "payment_method": $('.d_payment_method').val(),                             // 付款方式
        ///声明价值 保险价值 应收核对情况
        "declared_value":$(".d_declared_value").val(),
        "insurance_value":$(".d_insurance_value").val(),
        "receivable_check":$(".d_receivable_check").val(),
        "handle_check":$(".d_handle_check").val(),
        //**
        "is_lock":$(".d_is_lock").val(),
        "state": $('.d_state').val(),                                                // 状态
       // "receipt_type": $('.d_receipt_type').val(),                                  // 单据类型
        "service_record": $('.d_service_record').val(),                                              // 客服记录
        "billing_time": $('.d_billing_time').val(),                                                  // 开票时间
        "issuer": $('.d_issuer').val(),                                                              // 开票人
        "billing_location": $('.d_billing_location').val(),                                          // 开票地点
        "update_time": $('.d_update_time').val(),                                                    // 修改时间
        "update_person": $('.d_update_person').val(),                                                // 修改人
        "volumeList": volumeList, //体积
        "costItemList": costItemList, //费用
        "custServiceList": custServiceList, //客服
        "sender_email":$('.d_sender_email').val()  //发货人邮箱
    }
}
let saveReceiveDetail = () => {
    let url = baseUrl + '/def/express/mail/insertMail/'
    let params = getSveParams()

    if (pageInfo.isEdit) {
        Object.assign(params, {order_no: pageInfo.order_no})
        url = baseUrl + '/def/express/mail/editMail'
    }

    LXHR.POST(url, JSON.stringify(params), {contentType: 'application/json'}).done(res => {
        if (res.status === 200) {
            LALERT.success('保存成功')
            getReceiveInfo()
            gotoDetail()
            backMain()
        } else {
            LALERT.msg(res.message)
        }
    })
}
$('.btn_save').on('click', function () {
    getTime()
    let validate = $('.ui.form.detail_form').form('is valid')
    validate ? saveReceiveDetail() : failValidate()
})
// 编辑前查询填充 =============================================================================================
let fillDetail = d => {
    if (!d) return
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
    $('.d_sender_fax').val(d.sender_fax)                                                      // 发货人传真
    $('.d_receiver_fax').val(d.receiver_fax)                                                  // 收货人传真
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
   // $('.d_transshipment_unit').val(d.transshipment_unit)                                      // 中转理货单位
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
    $('.d_sale_price').val(d.sale_price),                                                      //销售价
    $('.d_service_record').val(d.service_record)                                              // 客服记录
    $('.d_billing_time').val(d.billing_time)                                                  // 开票时间
    $('.d_issuer').val(d.issuer)                                                              // 开票人
    $('.d_billing_location').val(d.billing_location)                                          // 开票地点
    $('.d_update_time').val(d.update_time)                                                    // 修改时间
    $('.d_update_person').val(d.update_person)                                                // 修改人
    $('.d_sender_email').val(d.sender_email)
    //*********声明价值
    $(".d_declared_value").val(d.declared_value)
    $(".d_insurance_value").val(d.insurance_value)
    $(".d_receivable_check").val(d.receivable_check)
    $(".d_handle_check").val(d.handle_check)
    $(".d_is_lock").val(d.is_lock)
    $('.d_receipt_type').val(d.receipt_type)
    $('.d_sender_sms_notification').dropdown('set value', d.sender_sms_notification)
    $('.d_sender_sms_notification').dropdown('set text', d.sender_sms_notification ? '是' : '否')
    $('.d_receiver_sms_notification').dropdown('set value', d.receiver_sms_notification)
    $('.d_receiver_sms_notification').dropdown('set text', d.receiver_sms_notification ? '是' : '否')
    $('.d_delivery_mode').dropdown('set value', d.delivery_mode)
    var d_delivery_text = ''
    switch (true) {
        case d.delivery_mode == 0:
            d_delivery_text = '自提'
            break;
        case d.delivery_mode == 1:
            d_delivery_text = '配送'
            break;
        default:
            d_delivery_text = '中转'
    }
    $('.d_delivery_mode').dropdown('set text', d_delivery_text)
    $('.d_air_transit').dropdown('set value', d.air_transit)                                    // 空运中转
    $('.d_air_transit').dropdown('set text', d.air_transit ? '是' : '否')
    $('.d_payment_method').dropdown('set value', d.payment_method)                              // 付款方式
    $('.d_payment_method').dropdown('set text', d.payment_method ? '预付' : '现金')
    $('.d_state').dropdown('set value', d.state)                                                // 状态
    $('.d_state').dropdown('set text', d.state ? '未使用' : '已使用')
    $('.d_receipt_type').dropdown('set value', d.receipt_type),                                  // 单据类型
    $('.d_receipt_type').dropdown('set text', d.receipt_type ? '事后' : '即时')
}
let editSearch = () => {
    let url = baseUrl + '/def/express/mail/beforeEditMail'

    LXHR.POST(url, {order_no: pageInfo.order_no}).done(res => {
        if (res.status !== 200) {
            LALERT.msg(res.message)
            return
        }
        let d = res.data[0]
        fillDetail(d)
       // customInfo.change(d.custServiceList)
       // volumeInfo.change(d.volumeList)
        $(".drop").dropdown()

        getPriceSpecies()
    })
}
$('.mail_table').on('click', '.btn-edit', function () {
    $('.two_level_menu_head .title').html('邮件管理编辑')
    $(".tabNav>div>a").removeClass('tabColor')
    $(".tabNav .detail").addClass('tabColor')
    gotoDetail()
    resetAll()
    pageInfo.isEdit = true
    pageInfo.order_no = $(this).data('order')
    $('.two_level_menu_wrap').css({'display': 'block'})

    editSearch()
})
// 开单费用==================================================================================================
;
(function () {
    $('.tabNav .cost').on('click', function () {
        getCostInfo()
    })
})()
// 出发/到达信息=============================================================================================
;
(function () {
    // 出发信息================================================================================================
    const getStartUrl = baseUrl + '/def/receive/getStart/'
    // 渲染出发信息表格
    let render_start_info_table = data => {
        let str = data.map((item, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${item.order_no}</td>
        <td>${item.flight_no}</td>
        <td>${item.departure}</td>
        <td>${item.destination}</td>
        <td>${item.main_quantity}</td>
        <td>${item.single_quantity}</td>
        <td>${item.sender}</td>
        <td>${item.transport_mode}</td>
        <td>${item.billing_time}</td>
        <td>${item.issuer}</td>
      </tr>`
        ).join('')
        $('.start_info_table').html(str)
    }
    // 获取出发情况
    let getStartInfo = () => {
        LXHR.POST(getStartUrl, {"order_no": pageInfo.order_no}).done(res => {
            if (res.status === 200) {
                render_start_info_table(res.data)
            }
        })
    }
    // 客服记录 ======================================================================================================
    // 获取客服情况
    let getServiceInfo = () => {
        const queryCustServiceRecordUrl = baseUrl + '/def/service/queryCustServiceRecord/'
        if (!customInfo.customList.length) {
            pageInfo.isEdit ? LXHR.POST(queryCustServiceRecordUrl, {
                "order_no": pageInfo.order_no,
                cust_service_type: 2,
            }).done(res => {
                if (res.status === 200) {
                    customInfo.change(res.data)
                }
            }) : customInfo.change()
        }
    }
    // 切换到出发、到达信息选项卡=================================================================================
    $('.tabNav .start_arrival').on('click', function () {
        pageInfo.order_no && getStartInfo()
        arriveInfo.change(pageInfo.order_no)
        getServiceInfo()
    })
    $('.d_service_record').on('keyup', function (evt) {
        if (evt.keyCode === 13) {
            gotoStartArrive()
            getServiceInfo()
        }
    })
})()

// 相关航班信息==============================================================================================
;
(function () {
    // 获取订舱情况
    const getBookingUrl = baseUrl + '/def/output/booking/getBookingByOrder'
    let render_booking_info_table = data => {
    
    let str = data.map((item, index) => {
      typeof item === 'object' && Object.keys(item).forEach(key => {
        item[key] = item[key] !== null ? item[key] : ''
      })
      return `<tr>
        <td>${item.booking_customer_code}</td>
        <td>${item.sender}</td>
        <td>${item.product_name}</td>
        <td>${item.reply_weight}</td>
        <td>${item.weight}</td>
        <td>${item.sender_weight_rate}</td>
        <td>${item.booking_customer_name}</td>
        <td>${item.booking_customer_tel}</td>
        <td>${item.reply_quatity}</td>
        <td>${item.reply_volume}</td>
        <td>${item.reply_person}</td>
        <td>${item.reply_time}</td>
      </tr>`
    }
    ).join('')
    $('.booking_info_table').html(str)
  }
    let getBookingInfo = () => {
        let order_no = pageInfo.order_no
        order_no && LXHR.POST(getBookingUrl, {order_no}).done(res => {
            if (res.status === 200) {
                render_booking_info_table(res.data)
            } else {
                LALERT.msg(res.message)
            }
        })
    }
    let getFlightParams = () => {
        return {
            currPage: 1,
            order_three_code: $('.d_order_code').val(),
        }
    }
    $('.tabWrap .relate_flight').on('click', function () {
        flightInfo.change(getFlightParams())
        getBookingInfo()
    })
    $('.d_expected_flight_time').on('keyup', function (evt) {
        if (evt.keyCode === 13) {
            flightInfo.change(getFlightParams())
            gotoRelateFlight()
            getBookingInfo()
        }
    })
})()
// 体积 ====================================================================================================
;(function(){
    let getVolumeInfo = () => {
        volumeInfo.init()
        const queryVolumeUrl = baseUrl + '/def/receive/queryVolume/'
        if(!volumeInfo.volumeList.length){
            pageInfo.isEdit ? LXHR.POST(queryVolumeUrl, {"order_no": pageInfo.order_no}).done(res => {
                if(res.status === 200){
                    volumeInfo.change(res.data[0].list)
                }
            }) : volumeInfo.change()
        }
    }

    $('.tabNav .volume').on('click', function(){
        getVolumeInfo()
    })

    $('.detail_net_volume').on('keyup', function (evt) {
        if(evt.keyCode === 13){
            gotoVolume()
            getVolumeInfo()
        }
    })
})()

