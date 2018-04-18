/**
 * 配载订舱列表
 */

checkAction('.stowage_booking_list')

$('.stowage_booking_list .btn-search').click(function(){
  searchStowageOrderList()
})

// 修改配载订舱 ============================================================================================
let getEditHtml = (obj) => {
  let str = '<div class="checked_wrap ui mini form">'
  str += `<div class="row">
            <div class="three fields">
              <div class="field relative">
                <label>原订舱航班</label>
                <div class="two fields relative">
                  <div class="six wide field paddingLeft0">
                    <input type="text" placeholder="二字代码" readonly value=${obj.flight_no.slice(0, 2)}>
                  </div>
                  <span class="dateSymbol">-</span>
                  <div class="ten wide field">
                    <input type="text" readonly placeholder="四位数字" value=${obj.flight_no.slice(2, 6)}>
                  </div>
                </div>
              </div>
              <div class="field relative">
                <label>日期</label>
                <input type="text" readonly placeholder="格式为20171231" value=${obj.plan_fry_date}>
              </div>
              <div class="field relative">
                <label>航段</label>
                <div class="two fields relative">
                  <div class="six wide field paddingLeft0">
                    <input type="text" readonly placeholder="起始地点三字码" value=${obj.departure_code}>
                  </div>
                  <span class="dateSymbol">-</span>
                  <div class="ten wide field">
                    <input type="text" readonly placeholder="结束地点三字码" value=${obj.destination_code}>
                  </div>
                </div>
              </div>
            </div>
          </div>`

  str += `<div class="row editStowage">
            <div class="three fields">
              <div class="field relative">
                <label>改变订舱航班</label>
                <div class="two fields relative">
                  <div class="six wide field paddingLeft0">
                    <input type="text" class="flight_no_2" placeholder="二字代码">
                  </div>
                  <span class="dateSymbol">-</span>
                  <div class="ten wide field">
                    <input type="text" class="flight_no_4" placeholder="四位数字">
                  </div>
                </div>
              </div>
              <div class="field relative">
                <label>日期</label>
                <input type="text" class="plan_fry_date" placeholder="格式为20171231">
              </div>
              <div class="field relative">
                <label>航段</label>
                <div class="two fields relative">
                  <div class="six wide field paddingLeft0">
                    <input type="text" class="departure_code toUpper" placeholder="起始地点三字码">
                  </div>
                  <span class="dateSymbol">-</span>
                  <div class="ten wide field">
                    <input type="text" class="destination_code toUpper" placeholder="结束地点三字码">
                  </div>
                </div>
              </div>
            </div>
          </div>`
  str += '</div>'
  return str

}

let getEditParams = () => {
  let list = getCheckedData('.StowageOrderList_table').map(item => item.order_no)
  return {
    flight_no: $('.editStowage .flight_no_2').val() + $('.editStowage .flight_no_4').val(),
    plan_fry_date: $('.editStowage .plan_fry_date').val(),
    departure_code: $('.editStowage .departure_code').val(),
    destination_code: $('.editStowage .destination_code').val(),
    order_nos: list,
  }
}

let editStowage = () => {
  let url = baseUrl + '/def/output/stowage/saveStowageBookingUpdate'
  let params = getEditParams()
  LXHR.POST(url, JSON.stringify(params), {contentType: 'application/json'}).done(res => {
    if(res.status === 200) {
      layer.closeAll()
      LALERT.success('改变成功')
      
      now_Flight_Info = getEditParams()
      fillList()
      searchStowageOrderList()
    }else{
      LALERT.msg(res.message)
    }
  })
}

$('.edit_stowage_btn').click(function () {
  let data = getCheckedData('.StowageOrderList_table')
  data.length ?
  layer.open({
    type: 1,
    title: '改变配载订舱',
    area: ['800px', '350px'],
    btn: ['确认', '取消'],
    content: getEditHtml(getListParams()),
    yes: function(){
      editStowage()
    },
  })
  :
  LALERT.msg('请选择')
})

// 取消配载订舱 ===========================================================================================
let cancelData = []
let getCancelHtml = (data) => {
  let trs = data.map((item, index) => {
    return `
      <tr class="table-item">
        <td>${index + 1}</td>
        <td>${item.order_no}</td>
        <td>${item.batch}</td>
        <td>${item.stowage_quantity}</td>
        <td>${item.weight}</td>
        <td>${item.product_name}</td>
        <td>${item.departure_code}</td>
        <td>${item.destination_code}</td>
        <td><input type="text" class="inputHeight20px cancel_reason" data-index="${index}"></td>
      </tr>`
    }
  ).join('')

  let str = '<div class="checked_wrap ui mini form">'
  str += `
  <table class="ui celled table selled w_table marginbottom20">
    <thead>
      <tr>
        <th>序号</th>
        <th>运单号</th>
        <th>批次</th>
        <th>件数</th>
        <th>重量</th>
        <th>品名</th>
        <th>起始</th>
        <th>终到</th>
        <th>取消原因</th>
      </tr>
    </thead>
    <tbody class="StowageOrderList_table">
      ${trs}
    </tbody>
  </table>
    `

  str += `<div class="ui checked checkbox is_same marginbottom20">
            <input type="checkbox">
            <label>取消原因是否一致</label>
          </div>
          <div class="row all_cancel_reason_wrap" style="display:none">
            <div class="fields">
              <div class="sixteen wide field">
                <label>取消原因</label>
                <textarea rows="2" class="all_cancel_reason"></textarea>
              </div>
            </div>
          </div>
          `
  str += '</div>'
  return str
}

let getCancelParams = () => {
  let isSame = $('.is_same').checkbox('is checked')
  let list = !isSame ? 
  cancelData.map(item => {
    return {
      id: item.id,
      cancel_reason: item.cancel_reason,
    }
  })
  :
  cancelData.map(item => {
    return {
      id: item.id,
      cancel_reason: $('.all_cancel_reason').val(),
    }
  })

  return {
    flight_id: pageInfo.flight_id,
    list: list,
  }
}

let cancelStowage = () => {
  let url = baseUrl + '/def/output/stowage/saveStowageBookingCancel'
  let params = getCancelParams()

  LXHR.POST(url, JSON.stringify(params), {contentType: 'application/json'}).done(res => {
    if(res.status === 200){
      layer.closeAll()
      LALERT.success('取消成功')
      searchStowageOrderList()
    }else{
      LALERT.msg(res.message)
    }
  })
}

$('body').on('click', '.is_same', function () {
  if($(this).checkbox('is checked')) {
    $('.all_cancel_reason_wrap').show()
    $('.all_cancel_reason').focus()
  }else {
    $('.all_cancel_reason_wrap').hide()
  }
})

$('body').on('change', '.cancel_reason', function () {
  let index = $(this).data('index')
  cancelData[index].cancel_reason = $(this).val()
})

$('.cancel_stowage_btn').click(function () {
  let data = getCheckedData('.StowageOrderList_table')
  cancelData = data
  data.length ?
  layer.open({
    type: 1,
    title: '取消配载订舱',
    area: ['800px', '350px'],
    btn: ['确认', '取消'],
    content: getCancelHtml(data),
    yes: function(){
      cancelStowage()
    },
  })
  :
  LALERT.msg('请选择')
})