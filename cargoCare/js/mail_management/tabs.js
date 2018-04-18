
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

  $('.d_net_volume').on('keyup', function (evt) {
    if(evt.keyCode === 13){
      gotoVolume()
      getVolumeInfo()
    }
  })
})()

// 出发/到达信息=============================================================================================
;(function(){
  // 出发信息================================================================================================
  const getStartUrl = baseUrl + '/def/receive/getStart/'

  // 渲染出发信息表格
  let render_start_info_table = data => {
    let str = data.map((item, index) => `
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
        <td>
          <button class="ui medium orange button service_record_save" data-order=${item.order_no}>保存</button>
          <button class="ui medium teal button" data-order=${item.order_no}>编辑</button>
          <button class="ui medium red button" data-order=${item.order_no}>删除</button>
        </td>
      </tr>`
    ).join('')
    $('.start_info_table').html(str)
  }

  // 获取出发情况
  let getStartInfo = () => {
    LXHR.POST(getStartUrl, {"order_no": pageInfo.edit_order_no}).done(res => {
      if(res.status === 200){
        render_start_info_table(res.data)
      }
    })
  }

  // 客服记录 ======================================================================================================
  
  // 获取客服情况
  let getServiceInfo = () => {
    const queryCustServiceRecordUrl = baseUrl + '/def/service/queryCustServiceRecord/'
    if(!customInfo.customList.length){
      pageInfo.isEdit ? LXHR.POST(queryCustServiceRecordUrl, {"order_no": pageInfo.order_no, cust_service_type: pageInfo.type}).done(res => {
        if(res.status === 200){
          customInfo.change(res.data)
        }
      }) : customInfo.change()
    }
  }

  // 切换到出发、到达信息选项卡=================================================================================
  $('.tabNav .start_arrival').on('click',function(){
    pageInfo.order_no && getStartInfo()
    arriveInfo.change(pageInfo.order_no)
    getServiceInfo()
  })

  $('.d_service_record').on('keyup', function(evt){
    if(evt.keyCode === 13){
      gotoStartArrive()
      getServiceInfo()
    }
  })
})()

// 相关航班信息==============================================================================================
;(function(){
  // 获取订舱情况
  const getBookingUrl = baseUrl + '/def/output/booking/getBookingByOrder'
  let render_booking_info_table = data => {
    let str = data.map((item, index) => `
      <tr>
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
    ).join('')
    $('.booking_info_table').html(str)
  }

  let getBookingInfo = () => {
    let order_no = pageInfo.edit_order_no
    order_no && LXHR.POST(getBookingUrl, {order_no}).done(res => {
      if(res.status === 200){
        render_booking_info_table(res.data)
      }else{
        LALERT.msg(res.message)
      }
    })
  }

  $('.relate_flight_info_tab').on('click', function () {
    getBookingInfo()
  })

  $('.d_expected_flight_time').on('keyup', function (evt) {
    if(evt.keyCode === 13){
      gotoRelateFlight()
      getBookingInfo()
    }
  })
})()