
//==================================================================================================================
// 配载订舱列表
const getStowageOrderListByFlight_url = baseUrl + '/def/output/stowage/getStowageOrderListByFlight'
let getStowageOrderListByFlight_params = {
  flight_no: '',              // 航班号
  departure_code: '',	        // 始发站三字码
  destination_code: '',	      // 目的站三字码
  plan_fry_date: ''           // 航班日期
}
let flight_id = ''

let renderStowageOrderList = data => {
  let str = data.map((item, index) => {
    typeof item === 'object' && Object.keys(item).forEach(key => {
      item[key] = item[key] !== null ? item[key] : ''
    })
    return `
      <tr data-info='${JSON.stringify(item)}' class="table-item">
        <td class="checkbox-wrap"><input type="checkbox" data-order="${item.order_no}" data-info='${JSON.stringify(item)}'><span class="checkbox-mask"></span></td>
        <td>${(pagination.nowNum - 1) * 10 + index + 1}</td>
        <td>${item.order_no}</td>
        <td>${item.batch}</td>
        <td>${item.stowage_quantity}</td>
        <td>${item.weight}</td>
        <td>${item.product_name}</td>
        <td>${item.special_order_code}</td>
        <td>${item.departure_code}</td>
        <td>${item.destination_code}</td>
        <td></td>
        <td>${item.good_pull_down}</td>
        <td>${item.special_order_code}</td>
        <td>${item.volume}</td>
        <td>${item.warehouse}/${item.warehouse_quantity}</td>
      </tr>`
    }
  ).join('')
  $('.StowageOrderList_table').html(str)
}

let searchStowageOrderList = () => {
  getStowageOrderListByFlight_params = {
    flight_no: $('.stowage_booking_list .flight_no_2').val() + $('.stowage_booking_list .flight_no_4').val(),
    departure_code: $('.stowage_booking_list .list_departure_code').val(),
    destination_code: $('.stowage_booking_list .list_destination_code').val(),
    plan_fry_date: $('.stowage_booking_list .list_plan_fry_date').val()
  }

  LXHR.POST(getStowageOrderListByFlight_url, getStowageOrderListByFlight_params).done(res => {
    if(res.status === 200){
      pagination.init('.stowage_booking_list .pageBox', res.data[0].result, getStowageOrderListByFlight_params, getStowageOrderListByFlight_url, renderStowageOrderList, 1)
      renderStowageOrderList(res.data[0].result.list)
      flight_id = res.data[0].flight_id
    }else{
      LALERT.msg(res.message)
    }
  })
}

$('.stowage_booking_list .btn-search').click(function(){
  searchStowageOrderList()
})

// 配载订舱点击配载订舱列表
$('.stowage_booking .stowage_booking_list_btn').on('click', function () {
  var {flight_no, departure_code, destination_code, plan_fry_date} = stowageBookingConfirm_params
  $('.stowage_booking_list .flight_no_2').val(flight_no.slice(0, 2))
  $('.stowage_booking_list .flight_no_4').val(flight_no.slice(2, 6))
  $('.stowage_booking_list .list_departure_code').val(departure_code)
  $('.stowage_booking_list .list_destination_code').val(destination_code)
  $('.stowage_booking_list .list_plan_fry_date').val(plan_fry_date)
  
  flight_no && searchStowageOrderList()
})

// 选中、取消选中
$('.StowageOrderList_table').on('click', '.table-item', function(evt){
  $(this).toggleClass('active')

  if( $(this).find(':checkbox').is(':checked') ){
    $(this).find(':checkbox').attr('checked', false)
  }else{
    $(this).find(':checkbox').attr('checked', true)
  }
}) 

// 生成初仓单===================================================================================================
const  saveFirstManifestUrl = baseUrl + '/def/output/manifest/saveFirstManifest'
let saveFirstManifestParams = {
  flight_id: '',
  order_nos: []
}
