// 渲染表格
let renderTable = (data, num) => {
  let str = data.map((item, index) => {
    typeof item === 'object' && Object.keys(item).forEach(key => {
      item[key] = item[key] !== null ? item[key] : ''
    })
    return `
          <tr>
            <td>${(num - 1) * 10 + index + 1}</td>
            <td class="flexCenter padding0 ">
              <div class="roundBg borderRaidus redBg ">
                <i class="icon-loop margin-Left5" title="换单"></i>
              </div>
              <div class="roundBg borderRaidus greenBg btn-edit" data-order=${item.order_no}>
                <i class="edit icon margin-Left5" title="编辑"></i>
              </div>
              <div class="roundBg borderRaidus tealBg">
                <i class="icon-printer margin-Left5" title="打印"></i>
              </div>
            </td>
            <td>${item.order_no}</td>
            <td>${item.departure_code}</td>
            <td>${item.destination_code}</td>
            <td>${item.sender_name}</td>
            <td>${item.receiver_name}</td>
            <td>${item.billing_location}</td>
            <td>${item.type}</td>
            <td>${item.state}</td>
            <td>${item.issuer}</td>
          </tr>`
        }
      ).join('')
  $('.mail_table_list').html(str)
}

let getSearchParams = () => {
  return {
    order_three_code: $('.order_three_code').val(),
    order_num: $('.order_num').val(),
    receipt_type: $('.receipt_type').dropdown('get value'),
    easy_flag: $('.easy_flag').dropdown('get value'),
    departure_status: $('.departure_status').dropdown('get value'),
    departure_code: $('.departure_code').val(),
    destination_code: $('.destination_code').val(),
    sender_code: $('.sender_code').val(),
    receiver_code: $('.receiver_code').val(),
    billing_time_start: $('.billing_time_start').val(),
    billing_time_end: $('.billing_time_end').val(),
    currPage: 1,
  }
}

let searchMainList = () => {
  // 请求地址
  const url = baseUrl + '/def/express/mail/pageQueryForMail/'
  // 请求参数
  let params = getSearchParams()

  LXHR.POST(url, params).done( res => {
    if(res.status === 200){
      mainPagination.init('.pageBox', res.data[0], params, url, renderTable)
      renderTable(res.data[0].list, 1)
    }else{
      LALERT.msg(res.message)
    }
  })
}
// 发送请求
$('.btn-search').click(function(){
  searchMainList()
})