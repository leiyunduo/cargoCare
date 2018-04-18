// 查询提货地点 ===============================================================================================
;(function(){
  const getPickLocationUrl = baseUrl + '/def/pick_up/getPickLocation'

  let renderPickLocation = data => {
    let optionsStr = '<option class="item" data-value="">全部</option>'
    optionsStr += data.map(item => {
      return `<option class="item" data-value='${item}'>${item}</option>`
    }).join('')

    let str = `
              <input type="hidden">
              <div class="default text">全部</div>
              <i class="dropdown icon"></i>
              <div class="menu">
                ${optionsStr}
              </div>`
    $('.pickLocation').html(str)
    $('.ui.dropdown.pickLocation').dropdown()
  }

  LXHR.POST(getPickLocationUrl).done(res => {
    if(res.status === 200) {
      renderPickLocation(res.data)
    }
  })
})()

// 按条件展示查询条件
$('.pick_state').on('change', function () {
  let val = $('.pick_state').dropdown('get value')*1
  if(!val){
    $('.pick_state_about').addClass('pick_hide')
  }else{
    $('.pick_state_about').removeClass('pick_hide')
  }
})

// 渲染表格
let render_table = (data, num) => {
  let str = data.map((item, index) => {
    let pick_up_state = item.pick_up_state
    typeof item === 'object' && Object.keys(item).forEach(key => {
      item[key] = item[key] !== null ? item[key] : ''
      if(key === 'state'){
        if(typeof item[key] === 'number'){
          if(pick_up_state){
            switch (true) {
              case item[key] === 0 :
                item[key] = '已提货'
              break;
              case item[key] === 1 :
                item[key] = '已派送'
              break;
              case item[key] === 2 :
                item[key] = '已中转'
              break;
              default: break;
            }
          }else{
            item[key] = item[key] ? '未提货' : '已录入'
          }
        }
      }

      if(key === 'transport_mode'){
        item[key] = '航空'
      }
    })
    return `
      <tr>
        <td>${(num - 1) * 10 + index + 1}</td>
        <td class="flexCenter padding0 ">
          <div class="roundBg borderRaidus greenBg btn-edit" 
            data-order='${item && item.order_no}' 
            data-sign='${item && item.sign_no}'
            data-id='${item && item.id}'
            data-state='${item && item.pick_up_state}'
          >
            <i class="edit icon margin-Left5" title="编辑"></i>
          </div>
          <div class="roundBg borderRaidus tealBg">
            <i class="icon-printer margin-Left5" title="打印"></i>
          </div>
        </td>
        <td>${item && item.arrive_record}</td>
        <td>${item && item.transport_mode}</td>
        <td>${item && pageInfo.type == 1 ? item.single_order_no : item.order_no}</td>
        <td>${item && pageInfo.type == 1 ? item.order_no : item.single_order_no}</td>
        <td>${item && item.state}</td>
        <td>${item && item.receiver_name}</td>
        <td>${item && item.receiver_telephone}</td>
        <td>${item && item.receiver_address}</td>
        <td>${item && item.sender_name}</td>
        <td>${item && item.product_name}</td>
        <td>${item && item.quantity}</td>
        <td>${item && item.net_weight}</td>
        <td>${item && item.departure_code}</td>
        <td>${item && item.departure_name}</td>
        <td>${item && item.destination_code}</td>
        <td>${item && item.destination_name}</td>
        <td>${item && item.agency_fund}</td>
      </tr>`
    }
  ).join('')
  $('.pick_up_table').html(str)
}

let getMainSearchParams = () => {
  return {
    order_three_code: $('.order_no_3').val(),
    order_num: $('.order_no_8').val(),
    keyboard_time_start: $('.start_date').val(),
    keyboard_time_end: $('.end_date').val(),
    pick_up_state: $('.pick_state').dropdown('get value'),
    pick_location: $('.main_pickLocation').dropdown('get value'),
    out_storeroom_state: $('.delivery_state').dropdown('get value'),
    signer_sms_notification: $('.signer_sms_notification').dropdown('get value'),
    cust_state: $('.cust_state').dropdown('get value'),
    delivery_mode: $('.delivery_mode').dropdown('get value'),
    type: pageInfo.type,
    currPage: 1,
  }
}

let getSubSearchParams = () => {
  return {
    single_order_code: $('.order_no_3').val(),
    single_order_num: $('.order_no_8').val(),
    keyboard_time_start: $('.start_date').val(),
    keyboard_time_end: $('.end_date').val(),
    pick_up_state: $('.pick_state').dropdown('get value'),
    pick_location: $('.main_pickLocation').dropdown('get value'),
    out_storeroom_state: $('.delivery_state').dropdown('get value'),
    signer_sms_notification: $('.signer_sms_notification').dropdown('get value'),
    cust_state: $('.cust_state').dropdown('get value'),
    delivery_mode: $('.delivery_mode').dropdown('get value'),    
    type: pageInfo.type,  
    currPage: 1,
  }
}

let getPickUpList = () => {
  let url = baseUrl + '/def/pick_up/getPickUpList' 
  let params = pageInfo.type ? getSubSearchParams() : getMainSearchParams()
  LXHR.POST(url, params).done(res => {
    if(res.status === 200){
      pagination.init('.pageBox', res.data[0], params, url, render_table)
      render_table(res.data[0].list, 1)
    }
  })
}

$('.btn_search').click(function () {
  getPickUpList()
})