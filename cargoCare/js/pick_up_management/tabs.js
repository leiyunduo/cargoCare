
// 开单费用=====================================================================================================
;(function(){
  let getCostParams = () => {
    return {
      type: pageInfo.type,                                                                // 单据类型
      weight: $('.d_weight').val(),                                                       // 计重
      quantity: $('.d_quantity').val(),                                                   // 件数
      delivery_mode: $('.d_delivery_mode').dropdown('get value'),  	                      // 提货方式
      transport_method: $('.d_transport_mode').dropdown('get value'),                     // 到达/运输方式
      sender_code: $('.d_sender_code').val(),                                             // 发货人代码
      sender_name: $('.d_sender_name').val(),	                                            // 发货人中文名
      association_point_code: $('.d_association_point_code').val(),
      association_point_name: $('.d_association_point_name').val(),
      area_code: $('.d_area_code').val(),	                                                // 区域
      area_name: $('.d_area_name').val(),
      receiver_code: $('.d_receiver_code').val(),	                                        // 收货人代码
      receiver_name: $('.d_receiver_name').val(),	                                        // 收货人名称
      product_category_code: $('.d_product_category_code').val(),
      product_category_name: $('.d_product_category_name').val(),
      storeroom: $('.d_storeroom_name').val(),	                                          // 库房
    }
  }

  let getCostInfo = () => {
    const url= baseUrl + '/def/pick_up/getCostItem'

    let params = getCostParams()
    let mainParams = {
      avg_weight: '',
      product_code: $('.d_product_code').val(),                                           // 商品代码
      product_name: $('.d_product_name').val(),                                           // 品名
    }
  
    let subParams = {
      customer_category_code: '',
      customer_category_name: '',
    }
  
    params = !!pageInfo.type ? Object.assign(params, subParams) : Object.assign(params, mainParams)

    if(!costInfo.costList.length){
      LXHR.POST(url, params).done(res => {
        if(res.status === 200){
          costInfo.change(res.data[0].result)
        }
      })
    }
  }

  $('.tabNav .cost').on('click', function () {
    getCostInfo()
  })

  $('.d_min_total_cost').on('keyup', function (evt) {
    if(evt.keyCode === 13){
      getCostInfo()
      gotoCost()
    }
  })
})()

// 出发/到达信息=================================================================================================
;(function(){
  // 到达信息 ================================================================================================
  const getArriveUrl = baseUrl + '/def/pick_up/getArrive/'

  // 渲染到达信息表格
  let render_arrival_info_table = data => {
    let str = data.map((item, index) => {
      typeof item === 'object' && Object.keys(item).forEach(key => {
        item[key] = item[key] !== null ? item[key] : ''
      })

      return `
        <tr class="info-item">
          <td>${index+1}</td>
          <td>${item.order_no}</td>
          <td>${item.flight_no}</td>
          <td>${item.departure}</td>
          <td>${item.destination}</td>
          <td>${item.product_category_name}</td>
          <td>${item.air_transit}</td>
          <td>${item.is_nonstop}</td>
          <td>${item.is_batch}</td>
          <td>${item.quantity}</td>
          <td>${item.net_weight}</td>
          <td>${item.arrive_weight}</td>
          <td>${item.arrive_quantity}</td>
          <td>${item.actual_fry_date}</td>
          <td>${item.actual_fry_time}</td>
          <td>${item.actual_drop_date}</td>
          <td>${item.actual_drop_time}</td>
          <td>${item.arrive_state}</td>
          <td>${item.transport_mode}</td>
          <td>${item.remark}</td>
          <td>${item.update_person}</td>
        </tr>`
      }
    ).join('')
    $('.arrival_info_table').html(str)
  }

  // 获取到达情况
  let getArriveInfo = () => {
    LXHR.POST(getArriveUrl, {"order_no": pageInfo.order_no, flight_time: pageInfo.flight_time, flight_no: pageInfo.flight_no}).done(res => {
      if(res.status === 200){
        render_arrival_info_table(res.data)
        pageInfo.arrive_record = res.data[0] && res.data[0].arrive_state
      }
    })
  }

  // 切换到出发、到达信息选项卡=================================================================================
  $('.tabNav .start_arrival').on('click', function () {
    getArriveInfo()
  })

  $('.d_service_record').on('keyup', function(evt){
    if(evt.keyCode === 13){
      gotoStartArrive()
    }
  })
})()


