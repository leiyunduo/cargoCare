// 分页
const paginationMain = new Pagination

let renderTds = (data, showItems) => showItems.map(item => `<td>${data[item.en_name]}</td>`).join('')

let getTableHtml = (data, num=1) => {
  let str = data.map((item, index) => {
    typeof item === 'object' && Object.keys(item).forEach(key => {
      item[key] = item[key] !== null ? item[key] : ''      

      if(pageInfo.dropdownItems.some(item => item === key)) {
        item[key] = item[key] ? '是' : '否'
      }
    })

    let tds = renderTds(item, pageInfo.checkedShowItems)
    return `
      <tr class="table_item">
        <td>${pageInfo.haveBasis ? item.serial_number : ((num - 1) * 10 + index + 1)}</td>
        ${tds}
      </tr>`
    }
  ).join('')

  return str
}

let renderTable = (data, num) => {
  let str = getTableHtml(data, num)
  $('.main_table').html(str)
}

let getSearchParams = data => {
  let params = {}
  data.forEach(item => {
    item.property_type ? Object.assign(params, {[item.en_name]: $(`.${item.en_name}`).dropdown('get value')}) :
    Object.assign(params, {[item.en_name]: $(`.${item.en_name}`).val()})
  })
  return params
}

// 获取有查询依据的参数
let getBasisParams = params => {
  let basisInfo = $('.about_select_value').data('info')
  let newParams = Object.assign(params, {
    start_date: $('.before_time').val(),
    end_date: $('.now_time').val(),
    [basisInfo.en_name]: $('.about_select_value').dropdown('get text'),
    count_param_name: basisInfo.en_name,
    count_param_value: $('.about_select_value').dropdown('get text'),
  })

  return newParams
}

let search_url_obj = {
  '1048': '/def/zhcx/departure_order/print_departure_order',
  '1211': '/def/zhcx/pick_up/print_pickup_sale_report',
}

let getOrderList = () => {
  let url = baseUrl + search_url_obj[pageInfo.id]
  let params = getSearchParams(pageInfo.checkedSearchItems)
  if(pageInfo.haveBasis) {
    params = getBasisParams(params)
  }
  
  LXHR.POST(url, params).done(res => {
    if(res.status === 200) {
      renderTable(res.data)
      pageInfo.print = true
    }else{
      LALERT.msg(res.message)
    }
  })
}

$('.btn_search').click(function () {
  getOrderList()
})