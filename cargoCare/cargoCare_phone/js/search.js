/**
 * Created by Administrator on 2017/9/21 0021.
 */
$(function () {
    $(".back").click(function () {
        window.location = '../index.html';
    })
    //下拉框
    $.ajax({
        //'http://192.168.1.105:8080/lxtd-cca-apis',
        //'http://47.93.90.229/test',
        url: 'http://47.93.90.229/test/def/receive/getThreeCode',
        type: "POST",
        // dataType:"json",
        error: function () {
            console.log("服务器连接失败")
        },
        success: function (e) {
            console.log(e)
            if (e.status == 200) {
                for (x in e.data) {
                    $('#option').append('<option value="' + e.data[x] + '">' + e.data[x] + '</option>')
                }
            } else {
            }
        }
    });
    $(".searchBtn").click(function () {
        var _option = $("#option").val();
        localStorage.setItem('_option',_option)
        var _num = $(".num").val();
        var order_no = _option + _num;
        localStorage.setItem('order_no',order_no)
        var telephone = $(".telephone").val()
        localStorage.setItem('telephone',telephone)
        if ($(".ch1").is(':checked')) {
            $(".ch1").attr("value", '1')
        } else if ($(".ch2").is(':checked')) {
            $(".ch2").attr("value", '0')
        }
        if ($(".ch1").val() === '1') {
            var chose = $(".ch1").val()
            localStorage.setItem("chose",chose)
        } else if ($(".ch2").val() === '0') {
            var chose = $(".ch2").val()
            localStorage.setItem("chose",chose)
        }
        window.location='html/search.html';
    })

    if (localStorage._option === 'SJW') {
        //ajax
        $.ajax({
            //'http://192.168.1.105:8080/lxtd-cca-apis',
            //'http://47.93.90.229/test',
            url: 'http://47.93.90.229/test/def/receive/getOrder/',
            type: "POST",
            // dataType:"json",
            data: {"order_no": localStorage.order_no, "arrive_type": localStorage.chose, "telephone": localStorage.telephone},
            error: function () {
                console.log("服务器连接失败")
            },
            success: function (e) {
                console.log(e)
                if(e.status==200&&e.data!=''){
                    $(".filter").html('<div>分单号　<input type="text" class="order" readOnly="true"> 主单号　<input type="text" class="main" readOnly="true"> </div> <br> <div>提货电话<input type="text" class="tel" readOnly="true"> 开票日期<input type="text" class="time" readOnly="true"> </div>')
                    $('.msg').html('--' + e.message + '--')
                    $('.order').val(e.data[0].order_no)
                    $('.main').val(e.data[0].correspond_order_no)
                    $('.tel').val(e.data[0].signer_telephone)
                    $('.time').val(e.data[0].billing_time)
                    $(".search").append('<tr><th>起点</th><td>'+e.data[0].departure+'</td></tr><tr><th>终点</th> <td>'+e.data[0].destination+'</td></tr><tr><th>件数</th><td>'+e.data[0].quantity+'</td></tr><tr><th>实重</th> <td>'+e.data[0].net_weight+'</td></tr> <tr><th>品名</th><td>'+e.data[0].product_name+'</td></tr><tr><th>体积</th><td>'+e.data[0].volume+'</td> </tr><tr><th>签收状态</th> <td>'+e.data[0].sign_state+'</td></tr><tr><th>是否放货</th><td> </td></tr>')
                    $(".flight").append('<caption>航班信息</caption><tr><th>主单号</th><td>'+e.data[0].correspond_order_no+'</td></tr><tr><th>航班日期</th><td>'+e.data[0].actual_fry_date+'</td></tr> <tr><th>航班号</th><td>'+e.data[0].flight_no+'</td></tr><tr><th>起飞机场</th><td>'+e.data[0].departure_airport+'</td></tr><tr><th>降落机场</th><td>'+e.data[0].departure_airport+'</td></tr><tr><th>主单提货电话</th><td>'+e.data[0].destination_name+'</td></tr><tr><th>件数</th> <td>'+e.data[0].quantity+'</td></tr><tr><th>重量</th><td>'+e.data[0].net_weight+'</td></tr><tr><th>空运中转</th><td>'+e.data[0].air_transit+'</td></tr><tr><th>分批</th><td>'+e.data[0].batch+'</td></tr><tr><th>起飞时间</th> <td>'+e.data[0].actual_fry_time+'</td></tr><tr><th>降落时间</th><td>'+e.data[0].actual_drop_time+'</td></tr>')

                }else{
                    $(".filter").html('<div>分单号　<input type="text" class="order" readOnly="true"> 主单号　<input type="text" class="main" readOnly="true"> </div> <br> <div>提货电话<input type="text" class="tel" readOnly="true"> 开票日期<input type="text" class="time" readOnly="true"> </div>')
                    $('.msg').html('--' + e.message + '--')
                    $(".search").append('此单号下'+e.message)
                }

            }
        });
    }else if (localStorage._option === '000') {
        //ajax
        $.ajax({
            //'http://192.168.1.105:8080/lxtd-cca-apis',
            //'http://47.93.90.229/test',
            url: 'http://47.93.90.229/test/def/receive/getOrder/',
            type: "POST",
            // dataType:"json",
            data: {"order_no": localStorage.order_no, "arrive_type": localStorage.chose, "telephone": localStorage.telephone},
            error: function () {
                console.log("服务器连接失败")
            },
            success: function (e) {
                console.log(e)
                if(e.status==200&&e.data!=''){
                    $(".filter").html(' <div>邮单号<input type="text" class="order" readOnly="true">开票日期<input type="text" readOnly="true" class="time"></div>')
                    $('.msg').html('--' + e.message + '--')
                    $('.order').val(e.data[0].order_no)
                    $('.main').val(e.data[0].correspond_order_no)
                    $('.tel').val(e.data[0].signer_telephone)
                    $('.time').val(e.data[0].billing_time)
                    $(".search").append('<tr><th>起点</th><td>'+e.data[0].departure+'</td></tr><tr><th>终点</th> <td>'+e.data[0].destination+'</td></tr><tr><th>件数</th><td>'+e.data[0].quantity+'</td></tr><tr><th>实重</th> <td>'+e.data[0].net_weight+'</td></tr> <tr><th>品名</th><td>'+e.data[0].product_name+'</td></tr><tr><th>体积</th><td>'+e.data[0].volume+'</td> </tr><tr><th>签收状态</th> <td>'+e.data[0].sign_state+'</td></tr><tr><th>是否放货</th><td> </td></tr>')
                    $(".flight").append('<caption>航班信息</caption><tr><th>主单号</th><td>'+e.data[0].correspond_order_no+'</td></tr><tr><th>航班日期</th><td>'+e.data[0].actual_fry_date+'</td></tr> <tr><th>航班号</th><td>'+e.data[0].flight_no+'</td></tr><tr><th>起飞机场</th><td>'+e.data[0].departure_airport+'</td></tr><tr><th>降落机场</th><td>'+e.data[0].departure_airport+'</td></tr><tr><th>主单提货电话</th><td>'+e.data[0].destination_name+'</td></tr><tr><th>件数</th> <td>'+e.data[0].quantity+'</td></tr><tr><th>重量</th><td>'+e.data[0].net_weight+'</td></tr><tr><th>空运中转</th><td>'+e.data[0].air_transit+'</td></tr><tr><th>分批</th><td>'+e.data[0].batch+'</td></tr><tr><th>起飞时间</th> <td>'+e.data[0].actual_fry_time+'</td></tr><tr><th>降落时间</th><td>'+e.data[0].actual_drop_time+'</td></tr>')

                }
                else{
                    $(".filter").html(' <div>邮单号<input type="text" class="order" readOnly="true">开票日期<input type="text" readOnly="true" class="time"></div>')
                    $('.msg').html('--' + e.message + '--')
                    $(".search").append('此单号下'+e.message)
                }
            }
        });
    }else if (localStorage._option === 'CAE') {
        //ajax
        $.ajax({
            //'http://192.168.1.105:8080/lxtd-cca-apis',
            //'http://47.93.90.229/test',
            url: 'http://47.93.90.229/test/def/receive/getOrder/',
            type: "POST",
            // dataType:"json",
            data: {"order_no": localStorage.order_no, "arrive_type": localStorage.chose, "telephone": localStorage.telephone},
            error: function () {
                console.log("服务器连接失败")
            },
            success: function (e) {
                console.log(e)
                if(e.status==200&&e.data!=''){
                    $(".filter").html('<div>民航快递<input type="text" class="order" readOnly="true">主单号<input type="text" class="main" readOnly="true"></div> <br> <div>提货电话<input type="text" class="tel" readOnly="true">开票日期<input type="text" class="time" readOnly="true"> </div>')
                    $('.msg').html('--' + e.message + '--')
                    $('.order').val(e.data[0].order_no)
                    $('.main').val(e.data[0].correspond_order_no)
                    $('.tel').val(e.data[0].signer_telephone)
                    $('.time').val(e.data[0].billing_time)
                    $(".search").append('<tr><th>起点</th><td>'+e.data[0].departure+'</td></tr><tr><th>终点</th> <td>'+e.data[0].destination+'</td></tr><tr><th>件数</th><td>'+e.data[0].quantity+'</td></tr><tr><th>实重</th> <td>'+e.data[0].net_weight+'</td></tr> <tr><th>品名</th><td>'+e.data[0].product_name+'</td></tr><tr><th>体积</th><td>'+e.data[0].volume+'</td> </tr><tr><th>签收状态</th> <td>'+e.data[0].sign_state+'</td></tr><tr><th>是否放货</th><td> </td></tr>')
                    $(".flight").append('<caption>航班信息</caption><tr><th>主单号</th><td>'+e.data[0].correspond_order_no+'</td></tr><tr><th>航班日期</th><td>'+e.data[0].actual_fry_date+'</td></tr> <tr><th>航班号</th><td>'+e.data[0].flight_no+'</td></tr><tr><th>起飞机场</th><td>'+e.data[0].departure_airport+'</td></tr><tr><th>降落机场</th><td>'+e.data[0].departure_airport+'</td></tr><tr><th>主单提货电话</th><td>'+e.data[0].destination_name+'</td></tr><tr><th>件数</th> <td>'+e.data[0].quantity+'</td></tr><tr><th>重量</th><td>'+e.data[0].net_weight+'</td></tr><tr><th>空运中转</th><td>'+e.data[0].air_transit+'</td></tr><tr><th>分批</th><td>'+e.data[0].batch+'</td></tr><tr><th>起飞时间</th> <td>'+e.data[0].actual_fry_time+'</td></tr><tr><th>降落时间</th><td>'+e.data[0].actual_drop_time+'</td></tr>')

                }
                else{
                    $(".filter").html('<div>民航快递<input type="text" class="order" readOnly="true">主单号<input type="text" class="main" readOnly="true"></div> <br> <div>提货电话<input type="text" class="tel" readOnly="true">开票日期<input type="text" class="time" readOnly="true"> </div>')
                    $('.msg').html('--' + e.message + '--')
                    $(".search").append('此单号下'+e.message)
                }
            }
        });
    }else if (localStorage._option === '018') {
        //ajax
        $.ajax({
            //'http://192.168.1.105:8080/lxtd-cca-apis',
            //'http://47.93.90.229/test',
            url: 'http://47.93.90.229/test/def/receive/getOrder/',
            type: "POST",
            // dataType:"json",
            data: {"order_no": localStorage.order_no, "arrive_type": localStorage.chose, "telephone": localStorage.telephone},
            error: function () {
                console.log("服务器连接失败")
            },
            success: function (e) {
                console.log(e)
                if(e.status==200&&e.data!=''){
                    $(".filter").html('<div>分单号　<input type="text" class="order" readOnly="true"> 主单号　<input type="text" class="main" readOnly="true"> </div> <br> <div>提货电话<input type="text" class="tel" readOnly="true"> 开票日期<input type="text" class="time" readOnly="true"> </div>')
                    $('.msg').html('--' + e.message + '--')
                    $('.order').val(e.data[0].order_no)
                    $('.main').val(e.data[0].correspond_order_no)
                    $('.tel').val(e.data[0].signer_telephone)
                    $('.time').val(e.data[0].billing_time)
                    $(".search").append('<tr><th>起点</th><td>'+e.data[0].departure+'</td></tr><tr><th>终点</th> <td>'+e.data[0].destination+'</td></tr><tr><th>件数</th><td>'+e.data[0].quantity+'</td></tr><tr><th>实重</th> <td>'+e.data[0].net_weight+'</td></tr> <tr><th>品名</th><td>'+e.data[0].product_name+'</td></tr><tr><th>体积</th><td>'+e.data[0].volume+'</td> </tr><tr><th>签收状态</th> <td>'+e.data[0].sign_state+'</td></tr><tr><th>是否放货</th><td> </td></tr>')
                    $(".flight").append('<caption>航班信息</caption><tr><th>主单号</th><td>'+e.data[0].correspond_order_no+'</td></tr><tr><th>航班日期</th><td>'+e.data[0].actual_fry_date+'</td></tr> <tr><th>航班号</th><td>'+e.data[0].flight_no+'</td></tr><tr><th>起飞机场</th><td>'+e.data[0].departure_airport+'</td></tr><tr><th>降落机场</th><td>'+e.data[0].departure_airport+'</td></tr><tr><th>主单提货电话</th><td>'+e.data[0].destination_name+'</td></tr><tr><th>件数</th> <td>'+e.data[0].quantity+'</td></tr><tr><th>重量</th><td>'+e.data[0].net_weight+'</td></tr><tr><th>空运中转</th><td>'+e.data[0].air_transit+'</td></tr><tr><th>分批</th><td>'+e.data[0].batch+'</td></tr><tr><th>起飞时间</th> <td>'+e.data[0].actual_fry_time+'</td></tr><tr><th>降落时间</th><td>'+e.data[0].actual_drop_time+'</td></tr>')

                }
                else{
                    $(".filter").html('<div>分单号　<input type="text" class="order" readOnly="true"> 主单号　<input type="text" class="main" readOnly="true"> </div> <br> <div>提货电话<input type="text" class="tel" readOnly="true"> 开票日期<input type="text" class="time" readOnly="true"> </div>')
                    $('.msg').html('--' + e.message + '--')
                    $(".search").append('此单号下'+e.message)
                }
            }
        });
    }




})
