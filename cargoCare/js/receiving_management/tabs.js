
// 开单费用==================================================================================================
;(function(){
  $('.tabNav .cost').on('click', function () {
    getCostInfo()
  })
})()

// 体积 ====================================================================================================
;(function(){
  $('.detail_net_volume').on('keyup', function (evt) {
    if(evt.keyCode === 13){
      gotoVolume()
    }
  })
})()

// 出发/到达信息=============================================================================================
;(function(){
  // 出发信息================================================================================================
  const getStartUrl = baseUrl + '/def/receive/getStart/'

  // 渲染出发信息表格
  let render_start_info_table = data => {
    let str = data.map((item, index) => {
      typeof item === 'object' && Object.keys(item).forEach(key => {
        item[key] = item[key] !== null ? item[key] : ''
      })
        return `
        <tr>
          <td>${index+1}</td>
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
      }
    ).join('')
    $('.start_info_table').html(str)
  }

  // 获取出发情况
  let getStartInfo = () => {
    LXHR.POST(getStartUrl, {"order_no": pageInfo.order_no}).done(res => {
      if(res.status === 200){
        render_start_info_table(res.data)
      }
    })
  }

  // 切换到出发、到达信息选项卡=================================================================================
  $('.tabNav .start_arrival').on('click',function(){
    pageInfo.order_no && getStartInfo()
    arriveInfo.change(pageInfo.order_no)
  })

  $('.d_service_record').on('keyup', function(evt){
    if(evt.keyCode === 13){
      gotoStartArrive()
    }
  })
})()

// 相关航班信息==============================================================================================
;(function(){
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
      if(res.status === 200){
        render_booking_info_table(res.data)
      }else{
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

  $('.tabNav .relate_flight').on('click', function () {
    flightInfo.change(getFlightParams())
    getBookingInfo()
  })

  $('.d_expected_flight_time').on('keyup', function (evt) {
    if(evt.keyCode === 13){
      flightInfo.change(getFlightParams())
      gotoRelateFlight()
      getBookingInfo()
    }
  })
})()