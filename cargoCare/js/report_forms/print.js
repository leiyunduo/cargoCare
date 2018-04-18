// 获取打印表头,获取当前下拉框内的文字及有输入的输入框的值
let getPrintHeadData = () => {
  let data = Array.from($('.search_items').find('.print_head')).map(item => {
    let nodeName = item.nodeName.toLowerCase()
    return {
      name: $(item).data('name'),
      value: nodeName === 'input' ? $(item).val() : $(item).dropdown('get text'),
    }
  }).filter(item => {
    return item.value
  })

  return updateArr(data)
}

let getPrintHeadHtml = data => {
  let str = ''
  if(pageInfo.haveBasis) {
    str += `
    <p>
      <span style="margin-right:10px">开票日期: ${$('.before_time').val()} 至 ${$('.now_time').val()}</span>
    </p>
    <p>
      <span style="margin-right:10px">${$('.search_about').dropdown('get text')}</span>
      <span style="margin-right:10px">${$('.about_label').html()}: ${$('.about_select_value').val()}</span>
    </p>
    `
  }
  
  let spans = d => d.map(item => `<span style="margin-right:10px">${item.name}: ${item.value}</span>`).join('')
  str += data.map(item => `<p>${spans(item)}</p>`).join('')
  return str
}

// 获取打印内容
let getPrintHtml = (data) => {
  let str = '<div id="print_report">'
  str += '<h2 class="ui center aligned small header">出发单号查询报表</h2>'
  str += `
  <div style="margin-bottom: 15px;">
    <p>单号: ${data[0].order_no} 至 ${data[data.length - 1].order_no}</p>
    ${getPrintHeadHtml(getPrintHeadData())}
  </div>
  `
  str += `<table class="ui celled table selled">
    <thead>
      <tr class="show_items">
        ${getTheadStr(pageInfo.checkedShowItems)}
      </tr>
    </thead>
    <tbody>
      ${getTableHtml(data, 1)}
    </tbody>
  </table>`
  str += '</div>'
  return str
}

let print_url_obj = {
  '1048': '/def/zhcx/departure_order/print_departure_order',
  '1211': '/def/zhcx/pick_up/print_pickup_sale_report',
}

let getPrintList = () => {
  let url = baseUrl + print_url_obj[pageInfo.id]
  let params = getSearchParams(pageInfo.checkedSearchItems)

  return new Promise((resolve, reject) => {
    LXHR.POST(url, params).done(res => {
      if(res.status === 200) {
        resolve(res.data)
      }else{
        LALERT.msg(res.message)
      }
    })
  })
}

$('.print_all').on('click', function () {
  if(!pageInfo.print) {
    LALERT.msg('请先查询')
    return
  }

  getPrintList().then(data => {
    layer.open({
      title: '方案列表',
      area: ['auto', '600px'],
      btn: ['确认打印', '取消'],
      content: getPrintHtml(data),
      yes: function(){
        $('#print_report').jqprint()
        layer.closeAll()
      },
    })
  })
})