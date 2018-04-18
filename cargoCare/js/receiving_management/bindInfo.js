/**
 * BindInfo V0.1
 * by:salen
 */

 // TODO
 
;(function(){
  // 添加到已选单
  let addSelectedBill = (data) => {
    if(isRepeat(data)){
      LALERT.msg('该单已被选中')
    }else{
      selectedList.push(data) 
      renderSelectedBill(selectedList)
      removeAddFromSelect(data)
      $('.bind_order_code').val('')
      $('.bind_order_num').val('')
    }
  }

  // 按单号添加已选单
  let getAndAdd = () => {
    let url = baseUrl + '/def/receive/getOrderSeclected/'
    let params = {
      order_three_code: $('.bind_order_code').val(),
      order_num: $('.bind_order_num').val(),
    }

    LXHR.POST(url, params).done(res => {
      if(res.status === 200) {
        let d = res.data
        if(d.length){
          addSelectedBill(d[0])
        }else{
          LALERT.msg('该单号不存在')
        }
      }else{
        LALERT.msg(res.message)
      }
    })
  }
  
  $('.add_by_order').on('click', function () {
    getAndAdd()
  })

  $('.d_correspond_order_no').on('keyup', function (evt) {
    if(evt.keyCode === 13) {
      gotoBind()
      !selectList.length && getSelectBill($('.d_billing_location').val())
      !selectList.length && getSelectedBill()
      !selectList.length && $('.billingLocation').dropdown('set text', $('.d_billing_location').val())
    }
  })

  $('.tabNav .bind').on('click', function(){
    !selectList.length && getSelectBill($('.d_billing_location').val())
    !selectList.length && getSelectedBill()
    !selectList.length && $('.billingLocation').dropdown('set text', $('.d_billing_location').val())
  })

  // 查询可选数据
  $('.search_select_btn').on('click', function (evt) {
    let location = $('.billingLocation').dropdown('get value')
    getSelectBill(location)
  })

  // 获取选中的数据
  let getCheckedData = className => {
    return Array.from( $(className).find('input:checked') ).map(item => $(item).data('info'))
  }
 
  // 选中、取消选中
  $('.select_bill_table').on('click', '.table-item', function(evt){
    $(this).toggleClass('active')
    if( $(this).find(':checkbox').is(':checked') ){
      $(this).find(':checkbox').attr('checked', false)
    }else{
      $(this).find(':checkbox').attr('checked', true)
      selectList.forEach((item,index) => {
        if(item.order_no === $(this).data('info').order_no){
          selectList.splice(index, 1)
        }
      })
    }
  })

  $('.selected_bill_table').on('click', '.table-item', function(evt){
    $(this).toggleClass('active')
    if( $(this).find(':checkbox').is(':checked') ){
      $(this).find(':checkbox').attr('checked', false)
    }else{
      $(this).find(':checkbox').attr('checked', true)
      selectedList.forEach((item,index) => {
        if(item.order_no === $(this).data('info').order_no){
          selectedList.splice(index, 1)
        }
      })
    }
  })

  // 右移
  $('.selectBill').click(function () {
    let d = getCheckedData('.select_bill_table')
    selectedList = selectedList.concat(d)
    renderSelectedBill(selectedList)
    renderSelectBill(selectList)
  })

  // 左移
  $('.cancelSelectBill').click(function () {
    let d = getCheckedData('.selected_bill_table')
    selectList = selectList.concat(d)
    renderSelectedBill(selectedList)
    renderSelectBill(selectList)
  })
})()

class BindInfo {
  constructor() {
    this.isInit = false
  }

  init() {
    this.baseUrl = baseUrl
  }

  // 渲染开票地点
  renderBillingLocation() {
    let optionsStr = this.locationList.map(item => {
      return `<option class="item" data-value='${item}'>${item}</option>`
    }).join('')

    let str = `
              <input type="hidden">
              <div class="default text">${data[0]}</div>
              <i class="dropdown icon"></i>
              <div class="menu">
                ${optionsStr}
              </div>`

    $('.billingLocation').html(str)
    $('.billingLocation').dropdown()
  }

  // 渲染可选单
  renderSelectBill() {
    let str = this.selectList.map((item, index) => {
      typeof item === 'object' && Object.keys(item).forEach(key => {
        item[key] = item[key] !== null ? item[key] : ''
      })

      return `
      <tr class="table-item" data-info='${JSON.stringify(item)}'>
        <td class="checkbox-wrap">
          <input type="checkbox" data-info='${JSON.stringify(item)}'>
          <span class="checkbox-mask"></span>
        </td>
        <td>${index + 1}</td>
        <td>${item.order_no}</td>
        <td>${item.destination}</td>
        <td>${item.quantity}</td>
        <td>${item.net_weight}</td>
        <td>${item.joint_cargo_pieces}</td>
        <td>${item.sender}</td>
        <td>${item.ship_whereabouts}</td>
        <td>${item.product_name}</td>
        <td>${item.expected_flight_no}</td>
      </tr>
          `
    }).join('')

    $('.select_bill_table').html(str)
  }

  // 渲染已选单
  renderSelectedBill() {
    let orderStr = this.selectedList.map(item => item.order_no).join()
    $('.d_correspond_order_no').val(orderStr)

    let str = this.selectedList.map((item, index) => {
      typeof item === 'object' && Object.keys(item).forEach(key => {
        item[key] = item[key] !== null ? item[key] : ''
      })

      return `
      <tr class="table-item" data-info='${JSON.stringify(item)}'>
        <td class="checkbox-wrap">
          <input type="checkbox" data-info='${JSON.stringify(item)}'>
          <span class="checkbox-mask"></span>
        </td>
        <td>${index + 1}</td>
        <td>${item.order_no}</td>
        <td>${item.destination}</td>
        <td>${item.quantity}</td>
        <td>${item.net_weight}</td>
        <td>${item.volume}</td>
        <td>${item.sender}</td>
        <td>${item.update_person}</td>
      </tr>
          `
    }).join('')

    $('.selected_bill_table').html(str)
  }

  // 获取开票地点
  getLocation(locationList) {
    this.locationList = locationList
    this.renderBillingLocation()
  }
  
  // 获取可选单
  getSelect(selectList) {
    this.selectList = selectList
    this.removeRepeat()
    this.renderSelectBill()
  }

  // 获取已选单
  getSelected(selectedList) {
    this.selectedList = selectedList
    this.renderSelectedBill()
  }

  // 从查询到的可选单数据内去除已选单数据
  removeRepeat() {
    this.selectList = this.selectList.filter(item => {
      return this.selectedList.every(selected => selected.order_no !== item.order_no)
    })
  }

  // 检验要添加的单是否已经在已选单内
  isRepeat() {
    this.isRepeat = this.selectedList.some(item => item.order_no === this.addData.order_no) 
  }

  // 从可选单中去除要添加到已选单的数据
  removeAddFromSelect() {
    this.selectList.forEach((item, index) => {
      if(item.order_no === this.addData.order_no){
        this.selectList.splice(index, 1)
        this.renderSelectBill(this.selectList)
      }
    })
  }

  // 
}