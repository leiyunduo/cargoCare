const pageInfo = {
    // baseUrl: 'http://192.168.1.110:8080/lxtd-cca-apis',
    //baseUrl: 'http://47.93.90.229/test',
}
//分页
const pagination = new Pagination
//一级航班信息
// 渲染表格
let renderTable = data => {
    let str = data.map((item, index) => {
            typeof item === 'object' && Object.keys(item).forEach(key => {
                item[key] = item[key] !== null ? item[key] : ''
                if(key === 'air_transit'){
                    if(typeof item[key] === 'number'){
                        item[key] = item[key] ? '是' : '否'
                    }
                }
            })
            return `
          <tr>
            <td>${(pagination.nowNum - 1) * 10 + index + 1}</td>
            <td class="flexCenter padding0 ">
              <div class="roundBg borderRaidus blueBg look look_flightInformation" id="look" data-id='${item.id}' flight="${item.flight_no}">
                <i class="unhide icon margin-Left5" title="查看"></i>
              </div>
            </td>
            <td>${item.order_no}</td>
            <td>${item.correspond_order_no}</td>
            <td>${item.easy_flag}</td>
            <td>${item.departure}</td>
            <td>${item.destination}</td>
            <td>${item.first_transfer_name}</td>
            <td>${item.air_transit}</td>
            <td>${item.sender_name}</td>
            <td>${item.sender_address}</td>
            <td>${item.sender_telephone}</td>
          </tr>`
        }
    ).join('')
    $('.table-list').html(str)
}
let searchMainList = () => {
    // 请求地址
    const reqUrl ='http://47.93.90.229/test/def/zhcx/getDepartureLikeOrder'
    // 请求参数
    let params = {
        order_no:$(".order_no").val(),
        currPage: 1
    }
    LXHR.POST(reqUrl, params).done( res => {
        if(res.status === 200){
            pagination.init('.pageBox', res.data[0], params, reqUrl, renderTable)
            renderTable(res.data[0].list)
        }else{
            LALERT.msg(res.message)
        }
    })
}
// 发送请求
$('.btn-search').click(function(){
    searchMainList()
})