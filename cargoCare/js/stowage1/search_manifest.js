/**
 * 查询初舱单、终舱单
 */

let render_manifest_table = data => {
  let str = [data].map((item, index) => {
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
        <td></td>
      </tr>`
    }
  ).join('')
  $('.manifest_detail_table').html(str)
}

let getFirstManifestParams = () => {
  return {
    flight_no: $('.begin .no_2').val() + $('.begin .num_4').val(),
    departure_code: $('.begin .departure_code').val(),
    destination_code: $('.begin .destination_code').val(),
    plan_fry_date: $('.begin .plan_flight_date').val(),
    type: 0,
  }
}

let getEndManifestParams = () => {
  return {
    flight_no: $('.end .no_2').val() + $('.end .num_4').val(),
    departure_code: $('.end .departure_code').val(),
    destination_code: $('.end .destination_code').val(),
    plan_fry_date: $('.end .plan_flight_date').val(),
    type: 1,
  }
}

let searchManifest = (type) => {
  let url = baseUrl + '/def/output/manifest/getFirstManifestByFlight'
  let params = type ? getEndManifestParams() : getFirstManifestParams()

  LXHR.POST(url, params).done(res => {
    if(res.status === 200){
      pageInfo.flight_id = res.data[0].flight_id
      render_manifest_table(res.data[0])
      type ? render_end_manifest_detail_table(res.data[0].result) : render_first_manifest_detail_table(res.data[0].result)
    }
  })
}