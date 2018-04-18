const getManifestUrl = baseUrl + '/def/output/manifest/getFirstManifestByFlight'

let getManifestParams = {
  flight_no: '',
  departure_code: '',
  destination_code: '',
  plan_fry_date: '',
  type: ''
}
let manifest_flight_id = ''

let render_manifest_table = data => {
  let str = data.map((item, index) => {
    typeof item === 'object' && Object.keys(item).forEach(key => {
      item[key] = item[key] !== null ? item[key] : ''
    })
    return `
      <tr>
        <td>${item.state}</td>
        <td>${item.aircraft_no}</td>
        <td>${item.first_manifest_version}</td>
        <td>${item.cargo_total_single}</td>
        <td>${item.cargo_total_quantity}</td>
        <td>${item.cargo_total_weight}</td>
        <td>${item.mail_total_single}</td>
        <td>${item.mail_total_quantity}</td>
        <td>${item.mail_total_weight}</td>
      </tr>`
    }
  ).join('')
  $('.manifest_table').html(str)
}

let render_first_manifest_detail_table = data => {
  let str = data.map((item, index) => {
    typeof item === 'object' && Object.keys(item).forEach(key => {
      item[key] = item[key] !== null ? item[key] : ''
    })
    return `
      <tr>
        <td>${item.warehouse}</td>
        <td>${item.stowage_quantity}</td>
        <td>${item.order_no}</td>
        <td>${item.batch}</td>
        <td>${item.special_order_code}</td>
        <td>${item.special_order_code}</td>
        <td>${item.status}</td>
        <td>${item.weight}</td>
        <td>${item.departure_code}-${item.destination_code}</td>
        <td>${item.product_name}</td>
        <td>${item.remark}</td>
      </tr>`
    }
  ).join('')
  $('.manifest_detail_table').html(str)
}

let render_end_manifest_detail_table = data => {
  let str = data.map((item, index) => {
    typeof item === 'object' && Object.keys(item).forEach(key => {
      item[key] = item[key] !== null ? item[key] : ''
    })
    return `
      <tr>
        <td><input type="checkbox"></td>
        <td>${index + 1}</td>
        <td>${item.order_no}</td>
        <td>${item.batch}</td>
        <td>${item.stowage_quantity}</td>
        <td>${item.weight}</td>
        <td>${item.product_name}</td>
        <td>${item.special_order_code}</td>
        <td>${item.special_order_code}</td>
        <td>${item.departure_code}-${item.destination_code}</td>
        <td>${item.status}</td>
        <td>${item.first_manifest_name}</td>
      </tr>`
    }
  ).join('')
  $('.manifest_detail_table').html(str)
}

let searchManifestList = (type) => {
  getManifestParams = {
    flight_no: $('.manifest .no_2').val() + $('.manifest .num_4').val(),
    departure_code: $('.manifest .departure_code').val(),
    destination_code: $('.manifest .destination_code').val(),
    plan_fry_date: $('.manifest .plan_flight_date').val(),
    type: type
  }
  
  LXHR.POST(getManifestUrl, getManifestParams).done(res => {
    if(res.status === 200){
      manifest_flight_id = res.data[0].flight_id
      render_manifest_table([res.data[0]])
      type ? render_end_manifest_detail_table(res.data[0].result) : render_first_manifest_detail_table(res.data[0].result)
    }
  })
}

$('.manifest .btn-search').on('click', function (evt) {
  searchManifestList($(this).data('type'))
})

// 配载订舱列表点击生成初舱单===============================================================================
$('.stowage_booking_list .create_first_manifest_btn').on('click', function () {
  saveFirstManifestParams.flight_id = flight_id
  saveFirstManifestParams.order_nos = Array.from( $('.StowageOrderList_table').find('input:checked') ).map(item => {
    return $(item).data('order')
  })

  let cancelStowageList = Array.from( $('.StowageOrderList_table').find('input:checked') ).map(item => {
    $(item).data('info').ischecked = true
    return $(item).data('info')
  })

  var {flight_no, departure_code, destination_code, plan_fry_date} = getStowageOrderListByFlight_params
  $('.manifest .no_2').val(flight_no.slice(0,2))
  $('.manifest .num_4').val(flight_no.slice(2,6))
  $('.manifest .departure_code').val(departure_code)
  $('.manifest .destination_code').val(destination_code)
  $('.manifest .plan_flight_date').val(plan_fry_date)

  flight_id && LXHR.POST(saveFirstManifestUrl, JSON.stringify(saveFirstManifestParams), {contentType: 'application/json'}).done(res => {
    if(res.status === 200){
      LALERT.success('生成初舱单成功')
      manifest_flight_id = res.data[0].flight_id
      $('.manifest .no_2').val() && render_first_manifest_detail_table(res.data[0].result)
    }else{
      LALERT.msg(res.message)
    }
  })
})

// 生成终舱单 ==============================================================================================
const manifestTypeUpdateUrl = baseUrl + '/def/output/manifest/manifestTypeUpdate'

$('.manifest .create_end_manifest_btn').on('click', function () {
  manifest_flight_id && LXHR.POST(manifestTypeUpdateUrl, {flight_id: manifest_flight_id, type:1}).done(res => {
    if(res.status === 200){
      LALERT.success('生成终舱单成功')
      render_end_manifest_detail_table(res.data[0].result)
    }else{
      LALERT.msg(res.message)
    }
  })
})
