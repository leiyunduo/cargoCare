const pageInfo = {
   // baseUrl: 'http://192.168.1.110:8080/lxtd-cca-apis',
     baseUrl: 'http://47.93.90.229/test',
}
let {baseUrl} = pageInfo
$(function () {
    //导入文件后查询
    //分页
    const pagination = new Pagination
    $(".pageWrap").css('display', 'none')
    //一级航班信息
    // 渲染表格
    let renderTable = data => {
        data.pop(1)
        let str = data.map((item, index) => {
                typeof item === 'object' && Object.keys(item).forEach(key => {
                    item[key] = item[key] !== null ? item[key] : ''

                })
                return `
          <tr>
           <td>${(pagination.nowNum - 1) * 10 + index + 1}</td>
            <td>${item.line}</td>
            <td>${item.elec}</td>
            <td>${item.textile}</td>
            <td>${item.public_goods}</td>
            <td>${item.garden_stuff}</td>
            <td>${item.ca}</td>
            <td>${item.pg}</td>
            <td>${item.general_cargo}</td>
            <td>${item.fresh}</td>
            <td>${item.drug}</td>
            <td>${item.mail}</td>
          </tr>`
            }
        ).join('')
        $('.table-list').html(str)
    }
    let searchMainList = () => {
        // 请求地址
        const reqUrl = 'http://47.93.90.229/test/def/zhcx/getDepartureCargo'
        // 请求参数
        let params = {
            code: $(".sender").val(),
            billing_time_start: $(".billing_time_start").val(),
            billing_time_end: $(".billing_time_end").val(),
            currPage: 1
        }
        LXHR.POST(reqUrl, params).done(res => {
            if (res.status === 200) {
                $(".pageWrap").css('display', 'block')
                pagination.init('.pageBox', res.data[0], params, reqUrl, renderTable)
                renderTable(res.data[0].list)
            } else {
                LALERT.msg(res.message)
            }
        })
    }
// 发送请求
    $('.btn-search').click(function () {
        searchMainList()
    })
});

$('.print').click(function () {
    var _url=baseUrl + '/def/zhcx/printDepartureCargo'
    window.open( _url)
})
