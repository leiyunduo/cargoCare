/**
 * 现金流报表
 */

const pageInfo = {
  // baseUrl: 'http://192.168.1.107:8080/lxtd-cca-apis',
  baseUrl: 'http://47.93.90.229/test',
  recpayType: $('.cash_page').data('recpay'),   // 0 收款 1 付款
  deparrType: $('.cash_page').data('deparr'),   // 0 出发 1 到达
}

let {baseUrl} = pageInfo

let dropdownStr = (data, type) => {
  let optionsStr = `<option class="item" data-value=''>全部</option>`
  optionsStr += data.map(item => {
    return `<option class="item" data-value='${type ? item.id : item}'>${type ? item.name : item}</option>`
  }).join('')

  return `
        <input type="hidden" value="">
        <div class="default text">全部</div>
        <i class="dropdown icon"></i>
        <div class="menu">
          ${optionsStr}
        </div>`
}

// 获取提货地点 ===============================================================================================
;(function(){
  let url = baseUrl + '/def/pick_up/getPickLocation'
  pageInfo.deparrType && LXHR.POST(url).done(res => {
    if(res.status === 200) {
      $('.pick_location').html(dropdownStr(res.data))
      $('.ui.dropdown.pick_location').dropdown()
    }
  })
})()

// 获取收付款方式 =============================================================================================
;(function(){
  let getPayMethod = () => {
    let url = baseUrl + '/def/finance/getPayMethod'
    LXHR.POST(url).done(res => {
      if(res.status === 200) {
        $('.payMethod').html(dropdownStr(res.data, 1))
        $('.ui.dropdown.payMethod').dropdown()
      }
    })
  }
  getPayMethod()
})()

// 获取资金流向 ===============================================================================================
;(function(){
  let getClearUnit = () => {
    let url = baseUrl + '/def/finance/getClearUnitList'
    LXHR.POST(url, {departure_arrival_type: pageInfo.deparrType}).done(res => {
      if(res.status === 200) {
        $('.capital_flows').html(dropdownStr(res.data))
        $('.ui.dropdown.capital_flows').dropdown()
      }
    })
  }

  getClearUnit()
})()

// 获取收款人 ===============================================================================================
;(function(){
  let getOperator = () => {
    let url = baseUrl + '/def/finance/getOperatorList'
    LXHR.POST(url).done(res => {
      if(res.status === 200) {
        $('.operator').html(dropdownStr(res.data))
        $('.ui.dropdown.operator').dropdown()
      }
    })
  }

  getOperator()
})()

// 分页
const paginationMain = new Pagination

let renderArriveTable = (data, num) => {
  let str = data.map((item, index) => {
    typeof item === 'object' && Object.keys(item).forEach(key => {
      item[key] = item[key] !== null ? item[key] : ''     
    })

    return `
    <tr class="table_item">
        <td>${(num - 1) * 10 + index + 1}</td>
        <td>${item.order_no}</td>
        <td>${item.single_order_no}</td>
        <td>${item.sign_no}</td>
        <td>${item.received_cost}</td>
        <td>${item.clearing_unit}</td>
        <td>${item.payMethodName}</td>
        <td>${item.operator}</td>
        <td>${formatDate(item.operating_time)}</td>
        <td>${item.pick_location}</td>
        <td></td>
      </tr>`
    }
  ).join('')
  $('.cash_table').html(str)
}

let renderDepartureTable = (data, num) => {
  let str = data.map((item, index) => {
    typeof item === 'object' && Object.keys(item).forEach(key => {
      item[key] = item[key] !== null ? item[key] : ''     
      if(key === 'order_type') {
        switch (true) {
          case item[key] === 0:
            item[key] = '收货主单'
          break;
          case item[key] === 1:
            item[key] = '收货分单'
          break;
          case item[key] === 2:
            item[key] = '邮件'
          break;
          case item[key] === 3:
            item[key] = '民航快递'
          break;
          default: break;
        }
      }

      if(key === 'pay_receive_type') {
        item[key] = item[key] ? '支出' : '收入'
      }
    })

    return `
    <tr class="table_item">
        <td>${(num - 1) * 10 + index + 1}</td>
        <td>${item.order_no}</td>
        <td>${item.order_type}</td>
        <td>${item.received_cost}</td>
        <td>${item.operator}</td>
        <td>${formatDate(item.operating_time)}</td>
        <td>${item.payMethodName}</td>
        <td>${item.clearing_unit}</td>
        <td></td>
        <td>${item.sender_name}</td>
        <td>${item.pay_receive_type}</td>
        <td>${item.capital_flows}</td>
      </tr>`
    }
  ).join('')
  $('.cash_table').html(str)
}

let renderTable = pageInfo.deparrType ? renderArriveTable : renderDepartureTable

let getParams = () => {
  return {
    capital_flows: $('.capital_flows').dropdown('get value'),
    operating_time_start: $('.operating_time_start').val(),
    operating_time_end: $('.operating_time_end').val(),
    operator: $('.operator').dropdown('get value'),
    payMethod: $('.payMethod').dropdown('get value'),
    type: pageInfo.recpayType,
  }
}

let getReportList = () => {
  let url = pageInfo.deparrType ? baseUrl + '/def/finance/cash_flow/arrival_order_report' : 
  baseUrl + '/def/finance/cash_flow/departure_order_report'

  let params = getParams()

  if(pageInfo.deparrType) {
    Object.assign(params, {pick_location: $('.pick_location').dropdown('get value')})
  }

  LXHR.POST(url, params).done(res => {
    if(res.status === 200) {
      paginationMain.init('.pageWrap', res.data[0], params, url, renderTable)
      renderTable(res.data[0].list, 1)
    }else{
      LALERT.msg(res.message)
    }
  })
}

$('.btn_search').click(function () {
  getReportList()
})