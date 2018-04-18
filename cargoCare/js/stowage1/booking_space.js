/**
 * 配载订舱
 */

// 全选行为
checkAction('.stowage_booking')

$('.booking-space-search').click(function(){
  searchOrderList()
})

// 确认配载==================================================================================================
let checkedData = []

let getCheckedHtml = (data) => {
  let trs = data.map((item, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${item.order_no}</td>
      <td class="_batch">${item.batch}</td>
      <td>
        <input type="text" class="inputHeight20px stowage_quantity" 
          value="${item.remain_quantity}"
          data-maxnum = "${item.remain_quantity}"
          data-index = "${index}"
          data-add = 1
          data-minu = 1
        >
      </td>
    </tr>`
  ).join('')

  let str = '<div class="checked_wrap">'
  str += `<table class="ui celled table selled w_table">
    <thead>
      <tr>
        <th>序号</th>
        <th>运单号</th>
        <th>批次号</th>
        <th>件数</th>
      </tr>
    </thead>
    <tbody class="checked_table_list">
      ${trs}
    </tbody>
  </table>`

  str += `
  <form class="ui form">
    <div class="ui mini form padding10-20 borderBnone">
      <div class="row">
        <div class="four fields">
          <div class="field relative">
            <label>航班号</label>
            <div class="two fields relative">
              <div class="six wide field paddingLeft0">
                <input type="text" class="two_flight_code toUpper" placeholder="二字代码">
              </div>
              <span class="dateSymbol left37">-</span>
              <div class="ten wide field">
                <input type="text" class="four_flight_num" placeholder="四位数字">
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
                <input type="text" class="departure_three_code toUpper" placeholder="始发站三字码">
              </div>
              <span class="dateSymbol left37">-</span>
              <div class="ten wide field">
                <input type="text" class="destination_three_code toUpper" placeholder="目的站三字码">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
  `
  str += '</div>'
  return str
}

let getStowageParams = () => {
  let list = checkedData.map(item => {
    return {
      order_no: item.order_no,
      batch: item.batch,
      stowage_quantity: item.remain_quantity,
    }
  })

  return {
    flight_no: $('.checked_wrap .two_flight_code').val() + $('.checked_wrap .four_flight_num').val(),
    plan_fry_date: $('.checked_wrap .plan_fry_date').val(),
    departure_code: $('.checked_wrap .departure_three_code').val(),
    destination_code: $('.checked_wrap .destination_three_code').val(),
    ccaMainSingleList: list,
  }
}

// 确认配载
let sureStowage = () => {
  let url = baseUrl + '/def/output/stowage/stowageBookingConfirm'
  let params = getStowageParams()

  LXHR.POST(url, JSON.stringify(params), {contentType: 'application/json'}).done(res => {
    if(res.status === 200){
      layer.closeAll()
      LALERT.success('配载订舱确认成功')
      searchOrderList()

      now_Flight_Info = getStowageParams()
      fillList()
      searchStowageOrderList()
      gotoList()
    }else{
      LALERT.msg(res.message)
    }
  })
}

$('body').on('change', '.checked_table_list .stowage_quantity', function () {
  let index= $(this).data('index')
  let nowVal = $(this).val()
  let maxVal = $(this).data('maxnum')
  let add  = $(this).data('add')
  let minu = $(this).data('minu')
  
  if( (nowVal > maxVal) && minu) {
    $(this).data('add', 1)
    LALERT.msg('超出剩余可配载件数,请重新输入')
    $(this).val(maxVal)
    --checkedData[index].batch
    $('._batch').eq(index).html(checkedData[index].batch)
    $(this).data('minu', 0)
  }else if((nowVal < maxVal) && add) {
    $(this).data('minu', 1)
    checkedData[index].remain_quantity = $(this).val()
    ++checkedData[index].batch
    $('._batch').eq(index).html(checkedData[index].batch)
    $(this).data('add', 0)
  }else if((nowVal == maxVal) && minu){
    $(this).data('add', 1)
    --checkedData[index].batch
    $('._batch').eq(index).html(checkedData[index].batch)
    $(this).data('minu', 0)
  }
})

$('.stowage_booking_sure_btn').on('click', function () {
  checkedData = getCheckedData('.stowage_booking_table')
  checkedData.length ?
  layer.open({
    type: 1,
    title: '配载订舱确认',
    area: ['auto', '460px'],
    btn: ['确认', '取消'],
    content: getCheckedHtml(checkedData),
    yes: function(){
      sureStowage()
    },
  })
  :
  LALERT.msg('请选择')
})