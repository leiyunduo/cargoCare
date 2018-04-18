/**
 * CostInfo V0.1
 * by:salen
 */

class CostInfo {
  constructor() {
    this.costList = []
    this.isInit = false
  }

  init(el) {
    if(this.isInit){
      return
    }
    this.isInit = true
    this.el = $(el)
    this.change()
    this.event()
  }

  change(costList=[]) {
    this.costList = costList
    this.index = 0
    this.nowEdit = null
    this.sumAbsCost = ''
    this.sumActCost = ''
    this.countSumCost()
    this.render()
  }

  render() {
    let str = this.costList.map((item, index) => {
      typeof item === 'object' && Object.keys(item).forEach(key => {
        item[key] = item[key] !== null ? item[key] : ''
      })

      return `
        <tr class="info-item">
          <td>${index + 1}</td>
          <td><input type="text" class="ipt cost_name" value="${item.cost_name}"></td>
          <td><input type="text" class="ipt payer" value="${item.payer}"></td>
          <td><input type="text" class="ipt payee" value="${item.payee}"></td>
          <td><input type="text" class="ipt relevance_name" value="${item.relevance_name}"></td>
          <td><input type="text" class="ipt invoice_price" value="${item.invoice_price}"></td>
          <td>
            <div class="ui dropdown selection invoice_choice_way ipt">
              <input type="hidden" value="${item.invoice_choice_way}">
              <div class="default text">${item.invoice_choice_way ? '四舍五入' : '实际'}</div>
              <i class="dropdown icon"></i>
              <div class="menu">
                <option class="item" data-value="0">实际</option>
                <option class="item" data-value="1">四舍五入</option>
              </div>
            </div>
          </td>
          <td><input type="text" class="ipt absolute_cost" value="${item.absolute_cost}"></td>
          <td><input type="text" class="ipt actual_cost" value="${item.actual_cost}"></td>
          <td>
            <div class="ui dropdown selection is_lock ipt">
              <input type="hidden" value="${item.is_lock ? item.is_lock : 0}">
              <div class="default text">${item.is_lock ? '锁定' : '未锁定'}</div>
              <i class="dropdown icon"></i>
              <div class="menu">
                <option class="item" data-value="0">未锁定</option>
                <option class="item" data-value="1">锁定</option>
              </div>
            </div>
          </td>
          <td><input type="text" class="ipt remark" value="${item.remark}"></td>
          <td><input type="text" class="ipt" value=""></td>
          <td>
            <button class="ui medium red button deleteCostInfo" data-index=${index}>删除</button>
          </td>
        </tr>`
    }
    ).join('')
    str += `
            <tr class="insertCostInfo">
              <td>输入</td>
              <td><input type="text" class="ipt cost_name" value=""></td>
              <td><input type="text" class="ipt payer" value=""></td>
              <td><input type="text" class="ipt payee" value=""></td>
              <td><input type="text" class="ipt relevance_name" value=""></td>
              <td><input type="text" class="ipt invoice_price" value=""></td>
              <td>
                <div class="ui dropdown selection invoice_choice_way">
                  <input type="hidden" value="0">
                  <div class="default text">实际</div>
                  <i class="dropdown icon"></i>
                  <div class="menu">
                    <option class="item" data-value="0">实际</option>
                    <option class="item" data-value="1">四舍五入</option>
                  </div>
                </div>
              </td>
              <td><input type="text" class="ipt absolute_cost" value=""></td>
              <td><input type="text" class="ipt actual_cost" value=""></td>
              <td>
                <div class="ui dropdown selection is_lock">
                  <input type="hidden" value="0">
                  <div class="default text">未锁定</div>
                  <i class="dropdown icon"></i>
                  <div class="menu">
                    <option class="item" data-value="0">未锁定</option>
                    <option class="item" data-value="1">锁定</option>
                  </div>
                </div>
              </td>
              <td><input type="text" class="ipt remark" value=""></td>
              <td><input type="text" class="ipt min_cost" value=""></td>
              <td>
                <button class="ui medium red button">删除</button>
              </td>
            </tr>
            <tr class="sum">
            <td>总计</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>${this.sumAbsCost}</td>
            <td>${this.sumActCost}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
            `

    this.el.html(str)
    this.el.find('.ui.dropdown').dropdown()
    $('.insertCostInfo .cost_name').focus()
  }

  insertCost() {
    this.costList.push({
      cost_name: $('.insertCostInfo .cost_name').val(),
      payer: $('.insertCostInfo .payer').val(),
      payee: $('.insertCostInfo .payee').val(),
      relevance_id: '',
      relevance_name: $('.insertCostInfo .relevance_name').val(),
      invoice_price: $('.insertCostInfo .invoice_price').val(),
      invoice_choice_way: $('.insertCostInfo .invoice_choice_way').dropdown('get value'),
      absolute_cost: $('.insertCostInfo .absolute_cost').val(),
      actual_cost: $('.insertCostInfo .actual_cost').val(),
      is_lock: $('.insertCostInfo .is_lock').dropdown('get value'),
      remark: $('.insertCostInfo .remark').val(),
      is_sys_cost: 1,
      related_type: 0,
    })
    this.countSumCost()
    this.render()
  }

  deleteCost() {
    this.costList.splice(this.index, 1)
    this.countSumCost()
    this.render()
  }

  editCost() {
    let nowParent = this.nowEdit
    let nowIndex = nowParent.index()
    let nowData = {
      cost_name: nowParent.find('.cost_name').val(),
      payer: nowParent.find('.payer').val(),
      payee: nowParent.find('.payee').val(),
      relevance_id: '',
      relevance_name: nowParent.find('.relevance_name').val(),
      invoice_price: nowParent.find('.invoice_price').val(),
      invoice_choice_way: nowParent.find('.invoice_choice_way').dropdown('get value'),
      absolute_cost: nowParent.find('.absolute_cost').val(),
      actual_cost: nowParent.find('.actual_cost').val(),
      is_lock: nowParent.find('.is_lock').dropdown('get value'),
      remark: nowParent.find('.remark').val(),
      is_sys_cost: this.costList[nowIndex].is_sys_cost,
      related_type: this.costList[nowIndex].related_type,
    }
    this.costList[nowIndex] = nowData
    this.countSumCost()
    this.render()
  }

  countSumCost() {
    this.sumAbsCost = this.costList.reduce((a, b) => {
      return Decimal.add([a, b.absolute_cost]).toNumber()
    }, 0)

    this.sumActCost = this.costList.reduce((a, b) => {
      return Decimal.add([a, b.actual_cost]).toNumber()
    }, 0)

    let ac = this.sumAbsCost * 1
    let tc = this.sumActCost * 1
    $('.d_min_total_cost').val(ac ? ac : '')
  }

  event() {
    let This = this
    This.el.on('keyup', '.min_cost', function (evt) {
      if(evt.keyCode === 13){
        This.insertCost()
      }
    })

    This.el.on('click', '.deleteCostInfo', function (evt) {
      This.index = $(this).data('index')
      This.deleteCost()
    })

    This.el.on('change', '.info-item .ipt', function (evt) {
      This.nowEdit = $(this).parent().parent()
      This.editCost()
    })
  }
}