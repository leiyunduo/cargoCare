// 费用相关 =================================================================================================

// 获取费用列表
let getCostParams = () => {
  return {
    order_no: pageInfo.order_no,
    id: $('.price_species').dropdown('get value'),
    weight: $('.d_weight').val(),
    quantity: $('.d_quantity').val(),
    price_species: $('.price_species').dropdown('get text'),
    is_domestic: $('.d_is_domestic').dropdown('get value'),
    sender_code: $('.d_sender_code').val(),
    sender_name: $('.d_sender_name').val(),
    destination_code: $('.d_destination_code').val(),
    destination_name: '',
    product_category_code: $('.d_product_category_code').val(),
    product_category_name: $('.d_product_category').val(),
  }
}

let getCostInfo = () => {
  const url= baseUrl + '/def/receive/getCostItem'
  let params = getCostParams()
  let mainParams = {
    type: 0,
    easy_flag: $('.d_easy_flag').dropdown('get value'),
    air_transit: $('.d_air_transit').dropdown('get value'),
    two_flight_code: $('.d_expected_two_flight_code').val(),
    first_transfer_code: $('.d_first_transfer_code').val(),
    first_transfer_name: $('.d_first_transfer_name').val(),
    clearing_unit_name: $('.d_clearing_unit').val(),
  }

  let subParams = {
    type: 1,
    association_point_code: '',
    association_point_name: '',
    product_code: $('.d_product_no').val(),
    product_name: $('.d_product_name').val(),
    billing_location: $('.d_billing_location').dropdown('get text'),
  }

  params = !!pageInfo.type ? Object.assign(params, subParams) : Object.assign(params, mainParams)
  
  if(!params.id || params.id == 0){
    return
  }

  LXHR.POST(url, params).done(res => {
    if(res.status === 200){
      costInfo.change(res.data)
    }
  })
}

// 渲染价种
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
  $('.ui.dropdown.price_species').dropdown()
  $('.d_price_species_code').val(data[0].price_code)    // 价种代码
  $('.d_invoice_price').val(data[0].invoice_price)      // 费率
  $('.d_clearing_unit_code').val(data[0].clearing_unit_code)
  $('.d_clearing_unit').val(data[0].clearing_unit_name)

  $('.ui.dropdown.price_species').dropdown()
  $('.ui.dropdown.price_species').dropdown({
    onChange: function(value, text, $selectedItem) {
      if($selectedItem){
        let nowData = $selectedItem.data('info')
        $('.d_price_species_code').val(nowData.price_code)
        $('.d_invoice_price').val(nowData.invoice_price)
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
  $('.d_invoice_price').val('')
  $('.d_clearing_unit_code').val('')
  $('.d_clearing_unit').val('')
}

// 查询价种
let getPriceParams = () => {
  return {
    type: pageInfo.type,
    destination_code: $('.d_destination_code').val(),               // 目的站 必填
    destination_name: '',
    weight: $('.d_weight').val(),                                   // 计重 必填
    quantity: $('.d_quantity').val(),                               // 件数 必填
    product_name: $('.d_product_name').val(),
    product_code: $('.d_product_code').val(),
    product_category_code: $('.d_product_category_code').val(),
    product_category_name: $('.d_product_category').val(),
  }
}

let getPriceSpecies = () => {
  if(pageInfo.isPrice){
    return
  }

  let isAllInput = Array.from($('.price_must')).every((item, index) => {
    return !!$(item).val()
  })

  if(!isAllInput){
    LALERT.msg('当运单号，目的站，计重，件数全部输入完成后才可获取价种')
    return
  }

  let url = baseUrl + '/def/receive/getMainSingleFlightRate'

  let params = getPriceParams()
  let mainParams = {
    order_three_code: $('.d_order_code').val(),                     // 三字码 必填
    air_transit: $('.d_air_transit').dropdown('get value'),
    first_transfer_code: $('.d_first_transfer_code').val(),
    first_transfer_name: $('.d_first_transfer_name').val(),
    flight_num: $('.d_expected_flight_num').val(),
    your_category_code: $('.d_your_category_code').val(),
    your_category_name: $('.d_your_category').val(),
    is_domestic: $('.d_is_domestic').dropdown('get value'),
    easy_flag: $('.d_easy_flag').dropdown('get value'),
  }

  let subParams = {
    sender_code: $('.d_sender_code').val(),
    sender_name: $('.d_sender_name').val(),
    customer_category_code: '',
    customer_category_name: '',
    association_point_code: '',
    association_point_name: '',
  }

  params = !!pageInfo.type ? Object.assign(params, subParams) : Object.assign(params, mainParams)

  LXHR.POST(url, params).done(res => {
    if(res.status === 200){
      pageInfo.isPrice = true
      render_price_species_selection(res.data)
    }else{
      $('.price_species').html('')
      LALERT.msg(res.message)
    }
  })
}

$('.price_species').on('focus', function () {
  getPriceSpecies()
})

$('.price_about').on('change', function () {
  if(pageInfo.isPrice){
    LALERT.msg('价种依赖的数据发生变化，请点击价种框重新获取')
    clearPrice()
    pageInfo.isPrice = false
  }
})