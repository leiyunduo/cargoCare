// 渲染表格
let renderTable = (data, num) => {
  let str = data.map((item, index) => {
    typeof item === 'object' && Object.keys(item).forEach(key => {
      item[key] = item[key] !== null ? item[key] : ''
      if(key === 'air_transit'){
        if(typeof item[key] === 'number'){
          item[key] = item[key] ? '是' : '否'
        }
      }
    })
    return `
          <tr>
            <td>${(num - 1) * 10 + index + 1}</td>
            <td class="flexCenter padding0 ">
              <div class="roundBg borderRaidus redBg ">
                <i class="icon-loop margin-Left5" title="换单"></i>
              </div>
              <div class="roundBg borderRaidus greenBg btn-edit" data-order=${item.order_no}>
                <i class="edit icon margin-Left5" title="编辑"></i>
              </div>
              <div class="roundBg borderRaidus tealBg">
                <i class="icon-printer margin-Left5" title="打印"></i>
              </div>
            </td>
            <td>${item.order_no}</td>
            <td>${item.correspond_order_no}</td>
            <td>${item.expected_flight_time}</td>
            <td>${item.departure_code}</td>
            <td>${item.departure_name}</td>
            <td>${item.destination_code}</td>
            <td>${item.destination_name}</td>
            <td>${item.first_transfer_process}</td>
            <td>${item.air_transit}</td>
            <td>${item.sender_name}</td>
            <td>${item.receiver_name}</td>
            <td>${item.billing_location}</td>
            <td>${item.issuer}</td>
            <td>${item.billing_time.slice(0, 16)}</td>
            <td>${item.price_species_name}</td>
            <td>${item.quantity}</td>
            <td>${item.net_weight}</td>
            <td>${item.weight}</td>
            <td>${item.volume}</td>
            <td>${item.product_name}</td>
            <td>${item.product_category_code}</td>
            <td>${item.packaging}</td>
          </tr>`
        }
      ).join('')
  $('.table-list').html(str)
}

let getSearchParams = () => {
  return {
    order_three_code: $('.order_three_code').val(),
    order_num: $('.order_num').val(),
    order_no: $('.order_three_code').val() && $('.order_num').val() && $('.order_three_code').val() + $('.order_num').val(),
    departure_code: $('.main_departure_code').val(),
    customer_status: $('.customer_status').dropdown('get value'),
    billing_location: $('.billing_location').val(),
    billing_time_start: $('.billing_time_start').val(),
    billing_time_end: $('.billing_time_end').val(),
    currPage: 1
  }
}

let searchMainList = () => {
  // 请求地址
  const url = baseUrl + '/def/express/ca/pageQueryCA/'
  // 请求参数
  let params = getSearchParams()

  LXHR.POST(url, params).done( res => {
    if(res.status === 200){
      paginationMain.init('.pageBox', res.data[0], params, url, renderTable)
      renderTable(res.data[0].list, 1)
    }else{
      LALERT.msg(res.message)
    }
  })
}

// 发送请求
$('.btn-search').click(function(){
  searchMainList()
})