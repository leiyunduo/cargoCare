const pageInfo = {
    // baseUrl: 'http://192.168.1.114:8080/lxtd-cca-apis',
    baseUrl: 'http://47.93.90.229/test',
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
            <td>${item.order_no}</td>
            <td>${item.flight_no}</td>
            <td>${item.departure}</td>
            <td>${item.destination}</td>
            <td>${item.is_nonstop}</td>
            <td>${item.is_batch}</td>
            <td>${item.quantity}</td>
            <td>${item.joint_cargo_pieces}</td>
            <td>${item.sender}</td>
            <td>${item.actual_fry_date + item.actual_fry_time}</td>
          </tr>`
        }
    ).join('')
    $('.table-list').html(str)
}
let searchMainList = () => {
    if($(".ch1").val()==='0'){
        var chose=$(".ch1").val()
    }else if($(".ch2").val()==='1'){
        var chose=$(".ch2").val()
    }
    if($(".order_no1").val()!=''){
        var order_no=$(".order_no1").val()
    }else if($(".order_no2").val()!=''){
        var order_no=$(".order_no2").val()
    }
    // 请求地址
    const reqUrl = 'http://47.93.90.229/test/def/zhcx/getDepartureOrder/'
    // 请求参数
    let params = {
        select_by_order:$(".select_by_order").val(),
        order_no:order_no,
        is_full_matching:chose,
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
    if($(".ch1").is(':checked')){
        $(".ch1").attr("value",'0')

    }else if($(".ch2").is(':checked')){
        $(".ch2").attr("value",'1')

    }


    searchMainList()
})