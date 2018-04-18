/**
 * 配载订舱取消
 */

// 查询配载订舱列表
const getStowageListByFlight_url = baseUrl + '/def/output/stowage/getStowageOrderListByFlight'
let getStowageListByFlight_params = {
  flight_no: '',              // 航班号
  departure_code: '',	        // 始发站三字码
  destination_code: '',	      // 目的站三字码
  plan_fry_date: ''           // 航班日期
}

let renderCancelOrderList = data => {
  let str = data.map((item, index) => {
    typeof item === 'object' && Object.keys(item).forEach(key => {
      item[key] = item[key] !== null ? item[key] : ''
    })
    return `
      <tr class="table-item ${item.ischecked ? 'active' : ''}">
        <td class="checkbox-wrap">
          <input type="checkbox" data-info='${JSON.stringify(item)}' ${item.ischecked ? 'checked' : ''} />
          <span class="checkbox-mask"></span>
        </td>
        <td>${(pagination.nowNum - 1) * 10 + index + 1}</td>
        <td>${item.order_no}</td>
        <td>${item.batch}</td>
        <td>${item.batch}</td>                // 订舱
        <td>${item.batch}</td>                // 订舱号
        <td>${item.stowage_quantity}</td>
        <td>${item.weight}</td>
        <td>${item.departure_code}</td>
        <td>${item.destination_code}</td>
        <td>${item.special_order_code}</td>
        <td>${item.product_name}</td>
        <td>${item.rdy}</td>
        <td><input type="text" class="inputHeight20px cancel_reason"></td>
      </tr>`
    }
  ).join('')
  $('.cancel_stowage_table').html(str)
}

let renderList = (res, params) => {
  var {flight_no, departure_code, destination_code, plan_fry_date} = params
  $('.stowage_booking_list .flight_no_2').val(flight_no.slice(0, 2))
  $('.stowage_booking_list .flight_no_4').val(flight_no.slice(2,6))
  $('.stowage_booking_list .list_departure_code').val(departure_code)
  $('.stowage_booking_list .list_destination_code').val(destination_code)
  $('.stowage_booking_list .list_plan_fry_date').val(plan_fry_date)
  pagination.init('.stowage_booking_list .pageBox', res.data[0].result, getStowageOrderListByFlight_params, getStowageOrderListByFlight_url, renderStowageOrderList, 1)
  renderStowageOrderList(res.data[0].result.list)
}

// 配载订舱列表点击取消配载订舱===================================================================================
$('.stowage_booking_list .cancellation_stowage_booking_btn').on('click', function () {
  let cancelStowageList = Array.from( $('.StowageOrderList_table').find('input:checked') ).map(item => {
    $(item).data('info').ischecked = true
    return $(item).data('info')
  })

  renderCancelOrderList(cancelStowageList)

  var {flight_no, departure_code, destination_code, plan_fry_date} = getStowageOrderListByFlight_params
  $('.cancellation_stowage_booking .two_flight_no').val(flight_no.slice(0,2))
  $('.cancellation_stowage_booking .four_flight_num').val(flight_no.slice(2,6))
  $('.cancellation_stowage_booking .list_departure_code').val(departure_code)
  $('.cancellation_stowage_booking .list_destination_code').val(destination_code)
  $('.cancellation_stowage_booking .list_plan_fry_date').val(plan_fry_date)
})

let searchStowageList = () => {
  getStowageListByFlight_params = {
    flight_no: $('.cancellation_stowage_booking .two_flight_no').val() + $('.cancellation_stowage_booking .four_flight_num').val(),
    departure_code: $('.cancellation_stowage_booking .list_departure_code').val(),
    destination_code: $('.cancellation_stowage_booking .list_destination_code').val(),
    plan_fry_date: $('.cancellation_stowage_booking .list_plan_fry_date').val(),
  }

  LXHR.POST(getStowageListByFlight_url, getStowageListByFlight_params).done(res => {
    if(res.status === 200){
      flight_id = res.data[0].flight_id
      pagination.init('.cancellation_stowage_booking .pageBox', res.data[0].result, getStowageListByFlight_params, getStowageOrderListByFlight_url, renderCancelOrderList, 1)
      renderCancelOrderList(res.data[0].result.list)
    }else{
      LALERT.msg(res.message)
    }
  })
}

$('.cancellation_stowage_booking .btn-search').click(function(){
  searchStowageList()
})

// 取消配载订舱====================================================================================================
const cancelStowageBookingUrl = baseUrl + '/def/output/stowage/saveStowageBookingCancel'
let cancelStowageBookingParams = {
  list: [],
  flight_id: '',
}

$('.all_cancel_reason').on('change', function () {
  let all_cancel_reason = $(this).val()
  $('.cancel_stowage_table').find('input:checked').parent().parent().find('.cancel_reason').val(all_cancel_reason)
})

// 选中、取消选中
$('.cancel_stowage_table').on('click', '.table-item', function(evt){
  if($(evt.target).hasClass('cancel_reason')) return

  $(this).toggleClass('active')

  if( $(this).find(':checkbox').is(':checked') ){
    $(this).find(':checkbox').attr('checked', false)
    $(this).find('.cancel_reason').val('')
  }else{
    $(this).find(':checkbox').attr('checked', true)
  }
}) 

$('.cancellation_stowage_booking .cancel-btn').click(function (evt) {
  cancelStowageBookingParams.list = Array.from( $('.cancellation_stowage_booking').find('input:checked') ).map(item => {
    let data = $(item).data('info')
    let cancel_reason = $(item).parent().parent().find('.cancel_reason').val()

    return {
      id: data.id,
      cancel_reason: cancel_reason,
    }
  })
  cancelStowageBookingParams.flight_id = flight_id

  let params = {
    flight_no: $('.cancellation_stowage_booking .two_flight_no').val() + $('.cancellation_stowage_booking .four_flight_num').val(),
    departure_code: $('.cancellation_stowage_booking .list_departure_code').val(),
    destination_code: $('.cancellation_stowage_booking .list_destination_code').val(),
    plan_fry_date: $('.cancellation_stowage_booking .list_plan_fry_date').val(),
  }

  LXHR.POST(cancelStowageBookingUrl, JSON.stringify(cancelStowageBookingParams), {contentType: 'application/json'}).done(res => {
    if(res.status === 200){
      $('.all_cancel_reason').val('')
      renderList(res, params)
      gotoStowageList()
      LALERT.success('取消成功')
    }
  })
})


// 改变订舱==================================================================================================
const changeStowageBookingUrl = baseUrl + '/def/output/stowage/saveStowageBookingUpdate'
let changeStowageBookingParams = {
  flight_no: '',
  plan_fry_date: '',
  departure_code: '',
  destination_code: '',
  order_nos: [],
}

$('.cancellation_stowage_booking .change_btn').click(function () {
  changeStowageBookingParams = {
    flight_no: $('.cancellation_stowage_booking .flight_no_2').val() + $('.cancellation_stowage_booking .flight_no_4').val(),
    plan_fry_date: $('.cancellation_stowage_booking .plan_fry_date').val(),
    departure_code: $('.cancellation_stowage_booking .departure_code').val(),
    destination_code: $('.cancellation_stowage_booking .destination_code').val(),
  }

  changeStowageBookingParams.order_nos = Array.from( $('.cancel_stowage_table').find('input:checked') ).map(item => {
    let data = $(item).data('info')
    return data.order_no
  })

  LXHR.POST(changeStowageBookingUrl, JSON.stringify(changeStowageBookingParams), {contentType: 'application/json'}).done(res => {
    if(res.status === 200) {
      renderList(res, changeStowageBookingParams)
      gotoStowageList()
      LALERT.success('改变成功')
    }else{
      LALERT.msg(res.message)
    }
  })
})