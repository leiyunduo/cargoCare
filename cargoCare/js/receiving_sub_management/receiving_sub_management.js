///收货-国内分单
const pageInfo = {
    isEdit: false,
    edit_order_no: '',
    //baseUrl: 'http://192.168.1.106:8080/lxtd-cca-apis',
    baseUrl: 'http://47.93.90.229/test',
}
let {baseUrl} = pageInfo
//***大小写
function toUpperCase(obj)
{
    obj.value = obj.value.toUpperCase()
}
//**选项卡
$('.tabWrap>a').on('click', function () {
    $('.tabWrap>a').removeClass('active')
    $(this).addClass('active')
    //体积反写值-体积-计重
    if (localStorage.allvolume == "undefined") {
        document.querySelector('.volume').value == ''
    } else if (localStorage.allweight == "undefined") {
        document.querySelector('.weight').value == ''
    }
// 选项卡对应的展示内容
    $('.tabBodyWrap>.tabBox').hide().eq($(this).index()).show()
    $('.volume_length').focus()
    $('.ipt').focus()
    pin()
})
$('.editTabWrap>a').on('click', function () {
    $('.editTabWrap>a').removeClass('active')
    $(this).addClass('active')
    // 选项卡对应的展示内容
    $('.editTabBodyWrap>.tabBox').hide().eq($(this).index()).show()
})
//阻止鼠标点击刷新页面
$('.button').on('click', function () {
    return false
})
//显示二级页面
$('.addBtn').on('click', function () {
    console.log('点击了添加')
    $('.two_level_menu_wrap').css({'display': 'block'})
    $(".item").removeClass('active')
    $(".tabBox").hide()
    $(".msg").show()
    $(".msg").addClass('active')
   // $('input').val('')
    $('.service_record').val('')
    console.log($('.two_level_menu_wrap'))
})
//显示隐藏页面
$('#close_two_level_page').on('click', function () {
    $('.two_level_menu_wrap').hide()
    $(".item").removeClass('active')
    $(".tabBox").hide()
    $(".msg").show()
    $(".msg").addClass('active')
})
$('#edit_close_two_level_page').on('click', function () {
    $('input').val('')
    $('.two_level_menu_wrap').hide()
    $(".item").removeClass('active')
    $(".tabBox").hide()
    $(".msg").show()
    $(".msg").addClass('active')
})
$(function () {
    localStorage.setItem('_page', '0')
    localStorage.setItem('_last', 'flase')
    localStorage.setItem('_next', 'true')
    localStorage.setItem('allpage', '0')
    localStorage.setItem('_nowpage', '0')
    localStorage.setItem('feiyongL', '0')
    localStorage.setItem('WW_serverObj1', '0')
    localStorage.setItem('WW_arr', '0')
    localStorage.setItem('expected_flight_no', '')
    localStorage.setItem('_order_no', '')
//************清空
    $('.qingkong').click(function () {
        $("input").val('')
        $('.service_record').val('')
    })
    $(".chaxun").click(function () {
        $(".shouhuofen").html("")
        //*****页面抓取值********
        var order_three_code = document.querySelector(".order_three_code").value;
        var order_num = document.querySelector(".order_num").value;
        var receipt_type = $(".receipt_type").val();
        var easy_flag = $(".easy_flag").val();
        var departure_status = $(".departure_status").val();
        var departure_code = document.querySelector('.departure_code').value;
        var destination_code = document.querySelector('.destination_code').value;
        var sender_code = document.querySelector('.sender_code').value;
        var receiver_code = document.querySelector('.receiver_code').value;
        var billing_time_start = document.querySelector('.billing_time_start').value;
        var billing_time_end = document.querySelector('.billing_time_end').value;
        var _data = {
            "order_no":order_three_code+order_num,
            "order_three_code": order_three_code,
            "order_num": order_num,
            "receipt_type": receipt_type,
            "easy_flag": easy_flag,
            "departure_status": departure_status,
            "departure": departure_code,
            "destination": destination_code,
            "sender": sender_code,
            "receiver": receiver_code,
            "billing_time_start": billing_time_start,
            "billing_time_end": billing_time_end
        }
        for (i in _data) {
            console.log(_data[i])
            if (_data[i] == '') {
                delete _data[i]
                console.log(_data)
            }
        }
        $.ajax({
             url: baseUrl+'/def/receive/pageQueryReceiveSub/',
            data: _data,
            type: "POST",
            dataType: "json",
            error: function () {
                LALERT.msg('服务器失败')
            },
            success: function (e) {
                if (e.status == '200') {
                    LALERT.success(e.message)
                    if (e.data[0].list.length != '0') {
                        for (i = 0; i < e.data[0].list.length; i++) {
                            $(".pageWrap").css('display','block')
                            localStorage.setItem('_page', e.data[0].pageNum)
                            localStorage.setItem('_next', e.data[0].hasNextPage)
                            localStorage.setItem('_last', e.data[0].hasPreviousPage)
                            localStorage.setItem('allpage', e.data[0].pages)
                            $(".shouhuofen").html()
                            var _status;
                            if (e.data[0].list[i].departure_status == "0") {
                                e.data[0].list[i].departure_status = "未出港";
                            } else if (e.data[0].list[i].departure_status == "1") {
                                e.data[0].list[i].departure_status = "部分出港";
                            } else if (e.data[0].list[i].departure_status == "2") {
                                e.data[0].list[i].departure_status = "已经出港";
                            }
                            if (e.data[0].list[i].state == "0") {
                                e.data[0].list[i].state = "未使用";
                            } else if (e.data[0].list[i].state == "1") {
                                e.data[0].list[i].state = "已使用";
                            }
                            $(".shouhuofen").append('<tr order="' + e.data[0].list[i].order_no + '"><td>' + (i + 1) + '</td><td class="flexCenter padding0 "><div class="roundBg borderRaidus redBg "><i class="icon-loop margin-Left5" title="换单"></i></div><div class="roundBg borderRaidus greenBg editBtn"><i class="edit icon margin-Left5" title="编辑"></i></div><div class="roundBg borderRaidus tealBg"><i class="icon-printer margin-Left5" title="打印"></i></div></td><td>' + e.data[0].list[i].order_no + '</td><td>' + e.data[0].list[i].departure + '</td><td>' + e.data[0].list[i].destination + '</td><td>' + e.data[0].list[i].state + '</td><td>' + e.data[0].list[i].sender_name + '</td><td>' + e.data[0].list[i].receiver_name + '</td><td>' + e.data[0].list[i].billing_time + '</td><td>' + e.data[0].list[i].departure_status + '</td><td>' + e.data[0].list[i].correspond_order_no + '</td><td>' + e.data[0].list[i].sender_telephone + '</td></tr>');

                        }//for
                        if (localStorage.allpage) {
                            $('#M_number').html('')
                            $('#M_number').css({'width': '210px'})
                            for (var i = 0; i < localStorage.allpage; i++) {
                                $('#M_number').append('<a class="item curpage_one">' + (i + 1) + '</ a>')
                            }
                        }
                    } else {
                        LALERT.msg('暂无数据')
                    }//if
                } else if (e.status == '400') {
                    LALERT.msg(e.message)
                }
            }//success
        });//ajax
    })
//下一页
    $("#next_page").click(function () {
        var order_three_code = document.querySelector(".order_three_code").value;
        var order_num = document.querySelector(".order_num").value;
        var receipt_type = $(".receipt_type").val();
        var easy_flag = $(".easy_flag").val();
        var departure_status = $(".departure_status").val();
        var departure_code = document.querySelector('.departure_code').value;
        var destination_code = document.querySelector('.destination_code').value;
        var sender_code = document.querySelector('.sender_code').value;
        var receiver_code = document.querySelector('.receiver_code').value;
        var billing_time_start = document.querySelector('.billing_time_start').value;
        var billing_time_end = document.querySelector('.billing_time_end').value;
        $(".shouhuofen").html("")
        if (localStorage._page < localStorage.allpage) {
            var _nowPage = parseInt(localStorage._page) + 1
            //alert(_nowPage)
            localStorage.setItem('_page', _nowPage)
            $.ajax({
                 url:baseUrl+'/def/receive/pageQueryReceiveSub',
                data: {
                    "order_no":order_three_code+order_num,
                    "order_three_code": order_three_code,
                    "order_num": order_num,
                    "receipt_type": receipt_type,
                    "easy_flag": easy_flag,
                    "departure_status": departure_status,
                    "departure": departure_code,
                    "destination": destination_code,
                    "sender": sender_code,
                    "receiver": receiver_code,
                    "billing_time_start": billing_time_start,
                    "billing_time_end": billing_time_end,
                    "currPage": _nowPage},
                type: "POST",
                dataType: "json",
                error: function () {
                    alert("服务器连接失败");
                },
                success: function (e) {
                    console.log(e)//status 200 message
                    if (e.status == '200') {
                        $('.curpage_one').css({'background': 'white'})
                        $('.curpage_one').eq(localStorage._page - 1).css({'background': '#F7F7F7'})
                        if (localStorage._page > (localStorage.allpage - 5)) {
                            console.log(1)
                            var _pageTow = localStorage._page - 5;
                            console.log(_pageTow)
                            $(".curpage_one").css({
                                'transform': 'translateX(' + -(42 * _pageTow) + 'px)',
                                'transition': '.2s'
                            })
                        } else {
                            console.log(2)
                        }
                        if (e.data[0].list.length != '0') {
                            for (i = 0; i < e.data[0].list.length; i++) {
                                localStorage.setItem('_next', e.data[0].hasNextPage)
                                localStorage.setItem('_last', e.data[0].hasPreviousPage)
                                localStorage.setItem('allpage', e.data[0].pages)
                                $(".shouhuofen").html()
                                var _status;
                                if (e.data[0].list[i].departure_status == "0") {
                                    e.data[0].list[i].departure_status = "未出港";
                                } else if (e.data[0].list[i].departure_status == "1") {
                                    e.data[0].list[i].departure_status = "部分出港";
                                } else if (e.data[0].list[i].departure_status == "2") {
                                    e.data[0].list[i].departure_status = "已经出港";
                                }
                                if (e.data[0].list[i].state == "0") {
                                    e.data[0].list[i].state = "未使用";
                                } else if (e.data[0].list[i].state == "1") {
                                    e.data[0].list[i].state = "已使用";
                                }
                                $(".shouhuofen").append('<tr order="' + e.data[0].list[i].order_no + '"><td>' + (i + 1) + '</td><td class="flexCenter padding0 "><div class="roundBg borderRaidus redBg "><i class="icon-loop margin-Left5" title="换单"></i></div><div class="roundBg borderRaidus greenBg editBtn"><i class="edit icon margin-Left5" title="编辑"></i></div><div class="roundBg borderRaidus tealBg"><i class="icon-printer margin-Left5" title="打印"></i></div></td><td>' + e.data[0].list[i].order_no + '</td><td>' + e.data[0].list[i].departure + '</td><td>' + e.data[0].list[i].destination + '</td><td>' + e.data[0].list[i].state + '</td><td>' + e.data[0].list[i].sender_name + '</td><td>' + e.data[0].list[i].receiver_name + '</td><td>' + e.data[0].list[i].billing_time + '</td><td>' + e.data[0].list[i].departure_status + '</td><td>' + e.data[0].list[i].correspond_order_no + '</td><td>' + e.data[0].list[i].sender_telephone + '</td></tr>');
                            }//for
                        } else {
                           // alert('暂无数据');
                            localStorage._page = localStorage.allpage;
                        }//if
                    } else if (e.status == '400') {
                        //alert(e.message)
                    }

                }//success
            });//ajax
        } else {
           // alert('没有下一页了')
            Mm_SB()
        }
    })//next
    //上一页
    $("#last_page").click(function () {
        var order_three_code = document.querySelector(".order_three_code").value;
        var order_num = document.querySelector(".order_num").value;
        var receipt_type = $(".receipt_type").val();
        var easy_flag = $(".easy_flag").val();
        var departure_status = $(".departure_status").val();
        var departure_code = document.querySelector('.departure_code').value;
        var destination_code = document.querySelector('.destination_code').value;
        var sender_code = document.querySelector('.sender_code').value;
        var receiver_code = document.querySelector('.receiver_code').value;
        var billing_time_start = document.querySelector('.billing_time_start').value;
        var billing_time_end = document.querySelector('.billing_time_end').value;
        $(".shouhuofen").html("")
        if (localStorage._page > 1) {
            var _nowPage = parseInt(localStorage._page) - 1
            //alert(_nowPage)
            localStorage.setItem('_page', _nowPage)
            $.ajax({
                 url:baseUrl+'/def/receive/pageQueryReceiveSub',
                data: {
                    "order_three_code": order_three_code,
                    "order_num": order_num,
                    "receipt_type": receipt_type,
                    "easy_flag": easy_flag,
                    "departure_status": departure_status,
                    "departure": departure_code,
                    "destination": destination_code,
                    "sender": sender_code,
                    "receiver": receiver_code,
                    "billing_time_start": billing_time_start,
                    "billing_time_end": billing_time_end,
                    "currPage": _nowPage},
                type: "POST",
                dataType: "json",
                error: function () {
                    alert("服务器连接失败");
                },
                success: function (e) {
                    console.log(e)//status 200 message
                    if (e.status == '200') {
                        $('.curpage_one').css({'background': 'white'})
                        $('.curpage_one').eq(localStorage._page - 1).css({'background': '#F7F7F7'});
                        $(".curpage_one").css({
                            'transform': 'translateX(' + -(42 * (localStorage._page - 1)) + 'px)',
                            'transition': '.2s'
                        })
                        // alert(e.message)
                        if (e.data[0].list.length != '0') {
                            for (i = 0; i < e.data[0].list.length; i++) {
                                localStorage.setItem('_next', e.data[0].hasNextPage)
                                localStorage.setItem('_last', e.data[0].hasPreviousPage)
                                localStorage.setItem('allpage', e.data[0].pages)
                                $(".shouhuofen").html()
                                var _status;
                                if (e.data[0].list[i].departure_status == "0") {
                                    e.data[0].list[i].departure_status = "未出港";
                                } else if (e.data[0].list[i].departure_status == "1") {
                                    e.data[0].list[i].departure_status = "部分出港";
                                } else if (e.data[0].list[i].departure_status == "2") {
                                    e.data[0].list[i].departure_status = "已经出港";
                                }
                                if (e.data[0].list[i].state == "0") {
                                    e.data[0].list[i].state = "未使用";
                                } else if (e.data[0].list[i].state == "1") {
                                    e.data[0].list[i].state = "已使用";
                                }
                                $(".shouhuofen").append('<tr order="' + e.data[0].list[i].order_no + '"><td>' + (i + 1) + '</td><td class="flexCenter padding0 "><div class="roundBg borderRaidus redBg "><i class="icon-loop margin-Left5" title="换单"></i></div><div class="roundBg borderRaidus greenBg editBtn"><i class="edit icon margin-Left5" title="编辑"></i></div><div class="roundBg borderRaidus tealBg"><i class="icon-printer margin-Left5" title="打印"></i></div></td><td>' + e.data[0].list[i].order_no + '</td><td>' + e.data[0].list[i].departure + '</td><td>' + e.data[0].list[i].destination + '</td><td>' + e.data[0].list[i].state + '</td><td>' + e.data[0].list[i].sender_name + '</td><td>' + e.data[0].list[i].receiver_name + '</td><td>' + e.data[0].list[i].billing_time + '</td><td>' + e.data[0].list[i].departure_status + '</td><td>' + e.data[0].list[i].correspond_order_no + '</td><td>' + e.data[0].list[i].sender_telephone + '</td></tr>');
                            }//for
                        } else {
                           // alert('暂无数据,请点击返回上一页')
                        }//if
                    } else if (e.status == '400') {
                       // alert(e.message)
                    }
                }//success
            });//ajax
        } else {
           // alert('已经是第一页了')
            Mm_SB()
        }
    })//last

    //点击数字页
    /*
     获取当前点击的值和之前点击的值，
     if  当前的比原来的大，往左走
     else  往右
     */
    var _index = [];
    $("#M_number").on('click', '.curpage_one', function () {
        var order_three_code = document.querySelector(".order_three_code").value;
        var order_num = document.querySelector(".order_num").value;
        var receipt_type = $(".receipt_type").val();
        var easy_flag = $(".easy_flag").val();
        var departure_status = $(".departure_status").val();
        var departure_code = document.querySelector('.departure_code').value;
        var destination_code = document.querySelector('.destination_code').value;
        var sender_code = document.querySelector('.sender_code').value;
        var receiver_code = document.querySelector('.receiver_code').value;
        var billing_time_start = document.querySelector('.billing_time_start').value;
        var billing_time_end = document.querySelector('.billing_time_end').value;
        $(".shouhuofen").html("")
        $('.curpage_one').css({'background': 'white'})
        $(this).css({'background': '#F7F7F7'})
        _index.push($(this).text());
        var _indexOld = _index[_index.length - 2];
        var _indexNew = _index[_index.length - 1] - 2
        console.log(_indexNew)
        console.log('左')
        if (_index[_index.length - 1] > _index[_index.length - 2]) {
            $(".curpage_one").css({'transform': 'translateX(' + -(42 * _indexNew) + 'px)', 'transition': '.2s'})
        } else if (_index[_index.length - 1] == _index[_index.length - 2]) {
            console.log('不动')
        } else {
            console.log('右')
            if (_indexNew > -1) {
                $(".curpage_one").css({'transform': 'translateX(' + -(42 * _indexNew) + 'px)', 'transition': '.2s'})
            }
        }
        // console.log('2:'+_index)
        localStorage.setItem('_page', $(this).text())
        if (localStorage._page > localStorage.allpage) {
            alert('无当前页，共' + localStorage.allpage + '页')
        } else {
            $.ajax({
                url:baseUrl+'/def/receive/pageQueryReceiveSub',
                data: {
                    "order_three_code": order_three_code,
                    "order_num": order_num,
                    "receipt_type": receipt_type,
                    "easy_flag": easy_flag,
                    "departure_status": departure_status,
                    "departure": departure_code,
                    "destination": destination_code,
                    "sender": sender_code,
                    "receiver": receiver_code,
                    "billing_time_start": billing_time_start,
                    "billing_time_end": billing_time_end,
                    "currPage": localStorage._page},
                type: "POST",
                dataType: "json",
                error: function () {
                    alert("服务器连接失败");
                },
                success: function (e) {
                    console.log(e)//status 200 message
                    if (e.status == '200') {
                        // alert(e.message)
                        if (e.data[0].list.length != '0') {
                            for (i = 0; i < e.data[0].list.length; i++) {
                                localStorage.setItem('allpage', e.data[0].pages)
                                $(".shouhuofen").html()
                                var _status;
                                if (e.data[0].list[i].departure_status == "0") {
                                    e.data[0].list[i].departure_status = "未出港";
                                } else if (e.data[0].list[i].departure_status == "1") {
                                    e.data[0].list[i].departure_status = "部分出港";
                                } else if (e.data[0].list[i].departure_status == "2") {
                                    e.data[0].list[i].departure_status = "已经出港";
                                }
                                if (e.data[0].list[i].state == "0") {
                                    e.data[0].list[i].state = "未使用";
                                } else if (e.data[0].list[i].state == "1") {
                                    e.data[0].list[i].state = "已使用";
                                }
                                $(".shouhuofen").append('<tr order="' + e.data[0].list[i].order_no + '"><td>' + (i + 1) + '</td><td class="flexCenter padding0 "><div class="roundBg borderRaidus redBg "><i class="icon-loop margin-Left5" title="换单"></i></div><div class="roundBg borderRaidus greenBg editBtn"><i class="edit icon margin-Left5" title="编辑"></i></div><div class="roundBg borderRaidus tealBg"><i class="icon-printer margin-Left5" title="打印"></i></div></td><td>' + e.data[0].list[i].order_no + '</td><td>' + e.data[0].list[i].departure + '</td><td>' + e.data[0].list[i].destination + '</td><td>' + e.data[0].list[i].state + '</td><td>' + e.data[0].list[i].sender_name + '</td><td>' + e.data[0].list[i].receiver_name + '</td><td>' + e.data[0].list[i].billing_time + '</td><td>' + e.data[0].list[i].departure_status + '</td><td>' + e.data[0].list[i].correspond_order_no + '</td><td>' + e.data[0].list[i].sender_telephone + '</td></tr>');

                            }//for
                        } else {
                         //   alert('暂无数据,请点击返回')
                        }//if
                    } else if (e.status == '400') {
                       // alert(e.message)
                    }

                }//success
            });
        }
    })//num page 数字页
})
//跳转数字页
$('.q_Enter').keydown(function (e) {
    var e = e || event;
    if (e.keyCode == 13) {
        $(".shouhuofen").html("");

        var Q_value = $(this).val();
        if (1 <= Q_value && Q_value <= localStorage.allpage) {
            localStorage.setItem('_page', Q_value);
            $('.curpage_one').css({'background': 'white'})
            $('.curpage_one').eq(localStorage._page - 1).css({'background': '#F7F7F7'});
            $(".curpage_one").css({
                'transform': 'translateX(' + -(42 * (localStorage._page - 1)) + 'px)',
                'transition': '.2s'
            })
            Mm_SB()
        } else {
           // alert('填写1~' + localStorage.allpage + '的值')
        }

    }
})
$('.M_index').click(function () {
    $(".shouhuofen").html("")
    localStorage.setItem('_page', 0);
    Mm_SB()
})
$('.M_last').click(function () {
    $(".shouhuofen").html("")
    localStorage.setItem('_page', localStorage.allpage);
    Mm_SB()
})
function Mm_SB() {
    $.ajax({
        url:baseUrl+'/def/receive/pageQueryReceiveSub',
        data: {"currPage": localStorage._page},
        type: "POST",
        dataType: "json",
        error: function () {
            alert("服务器连接失败");
        },
        success: function (e) {
            console.log(e)//status 200 message
            if (e.status == '200') {
                // alert(e.message)
                if (e.data[0].list.length != '0') {
                    for (i = 0; i < e.data[0].list.length; i++) {
                        localStorage.setItem('allpage', e.data[0].pages)
                        $(".shouhuofen").html()
                        var _status;
                        if (e.data[0].list[i].departure_status == "0") {
                            e.data[0].list[i].departure_status = "未出港";
                        } else if (e.data[0].list[i].departure_status == "1") {
                            e.data[0].list[i].departure_status = "部分出港";
                        } else if (e.data[0].list[i].departure_status == "2") {
                            e.data[0].list[i].departure_status = "已经出港";
                        }
                        if (e.data[0].list[i].state == "0") {
                            e.data[0].list[i].state = "未使用";
                        } else if (e.data[0].list[i].state == "1") {
                            e.data[0].list[i].state = "已使用";
                        }
                        $(".shouhuofen").append('<tr order="' + e.data[0].list[i].order_no + '"><td>' + (i + 1) + '</td><td class="flexCenter padding0 "><div class="roundBg borderRaidus redBg "><i class="icon-loop margin-Left5" title="换单"></i></div><div class="roundBg borderRaidus greenBg editBtn"><i class="edit icon margin-Left5" title="编辑"></i></div><div class="roundBg borderRaidus tealBg"><i class="icon-printer margin-Left5" title="打印"></i></div></td><td>' + e.data[0].list[i].order_no + '</td><td>' + e.data[0].list[i].departure + '</td><td>' + e.data[0].list[i].destination + '</td><td>' + e.data[0].list[i].state + '</td><td>' + e.data[0].list[i].sender_name + '</td><td>' + e.data[0].list[i].receiver_name + '</td><td>' + e.data[0].list[i].billing_time + '</td><td>' + e.data[0].list[i].departure_status + '</td><td>' + e.data[0].list[i].correspond_order_no + '</td><td>' + e.data[0].list[i].sender_telephone + '</td></tr>');

                    }//for
                } else {
                   // alert('暂无数据,请点击返回')
                }//if
            } else if (e.status == '400') {
               // alert(e.message)
            }

        }//success
    });
}
//体积选项卡 添加体积基础模板
$('.tijifacus').keydown(function (e) {
    var ev = e || event;
    if (ev.keyCode == 13) {
        $(".item").removeClass('active')
        $(".tabBox").hide()
        $(".tijibox").show()
        $(".tiji").addClass('active');
        $('.volume_length').focus()
    }

})
$('.tiji').click(function () {
    $(".item").removeClass('active')
    $(".tabBox").hide()
    $(".tijibox").show()
    $(".tiji").addClass('active');
    $('.volume_length').focus()
})
//添加客服基础模板
$('.send').click(function (e) {
    $(".item").removeClass('active')
    $(".tabBox").hide()
    $(".sendbox").show()
    $(".send").addClass('active');
    $('.talkerbox').html('');
    $('.content .seriver').focus()
    var New_WW_serverObj1 = JSON.parse(localStorage.WW_serverObj1);
    if (New_WW_serverObj1.length > 0) {
        for (var i = 0; i < New_WW_serverObj1.length; i++) {
            $('.talkerbox').append('<tr class="talker" this_index="' + i + '"><td>' + (i + 1) + '</td><td><div class="ui dropdown selection"><input type="hidden" class="state" value="' + New_WW_serverObj1[i].cust_service_type + '"><div class="default text">未客服</div><i class="dropdown icon"></i><div ww_off="true" class="menu  transition hidden"><div class="item" data-value="0">未客服</div><div class="item" data-value="1">已客服</div></div></div></td><td><input type="text" class="content seriver" value="' + New_WW_serverObj1[i].content + '"></td><td></td><td></td><td><button class="ui medium red button delrecord">删除</button></td</tr>')
        }
    } else {
        $('.talkerbox').append('<tr class="talker"><td>1</td><td><div class="ui dropdown selection"><input type="hidden" class="state" value="0"><div class="default text">未客服</div><i class="dropdown icon"></i><div ww_off="true"  class="menu  transition hidden"><div class="item" data-value="0">未客服</div><div class="item" data-value="1">已客服</div></div></div></td><td><input type="text" class="content seriver"></td><td></td><td></td><td><button class="ui medium red button delrecord">删除</button></td</tr>')

    }
    $('.arrivebox').html('')
    $('.arrivebox').append('<tr class="arrive"><td>1</td><td><div class=" field "><input type="text" name="add_departure_relevant_information_receiver" class="sign_person"></div></td><td><div class=" field "><input type="text" name="add_departure_relevant_information_receive_number" class="sign_quantity"></div></td><td><div class="sixteen wide field "><input type="text" name="add_departure_relevant_information_receive_time" class="sign_time"></div></td><td><div class="sixteen wide field "><input type="text" name="" class="sign_remark"></div></td><td class="update_person"></td><td class="update_time"></td><td><button class="ui medium red button delarrive">删除</button></td></tr>')
})
$('.service_record').keydown(function (e) {
    var ev = e || event;
    if (ev.keyCode == 13) {
        $(".item").removeClass('active')
        $(".tabBox").hide()
        $(".sendbox").show()
        $(".send").addClass('active');
        $('.talkerbox').html('');
        var New_WW_serverObj1 = JSON.parse(localStorage.WW_serverObj1);
        if (New_WW_serverObj1.length > 0) {
            for (var i = 0; i < New_WW_serverObj1.length; i++) {
                $('.talkerbox').append('<tr class="talker" this_index="' + i + '"><td>' + (i + 1) + '</td><td><div class="ui dropdown selection"><input type="hidden" class="state" value="' + New_WW_serverObj1[i].cust_service_type + '"><div class="default text">未客服</div><i class="dropdown icon"></i><div class="menu"><div class="item" data-value="0">未客服</div><div class="item" data-value="1">已客服</div></div></div></td><td><input type="text" class="content seriver" value="' + New_WW_serverObj1[i].content + '"></td><td></td><td></td><td><button class="ui medium red button delrecord">删除</button></td</tr>')
            }
        } else {
            $('.talkerbox').html('')
            $('.talkerbox').append('<tr class="talker"><td>1</td><td><div class="ui dropdown selection"><input type="hidden" class="state" value="0"><div class="default text">未客服</div><i class="dropdown icon"></i><div class="menu"><div class="item" data-value="0">未客服</div><div class="item" data-value="1">已客服</div></div></div></td><td><input type="text" class="content seriver"></td><td></td><td></td><td><button class="ui medium red button delrecord">删除</button></td</tr>')

        }
    }
})

//选项卡end
//***预计航班日期跳转相关航班信息选项卡
$('.about').click(function () {
    $(".item").removeClass('active')
    $(".tabBox").hide()
    $(".aboutbox").show()
    $(".about").addClass('active')
    var order_three_code = document.querySelector("#order_three_code").value;
    var order_num = document.querySelector("#order_num").value;
    localStorage.setItem("_order|_no", order_three_code + order_num)
    //*****相关航班信息
    $.ajax({
        url: baseUrl + '/def/output/booking/getFlightListRelated',
        type: "POST",
        // dataType:"json",
        error: function () {
            LALERT.msg("服务器连接失败")
        },
        success: function (e) {
            LALERT.success(e.message)
            $(".aboutmsg").html('')
            for (var i = 0; i < e.data[0].list.length; i++) {
                localStorage.setItem("_isdomestic", e.data[0].list[i].is_domestic)
                $(".aboutmsg").append('<tr><td><input type="radio" name="aaaaa"></td><td>' + (i + 1) + '</td><td>' + e.data[0].list[i].plan_fry_date + '</td><td>' + e.data[0].list[i].flight_no + '</td><td>' + e.data[0].list[i].departure_name + '</td><td>' + e.data[0].list[i].departure_city_code + '</td><td>' + e.data[0].list[i].plan_fry_time + '</td><td>' + e.data[0].list[i].destination_name + '</td><td>' + e.data[0].list[i].destination_city_name + '</td><td>' + e.data[0].list[i].plan_drop_time + '</td><td>' + e.data[0].list[i].data_sources + '</td><td>' + e.data[0].list[i].model_code + '</td><td>' + e.data[0].list[i].type + '</td><td>' + e.data[0].list[i].available_payload + '</td><td>' + e.data[0].list[i].actual_loads + '</td><td>' + e.data[0].list[i].booking_loads + '</td><td>' + e.data[0].list[i].book_termination + '</td><td>' + e.data[0].list[i].update_person + '</td><td>' + e.data[0].list[i].data_sources + '</td><td>' + e.data[0].list[i].state + '</td></tr>')
            }
        }//success
    });
    //****订舱情况
    $.ajax({
        url: baseUrl + '/def/output/booking/getBookingByOrder',
        data: {"order_no": localStorage._order_no},
        type: "POST",
        // dataType:"json",
        error: function () {
            LALERT.msg("服务器连接失败")
        },
        success: function (e) {
            if (e.status == 200) {
                LALERT.success(e.message)
                $(".abourbook").html('')
                for (var i = 0; i < e.data.length; i++) {
                    $(".abourbook").append('<tr><td><input type="checkbox" name=""></td><td>' + e.data[i].sender + '</td><td>' + e.data[i].product_name + '</td><td>' + e.data[i].reply_weight + '</td><td>' + e.data[i].stowage_quantity + '</td><td>' + e.data[i].sender_weight_rate + '</td><td>' + e.data[i].booking_contact_person + '</td><td>' + e.data[i].booking_contact_person_tel + '</td><td>' + e.data[i].reply_quatity + '</td><td>' + e.data[i].reply_volume + '</td><td>' + e.data[i].reply_person + '</td><td>' + e.data[i].reply_time + '</td></tr>')
                }
            } else {
                LALERT.msg(e.message)
            }

        }//success
    });
})
$('.expected_flight_time').keydown(function (e) {
    var e = e || event;
    if (e.keyCode == 13) {
        $(".item").removeClass('active')
        $(".tabBox").hide()
        $(".aboutbox").show()
        $(".about").addClass('active')
        var order_three_code = document.querySelector("#order_three_code").value;
        var order_num = document.querySelector("#order_num").value;
        localStorage.setItem("_order_no", order_three_code + order_num)
        //*****相关航班信息
        $.ajax({
            url: baseUrl + '/def/output/booking/getFlightListRelated',
            /* data:,*/
            type: "POST",
            // dataType:"json",
            error: function () {
                LALERT.success("服务器连接失败")
            },
            success: function (e) {
                if (e.status == 200) {
                    LALERT.success(e.message)
                    $(".aboutmsg").html('')
                    for (var i = 0; i < e.data[0].list.length; i++) {
                        localStorage.setItem("_isdomestic", e.data[0].list[i].is_domestic)
                        $(".aboutmsg").append('<tr><td><input type="radio" name="aaaaa"></td><td>' + (i + 1) + '</td><td>' + e.data[0].list[i].plan_fry_date + '</td><td>' + e.data[0].list[i].flight_no + '</td><td>' + e.data[0].list[i].departure_name + '</td><td>' + e.data[0].list[i].departure_city_code + '</td><td>' + e.data[0].list[i].plan_fry_time + '</td><td>' + e.data[0].list[i].destination_name + '</td><td>' + e.data[0].list[i].destination_city_name + '</td><td>' + e.data[0].list[i].plan_drop_time + '</td><td>' + e.data[0].list[i].data_sources + '</td><td>' + e.data[0].list[i].model_code + '</td><td>' + e.data[0].list[i].type + '</td><td>' + e.data[0].list[i].available_payload + '</td><td>' + e.data[0].list[i].actual_loads + '</td><td>' + e.data[0].list[i].booking_loads + '</td><td>' + e.data[0].list[i].book_termination + '</td><td>' + e.data[0].list[i].update_person + '</td><td>' + e.data[0].list[i].data_sources + '</td><td>' + e.data[0].list[i].state + '</td></tr>')
                    }
                } else {
                    LALERT.msg(e.message)
                }

            }//success
        });
        //****订舱情况
        $.ajax({
            url: baseUrl + '/def/output/booking/getBookingByOrder',
            data: {"order_no": localStorage._order_no},
            type: "POST",
            // dataType:"json",
            error: function () {
                LALERT.msg("服务器连接失败")
            },
            success: function (e) {
                console.log(e)
                if (e.status == 200) {
                    LALERT.success(e.message)
                    $(".abourbook").html('')
                    for (var i = 0; i < e.data.length; i++) {
                        $(".abourbook").append('<tr><td><input type="checkbox" name=""></td><td>' + e.data[i].sender + '</td><td>' + e.data[i].product_name + '</td><td>' + e.data[i].reply_weight + '</td><td>' + e.data[i].stowage_quantity + '</td><td>' + e.data[i].sender_weight_rate + '</td><td>' + e.data[i].booking_contact_person + '</td><td>' + e.data[i].booking_contact_person_tel + '</td><td>' + e.data[i].reply_quatity + '</td><td>' + e.data[i].reply_volume + '</td><td>' + e.data[i].reply_person + '</td><td>' + e.data[i].reply_time + '</td></tr>')
                    }
                } else {
                    LALERT.msg(e.message)
                }

            }//success
        });
    } else {
       // LALERT.msg('请按住你的enter键')
    }
})
//收货分单管理  input 选中
$('.aboutmsg').on('click', 'input', function () {
    localStorage.expected_flight_time = $(this).parent().next().next().text()
    localStorage.expected_flight_no = $(this).parent().next().next().next().text();
    // console.log()
    $('.expected_flight_time').val(localStorage.expected_flight_time)
    $('.expected_two_flight_code').val(localStorage.expected_flight_no.slice(0, 2))
    $('.expected_flight_num').val(localStorage.expected_flight_no.slice(2, 6))
})
//点击确认
$('.M_confirm').click(function () {
    if(localStorage.expected_flight_no!='0'){
        $(".item").removeClass('active')
        $(".tabBox").hide()
        $(".msg").show()
        $(".msg").addClass('active')
        $('.expected_flight_time').focus()
    }else{
        alert('请选择')
    }
})
//***开单费用 - 价种
$('._putong').click(function () {
    $('._menu_item').html('');
  // var order_three_code = document.querySelector("#order_three_code").value;
    var order_num = document.querySelector("#order_num").value;
    var destination_code = document.querySelector('#destination_code').value;
    var air_transit = document.querySelector('.air_transit').value;
    var weight = document.querySelector('.weight').value;
    var quantity = document.querySelector('.quantity').value;
    var sender_code = document.querySelector('.sender_code').value;
    var sender_name = document.querySelector('#sender_name').value;
    //var association_point_code = document.querySelector(".association_point_code").value;
   /* var first_transfer_name = document.querySelector('.first_transfer_name').value;
    var flight_num = localStorage.expected_flight_no.slice(2, 6);*/
    var product_name = document.querySelector('.product_name').value;
    var product_code = document.querySelector('.product_code').value;
    var product_category = document.querySelector('.product_category').value;
   // var your_category = document.querySelector('.your_category').value;
    localStorage.setItem("_three_order_no", order_three_code)
    localStorage.setItem("_quantity", quantity)
    localStorage.setItem("_order_no", order_three_code + order_num)
    $.ajax({
        url: baseUrl+'/def/receive/getMainSingleFlightRate/',
        data: {
            "type": 1,
            //"order_three_code": localStorage._three_order_no,
            "destination_code": destination_code,
            "weight": weight,
            "quantity": quantity,
            "sender_code":sender_code,
            "sender_name":sender_name,
            /*"first_transfer_code": first_transfer_code,
            "first_transfer_name": first_transfer_name,
            "flight_num": flight_num,*/
            "product_name": product_name,
            "product_code": product_code,
            "product_category": product_category,
            //"your_category": your_category,
        },
        type: "POST",
        // dataType:"json",
        error: function () {
            LALERT.msg('服务器失败')
        },
        success: function (e) {
            if (e.status == 200) {
                LALERT.success(e.message)
                for (var i = 0; i < e.data.length; i++) {
                    localStorage.setItem("_cosntid", e.data[i].id)
                    $('._menu_item').append('<div class="item _itemOne" price="' + e.data[i].price_code + '" id="' + e.data[i].lowest_billing + '" title="' + e.data[i].invoice_choice_way + '" alt="' + e.data[i].invoice_price + '" data-value="' + e.data[i].price_species + '">' + e.data[i].price_species + '</div>')
                }
            } else {
                LALERT.msg(e.message)
            }

        }
    });
})
$('.QQ_money').click(function(){
    $('._money').html('')

    var W_arr2=JSON.parse(localStorage.WW_arr)
    if (W_arr2.length > 0) {
        for (var a = 0; a < W_arr2.length; a++) {
            $("._money").append('<tr this_index="'+a+'"><td>' + (a+1) + '</td><td><input type="text" value="'+W_arr2[a].cost_name+'"></td><td><input type="text" value="'+W_arr2[a].payer+'"></td><td><input type="text" value="'+W_arr2[a].payee+'"></td><td><input type="text" value=""></td><td><input type="text" value="'+W_arr2[a].invoice_price+'"></td><td><input type="text" value="'+W_arr2[a].invoice_choice_way+'"></td><td><input type="text" value="'+W_arr2[a].absolute_cost+'"></td><td><input type="text" value="'+W_arr2[a].actual_cost+'"></td><td><input type="text" value=""></td><td><input type="text" value="'+W_arr2[a].remark+'"></td><td><input type="text" value="" class="M_add"></td><td><button class="ui Medium red button shanqian">删除</button></td></tr>')
        }
    } else {
        $("._money").append('<tr this_index="0"><td>1</td><td><input type="text" value=""></td><td><input type="text" value=""></td><td><input type="text" value=""></td><td><input type="text" value=""></td><td><input type="text" value=""></td><td><input type="text" value=""></td><td><input type="text" value=""></td><td><input type="text" value=""></td><td><input type="text" value=""></td><td><input type="text" value=""></td><td><input type="text" value="" class="M_add"></td><td><button class="ui Medium red button shanqian">删除</button></td></tr>')
    }

    cost()
})
//  开单费用 删除

$("._money").on('click','.shanqian',function(){
    // var $(this).parents('.w_table').children().attr('this_index')
    $('._money').html('')
    feiyongLength--;
    var WW_arr1 = JSON.parse(localStorage.WW_arr);
    var this_index = $(this).parents('tr').attr('this_index')
    console.log(this_index,WW_arr1)
    if (this_index) {
        WW_arr1.splice(this_index, 1);
        for (var a = 0; a < WW_arr1.length; a++) {
            $("._money").append('<tr this_index="'+a+'"><td>' + (a+1) + '</td><td><input type="text" value="'+WW_arr1[a].cost_name+'"></td><td><input type="text" value="'+WW_arr1[a].payer+'"></td><td><input type="text" value="'+WW_arr1[a].payee+'"></td><td><input type="text" value=""></td><td><input type="text" value="'+WW_arr1[a].invoice_price+'"></td><td><input type="text" value="'+WW_arr1[a].invoice_choice_way+'"></td><td><input type="text" value="'+WW_arr1[a].absolute_cost+'"></td><td><input type="text" value="'+WW_arr1[a].actual_cost+'"></td><td><input type="text" value=""></td><td><input type="text" value="'+WW_arr1[a].remark+'"></td><td><input type="text" value="" class="M_add"></td><td><button class="ui Medium red button shanqian">删除</button></td></tr>')
        }
        WW_arr = JSON.stringify(WW_arr1);
        localStorage.setItem("WW_arr", WW_arr)


    } else {
        LALERT.msg('这个不能删除')

    }

})
//收货开单费用查询
$('._menu_item').on('click', '._itemOne', function () {
    localStorage.setItem('_invoice_choice_way', $(this).attr("title"))
    localStorage.setItem('_invoice_price', $(this).attr("alt"))
    localStorage.setItem('_lowest_billing', $(this).attr("id"))
    var weight = document.querySelector('.weight').value;
    localStorage.setItem('_weight', weight)
    console.log($(this).attr("title"));
    console.log(weight);
    $('._feilv').val($(this).attr("alt"))
    $('.pricecode').val($(this).attr("price"))
    //跳转至开单费用选项卡
    cost()
})
function cost(){
    $(".item").removeClass('active')
    $(".tabBox").hide()
    $(".money").show()
    $(".money").addClass('active')
    var three_code = document.querySelector('#order_three_code').value;
    var NUM = document.querySelector('#order_num').value;
    var quantity = document.querySelector('.quantity').value;
    var weight = document.querySelector('.weight').value;
    var billing_location = document.querySelector('.billing_location').value;
    var air_transit = document.querySelector('.air_transit').value;
    var sender_name = document.querySelector('#sender_name').value;
    var sender_code = document.querySelector('.sender_code').value;
    // var association_point_code = document.querySelector('.association_point_code').value;
    var product_name = document.querySelector('.product_name').value;
    var product_code = document.querySelector('.product_code').value;
    var destination_code = document.querySelector('.destination_code').value;
    var product_category = document.querySelector('.product_category').value;
    $.ajax({
        url: baseUrl+'/def/receive/getCostItem',
        data: {
            "type": 1,
            "id": localStorage._cosntid,
            "weight": weight,
            "quantity": quantity,
            "is_domestic": localStorage.is_domestic,
            "destination_code":destination_code,
            "product_name":product_name,
            "product_code":product_code,
            "billing_location":billing_location,
            "order_no": three_code+NUM,
            "product_category": product_category,
            "sender_code": sender_code,
            "sender_name": sender_name
        },
        type: "POST",
        // dataType:"json",
        error: function () {
            LALERT.msg('服务器失败')
        },
        success: function (e) {
            console.log(e)
            if (e.status == 200) {
                LALERT.success(e.message)
                $("._money").html('')
                for (var l = 0; l < e.data.length; l++) {
                    $("._money").append('<tr><td>' + (l + 1) + '</td><td><input type="text" value="' + e.data[l].cost_name + '"></td><td><input type="text" value="' + e.data[l].payer + '"></td><td><input type="text" value="' + e.data[l].payee + '"></td><td><input type="text" value="' + e.data[l].relevance_name + '"></td><td><input type="text" value="' + e.data[l].invoice_price + '"></td><td><input type="text" value="' + e.data[l].invoice_choice_way + '"></td><td><input type="text" value="' + e.data[l].absolute_cost + '"></td><td><input type="text" value="' + e.data[l].actual_cost + '"></td><td><input type="text" value="' + e.data[l].is_lock + '"></td><td><input type="text" value="' + e.data[l].remark + '"></td><td><input type="text" value="' + e.data[l].impact + '"></td><td><button class="ui Medium red button">删除</button></td></tr>')
                    //合计
                    //$("._money").append('<tr><td>合计</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>')
                }
                $("._money").append('<tr><td></td><td><input type="text" value=""></td><td><input type="text" value=""></td><td><input type="text" value=""></td><td><input type="text" value=""></td><td><input type="text" value=""></td><td><input type="text" value=""></td><td><input type="text" value=""></td><td><input type="text" value=""></td><td><input type="text" value=""></td><td><input type="text" value=""></td><td><input type="text" value=""></td><td><button class="ui Medium blue button M_add">添加</button></td></tr>')
            } else {
                LALERT.msg(e.message)
            }
        }
    });
}
//**收货分单保存**
$(".tianjia").click(function () {
    var order_three_code = document.querySelector("#order_three_code").value;
    var order_num = document.querySelector("#order_num").value;
    var departure_code = document.querySelector('#departure_code').value;
    //var departure_name=document.querySelector('.departure_name').value;
    var destination_code = document.querySelector('#destination_code').value;
    //var destination_name=document.querySelector('.destination_name').value;
    var sender_code = document.querySelector('#fa').value;
    var sender_name = document.querySelector('#sender_name').value;
    var receiver_code = document.querySelector('#shou').value;
    var receiver_name = document.querySelector('#receiver_name').value;

    var sender_name = document.querySelector('.sender_name').value;
    var sender_telephone = document.querySelector('.sender_telephone').value;
    var sender_fax = document.querySelector('.sender_fax').value;
    var sender_sms_notification = document.querySelector('.sender_sms_notification').value;
    var sender_address = document.querySelector('.sender_address').value;
    var receiver_name = document.querySelector('.receiver_name').value;
    var receiver_telephone = document.querySelector('.receiver_telephone').value;
    var receiver_fax = document.querySelector('.receiver_fax').value;
    var receiver_sms_notification = document.querySelector('#receiver_sms_notification').value;
    var delivery_mode = document.querySelector('.delivery_mode').value;
    var receiver_address = document.querySelector('.receiver_address').value;
    var carrier_storage_remark = document.querySelector('.carrier_storage_remark').value;
    var other_storage_remark = document.querySelector('.other_storage_remark').value;
    var billing_remark = document.querySelector('.billing_remark').value;
    var starting_point_operation = document.querySelector('.starting_point_operation').value;
    var first_transfer_code = document.querySelector('.first_transfer_code').value;
    var first_transfer_name = document.querySelector('.first_transfer_name').value;
    var air_transit = document.querySelector('.air_transit').value;
    var second_transfer_code = document.querySelector('.second_transfer_code').value;
    var second_transfer_name = document.querySelector('.second_transfer_name').value;
    var transshipment_unit = document.querySelector('.transshipment_unit').value;
    var correspond_order_no = document.querySelector('.correspond_order_no').value;
    var expected_flight_time = document.querySelector('.expected_flight_time').value;
    var expected_flight_num = document.querySelector('.expected_flight_num').value;
    var product_no = document.querySelector('.product_no').value;
    var product_name = document.querySelector('.product_name').value;
    var product_code = document.querySelector('.product_code').value;
    var product_category_code = document.querySelector('.product_category_code').value;
    var product_category = document.querySelector('.product_category').value;
    var your_category_code = document.querySelector('.your_category_code').value;
    var your_category = document.querySelector('.your_category').value;
    var packaging_code = document.querySelector('.packaging_code').value;
    var packaging_name = document.querySelector('.packaging_name').value;
    var departure_priority = document.querySelector('.departure_priority').value;
    var quantity = document.querySelector('.quantity').value;
    var net_weight = document.querySelector('.net_weight').value;
    var volume = document.querySelector('.volume').value;
    var weight = document.querySelector('.weight').value;
    var clearing_unit = document.querySelector('.clearing_unit').value;
    var clearing_unit_code = document.querySelector('.clearing_unit_code').value;
    var discount = document.querySelector('.discount').value;
    var payment_method = document.querySelector('.payment_method').value;
    var receipt_type = document.querySelector('#receipt_type_type').value;
    var state = document.querySelector('#state').value;
    var billing_time = document.querySelector('.billing_time').value;
    var issuer = document.querySelector('.issuer').value;
    var billing_location = document.querySelector('.billing_location').value;
    var update_time = document.querySelector('.update_time').value;
    var update_person = document.querySelector('.update_person').value;
    var expected_two_flight_code = document.querySelector('.expected_two_flight_code').value;
    var service_record = document.querySelector('.service_record').value;
    var price_species_name = $("._putong")>$('input').val()
    var invoice_price = $('._feilv').val()
    var price_species_code = $('.pricecode').val()
    //隐藏体积请求参数
//*********_datas
    var _datas = {
        "order_three_code": order_three_code,
        "order_num": order_num,
        "departure_code": departure_code, /*"departure_name":departure_name,*/
        "destination_code": destination_code,
        "sender_code": sender_code,
        "sender_name": sender_name,
        "receiver_code": receiver_code,
        "receiver_name": receiver_name,
        "sender_name": sender_name,
        "sender_telephone": sender_telephone,
        "receiver_name": receiver_name,
        "receiver_telephone": receiver_telephone,
        "sender_sms_notification": sender_sms_notification,
        "sender_fax": sender_fax,
        "receiver_fax": receiver_fax,
        "receiver_sms_notification": receiver_sms_notification,
        "delivery_mode": delivery_mode,
        "sender_address": sender_address,
        "receiver_address": receiver_address,
        "carrier_storage_remark": carrier_storage_remark,
        "other_storage_remark": other_storage_remark,
        "billing_remark": billing_remark,
        "starting_point_operation": starting_point_operation,
        "first_transfer_code": first_transfer_code,
        "first_transfer_name": first_transfer_name,
        "air_transit": air_transit,
        "second_transfer_code": second_transfer_code,
        "second_transfer_name": second_transfer_name,
        "transshipment_unit": transshipment_unit,
        "correspond_order_no": correspond_order_no,
        "expected_flight_time": expected_flight_time,
        "expected_two_flight_code": expected_two_flight_code,
        "expected_flight_num": expected_flight_num,
        "product_no": product_no,
        "product_name": product_name,
        "product_code": product_code,
        "product_category_code": product_category_code,
        "product_category": product_category,
        "your_category_code": your_category_code,
        "your_category": your_category,
        "packaging_code": packaging_code,
        "packaging_name": packaging_name,
        "departure_priority": departure_priority,
        "quantity": quantity,
        "net_weight": net_weight,
        "volume": volume,
        "weight": weight,
        "clearing_unit": clearing_unit,
        "clearing_unit_code":clearing_unit_code,
        "discount": discount,
        "payment_method": payment_method,
        "state": state,
        "receipt_type": 0,
        "service_record": service_record,
        "billing_time": billing_time,
        "issuer": issuer,
        "billing_location": billing_location,
        "update_time": update_time,
        "update_person": update_person,
        "expected_two_flight_code": expected_two_flight_code,
        "price_species_name": price_species_name,
        "invoice_price": invoice_price,
        "price_species_code": price_species_code,
        "volumeList": volumeInfo.volumeList, //体积
        "costItemList": W_arr, //费用
        "custServiceList":WW_server,//客服
    }
    /*for (i in _datas) {
        console.log(_datas[i])
        if (_datas[i] == '') {
            delete _datas[i]
            console.log(_datas)
        }
    }*/
    localStorage.setItem('_order_no', '' + order_three_code + '' + order_num + '')
    //保存时的验证
    let validate = $('.ui.form.add_billing_details').form('is valid')
    console.log($('.ui.form.add_billing_details').form('is valid'))
    if(!validate){
        $('.ui.form').form('validate form')
        return  //校验通过直接加载ajax
    }
    //保存时的验证
    //ajax
    $.ajax({
        url: baseUrl+'/def/receive/insertReceiveSub/',
        data: JSON.stringify(_datas),
        type: "POST",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        error: function () {
            console.log(JSON.stringify(_datas))
            alert("服务器连接失败");
        },
        success: function (e) {
            console.log(JSON.stringify(_datas))
            console.log(e)
            if (e.status == 200) {
                alert(e.message)
                $('.two_level_menu_wrap').hide()
               /* $('input').val('')
                $('.receiver_code').val('')*/
            } else if (e.status == 400) {
                alert(e.message)
            } else {
                alert("分单信息录入失败~")
            }
        }
    });
})
//添加钱
var W_arr = [];
var feiyongLength=1;
$('.w_table').on('keydown', '.M_add', function (e) {
    var ev=e||event;
    if(ev.keyCode==13){
        feiyongLength++;
        $("._money").append('<tr><td>'+(Number(localStorage.feiyongL)+feiyongLength)+'</td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text" class="M_add"></td><td><button class="ui Medium red button">删除</button></td></tr>')
        // var _thisTr=$(this).parents('tr').children().children('input');
        var _thisTr = $(this).parents('._money').children();
        for (var i = 0; i < _thisTr.length; i++) {
            var all_Val = _thisTr.eq(i).children().find('input')
            // for(var j=0;j<all_Val.length;j++){
            // console.log(all_Val.length)
            // }
            var W_Obg = {
                "cost_name": all_Val.eq(0).val(),
                "payer": all_Val.eq(1).val(),
                "relevance_id": all_Val.eq(3).attr('id'),// 关联性id
                "invoice_price": all_Val.eq(4).val(),
                "invoice_choice_way": all_Val.eq(5).val(),
                "is_lock": 0,
                "absolute_cost": all_Val.eq(6).val(),
                "actual_cost": all_Val.eq(7).val(),
                "remark": all_Val.eq(9).val(),
                "is_sys_cost": 1,
                "payee": all_Val.eq(2).val(),
                "related_type": 0
            };
            W_arr.push(W_Obg);
            var WW_arr = JSON.stringify(W_arr);
            localStorage.setItem("WW_arr", WW_arr)

        }
    }
})
//价种添加
//***体积
var volumeInfo = new VolumeInfo
volumeInfo.init()
console.log(volumeInfo.volumeList) //体积数组
//***体积
//**体积确认返回
$('._back').click(function () {
    //alert(5)
    $(".item").removeClass('active')
    $(".tabBox").hide()
    $(".msg").show()
    $(".msg").addClass('active')
    $('.volume').focus()
    var sumVolume = $(".sumVolume").html()
    var sumVolumeWeight = $(".sumVolumeWeight").html();
    var net_weight=$('.net_weight').val();
    // console.log(net_weight)
    if(net_weight>sumVolumeWeight){
        $('.weight').val(net_weight);
    }else{
        $('.weight').val(sumVolumeWeight);
    }

    $('.tijifacus ').val(sumVolume)

    var WW_serverObj = JSON.stringify(WW_server);
    localStorage.setItem("WW_serverObj1", WW_serverObj)
    var New_WW_serverObj1 = JSON.parse(localStorage.WW_serverObj1);
    var mark = '';
    for (var j = 0; j < New_WW_serverObj1.length - 1; j++) {
        mark += New_WW_serverObj1[j].state + '   ' + New_WW_serverObj1[j].content + ';';
    }
    $('.service_record').val(mark);

})
//添加客服
var WW_server = [];

$('.talkerbox').on('keydown', '.seriver', function (e) {
    var ev = e || event;
    if (ev.keyCode == 13) {
        WW_server = [];
        localStorage._W_server=''

        $('.talkerbox').append('<tr class="talker"><td></td><td><div class="ui dropdown selection"><input type="hidden" class="state" value="0"><div class="default text">未客服</div><i class="dropdown icon"></i><div class="menu"><div class="item" data-value="0">未客服</div><div class="item" data-value="1">已客服</div></div></div></td><td><input type="text" class="content seriver"></td><td></td><td></td><td><button class="ui medium red button delrecord">删除</button></td></tr>')

        var serL = $(this).parents('.talkerbox').children('tr')
        for (var i = 0; i < serL.length; i++) {
            var state = serL.eq(i).find('.state').val()
            var con = serL.eq(i).find('.seriver').val()
            var serObj = {
                "order_no": localStorage.order_no,
                "cust_service_type": 0,
                "state": state,
                "content": con,
                "entry_person": "wangyimeng",
                "entry_time": "20170524"
            }
            WW_server.push(serObj);
        }

        $('.talkerbox').html('');
        for(var a=0;a<WW_server.length;a++ ){
            if(a!=(WW_server.length-1)){
                console.log(WW_server)
                $('.talkerbox').append('<tr class="talker" this_index="' + a + '"><td>' + (a + 1) + '</td><td><div class="ui dropdown selection"><input type="hidden" class="state" value="' + WW_server[a].cust_service_type + '"><div class="default text">未客服</div><i class="dropdown icon"></i><div ww_off="true" class="menu transition hidden"><div class="item" data-value="0">未客服</div><div class="item" data-value="1">已客服</div></div></div></td><td><input type="text" class="content " value="' + WW_server[a].content + '"></td><td></td><td></td><td><button class="ui medium red button delrecord">删除</button></td</tr>')

            }else{
                console.log(WW_server)

                $('.talkerbox').append('<tr class="talker" this_index=""><td></td><td><div class="ui dropdown selection"><input type="hidden" class="state" value=""><div class="default text">未客服</div><i class="dropdown icon"></i><div ww_off="true" class="menu transition hidden"><div class="item" data-value="0">未客服</div><div class="item" data-value="1">已客服</div></div></div></td><td><input type="text" class="content seriver" value=""></td><td></td><td></td><td><button class="ui medium red button delrecord">删除</button></td</tr>')

            }
        }
    }

})
//    客服记录  下拉框    有问题
$('.talkerbox').on('click', '.selection', function (e) {

    var This_menu=$(this).children('.menu');
    console.log(This_menu.attr('ww_off'))
    if(This_menu.attr('ww_off')=='true'){
        This_menu.removeClass('hidden').addClass('visible active ');
        This_menu.css({'transition':'0.5s','display':'block !important'})
        This_menu.attr('ww_off','false')
    }else{
        // alert(1)
        This_menu.removeClass('visible').addClass('hidden').css('transition','0.5s');
        This_menu.attr('ww_off','true')

    }

})
//***删除客服
$('.talkerbox').on('click', '.delrecord', function () {
    var this_index = $(this).parents('tr').attr('this_index')
    if (this_index) {
        $('.talkerbox').html('')
        WW_server.splice(this_index, 1);
        for (var a = 0; a < WW_server.length; a++) {
            if(a!=(WW_server.length-1)){
                // console.log(WW_server)
                $('.talkerbox').append('<tr class="talker" this_index="' + a + '"><td>' + (a + 1) + '</td><td><div class="ui dropdown selection"><input type="hidden" class="state" value="' + WW_server[a].cust_service_type + '"><div class="default text">未客服</div><i class="dropdown icon"></i><div ww_off="true" class="menu transition hidden"><div class="item" data-value="0">未客服</div><div class="item" data-value="1">已客服</div></div></div></td><td><input type="text" class="content " value="' + WW_server[a].content + '"></td><td></td><td></td><td><button class="ui medium red button delrecord">删除</button></td</tr>')

            }else{
                // console.log(WW_server)

                $('.talkerbox').append('<tr class="talker" this_index=""><td></td><td><div class="ui dropdown selection"><input type="hidden" class="state" value=""><div class="default text">未客服</div><i class="dropdown icon"></i><div ww_off="true" class="menu transition hidden"><div class="item" data-value="0">未客服</div><div class="item" data-value="1">已客服</div></div></div></td><td><input type="text" class="content seriver" value=""></td><td></td><td></td><td><button class="ui medium red button delrecord">删除</button></td</tr>')

            }
        }
    } else {
        LALERT.msg('这个不能删除')

    }
})

//*******作废
$("._del").click(function () {
    var san=$('#order_three_code_').val()
    var no=$('#order_num_').val()

    $.ajax({
        url:baseUrl+'/def/receive/deleteReceiveSub/',
        data: {"order_no": san+no},
        type: "POST",
        // dataType:"json",
        error: function () {
            alert("服务器连接失败");
        },
        success: function (e) {
            console.log(e)
            alert(e.message)
            $('.edit_two_level_menu_wrap').hide()

        }
    });
})
//      到达情况 添加
var ddqkIndex=1;
var ddqkarr=[];
$('.arrivebox').on('keydown','.sign_remark',function(){
    var e = e || event;
    if (e.keyCode == 13) {

        // if(localStorage._order_no==''){
        //     alert('请输入运单号')
        // }else{
        ddqkarr=[];
        ddqkIndex++;
        $('.arrivebox').append('<tr class="arrive"><td class="ddqkIndex">'+ddqkIndex+'</td><td><div class=" field "><input type="text" name="add_departure_relevant_information_receiver" class="sign_person"></div></td><td><div class=" field "><input type="text" name="add_departure_relevant_information_receive_number" class="sign_quantity"></div></td><td><div class="sixteen wide field "><input type="text" name="add_departure_relevant_information_receive_time" class="sign_time"></div></td><td><div class="sixteen wide field Q_ddqk_keydown"><input type="text" name="" class="sign_remark"></div></td><td class="update_person1"></td><td class="update_time"></td><td><button class="ui medium red button delarrive">删除</button></td></tr>')

        var This_ddqk_Tr=$(this).parents('tr');
        var This_ddqk_Tr1=$(this).parents('.arrivebox').children();
        var sign_person = This_ddqk_Tr.find(".sign_person").val()
        var sign_quantity = This_ddqk_Tr.find(".sign_quantity").val()
        var sign_time = This_ddqk_Tr.find(".sign_time").val()
        var sign_remark = This_ddqk_Tr.find(".sign_remark").val();
        var update_person1=This_ddqk_Tr.find(".update_person1");
        var update_time=This_ddqk_Tr.find(".update_time");
        $.ajax({
            url: baseUrl + '/def/receive/insertArrive/',
            data: {
                "order_no": localStorage._order_no,
                "sign_person":sign_person,
                "sign_quantity":sign_quantity,
                "sign_time":sign_time,
                "sign_remark":sign_remark


            },  //用固定单号可以查到数据
            type: "POST",
            // dataType:"json",
            error: function () {
                LALERT.msg("服务器连接失败")
            },
            success: function (e) {
                LALERT.success(e.message)
                $.ajax({
                    url: baseUrl + '/def/receive/getArrive/',
                    data: {"order_no": localStorage._order_no},  ///用固定单号可以查到数据
                    type: "POST",
                    // dataType:"json",
                    error: function () {
                        LALERT.msg("服务器连接失败")
                    },
                    success: function (e) {
                        // console.log(e)
                        if (e.status == 200) {
                            if (e.data.length == 0) {
                                LALERT.msg('暂无出发数据')
                            } else {
                                LALERT.success(e.message)//sign_time
                                // console.log(e.data[e.data.length-1].update_person)
                                update_person1.html(e.data[e.data.length-1].update_person);
                                update_time.text(e.data[e.data.length-1].update_time);
                                This_ddqk_Tr.find(".sign_time").val(e.data[e.data.length-1].sign_time)
                                This_ddqk_Tr.attr('id',e.data[e.data.length-1].id)
                            }
                        } else {
                            LALERT.msg(e.message)
                        }

                    }//success
                });

            }//success
        });

        for(var j=0;j<This_ddqk_Tr1.length;j++){
            This_ddqk_Tr1.eq(j).find('.sign_remark').removeClass('sign_remark')
        }
        This_ddqk_Tr1.eq(This_ddqk_Tr1.length-1).find('.Q_ddqk_keydown').children().addClass('sign_remark')



        // }
    }
})
//      到达情况 删除

$('.arrivebox').on('click','.delarrive',function(){
    var This_remove=$(this).parents('tr');
    var This_last_tr=$(this).parents('.arrivebox').children('tr');
    // console.log(This_last_tr.length)
    var This_id=$(this).parents('tr').attr('id');
    $.ajax({
        url: baseUrl + '/def/receive/deleteArrive/',
        data: {"id": This_id},
        type: "POST",
        error: function () {
            // LALERT.msg("服务器连接失败")
        },
        success: function (e) {
            // console.log(e)
            if (e.status == 200) {
                LALERT.msg(e.message);
                ddqkIndex--;
                This_remove.remove();
                var index_id=$('.arrivebox').find('[id]')
                for(var i=0;i<index_id.length;i++){
                    index_id.eq(i).attr('this_indx',i+1);
                    index_id.eq(i).find('.ddqkIndex').text( index_id.eq(i).attr('this_indx'));

                }
                for(var j=0;j<This_last_tr.length;j++){
                    This_last_tr.eq(j).find('.sign_remark').removeClass('sign_remark')
                }
                This_last_tr.eq(This_last_tr.length-1).find('.Q_ddqk_keydown').children().addClass('sign_remark')
                This_last_tr.eq(This_last_tr.length-1).find('.ddqkIndex').text(ddqkIndex)


            }
        }
    });

})


/*    $('._back1').click(function(){
 alert(1)
 })*/

//***出发到达信息
$(".send").click(function () {
    $(".item").removeClass('active')
    $(".tabBox").hide()
    $(".sendbox").show()
    $(".send").addClass('active')
    $('.arrivebox>._tr').html('')
    var order_three_code = document.querySelector("#order_three_code").value;
    var order_num = document.querySelector("#order_num").value;
    localStorage.setItem('_order_no', order_three_code + order_num)
    //***出发情况
    $.ajax({
        url: baseUrl + '/def/receive/getStart/',
        data: {"order_no": localStorage._order_no},  ///用固定单号可以查到数据
        type: "POST",
        // dataType:"json",
        error: function () {
            LALERT.msg("服务器连接失败")
        },
        success: function (e) {
            console.log(e)
            if (e.status == 200) {
                if (e.data.length == 0) {
                    LALERT.msg('暂无出发数据')
                } else {
                    LALERT.success(e.message)
                }
            } else {
                LALERT.msg(e.message)
            }

        }//success
    });
    //***录入到达信息

    /*$('.sign_remark').keydown(function (e) {
     var e = e || event;
     if (e.keyCode == 13) {
     if(localStorage._order_no==''){
     alert('请输入运单号')
     }else{

     }
     var sign_person = $(".sign_person").val()
     var sign_quantity = $(".sign_quantity").val()
     var sign_time = $(".sign_time").val()
     var sign_remark = $(".sign_remark").val()
     $.ajax({
     url: baseUrl + '/def/receive/insertArrive/',
     data: {
     "order_no": localStorage._order_no, "sign_person": sign_person, "sign_quantity": sign_quantity,
     "sign_time": sign_time, "sign_remark": sign_remark,
     },
     type: "POST",
     // dataType:"json",
     error: function () {
     alert("服务器连接失败");
     },
     success: function (e) {
     if (e.status == 200) {
     LALERT.success(e.message)
     $.ajax({
     url: baseUrl + '/def/receive/getArrive/',
     data: {"order_no": localStorage._order_no},
     type: "POST",
     // dataType:"json",
     error: function () {
     alert("服务器连接失败");
     },
     success: function (e) {
     if (e.status == 200) {
     console.log(e)
     LALERT.success(e.message)
     //***展示到达情况
     for (var i = 0; i < e.data.length; i++) {
     localStorage.setItem('arriveId', e.data[i].id)
     $('.arrive').before(' <tr class="_tr" id="' + e.data[i].id + '" sign_person="' + e.data[i].sign_person + '" sign_time="' + e.data[i].sign_time + '" sign_quantity="' + e.data[i].sign_quantity + '"><td>' + (i + 1) + '</td><td><input type="text" value="' + e.data[i].sign_person + '"></td><td><input type="text" value="' + e.data[i].sign_quantity + '"></td><td><input type="text" value="' + e.data[i].sign_time + '"></td><td><input type="text" value="' + e.data[i].sign_remark + '"></td><td>' + e.data[i].update_person + '</td><td>' + e.data[i].update_time + '</td><td><button class="ui medium red button delarrive">删除</button></td></tr>')
     $('.arrive input').val('')
     }
     } else {
     LALERT.msg(e.message)
     }
     }//success
     });

     } else {
     LALERT.msg(e.message)
     }
     }//success
     });
     }
     })*/
})
/*//删除到达
 $('.arrivebox').on('click', '.delarrive', function () {
 $.ajax({
 url: baseUrl + '/def/receive/deleteArrive/',
 data: {
 "id": $('._tr').attr('id')
 },
 type: "POST",
 // dataType:"json",
 error: function () {
 LALERT.msg("服务器连接失败")
 },
 success: function (e) {
 if (e.status == 200) {
 LALERT.success(e.message)
 } else {
 LALERT.msg(e.message)
 }
 }//success
 });
 })*/
//***拼单明细
function pin(){
    //拼单明细 开票地点
    $('.W_label').click(function () {
        $.ajax({
            url: baseUrl + '/def/receive/getBillingLocation/',
            // data:{},
            type: "GET",
            // dataType:"json",
            error: function () {
                alert("服务器连接失败");
            },
            success: function (e) {
                $('.M_menu').html('')
                console.log(e.data);
                for (var i = 0; i < e.data.length; i++) {
                    $('.M_menu').append('<div class="item">' + e.data[i] + '</div>')
                }

            }//success
        });
    })
// 拼单明细  End
// 查询可选zhu单
    $('.W_BtnFind').click(function () {
        var W_labelVal = $('.W_label>input').val()
        var departure_code = $('#departure_code').val()
        var destination_code = $('#destination_code').val()
        //alert(departure_code, destination_code)
        $.ajax({
            url: baseUrl + '/def/receive/getUnSeclected/',
            data: {
                "type": 0,
                "billing_location": W_labelVal,
                "departure_code": departure_code,
                "destination_code": destination_code,
                "expected_flight_time": localStorage.expected_flight_time,
                "expected_flight_no": localStorage.expected_flight_no
            },
            type: "POST",
            // dataType:"json",
            error: function () {
                LALERT.msg("服务器连接失败")
            },
            success: function (e) {
                if (e.status == 200) {
                    LALERT.success(e.message)
                    if (e.data.length == 0) {
                        LALERT.msg('暂无可选数据')
                    } else {
                        for (var i = 0; i < e.data.length; i++) {
                            $('.w_table_Cont').append('<tr><td><input type="checkbox" name=""></td><td>应收运费</td><td>' + e.data[i].order_no + '</td><td>' + e.data[i].destination + '</td><td>' + e.data[i].quantity + '</td><td>' + e.data[i].net_weight + '</td><td>' + e.data[i].joint_cargo_pieces + '</td><td>' + e.data[i].sender + '</td><td>' + e.data[i].ship_whereabouts + '</td><td>' + e.data[i].product_name + '</td><td>' + e.data[i].expected_flight_no + '</td></tr>')
                        }
                    }
                } else {
                    LALERT.msg(e.message)
                }
            }//success
        });
    })

//查询已选分单
    /*
     var order_three_code = $('.W_order_three_code').val()
     var order_num = $('.W_order_num').val();
     var order_no = order_three_code + '' + order_num;
     $.ajax({
     url: baseUrl + '/def/receive/getOrderSeclected/',
     data: {
     "order_no": order_no,
     "order_three_code": order_three_code,
     "order_num": order_num
     },
     type: "POST",
     // dataType:"json",
     error: function () {
     LALERT.msg("服务器连接失败")
     },
     success: function (e) {
     console.log(e);
     if (e.status == 200) {
     /!* LALERT.success(e.message)*!/
     if (e.data.length == 0) {
     //LALERT.msg('暂无可选数据')
     } else {
     for (var i = 0; i < e.data.length; i++) {
     $('.w_table_Cont').append('<tr><td><input type="checkbox" name=""></td><td>应收运费</td><td>' + e.data[i].order_no + '</td><td>' + e.data[i].destination + '</td><td>' + e.data[i].quantity + '</td><td>' + e.data[i].net_weight + '</td><td>180</td><td>' + e.data[i].sender + '</td><td>180</td></tr>')
     }
     }
     } else {
     LALERT.msg(e.message)
     }
     }//success
     })
     */
}
$('.correspond_order_no').keydown(function (e) {
    var e = e || event;
    if (e.keyCode == 13) {
        $(".item").removeClass('active')
        $(".tabBox").hide()
        $(".tijibox").show()
        $(".tiji").addClass('active');

       pin()

    }
})
// 拼单明细 左右  移动
var pd_arr=[]
$('.icon-circle-right').click(function(){
    // alert(1)
    pd_arr=[]
    var Tabody_tr=$('.w_table_Cont').children()
    if(Tabody_tr.length>0){

        for(var i=0;i<Tabody_tr.length;i++){
            if(Tabody_tr.eq(i).find('input').is(':checked')){
                var pdmx_td = Tabody_tr.eq(i).children()

                var pdmxObj = {
                    "xuhao": pdmx_td.eq(1).text(),
                    "danhao": pdmx_td.eq(2).text(),
                    "zhongdian": pdmx_td.eq(3).text(),
                    "zongjianshu": pdmx_td.eq(4).text(),
                    "shizhong": pdmx_td.eq(5).text(),
                    "yipingjianshu": pdmx_td.eq(6).text(),
                    "fahuoren": pdmx_td.eq(7).text(),
                    "fahuoquxiang": pdmx_td.eq(8).text(),
                    "pingmin": pdmx_td.eq(9).text(),
                    "yujihangban": pdmx_td.eq(10).text(),
                };
                Tabody_tr.eq(i).remove()
                pd_arr.push(pdmxObj);
            }
        }
        for(var j=0;j<pd_arr.length;j++){
            $('.w_table_Cont2').append('<tr><td><input type="checkbox" name=""></td><td>'+pd_arr[j].xuhao+'</td><td>'+pd_arr[j].danhao+'</td><td>'+pd_arr[j].zhongdian+'</td><td>'+pd_arr[j].zongjianshu+'</td><td>'+pd_arr[j].shizhong+'</td><td>'+pd_arr[j].yipingjianshu+'</td><td>'+pd_arr[j].fahuoren+'</td><td>'+pd_arr[j].fahuoquxiang+'</td></tr>')
        }

    }else{
        alert('请选择')
    }



})




var pd_arr1=[]

$('.icon-circle-left').click(function(){
    pd_arr1=[]
    var Tabody_tr=$('.w_table_Cont2').children()
    if(Tabody_tr.length>0){

        for(var i=0;i<Tabody_tr.length;i++){
            if(Tabody_tr.eq(i).find('input').is(':checked')){
                var pdmx_td = Tabody_tr.eq(i).children()

                var pdmxObj = {
                    "xuhao": pdmx_td.eq(1).text(),
                    "danhao": pdmx_td.eq(2).text(),
                    "zhongdian": pdmx_td.eq(3).text(),
                    "zongjianshu": pdmx_td.eq(4).text(),
                    "shizhong": pdmx_td.eq(5).text(),
                    "yipingjianshu": pdmx_td.eq(6).text(),
                    "fahuoren": pdmx_td.eq(7).text(),
                    "fahuoquxiang": pdmx_td.eq(8).text()
                };
                Tabody_tr.eq(i).remove()
                pd_arr1.push(pdmxObj);
            }
        }
        for(var j=0;j<pd_arr1.length;j++){
            $('.w_table_Cont').append('<tr><td><input type="checkbox" name=""></td><td>'+pd_arr1[j].xuhao+'</td><td>'+pd_arr1[j].danhao+'</td><td>'+pd_arr1[j].zhongdian+'</td><td>'+pd_arr1[j].zongjianshu+'</td><td>'+pd_arr1[j].shizhong+'</td><td>'+pd_arr1[j].yipingjianshu+'</td><td>'+pd_arr1[j].fahuoren+'</td><td>'+pd_arr1[j].fahuoquxiang+'</td></tr>')
        }

    }else{
        alert('请选择')
    }
})



//编辑 单条
function M_edit_ajax(M_Boss_number) {
    $('.edit_two_level_menu_wrap').css({'display': 'block'})
    $(".item").removeClass('active')
    $(".tabBox").hide()
    $(".msg").show()
    $(".msg").addClass('active')
    $.ajax({
        url: baseUrl+'/def/receive/beforeEditReceiveSub/',
        data: {"order_no": M_Boss_number},
        type: "POST",
        // dataType:"json",
        error: function () {
            alert("服务器连接失败");
        },
        success: function (e) {
            if (e.status == 200) {
                console.log(e)
                $("#order_three_code_").val(e.data[0].order_three_code)
                $("#order_num_").val(e.data[0].order_num)
                $('#departure_code_').val(e.data[0].departure_code)
                $('#destination_code_').val(e.data[0].destination_code)
                $('.sender_code_').val(e.data[0].sender_code);
                $('#sender_name_').val(e.data[0].sender_name);
                $('.receiver_code_').val(e.data[0].receiver_code)
                $('#receiver_name_').val(e.data[0].receiver_name)
                $('.sender_name_').val(e.data[0].sender_name)
                $('.sender_telephone_').val(e.data[0].sender_telephone)
                $('.sender_fax_').val(e.data[0].sender_fax)
                $('.sender_sms_notification_').val(e.data[0].sender_sms_notification)
                $('.sender_address_').val(e.data[0].sender_address)
                $('.receiver_name_').val(e.data[0].receiver_name)
                $('.receiver_telephone_').val(e.data[0].receiver_telephone)
                $('.receiver_fax_').val(e.data[0].receiver_fax)
                $('#receiver_sms_notification_').val(e.data[0].receiver_sms_notification)
                $('.delivery_mode_').val(e.data[0].delivery_mode)
                $('.receiver_address_').val(e.data[0].receiver_address)
                $('.carrier_storage_remark_').val(e.data[0].carrier_storage_remark)
                $('.other_storage_remark_').val(e.data[0].other_storage_remark)
                $('.billing_remark_').val(e.data[0].billing_remark)
                $('.starting_point_operation_').val(e.data[0].starting_point_operation)
                $('.first_transfer_code_').val(e.data[0].first_transfer_code);
                $('.first_transfer_name_').val(e.data[0].first_transfer_name);
                $('.air_transit_').val(e.data[0].air_transit);
                $('.second_transfer_code_').val(e.data[0].second_transfer_code);
                $('.second_transfer_name_').val(e.data[0].second_transfer_name);
                $('.transshipment_unit_').val(e.data[0].transshipment_unit);
                $('.correspond_order_no_').val(e.data[0].correspond_order_no);
                $('.expected_flight_time_').val(e.data[0].expected_flight_time);
                $('.expected_flight_num_').val(e.data[0].expected_flight_num);
                $('.product_no_').val(e.data[0].product_no);
                $('.product_name_').val(e.data[0].product_name);
                $('.product_code_').val(e.data[0].product_code);
                $('.product_category_code_').val(e.data[0].product_category_code);
                $('.product_category_').val(e.data[0].product_category);
                $('.your_category_code_').val(e.data[0].your_category_code);
                $('.your_category_').val(e.data[0].your_category);
                $('.packaging_code_').val(e.data[0].packaging_code);
                $('.packaging_name_').val(e.data[0].packaging_name);
                $('.departure_priority_').val(e.data[0].departure_priority);
                $('.quantity_').val(e.data[0].quantity);
                $('.net_weight_').val(e.data[0].net_weight);
                $('.volume_').val(e.data[0].volume);
                $('.weight_').val(e.data[0].weight);
                $('.clearing_unit_').val(e.data[0].clearing_unit);
                $('.clearing_unit_code_').val(e.data[0].clearing_unit_code);
                $('.discount_').val(e.data[0].discount);
                $('.payment_method_').val(e.data[0].payment_method);
                $('#receipt_type_type_').val(e.data[0].receipt_type);
                $('#state_').val(e.data[0].state);
                $('.billing_time_').val(e.data[0].billing_time);
                $('.issuer_').val(e.data[0].issuer);
                $('.billing_location_').val(e.data[0].billing_location);
                $('.update_time_').val(e.data[0].update_time);
                $('.update_person_').val(e.data[0].update_person);
                $('.expected_two_flight_code_').val(e.data[0].expected_two_flight_code);
                $('.service_record_').val(e.data[0].service_record);
                $('._putong')>$('.jiazhong').html(e.data[0].price_species_name)
                $('.pricecode_').val(e.data[0].price_species_code)
                $('._feilv').val(e.data[0].invoice_price)
            } else if (e.status == 400) {
                alert(e.message)
            } else {
                alert('无此分单无法进行此单号下的修改')
            }

        }
    });
}
$('.editBtn').on('click', function () {
    console.log('编辑')
    //!**所要编辑的信息展示

    M_edit_ajax(localStorage._order_no)

})
$('.w_table').on('click', '.greenBg', function () {
    // alert(1);
    var W_Number = $(this).parents('tr').attr('order')
    M_edit_ajax(W_Number)
    $('.editTabBodyWrap').css('display','block')
})
//保存编辑
$('.editer').click(function () {
    var _data = {
        "order_three_code": $("#order_three_code_").val(),
        "order_num": $("#order_num_").val(),
        "departure_code": $('#departure_code_').val(),
        "destination_code": $('#destination_code_').val(),
        "sender_code": $('.sender_code_').val(),
        "sender_name": $('#sender_name_').val(),
        "receiver_code": $('.receiver_code_').val(),
        "receiver_name": $('.receiver_name_').val(),
        "sender_telephone": $('.sender_telephone_').val(),
        "sender_fax": $('.sender_fax_').val(),
        "sender_sms_notification": $('.sender_sms_notification_').val(),
        "sender_address": $('.sender_address_').val(),
        "receiver_name": $('.receiver_name_').val(),
        "receiver_telephone": $('.receiver_telephone_').val(),
        "receiver_fax": $('.receiver_fax_').val(),
        "receiver_sms_notification": $('#receiver_sms_notification_').val(),
        "delivery_mode": $('.delivery_mode_').val(),
        "receiver_address": $('.receiver_address_').val(),
        "carrier_storage_remark": $('.carrier_storage_remark_').val(),
        "other_storage_remark": $('.other_storage_remark_').val(),
        "billing_remark": $('.billing_remark_').val(),
        "starting_point_operation": $('.starting_point_operation_').val(),
        "first_transfer_code": $('.first_transfer_code_').val(),
        "first_transfer_name": $('.first_transfer_name_').val(),
        "air_transit": $('.air_transit_').val(),
        "second_transfer_code": $('.second_transfer_code_').val(),
        "second_transfer_name": $('.second_transfer_name_').val(),
        "transshipment_unit": $('.transshipment_unit_').val(),
        "correspond_order_no": $('.correspond_order_no_').val(),
        "expected_flight_time": $('.expected_flight_time_').val(),
        "expected_flight_num": $('.expected_flight_num_').val(),
        "product_no": $('.product_no_').val(),
        "product_name": $('.product_name_').val(),
        "product_code": $('.product_code_').val(),
        "product_category_code": $('.product_category_code_').val(),
        "product_category": $('.product_category_').val(),
        "your_category_code": $('.your_category_code_').val(),
        "your_category": $('.your_category_').val(),
        "packaging_code": $('.packaging_code_').val(),
        "packaging_name": $('.packaging_name_').val(),
        "departure_priority": $('.departure_priority_').val(),
        "quantity": $('.quantity_').val(),
        "net_weight": $('.net_weight_').val(),
        "volume": $('.volume_').val(),
        "weight": $('.weight_').val(),
        "clearing_unit": $('.clearing_unit_').val(),
        "clearing_unit_code": $('.clearing_unit_code_').val(),
        "discount": $('.discount_').val(),
        "payment_method": $('.payment_method_').val(),
        "receipt_type": 0,
        "state": $('.state_').val(),
        "billing_time": $('.billing_time_').val(),
        "issuer": $('.issuer_').val(),
        "billing_location": $('.billing_location_').val(),
        "update_time": $('.update_time_').val(),
        "update_person": $('.update_person_').val(),
        "expected_two_flight_code": $('.expected_two_flight_code_').val(),
        "service_record": $('.service_record_').val(),
        "volumeList": volumeInfo.volumeList, //体积
        "costItemList": W_arr, //费用
        "custServiceList": WW_server,//客服
        "price_species_name":$('._putong')>$('input').val(),
        "price_species_code":$('.pricecode_').val(),
        "invoice_price":$('._feilv').val()

    }
    let validate = $('.ui.form.add_billing_details').form('is valid')
    console.log($('.ui.form.add_billing_details').form('is valid'))
    if(!validate){
        $('.ui.form').form('validate form')
        return  //校验通过直接加载ajax
    }
    $.ajax({
        url: baseUrl+'/def/receive/editReceiveSub/',
        data: JSON.stringify(_data),
        type: "POST",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        error: function () {
            alert("服务器连接失败");
        },
        success: function (e) {
            console.log(e)
            if (e.status == 200) {
                console.log(_data)
                alert(e.message)
                $('.edit_two_level_menu_wrap').hide()
            } else {
                alert(e.message)
            }
        }
    });
})

//****收发货人
$('.sender_code').blur(function(){
    $.ajax({
        url: baseUrl + '/def/basic/dic/getSenderReceiver',
        data: {"code":$('#fa').val()},
        type: "POST",
        error: function () {
            LALERT.msg("服务器连接失败")
        },
        success: function (e) {
            if (e.status == 200) {
                $('#fa').val(e.data[0].code)
                $('#sender_name').val(e.data[0].name)
                $('.sender_name').val(e.data[0].name)
                $('.sender_telephone').val(e.data[0].telephone)
                $('.sender_fax').val(e.data[0].fax)
                $('.sender_address').val(e.data[0].address)
                $('.sender_sms_notification').val(e.data[0].sms_notification)
            }
        }
    });
})
$('.receiver_code').blur(function() {
    $.ajax({
        url: baseUrl + '/def/basic/dic/getSenderReceiver',
        data: {"code": $('#shou').val()},
        type: "POST",
        error: function () {
            //LALERT.msg("服务器连接失败")
        },
        success: function (e) {
            if (e.status == 200) {
               // $('#fa').val(e.data[0].code)
                $('#receiver_name').val(e.data[0].name)
                $('.receiver_name').val(e.data[0].name)
                $('.receiver_telephone').val(e.data[0].telephone)
                $('.receiver_fax').val(e.data[0].fax)
                $('.receiver_address').val(e.data[0].address)
                $('.receiver_sms_notification').val(e.data[0].sms_notification)
                $('.delivery_mode').val(e.data[0].delivery_mode)
            }
        }
    })
})