//点击设置按钮 弹出导入设置页面
$('.import_settings').on('click', function () {
    $('.import_settings_wrap').removeClass('hidden').addClass('visible active')
    $('.import_settings_wrap_first_modal').removeClass('hidden').addClass('visible active')
})
//点击黑色模态框 整体隐藏
$('.import_settings_wrap').on('click', function (e) {
    if (e.target.className == 'import_settings_wrap_first_modal') {
        return false
    }
    $('.import_settings_wrap').removeClass('visible active').addClass('hidden')

    $('.import_settings_wrap_first_modal').removeClass('visible active').addClass('hidden')
    $('.import_settings_wrap_second_modal').removeClass('visible active').addClass('hidden')

})
//组织事件传递
$('.import_settings_wrap_first_modal').on('click', function (e) {
    e.stopPropagation();
})
$('.import_settings_wrap_second_modal').on('click', function (e) {
    e.stopPropagation();
})
$('.ui.checkbox').checkbox()
//点击新增 模块一 hide 模块二 show
$('.import_settings_wrap_second_modal_btn').on('click', function () {
    $('.import_settings_wrap_first_modal').removeClass('visible active').addClass('hidden')
    $('.import_settings_wrap_second_modal').removeClass('hidden').addClass('visible active')
})
//点击提交/取消 模块一show 模块二 hide
$('.first_modal_show').on('click', function () {
    $('.import_settings_wrap_first_modal').removeClass('hidden').addClass('visible active')
    $('.import_settings_wrap_second_modal').removeClass('visible active').addClass('hidden')
})
//点击编辑 模块一 hide 模块二 show
$('.edit_btn').on('click', function () {
    $('.import_settings_wrap_first_modal').removeClass('visible active').addClass('hidden')
    $('.import_settings_wrap_second_modal').removeClass('hidden').addClass('visible active')
})
//关闭第一层
$('.close_first_modal_btn').on('click', function () {
    $('.import_settings_wrap').removeClass('visible active').addClass('hidden')
    $('.import_settings_wrap_first_modal').removeClass('visible active').addClass('hidden')
})
//点击保存
$('.preservation').on('click', function () {
    console.log('点击了保存')
})
//-----------------------------------------------------------------------------------
//选中
$('.main_table').on('click', '.table-item', function (evt) {

    $('.main_table>tr').removeClass('active')
    $(this).find('.checkbox').checkbox('check')
    $(this).toggleClass('active')
        //置顶
        let renderTds = (data) => data.map((item, index) => `<td>${item}</td>`).join('')
        let renderTables = (data, num)=> {
            let str = data.map((item, index) => {
                    return `
          <tr class="table-item" data-id="${item.id}">
          <td class="checkbox-wrap">
            <div class="ui radio checkbox">
              <input type="radio" name="radio" class="relate_flight_info_radio">
              <label></label>
            </div>
          </td>
            <td>${index + 1}</td>
            <td>${item.factor}</td>
            <td>${item.is_relate}</td>
            <td>${item.priority}</td>
            <td>${item.start_arrive}</td>
          </tr>`
                }
            ).join('')
            $('.main_table').html(str)
        }
        let searchMainLists = (_zdurl,_id) => {
            // 请求地址
            const reqUrl = _zdurl;
            // 请求参数
            let params = {
                id:_id 
            }

            LXHR.POST(reqUrl, params).done(res => {
                if (res.status === 200) {
                    renderTables(res.data)
                } else {
                    LALERT.msg(res.message)
                }
            })
        }
    $('.zhid').click(function(){
        searchMainLists(zhidUrl,$('.main_table .active').data('id'))
    })

    //删除
    $('.shan').click(function () {
        var This = $(this)
        if (This.hasClass('active')) return
            layer.confirm('确认要删除吗？', {
                icon: 0,
                title: '提醒',
                btn: ['确定', '取消']
            }, function () {
                searchMainLists(deleteUrl,$('.main_table .active').data('id'))
                $('.layer-anim').hide()
                $('.layui-layer-shade').hide()
            }, function () {
                return
            })
    })
})
//*********************************
//导入基础数据表。
//-----------------------------------
const pageInfo = {
    baseUrl: 'http://192.168.1.118:8080/lxtd-cca-apis',
    //baseUrl: 'http://47.93.90.229/test',
}
//let baseUrl = globalBaseUrl.baseUrl || pageInfo.baseUrl
let {baseUrl} = pageInfo
//分页
// 渲染表格
let renderTds = (data) => data.map((item, index) => `<td>${item}</td>`).join('')
let renderTable = (data, num)=> {
    let str = data.map((item, index) => {
        typeof item === 'object' && Object.keys(item).forEach(key => {
            item[key] = item[key] !== null ? item[key] : ''
            if (key === 'start_arrive') {
                if (item[key] === 0) {
                    item[key] = '出发'
                } else if (item[key] === 1) {
                    item[key] = '到达'
                }
            }
        })
            return `
          <tr class="table-item" data-id="${item.id}">
          <td class="checkbox-wrap">
            <div class="ui radio checkbox">
              <input type="radio" name="radio" class="relate_flight_info_radio">
              <label></label>
            </div>
          </td>
            <td>${index + 1}</td>
            <td>${item.factor}</td>
            <td>${item.is_relate}</td>
            <td>${item.priority}</td>
            <td>${item.start_arrive}</td>
          </tr>`
        }
    ).join('')
    $('.main_table').html(str)
}
let searchMainList = () => {
    // 请求地址
    const reqUrl = searchUrl;
    // 请求参数
    let params = {
        is_relate: $('.is_relate').val(),
        start_arrive: $('.start_arrive').val(),
        order_type: $('.order_type').val(),
        flight_other: $('.flight_other').val(),
    }

    LXHR.POST(reqUrl, params).done(res => {
        if (res.status === 200) {
            renderTable(res.data)
        } else {
            LALERT.msg(res.message)
        }
    })
}
//查询
$('.btn-search').on('click', function () {
    searchMainList()
})
// 发送请求 清空
$('.btn-clear').on('click', function () {
    $('.dropdown').dropdown('set text', '全部')
})
