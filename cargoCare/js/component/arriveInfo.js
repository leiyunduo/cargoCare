/**
 * ArriveInfo V0.1
 * by:salen
 */

class ArriveInfo {
  constructor() {
    this.arriveList = []
    this.isInit = false
  }

  init(el, baseUrl) {
    if(this.isInit){
      return
    }
    this.isInit = true
    this.real_name = Store.getStore('real_name')
    this.baseUrl = baseUrl
    this.getUrl = this.baseUrl + '/def/receive/getArrive/'
    this.insertUrl = this.baseUrl + '/def/receive/insertArrive/'
    this.deleteUrl = this.baseUrl + '/def/receive/deleteArrive/'
    this.editUrl = this.baseUrl + '/def/receive/editArrive/'
    this.arriveList = []
    this.el = $(el)
    this.render()
    this.change()
    this.event()
  }

  change(order_no='') {
    this.order_no = order_no
    this.nowEdit = null
    this.getArrive()
  }

  render() {
    let str = this.arriveList.map((item, index) => {
      typeof item === 'object' && Object.keys(item).forEach(key => {
        item[key] = item[key] !== null ? item[key] : ''
      })

      return `
        <tr class="info-item" data-id=${item.id}>
          <td>${index+1}</td>
          <td>
            <input type="text" name="" class="sign_person ipt" value="${item.sign_person}">
          </td>
          <td>
            <input type="text" name="" class="sign_quantity ipt" value="${item.sign_quantity}">
          </td>
          <td>
            <input type="text" name="" class="sign_time ipt" value="${item.sign_time.slice(0, 16)}">
          </td>
          <td>
            <input type="text" name="" class="sign_remark ipt" value="${item.sign_remark}">
          </td>
          <td>${item.update_person}</td>
          <td>${item.update_time && item.update_time.slice(0, 16)}</td>
          <td>
            <button class="ui medium red button deleteArrivalInfo" data-order=${item.order_no} data-id=${item.id}>删除</button>
          </td>
        </tr>`
      }
    ).join('')
    str += `<tr class="insertArriveInfo">
              <td>输入</td>
              <td><input type="text" name="" class="sign_person"></td>
              <td><input type="text" name="" class="sign_quantity"></td>
              <td><input type="text" name="" class="sign_time"></td>
              <td><input type="text" name="" class="sign_remark insert"></td>
              <td>${this.real_name}</td>
              <td></td>
              <td>
                <button class="ui medium red button">删除</button>
              </td>
            </tr>`
    this.el.html(str)
    $('.insertArriveInfo .sign_person').focus()
  }

  getArrive() {
    this.order_no && LXHR.POST(this.getUrl, {"order_no": this.order_no}).done(res => {
      if(res.status === 200){
        this.arriveList = res.data
        this.render()
      }else{
        LALERT.msg(res.message)
      }
    })
  }

  reset() {
    this.arriveList = []
    this.render()
  }

  insertArrive() {
    let insertArriveParams = {
      order_no: this.order_no,
      sign_person: $('.insertArriveInfo .sign_person').val(),
      sign_quantity: $('.insertArriveInfo .sign_quantity').val(),
      sign_time: $('.insertArriveInfo .sign_time').val(),
      sign_remark: $('.insertArriveInfo .sign_remark').val(),
      update_person: this.real_name,
    }
  
    if(this.order_no){
      LXHR.POST(this.insertUrl, insertArriveParams).done(res => {
        this.getArrive()
      })
    }else{
      LALERT.msg('请先输入单号')
    }
  }

  deleteArrive() {
    LXHR.POST(this.deleteUrl, {id: this.id}).done(res => {
      this.getArrive()
    })
  }

  editArrive() {
    let editArriveParams = {
      id: this.nowEdit.data('id'),
      sign_person: this.nowEdit.find('.sign_person').val(),
      sign_quantity: this.nowEdit.find('.sign_quantity').val(),
      sign_time: this.nowEdit.find('.sign_time').val(),
      sign_remark: this.nowEdit.find('.sign_remark').val(),
    }
  
    LXHR.POST(this.editUrl, editArriveParams).done(res => {
      this.getArrive()
    })
  }

  event() {
    let This = this
    This.el.on('keyup', '.insert', function (evt) {
      if(evt.keyCode === 13){
        This.insertArrive()
      }
    })

    This.el.on('click', '.deleteArrivalInfo', function (evt) {
      This.id = $(this).data('id')
      This.deleteArrive()
    })

    This.el.on('change', '.info-item .ipt', function () {
      This.nowEdit = $(this).parent().parent()
      This.editArrive()
    })
  }
}