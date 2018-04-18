/**
 * CustomInfo V0.1
 * by:salen
 */

class CustomInfo {
  constructor() {
    this.customList = []
    this.isInit = false
  }

  init(el) {
    if(this.isInit){
      return
    }
    this.isInit = true
    this.real_name = Store.getStore('real_name')
    this.el = $(el)
    this.change()
    this.event()
  }

  change(customList) {
    this.customList = customList || []
    this.index = 0
    this.nowEdit = null
    this.render()
    this.writeService()
  }

  render() {
    let str = this.customList.map((item, index) => {
      typeof item === 'object' && Object.keys(item).forEach(key => {
        item[key] = item[key] !== null ? item[key] : ''
      })
      
      return `
        <tr class="info-item">
          <td>${index+1}</td>
          <td>已客服</td>
          <td>
            <input type="text" name="" class="service_record_content ipt" value="${item.content}">
          </td>
          <td>${item.entry_person}</td>
          <td>${formatTime(item.entry_time)}</td>
          <td>
            <button class="ui medium red button deleteServiceInfo" data-index=${index}>删除</button>
          </td>
        </tr>`
      }
    ).join('')
    str += `<tr class="insertServiceInfo">
              <td>输入</td>
              <td>未客服</td>
              <td><input type="text" name="" class="insert"></td>
              <td>${this.real_name}</td>
              <td></td>
              <td>
                <button class="ui medium red button">删除</button>
              </td>
            </tr>`
    this.el.html(str)
    this.el.find('.dropdown').dropdown()
    $('.insertServiceInfo .insert').focus()
  }

  writeService() {
    let detail_service_record = this.customList.map(item => {
      return item.content
    }).join('; ')
    $('.detail_service_record').val(detail_service_record)
  }

  insertCustom() {
    let item = {
      order_no: pageInfo.edit_order_no,
      state: 1,
      stateText: '已客服',
      content: $('.insertServiceInfo .insert').val(),
      entry_person: this.real_name,
      entry_time: getTime(),
    }

    if(!item.content) {
      LALERT.msg('请输入内容')
      return
    }

    this.customList.push(item)
    this.render()
    this.writeService()
    $('.insertServiceInfo .insert').focus()
  }

  deleteCustom() {
    this.customList.splice(this.index, 1)
    this.render()
    this.writeService()
  }

  editCustom() {
    let nowParent = this.nowEdit
    let nowIndex = nowParent.index()
    let nowData = {
      order_no: pageInfo.edit_order_no,
      cust_service_type: this.type,
      state: nowParent.find('.service_record_state').dropdown('get value'),
      stateText: $('.insertServiceInfo .service_record_state').dropdown('get text'),
      content: nowParent.find('.service_record_content').val(),
      entry_time: getTime(),
    }
    this.customList[nowIndex] = nowData
    this.render()
    this.writeService()
  }

  event() {
    let This = this
    This.el.on('keyup', '.insert', function (evt) {
      evt.keyCode === 13 && This.insertCustom()
    })

    This.el.on('click', '.deleteServiceInfo', function (evt) {
      This.index = $(this).data('index')
      This.deleteCustom()
    })

    This.el.on('change', '.info-item .ipt', function (evt) {
      This.nowEdit = $(this).parent().parent()
      This.editCustom()
    })
  }
}