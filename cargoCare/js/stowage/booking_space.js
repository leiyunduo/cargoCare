/**
 * 配载订舱
 */
const pageInfo = {
  // baseUrl: 'http://192.168.1.106:8080/lxtd-cca-apis',
  baseUrl: 'http://47.93.90.229/test',
}

let baseUrl = globalBaseUrl.baseUrl || pageInfo.baseUrl

// toUpperCase
toUpper()

// 跳到配载列表
let gotoStowageList = () => {
  $('.stowagepage').hide()
  $('.stowage_booking_list').show()
}

const getOrderList_url = baseUrl + '/def/output/stowage/getOrderList'
let getOrderList_params = {
  two_flight_code: '',        // 承运人两字码
  departure_code: '',	        // 始发站三字码
  destination_code: '',	      // 目的站三字码
  goods_status: '',	          // 货物状态
  product_category_code: ''   // 货物类别
}

// 需确认的配载订舱
let checked_booking_list = []
let ccaMainSingleList = []

// 渲染表格
let renderStowageTable = data => {
  let str = data.map((item, index) => {
    typeof item === 'object' && Object.keys(item).forEach(key => {
      item[key] = item[key] !== null ? item[key] : ''
    })
    return `
        <tr data-info='${JSON.stringify(item)}' class="table-item">
          <td class="checkbox-wrap">
            <input type="checkbox" data-info='${JSON.stringify(item)}'>
            <span class="checkbox-mask"></span>
          </td>
          <td>${(pagination.nowNum - 1) * 10 + index + 1}</td>
          <td>${item.goods_route}</td>
          <td>${item.order_no}</td>
          <td>${item.batch}</td>
          <td>${item.rdy}</td>
          <td>${item.remain_quantity}</td>
          <td>${item.weight}</td>
          <td>${item.volume}</td>
          <td>${item.departure_code}</td>
          <td>${item.destination_code}</td>
          <td>${item.product_name}</td>
          <td>${item.good_pull_down}</td>
          <td>${item.special_order_code}</td>
          <td>${item.arrival_date}</td>
          <td>${item.warehouse}/${item.warehouse_quantity}</td>
        </tr>`
      }
    ).join('')
  $('.stowage_booking .table-list').html(str)
}

let renderStowageSureTable = data => {
  typeof item === 'object' && Object.keys(item).forEach(key => {
    item[key] = item[key] !== null ? item[key] : ''
  })
  let str = data.map((item, index) => {
    return `
      <tr data-info='${JSON.stringify(item)}' class="table-item">
        <td class="checkbox-wrap">
          <input type="checkbox" data-info='${JSON.stringify(item)}'>
          <span class="checkbox-mask"></span>
        </td>
        <td>${index + 1}</td>
        <td>${item.goods_route}</td>
        <td>${item.order_no}</td>
        <td>${item.batch}</td>
        <td>${item.rdy}</td>
        <td>${item.remain_quantity}</td>
        <td>${item.weight}</td>
        <td>${item.volume}</td>
        <td>${item.departure_code}</td>
        <td>${item.destination_code}</td>
        <td>${item.product_name}</td>
        <td>${item.good_pull_down}</td>
        <td>${item.special_order_code}</td>
        <td>${item.arrival_date}</td>
        <td>${item.warehouse}/${item.warehouse_quantity}</td>
      </tr>`
    }
  ).join('')
  $('.stowage_booking_sure .table_list').html(str)
}

let searchOrderList = () => {
  getOrderList_params = {
    two_flight_code: $('.stowage_booking .carriage_code').val(),                        // 承运人两字码
    departure_code: $('.stowage_booking .departure_code').val(),	                      // 始发站三字码
    destination_code: $('.stowage_booking .destination_code').val(),	                  // 目的站三字码
    goods_status: $('.stowage_booking .goods_status').dropdown('get value'),	          // 货物状态
    product_category_code: $('.stowage_booking .product_category_code').dropdown('get value')    // 货物类别
  }

  LXHR.POST(getOrderList_url, getOrderList_params).done(res => {
    if(res.status === 200){
      pagination.init('.stowage_booking .pageBox', res.data[0], getOrderList_params, getOrderList_url, renderStowageTable)
      renderStowageTable(res.data[0].list)
      
      checked_booking_list = []
      ccaMainSingleList = []
      renderCheckedTable( checked_booking_list )
    }else{
      alert(res.status + res.message)
    }
  })
}
// 发送请求
$('.booking-space-search').click(function(){
  searchOrderList()
})

//==================================================================================================================
// 配载订舱确认
const stowageBookingConfirm_url = baseUrl + '/def/output/stowage/stowageBookingConfirm'
let stowageBookingConfirm_params = {
  "flight_no": "",
  "plan_fry_date": "",
  "departure_code": "",
  "destination_code": "",
  "ccaMainSingleList": []
}

// 渲染表格
let renderCheckedTable = data => {
  let str = data.map((item, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${item.order_no}</td>
            <td>${item.batch}</td>
            <td>
              <input type="number" class="inputHeight20px stowage_quantity" 
                value="${item.remain_quantity}"
                data-maxnum = "${item.remain_quantity}"
              >
            </td>
          </tr>`
        ).join('')
  $('.checked-table-list').html(str)

  $('.checked-table-list .stowage_quantity').on('change', function () {
    if( $(this).val() > $(this).data('maxnum') ) {
      LALERT.msg('超出剩余可配载件数,请重新输入')
      $(this).val(0)
    }
  })
}

// 选中、取消选中
$('.stowage_booking .table-list').on('click', '.table-item', function(evt){
  $(this).toggleClass('active')
  if( $(this).find(':checkbox').is(':checked') ){
    $(this).find(':checkbox').attr('checked', false)
    checked_booking_list.forEach((item,index) => {
      if(item.id === $(this).data('info').id){
        checked_booking_list.splice(index,1)
      }
    })
  }else{
    $(this).find(':checkbox').attr('checked', true)
    checked_booking_list.push( $(this).data('info') )
  }

  renderCheckedTable( checked_booking_list )
}) 

// 准备配载==================================================================================================
let ready_stowage_booking = () => {
  let stowage_quantity_list = Array.from( $('.checked-table-list').find('input') ).map(item => item.value)
  checked_booking_list.map((item, index) => {
    return Object.assign(item,{"remain_quantity":stowage_quantity_list[index]})
  })
  renderStowageSureTable(checked_booking_list)
}

$('.stowage_booking_sure_btn').click(function(){
  ready_stowage_booking()
})

// 确认配载==================================================================================================
$('.stowage_booking_sure .table_list').on('click', '.table-item', function(evt){
  $(this).toggleClass('active')
  if( $(this).find(':checkbox').is(':checked') ){
    $(this).find(':checkbox').attr('checked', false)
  }else{
    $(this).find(':checkbox').attr('checked', true)
  }
})

$('.stowage_booking_sure .stowage_booking_btn').on('click', function () {

  ccaMainSingleList = Array.from( $('.stowage_booking_sure .table_list').find('input:checked') ).map(item => {
    let data = $(item).data('info')
    return {
      "order_no": data.order_no,
      "batch": data.batch,
      "stowage_quantity": data.remain_quantity
    }
  })

  stowageBookingConfirm_params = {
    "flight_no": $('.stowage_booking .two_flight_code').val() + $('.stowage_booking .four_flight_num').val(),
    "plan_fry_date": $('.stowage_booking .plan_fry_date').val(),
    "departure_code": $('.stowage_booking .departure_three_code').val(),
    "destination_code": $('.stowage_booking .destination_three_code').val(),
    "ccaMainSingleList": ccaMainSingleList
  }
  
  if(!ccaMainSingleList.length){
    LALERT.msg('请选择要确认的配载')
    return
  }

  LXHR.POST(stowageBookingConfirm_url, JSON.stringify(stowageBookingConfirm_params), {contentType: 'application/json'}).done(res => {
    if(res.status === 200){
      LALERT.success('配载订舱确认成功')
      searchOrderList()
    }else{
      LALERT.msg(res.message)
    }
  })
})