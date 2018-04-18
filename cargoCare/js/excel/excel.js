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
$('.ch2 input').get(0).checked=true
//-----------------------------------------------------------------------------------
$('.edit_data .two_level_menu_head_close').on('click', function () {
    $('.wym_container>div').show()
    $('.edit_data').hide()
})
//选中
var _arr = [];
$('.main_table').on('click', '.table-item', function (evt) {
    $(this).toggleClass('active')
    if ($(this).find(':checkbox').is(':checked')) {
        $(this).find(':checkbox').attr('checked', false)
    } else {
        $(this).find(':checkbox').attr('checked', true)
    }
    _arr = [];

    let _itemDataId = $('._item[checked=checked]');

    for (let a = 0; a < _itemDataId.length; a++) {
        _arr.push(_itemDataId.eq(a).data('id'));
    }
})
//判断选中状态时批量 编辑
$(".edit").click(function () {
    if ($('.table-item').find(':checkbox').is(':checked')) {
        //批量编辑
        $('.wym_container>div').hide()
        $('.edit_data').show()
        $('.two_level_menu_head .tit').text('批量编辑')
        $('.edit_data input').val('');
        $('.edit_data .dropdown').dropdown('set text','全部')
        $('.luru').attr('wym_off', 'true')
    } else {
        LALERT.msg('请选择需要批量编辑的数据')
    }
})
//编辑和添加 录入
$('.luru').click(function () {
        if ($('.luru').attr('wym_off') == 'true') {
            editParam = [];
            if (localStorage.editParam_data_one) {
                var editParam_data_title = JSON.parse(localStorage.getItem('editParam_data_one'))
            }
            for (let editParam_ of  editParam_data_title) {
                var _val1;
                if($('.edit_data input').attr("type")=='text'){
                    _val1=$("#" + editParam_.value).val()
                }else{
                    _val1=$("#" + editParam_.value).dropdown('get value')
                }
                editParam.push(
                    {"key": editParam_.value, "value": _val1}
                )
            }

            var manifestParam_ = new Object();
            manifestParam_.addData = editParam;
            manifestParam_.idList = _arr;
            manifestParam_.table_name = table_Name;
            $.ajax({
                url: editUrl,
                type: "POST",
                data: JSON.stringify(manifestParam_),//将对象序列化成JSON字符串
                datatype: "json",
                contentType: "application/json;charset=utf-8", //记住加上charset=utf-8，否则Ajax请求有可能会报SCRIPT7002错误
                success: function (e) {
                    if(e.status==200){
                        LALERT.success(e.message)
                        $('.wym_container>div').show()
                        $('.edit_data').hide()
                        searchMainList()
                    }else{
                        LALERT.msg(e.message);
                    }

                },
                error: function (e) {
                    LALERT.msg(e.message);
                }
            })
        } else {

            addsParam = [];
            if (localStorage.addsParam_data_one) {
                var addsParam_data_title = JSON.parse(localStorage.getItem('addsParam_data_one'))
            }
            for (let addsParam_ of  addsParam_data_title) {
                var _val2;
                if($('.edit_data input').attr("type")=='text'){
                    _val2=$("#" + addsParam_.value).val()
                }else{
                    _val2=$("#" + addsParam_.value).dropdown('get value')
                    console.log(_val2)
                }
                addsParam.push(
                    {"key": addsParam_.value, "value": _val2}
                )
            }
            var manifestParams = new Object();
            manifestParams.addData = addsParam;
            manifestParams.table_name = table_Name;
            $.ajax({
                url: addUrl,
                type: "POST",
                data: JSON.stringify(manifestParams),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                success: function (e) {
                    if(e.status==200){
                        LALERT.success(e.message)
                        $('.wym_container>div').show()
                        $('.edit_data').hide()
                        searchMainList()
                        $('.table-item').removeClass('active')
                    }else{
                        LALERT.msg(e.message);
                    }

                },
                error: function (e) {
                    LALERT.msg(e.message);
                }
            })
        }
})
//单条编辑
$('.main_table').on('click', '.greenBg', function (evt) {
    $('.wym_container>div').hide()
    $('.edit_data').show()
    $('.two_level_menu_head .tit').text('单条编辑')
    $('.luru').attr('wym_off', 'true')
    $.ajax({
        url: serchone,
        type: "POST",
        data: {'id': $(this).data('id'), 'table_name': table_Name},
        success: function (e) {
            //LALERT.success(e.message)
            $('.edit_items').html('')
            var upItem = e.data;
            if (upItem.length != 0) {
                wym_iii = -1;
                for (var i = 0; i < upItem.length; i++) {
                    if (upItem[i].selectValues != null) {
                        if (i % 4 == 0) {
                            $('.edit_items').append('<div class="row"><div class="four fields wym_m"></div></div>');
                            wym_iii++;
                        }
                        $('.edit_items>.row>.wym_m').eq(wym_iii).append('<div class="four wide field"> <label class="_lab">' + upItem[i].key + '</label><div class="ui dropdown selection"> <input type="hidden" id="'+ upItem[i].value + '" value=""> <div class="default text">'+ upItem[i].classValue + '</div> <i class="dropdown icon"></i> <div class="menu _menus"> </div></div></div>')
                        for (var j = 0; j < upItem[i].selectValues.length; j++) {
                            if (upItem[i].selectValues[j] != null) {

                                $('.edit_items .field').eq(i).find('._menus').append('<option class="item" data-value="'+ upItem[i].selectValues[j] + '">' + upItem[i].selectValues[j] + '</option>')

                                $('.dropdown').dropdown()
                            }
                        }

                    } else {
                        if (i % 4 == 0) {
                            $('.edit_items').append('<div class="row"><div class="four fields wym_m"></div></div>');
                            wym_iii++;
                        }
                        $('.edit_items>.row>.wym_m').eq(wym_iii).append('<div class="four wide field"> <label>' + upItem[i].key + '</label> <input type="text" placeholder="' + upItem[i].key + '" value="'+upItem[i].classValue+'" id="' + upItem[i].value + '"> </div>')

                    }
                }



            }
            $('.luru').attr('wym_off', 'true')
        },
        error: function (e) {
            LALERT.msg(e.message);
        }
    })
})
//复制添加
$('.main_table').on('click', '.blueBg', function (evt) {
    $('.wym_container>div').hide()
    $('.edit_data').show()
    $('.two_level_menu_head .tit').text('复制添加')
    $.ajax({
        url: serchone,
        type: "POST",
        data: {'id': $(this).data('id'), 'table_name': table_Name},
        success: function (e) {
            //LALERT.success(e.message)
            $('.edit_items').html('')
            var upItem = e.data;
            if (upItem.length != 0) {
                wym_iii = -1;
                for (var i = 0; i < upItem.length; i++) {
                    if (upItem[i].selectValues != null) {
                        if (i % 4 == 0) {
                            $('.edit_items').append('<div class="row"><div class="four fields wym_m"></div></div>');
                            wym_iii++;
                        }
                        $('.edit_items>.row>.wym_m').eq(wym_iii).append('<div class="four wide field"> <label class="_lab">' + upItem[i].key + '</label><div class="ui dropdown selection"> <input type="hidden" id="'+ upItem[i].value + '" value=""> <div class="default text">'+ upItem[i].classValue + '</div> <i class="dropdown icon"></i> <div class="menu _menus"> </div></div></div>')
                        for (var j = 0; j < upItem[i].selectValues.length; j++) {
                            if (upItem[i].selectValues[j] != null) {

                                $('.edit_items .field').eq(i).find('._menus').append('<option class="item" data-value="'+ upItem[i].selectValues[j] + '">' + upItem[i].selectValues[j] + '</option>')

                                $('.dropdown').dropdown()
                            }
                        }

                    } else {
                        if (i % 4 == 0) {
                            $('.edit_items').append('<div class="row"><div class="four fields wym_m"></div></div>');
                            wym_iii++;
                        }
                        $('.edit_items>.row>.wym_m').eq(wym_iii).append('<div class="four wide field"> <label>' + upItem[i].key + '</label> <input type="text" placeholder="' + upItem[i].key + '" value="'+upItem[i].classValue+'" id="' + upItem[i].value + '"> </div>')

                    }
                }



            }
            $('.luru').attr('wym_off', 'false')
        },
        error: function (e) {
            LALERT.msg(e.message);
        }
    })

})
//***添加
$('.blue').addClass('add')
$('.add').click(function (evt) {
    $.ajax({
        url: serchone,
        type: "POST",
        data: {'id': $(this).data('id'), 'table_name': table_Name},
        success: function (e) {
            //LALERT.success(e.message)
            $('.edit_items').html('')
            var upItem = e.data;
            if (upItem.length != 0) {
                wym_iii = -1;
                for (var i = 0; i < upItem.length; i++) {
                    if (upItem[i].selectValues != null) {
                        if (i % 4 == 0) {
                            $('.edit_items').append('<div class="row"><div class="four fields wym_m"></div></div>');
                            wym_iii++;
                        }
                        $('.edit_items>.row>.wym_m').eq(wym_iii).append('<div class="four wide field"> <label class="_lab">' + upItem[i].key + '</label><div class="ui dropdown selection"> <input type="hidden" id="'+ upItem[i].value + '" value=""> <div class="default text">'+ upItem[i].classValue + '</div> <i class="dropdown icon"></i> <div class="menu _menus"> </div></div></div>')
                        for (var j = 0; j < upItem[i].selectValues.length; j++) {
                            if (upItem[i].selectValues[j] != null) {

                                $('.edit_items .field').eq(i).find('._menus').append('<option class="item" data-value="'+ upItem[i].selectValues[j] + '">' + upItem[i].selectValues[j] + '</option>')

                                $('.dropdown').dropdown()
                            }
                        }

                    } else {
                        if (i % 4 == 0) {
                            $('.edit_items').append('<div class="row"><div class="four fields wym_m"></div></div>');
                            wym_iii++;
                        }
                        $('.edit_items>.row>.wym_m').eq(wym_iii).append('<div class="four wide field"> <label>' + upItem[i].key + '</label> <input type="text" placeholder="' + upItem[i].key + '" value="'+upItem[i].classValue+'" id="' + upItem[i].value + '"> </div>')

                    }
                }



            }
            $('.wym_container>div').hide()
            $('.edit_data').show()
            $('.edit_data .dropdown').dropdown('set text','全部')
            $('.two_level_menu_head .tit').text('添加')
            $('.edit_data input').val('');
            $('.luru').attr('wym_off', 'false')
        },
        error: function (e) {
            LALERT.msg(e.message);
        }
    })

})
//批量删除
$('.shan').click(function () {
    if ($('.table-item').find(':checkbox').is(':checked')) {
        var This = $(this)
        if (This.hasClass('active')) return
        layer.confirm('确认要删除吗？', {
            icon: 0,
            title: '提醒',
            btn: ['确定', '取消']
        }, function () {
            //--删除
            $.ajax({
                url: deleteUrl,
                type: "POST",
                data: JSON.stringify({'idList': _arr, 'table_name': table_Name}),
                dataType: 'json',
                contentType: 'application/json;charset=utf-8',
                success: function (e) {
                    LALERT.success(e.message)
                    searchMainList()
                },
                error: function (e) {
                    LALERT.msg(e.message);
                    searchMainList()
                }
            })

            //操作后再查询
            //searchMainList()
        }, function () {
            return
        })
    } else {
        LALERT.msg('请选择需要批量删除的数据')
    }
})
//*********************************
//导入基础数据表。
//-----------------------------------
const pageInfo = {
    baseUrl: 'http://192.168.1.108:8080/lxtd-cca-apis',
    //baseUrl: 'http://47.93.90.229/test',
}
let baseUrl = globalBaseUrl.baseUrl || pageInfo.baseUrl
localStorage.setItem('uploadType_', 0)
//分页
const pagination = new Pagination
// 渲染表格
let renderTds = (data) => data.map((item, index) => `<td>${item}</td>`).join('')
let renderTable = (data, num) => {
    let str = data.map((item, index) => {
            return `
          <tr class="table-item">
          <td class="checkbox-wrap"><input type="checkbox" class="_item" data-id='${item[0]}'><span class="checkbox-mask"></span></td>
            <td>${(num - 1) * 10 + index + 1}</td>
            <td class="checkbox-wrap flexCenter padding0">
               <div class="roundBg borderRaidus blueBg" data-id='${item[0]}'><i class="edit icon-copy margin-Left5" title="复制添加"></i></div>
               <div class="roundBg borderRaidus greenBg" data-id='${item[0]}'><i class="edit icon margin-Left5" title="单条编辑"></i></div>
           </td>
            ${renderTds(item.splice(1))}
          </tr>`
        }
    ).join('')
    $('.main_table').html(str)
}
let searchMainList = () => {
    // 请求地址
    const reqUrl = searchUrl;
    // 请求参数

    selectParam = [];
    if (localStorage.selectParam_data_one) {
        var selectParam_data_title = JSON.parse(localStorage.getItem('selectParam_data_one'))

    }
    for (let selectParam_ of  selectParam_data_title) {
        var _val;
        if($('input').attr("type")=='text'){
            _val=$("." + selectParam_.value).val()
        }else{
            _val=$("." + selectParam_.value).dropdown('get value')
        }
        selectParam.push(
            {"key": selectParam_.value, "value":_val }
        )
    }

    var manifestParam = new Object();
    if (selectParam == '') {
        manifestParam.selectParam = [{'key': 'destination', 'value': $('.destination').val()}]
    } else {
        manifestParam.selectParam = selectParam;
    }

    manifestParam.currPage = 1;
    manifestParam.table_name = table_Name;
    let params = manifestParam
    LXHR.POST(reqUrl, JSON.stringify(params), {contentType: 'application/json'}).done(res => {
        if (res.status === 200) {
            pagination.init('.pageBox', res.data[0], params, reqUrl, renderTable, 0, 'json')
            renderTable(res.data[0].list, 1)
        } else {
            LALERT.msg(res.message)
        }
    })
}
// 发送请求 清空
$('.btn-clear').on('click', function () {
    $('.search_items input').val('')
})
//********************
$(function () {
    // 发送请求 查询
    $('.btn-search').on('click', function () {
        searchMainList()
    })
    var selectParam = [];
    var editParam = [];
    var wym_i;
    var wym_ii;

    function load_() {
        $.ajax({
                url: loadUrl,
                type: "POST",
                success: function (e) {
                    if (e.data[0].showCol == '') {
                    } else {
                        LALERT.success(e.message)
                        localStorage.setItem("selectParam_data_one", JSON.stringify(e.data[0].selectParam));
                        localStorage.setItem("editParam_data_one", JSON.stringify(e.data[0].allCol));
                        localStorage.setItem("addsParam_data_one", JSON.stringify(e.data[0].allCol));

                        var searchItem = e.data[0].selectParam;
                        var showItem = e.data[0].showCol;
                        var upItem = e.data[0].allCol;

                        $('.search_items').html('')
                        $('.show_items').html('')
                        $('.edit_items').html('')
                        wym_i = -1;
                        if (searchItem.length != 0) {
                            for (var i = 0; i < searchItem.length; i++) {
                                if (e.data[0].selectParam[i].selectValues != null) {
                                    if (i % 4 == 0) {
                                        $('.search_items').append('<div class="row"><div class="four fields wym_m"></div></div>');
                                        wym_i++;
                                    }
                                    $('.search_items>.row>.wym_m').eq(wym_i).append('<div class="four wide field"> <label class="_lab">' + searchItem[i].key + '</label><div class="ui dropdown selection"> <input type="hidden" class="'+ searchItem[i].value + '" value=""> <div class="default text">全部</div> <i class="dropdown icon"></i> <div class="menu _menu"> </div></div></div>')
                                    for (var j = 0; j < searchItem[i].selectValues.length; j++) {
                                        if (searchItem[i].selectValues[j] != null) {
                                                $('.search_items .field').eq(i).find('._menu').append('<option class="item" data-value="'+ e.data[0].selectParam[i].selectValues[j] + '">' + e.data[0].selectParam[i].selectValues[j] + '</option>')


                                             // }
                                            $('.dropdown').dropdown()
                                        }
                                    }

                                } else {
                                    if (i % 4 == 0) {
                                        $('.search_items').append('<div class="row"><div class="four fields wym_m"></div></div>');
                                        wym_i++;
                                    }
                                    $('.search_items>.row>.wym_m').eq(wym_i).append('<div class="four wide field"> <label>' + searchItem[i].key + '</label> <input type="text" placeholder="' + searchItem[i].key + '" class="' + searchItem[i].value + '"> </div>')

                                }
                            }
                        }

                        else {
                            $('.search_items').append('<div class="row searchrow"> <div class="four fields fieldsContent"><div class="four wide field"><label>始发站</label><input type="text" class="destination" placeholder="始发站"> </div> </div> </div>')
                        }

                        if (showItem.length != 0) {
                            $('.show_items').append('<th></th><th class="or">序号</th><th>操作</th>')
                            for (var i = 0; i < showItem.length; i++) {
                                $('.show_items').append('<th>' + showItem[i].key + '</th>')
                            }
                        } else {
                            $('.show_items').append('<th></th><th>序号</th><th>操作</th><th>始发站</th><th>目的站</th><th>中转城市</th><th>起飞机场</th><th>起飞城市</th><th>降落机场</th><th>降落城市</th>')
                        }

                        if (upItem.length != 0) {
                              wym_iii = -1;
                            for (var i = 0; i < upItem.length; i++) {
                                if (e.data[0].allCol[i].selectValues != null) {
                                    if (i % 4 == 0) {
                                        $('.edit_items').append('<div class="row"><div class="four fields wym_m"></div></div>');
                                        wym_iii++;
                                    }
                                    $('.edit_items>.row>.wym_m').eq(wym_iii).append('<div class="four wide field"> <label class="_lab">' + upItem[i].key + '</label><div class="ui dropdown selection"> <input type="hidden" id="'+ upItem[i].value + '" value=""> <div class="default text">全部</div> <i class="dropdown icon"></i> <div class="menu _menu"> </div></div></div>')
                                    for (var j = 0; j < upItem[i].selectValues.length; j++) {
                                        if (upItem[i].selectValues[j] != null) {
                                                $('.edit_items .field').eq(i).find('._menu').append('<option class="item" data-value="'+ e.data[0].allCol[i].selectValues[j] + '">' + e.data[0].allCol[i].selectValues[j] + '</option>')
                                            $('.dropdown').dropdown()
                                        }
                                    }

                                } else {
                                    if (i % 4 == 0) {
                                        $('.edit_items').append('<div class="row"><div class="four fields wym_m"></div></div>');
                                        wym_iii++;
                                    }
                                    $('.edit_items>.row>.wym_m').eq(wym_iii).append('<div class="four wide field"> <label>' + upItem[i].key + '</label> <input type="text" placeholder="' + upItem[i].key + '" id="' + upItem[i].value + '"> </div>')

                                }
                            }


                          
                        }
                    }

                },
                error: function () {
                    LALERT.msg('服务器失败')
                }
            }
        )
    }

    load_()
//********************
///传表
    $("#upfile").change(function () {
        var _url = excelUrl;
        file = new FormData()
        file.append("file", $("#upfile").get(0).files[0]);
        if ($(this).val() != '') {
            ajaxFile(_url)
        }
    });
    var file = new FormData();

    function ajaxFile(url) {
        $.ajax({
            url: url,
            type: "POST",
            processData: false,
            contentType: false,
            data: file,
            success: function (e) {
                if (e.status == 200) {
                    LALERT.success(e.message)
                    var _data = e.data[0].excelTitleList
                    var _datas = e.data[0].fieldList
                    $(".fileMsg").html('');
                    for (i = 0; i < _data.length; i++) {
                        localStorage.setItem("file", e.data[0].filePath)
                        $(".fileMsg").append('<tr file="' + e.data[0].filePath + '" T_title="0" condition="1"><td class="first_td">' + _data[i] + '</td><td><input type="text" class="destinations text_all_one" style="color:#999;"  value="' + _data[i] + '"/></td><td><input type="text" style="color:#999;" class="destinationss text_all_two" value="' + _datas[i] + '"></td><td class="flexCenter padding0 set"></td></tr>')
                        // $('._option').append('<option class="item" data-value="' +  + '">' + _data[i] + '</option>')
                    }
                    $('.set').append('<div class="ui toggle test checkbox toggleOne" style="margin-left: 5px"><input type="checkbox" name="public"><label>是否设为查询条件</label></div><div class="ui toggle test checkbox toggleTwo" style="margin-left: 5px"><input type="checkbox" name="public" checked="checked"> <label>是否作为表头显示</label> </div>')
                    $("#upJQuery").attr('statu', 'true')
                } else {
                    LALERT.msg(e.message)
                }
            },
            error: function () {
                LALERT.msg('服务器失败')
            }

        });
    }

    $('.fileMsg').on('click', '.toggleOne', function () {
        var This_tr = $(this).parents('tr')
        if (This_tr.attr('condition') == '1') {
            This_tr.attr('condition', '0')
        } else {
            This_tr.attr('condition', '1')
        }
    })
//表头
    $('.fileMsg').on('click', '.toggleTwo', function () {
        var This_tr = $(this).parents('tr')
        if (This_tr.attr('T_title') == '1') {
            This_tr.attr('T_title', '0')
        } else {
            This_tr.attr('T_title', '1')
        }
    })
//导入
    $('#upJQuery').on('click', function () {
        if ($(".ch1").hasClass("checked")) {
            $(this).attr("uploadType", 1)
            localStorage.setItem('uploadType_', 1)
        }
        if ($(".ch2").hasClass("checked")) {
            $(this).attr("uploadType", 0)
            localStorage.setItem('uploadType_', 0)
        }
        var tableAltList = [];
        var fileMsg_children = $('.fileMsg').children('tr');
        tableAltList = [];
        for (let q = 0; q < fileMsg_children.length; q++) {
            if (fileMsg_children.eq(q).find('.text_all_two').val() === '') {
                LALERT.msg('Excel对应英文名不能为空')
            } else {
                var fileMsg_obj = {
                    "excel_name": fileMsg_children.eq(q).find('.first_td').text(),
                    "name": fileMsg_children.eq(q).find('.text_all_one').val(),//
                    "en_name": fileMsg_children.eq(q).find('.text_all_two').val(),//   两处改过
                    "is_select": fileMsg_children.eq(q).attr('condition'),
                    "is_show": fileMsg_children.eq(q).attr('t_title')
                }
            }
            tableAltList.push(fileMsg_obj)
        }
        var manifestParam = new Object();
        manifestParam.tableAltList = tableAltList;
        manifestParam.uploadType = localStorage.uploadType_;
        manifestParam.filePath = localStorage.file;
        manifestParam.tableName = table_Name;
        var _data = manifestParam
        $.ajax({
            url: upexcelUrl,
            type: "POST",
            data: JSON.stringify(_data),
            contentType: "application/json;charset=utf-8",
            success: function (e) {
                if (e.status == 200) {
                    LALERT.success(e.message)
                    $.ajax({
                        url: loadUrl,
                        type: "POST",
                        success: function (e) {
                    if (e.data[0].showCol == '') {
                    } else {
                        LALERT.success(e.message)
                        localStorage.setItem("selectParam_data_one", JSON.stringify(e.data[0].selectParam));
                        localStorage.setItem("editParam_data_one", JSON.stringify(e.data[0].allCol));

                        var searchItem = e.data[0].selectParam;
                        var showItem = e.data[0].showCol;
                        var upItem = e.data[0].allCol;

                        $('.search_items').html('')
                        $('.show_items').html('')
                        $('.edit_items').html('')
                        wym_i = -1;
                        if (searchItem.length != 0) {
                            for (var i = 0; i < searchItem.length; i++) {
                                if (e.data[0].selectParam[i].selectValues != null) {
                                    if (i % 4 == 0) {
                                        $('.search_items').append('<div class="row"><div class="four fields wym_m"></div></div>');
                                        wym_i++;
                                    }
                                    $('.search_items>.row>.wym_m').eq(wym_i).append('<div class="four wide field"> <label class="_lab">' + searchItem[i].key + '</label><div class="ui dropdown selection"> <input type="hidden" class="'+ searchItem[i].value + '" value=""> <div class="default text">全部</div> <i class="dropdown icon"></i> <div class="menu _menu"> </div></div></div>')
                                    for (var j = 0; j < searchItem[i].selectValues.length; j++) {
                                        if (searchItem[i].selectValues[j] != null) {

                                                $('.search_items .field').eq(i).find('._menu').append('<option class="item" data-value="'+ e.data[0].selectParam[i].selectValues[j] + '">' + e.data[0].selectParam[i].selectValues[j] + '</option>')


                                            $('.dropdown').dropdown()
                                        }
                                    }

                                } else {
                                    if (i % 4 == 0) {
                                        $('.search_items').append('<div class="row"><div class="four fields wym_m"></div></div>');
                                        wym_i++;
                                    }
                                    $('.search_items>.row>.wym_m').eq(wym_i).append('<div class="four wide field"> <label>' + searchItem[i].key + '</label> <input type="text" placeholder="' + searchItem[i].key + '" class="' + searchItem[i].value + '"> </div>')

                                }
                            }
                        }

                        else {
                            $('.search_items').append('<div class="row searchrow"> <div class="four fields fieldsContent"><div class="four wide field"><label>始发站</label><input type="text" class="destination" placeholder="始发站"> </div> </div> </div>')
                        }

                        if (showItem.length != 0) {
                            $('.show_items').append('<th></th><th class="or">序号</th><th>操作</th>')
                            for (var i = 0; i < showItem.length; i++) {
                                $('.show_items').append('<th>' + showItem[i].key + '</th>')
                            }
                        } else {
                            $('.show_items').append('<th></th><th>序号</th><th>操作</th><th>始发站</th><th>目的站</th><th>中转城市</th><th>起飞机场</th><th>起飞城市</th><th>降落机场</th><th>降落城市</th>')
                        }

                        if (upItem.length != 0) {
                              wym_iii = -1;
                            for (var i = 0; i < upItem.length; i++) {
                                if (e.data[0].allCol[i].selectValues != null) {
                                    if (i % 4 == 0) {
                                        $('.edit_items').append('<div class="row"><div class="four fields wym_m"></div></div>');
                                        wym_iii++;
                                    }
                                    $('.edit_items>.row>.wym_m').eq(wym_iii).append('<div class="four wide field"> <label class="_lab">' + upItem[i].key + '</label><div class="ui dropdown selection"> <input type="hidden" class="'+ upItem[i].value + '" value=""> <div class="default text">全部</div> <i class="dropdown icon"></i> <div class="menu _menu"> </div></div></div>')
                                    for (var j = 0; j < upItem[i].selectValues.length; j++) {
                                        if (upItem[i].selectValues[j] != null) {


                                                $('.edit_items .field').eq(i).find('._menu').append('<option class="item" data-value="'+ e.data[0].allCol[i].selectValues[j] + '">' + e.data[0].allCol[i].selectValues[j] + '</option>')


                                             // }
                                            $('.dropdown').dropdown()
                                        }
                                    }

                                } else {
                                    if (i % 4 == 0) {
                                        $('.edit_items').append('<div class="row"><div class="four fields wym_m"></div></div>');
                                        wym_iii++;
                                    }
                                    $('.edit_items>.row>.wym_m').eq(wym_iii).append('<div class="four wide field"> <label>' + upItem[i].key + '</label> <input type="text" placeholder="' + upItem[i].key + '" class="' + upItem[i].value + '"> </div>')

                                }
                            }


                          
                        }
                    }

            
                            const pagination = new Pagination
                            searchMainList()
                            $('.import_settings_wrap').removeClass('active')
                        },
                        error: function () {
                            LALERT.msg('服务器失败')
                        }
                    })
                    //-------------
                    let searchMainList = () => {
                        // 请求地址
                        const reqUrl = searchUrl;
                        // 请求参数
                        selectParam = [];
                        //取
                        if (localStorage.selectParam_data_one) {
                            var selectParam_data_title = JSON.parse(localStorage.getItem('selectParam_data_one'))

                        }
                        for (let selectParam_ of  selectParam_data_title) {
                            var _val;
                            if($('input').attr("type")=='text'){
                                _val=$("." + selectParam_.value).val()
                            }else{
                                _val=$("." + selectParam_.value).dropdown('get value')
                            }
                            selectParam.push(
                                {"key": selectParam_.value, "value": $("." + selectParam_.value).val()}
                            )
                        }
                        var manifestParam = new Object();
                        manifestParam.selectParam = selectParam;
                        manifestParam.currPage = 1;
                        manifestParam.table_name = table_Name;
                        let params = manifestParam
                        LXHR.POST(reqUrl, JSON.stringify(params), {contentType: 'application/json'}).done(res => {
                            if (res.status === 200) {
                                $(".pageWrap").css('display', 'block')
                                pagination.init('.pageBox', res.data[0], params, reqUrl, renderTable, 0, 'json')
                                renderTable(res.data[0].list, 1)

                            } else {
                                LALERT.msg(res.message)
                            }
                        })
                    }
                }
            },
            error: function () {
                LALERT.msg('服务器失败')
            }
        })
    })

})


