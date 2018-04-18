// 分页
const paginationMain = new Pagination

let renderTds = (data, showItems) => showItems.map(item => `<td>${data[item.en_name]}</td>`).join('')

let renderTable = (data, num) => {
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
        <td>${(num - 1) * 10 + index + 1}</td>
        ${tds}
      </tr>`
    }
  ).join('')
  $('.main_table').html(str)
}

let getSearchParams = data => {
  let params = {currPage: 1}
  data.forEach(item => {
    item.property_type ? Object.assign(params, {[item.en_name]: $(`.${item.en_name}`).dropdown('get value')}) :
    Object.assign(params, {[item.en_name]: $(`.${item.en_name}`).val()})
  })
  return params
}

let getOrderList = () => {
  let url = baseUrl + '/def/zhcx/receve_like/getReceveInfo'
  let params = getSearchParams(pageInfo.checkedSearchItems)

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
  getOrderList()
})