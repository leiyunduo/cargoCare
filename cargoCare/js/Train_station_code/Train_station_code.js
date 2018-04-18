const pageInfo = {
    // baseUrl: 'http://192.168.1.112:8080/lxtd-cca-apis',
    baseUrl: 'http://47.93.90.229/test',
}
let {baseUrl} = pageInfo
$(function () {
    //文件导入
    $('#upJQuery').on('click', function () {
        var trainCode = new FormData();
        trainCode.append("trainCode", $("#upfile").get(0).files[0]);
        var _url=baseUrl + '/def/basic/industry_data/uploadTrainCodeExcel';
        ajaxFile(trainCode,_url)
    });
    //----------------------------------------------------------------------
    //导入文件后查询
    //分页
    const pagination = new Pagination
    $(".pageWrap").css('display', 'none')
    //一级航班信息
    // 渲染表格
    let renderTable = data => {
        let str = data.map((item, index) => {
                typeof item === 'object' && Object.keys(item).forEach(key => {
                    item[key] = item[key] !== null ? item[key] : ''
                    if (key === 'air_transit') {
                        if (typeof item[key] === 'number') {
                            item[key] = item[key] ? '是' : '否'
                        }
                    }
                })
                return `
          <tr>
            <td>${(pagination.nowNum - 1) * 10 + index + 1}</td>
            <td>${item.code}</td>
            <td>${item.name}</td>
            <td>${item.correspond_city}</td>

          </tr>`
            }
        ).join('')
        $('.table-list').html(str)
    }
    let searchMainList = () => {
        // 请求地址
        const reqUrl = baseUrl + '/def/basic/industry_data/getTrainCodeList'
        // 请求参数
        let params = {
            code: $(".code").val(),
            name: $(".name").val(),
           // correspond_city:
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
// 清空
    $('.btn-clear').click(function () {
        $('input').not("input[type='hidden']").val('')
    })
});

