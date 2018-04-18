//出港-按作业航班订舱
const pageInfo = {
   // baseUrl: 'http://192.168.1.110:8080/lxtd-cca-apis',
    baseUrl: 'http://47.93.90.229/test',
}
let {baseUrl} = pageInfo
//***大小写
function toUpperCase(obj) {
    obj.value = obj.value.toUpperCase()
}
//分页
const pagination = new Pagination
$(".pageWrap").css('display', 'none')
$(".pageWrapMsg").css('display', 'none')
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

                if (key === 'is_overtime') {
                    if (item[key] === 0) {
                        item[key] = 'N'
                    } else if (item[key] === 1) {
                        item[key] = 'Y'
                    } else if (item[key] === '') {
                        item[key] = ''
                    }
                }

                if (key === 'is_domestic') {
                    if (item[key] === 0) {
                        item[key] = '国内'
                    } else if (item[key] === 1) {
                        item[key] = '国际'
                    }
                }

                if (key === 'pub') {
                    if (item[key] == 0) {
                        item[key] = '否'
                    } else if (item[key] == 1) {
                        item[key] = '是'
                    }
                }

                if (key === 'can') {
                    if (item[key] == 0) {
                        item[key] = '否'
                    } else if (item[key] == 1) {
                        item[key] = '是'
                    }
                }

                if (key === 'is_arrival') {
                    if (item[key] === 0) {
                        item[key] = '否'
                    } else if (item[key] === 1) {
                        item[key] = '是'
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
            <td>${item.flight_no}</td>
            <td>${item.plan_fry_date}</td>
            <td>${item.std}</td>
            <td>${item.model_code}</td>
            <td>${item.is_overtime}</td>
            <td>${item.is_domestic}</td>
            <td>${item.pub}</td>
            <td>${item.can}</td>
            <td>${item.book_termination}</td>
            <td>${item.state}</td>
            <td>${item.state}</td>
            <td>${item.state}</td>
            <td>${item.state}</td>
            <td>${item.state}</td>
            <td>${item.can_match_position}</td>
            <td>${item.bookings_positions}</td>
            <td>${item.remain_positions}</td>
            <td>${item.is_arrival}</td>
          </tr>`
        }
    ).join('')
    $('.table-list').html(str)
}
let searchMainList = () => {
    // 请求地址
    const reqUrl = baseUrl + '/def/output/booking/getFlightList'
    // 请求参数
    let params = {
        two_flight_code: $(".flight_code").val(),
        flight_num: $(".flight_num").val(),
        // flight_no: $(".flight_code").val() + $(".flight_num").val(),
        plan_fry_date: $('.fry_date').val(),
        plan_fry_time_start: $('.plan_fry_time_start').val(),
        plan_fry_time_end: $('.plan_fry_time_end').val(),
        destination_code: $('.destination_code').val(),
        model_code: $('.model_code').val(),
        is_domestic: $(".is_domestic").val(),
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
    $('.dropdown').dropdown('clear')
})
//查询订舱明细-查询订舱明细-查询订舱明细-查询订舱明细-查询订舱明细-查询订舱明细-查询订舱明细-查询订舱明细
$('.table-list').on('click', ".look_flightInformation", function () {
    localStorage.setItem('flight_no', $(this).attr('flight'))
    $('.flightInformation').show()
    $('.wym_container').hide()
    //分页
    const pagination = new Pagination
    //渲染表格
    let renderTables = data => {
        let str = data.map((item, index) => {
                typeof item === 'object' && Object.keys(item).forEach(key => {
                    item[key] = item[key] !== null ? item[key] : ''
                    if (key === 'cancel_flag') {
                        if (item[key] == 0) {
                            item[key] = '正常'
                        } else if (item[key] == 1) {
                            item[key] = '取消'
                        } else if (item[key] == 0) {
                            item[key] = ''
                        }
                    }
                    if (key === 'free_flag') {
                        if (item[key] == 0) {
                            item[key] = '正常'
                        } else if (item[key] == 1) {
                            item[key] = '释放'
                        } else if (item[key] == 0) {
                            item[key] = ''
                        }
                    }
                    if (key === 'status') {
                         if (item[key] == 1) {
                            item[key] = '已提交'
                        } else if (item[key] == 2) {
                            item[key] = '已取消'
                        }
                    }
                    if (key === 'check_state') {
                        if (item[key] == 1) {
                            item[key] = '审核通过'
                        } else if (item[key] == 2) {
                            item[key] = '审核不通过'
                        } else if (item[key] == 0) {
                            item[key] = '审核中'
                        }
                    }

                })
                return `
          <tr class="table-item">
          <td class="checkbox-wrap"><input type="checkbox" class="_item" data-id='${item.id}'><span class="checkbox-mask"></span></td>

            <td>${(pagination.nowNum - 1) * 10 + index + 1}</td>
            <td class="flexCenter padding0 ">
              <div class="roundBg borderRaidus blueBg look" data-id='${item.booking_no}'><i class="unhide icon margin-Left5" title="查看"></i></div>
              <div class="roundBg borderRaidus greenBg bianji" data-id='${item.booking_no}'><i class="edit icon margin-Left5" title="编辑"></i></div>
              <div class="roundBg borderRaidus oliveBg model" data-id='${item.booking_no}'><i class="icon-insert-template margin-Left5" title="模板"></i></div>
              <div class="roundBg borderRaidus tealBg print" data-id='${item.booking_no}'><i class="icon-printer margin-Left5" title="打印"></i></div>
            </td>
            <td>${item.booking_no}</td>
            <td>${item.status}</td>
              <td>${item.check_state}</td>
            <td>${item.booking_customer_name}</td>
            <td>${item.departure_code}</td>
            <td>${item.destination_code}</td>
            <td>${item.flight_no}</td>
            <td>${item.plan_fry_date}</td>
            <td>${item.apply_quatity}</td>
            <td>${item.apply_weight}</td>
            <td>${item.product_no}</td>
            <td>${item.remark}</td>
          </tr>`
            }
        ).join('')
        $('.table-listMsg').html(str)
    }

    let searchMainLists = () => {
        // 请求地址
        const reqUrl = baseUrl + '/def/output/booking/getBookingList'
        // 请求参数
        let params = {
            flight_id: $(this).data('id'),
        }

        LXHR.POST(reqUrl, params).done(res => {
            if (res.status === 200) {
                $(".pageWrapMsg").css('display', 'block')
                pagination.init('.pageBoxs', res.data[0], params, reqUrl, renderTables)
                renderTables(res.data[0].list)
                flight_id = res.data[0].flight_id
            } else {
                LALERT.msg(res.message)
            }
        })
    }
// 发送请求
    searchMainLists()
})
//按条件查询明细-按条件查询明细-按条件查询明细-按条件查询明细
$('.table-list').on('click', ".look_flightInformation", function () {
    localStorage.setItem('flight_no', $(this).attr('flight'))
    localStorage.setItem('flight_id', $(this).data('id'))
    //分页
    const pagination = new Pagination
    //渲染表格
    let renderTablem = data => {
        let str = data.map((item, index) => {
                typeof item === 'object' && Object.keys(item).forEach(key => {
                    item[key] = item[key] !== null ? item[key] : ''
                    if (key === 'cancel_flag') {
                        if (item[key] == 0) {
                            item[key] = '正常'
                        } else if (item[key] == 1) {
                            item[key] = '取消'
                        } else if (item[key] == 0) {
                            item[key] = ''
                        }
                    }
                    if (key === 'free_flag') {
                        if (item[key] == 0) {
                            item[key] = '正常'
                        } else if (item[key] == 1) {
                            item[key] = '释放'
                        } else if (item[key] == 0) {
                            item[key] = ''
                        }
                    }
                   if (key === 'status') {
                         if (item[key] == 1) {
                            item[key] = '已提交'
                        } else if (item[key] == 2) {
                            item[key] = '已取消'
                        }
                    }
                    if (key === 'check_state') {
                        if (item[key] == 1) {
                            item[key] = '审核通过'
                        } else if (item[key] == 2) {
                            item[key] = '审核不通过'
                        } else if (item[key] == 0) {
                            item[key] = '审核中'
                        }
                    }

                })
                return `
          <tr class="table-item">
          <td class="checkbox-wrap"><input type="checkbox" class="_item" data-id='${item.id}'><span class="checkbox-mask"></span></td>

            <td>${(pagination.nowNum - 1) * 10 + index + 1}</td>
            <td class="flexCenter padding0 ">
              <div class="roundBg borderRaidus blueBg look" data-id='${item.booking_no}'><i class="unhide icon margin-Left5" title="查看"></i></div>
              <div class="roundBg borderRaidus greenBg bianji" data-id='${item.booking_no}'><i class="edit icon margin-Left5" title="编辑"></i></div>
              <div class="roundBg borderRaidus oliveBg model" data-id='${item.booking_no}'><i class="icon-insert-template margin-Left5" title="模板"></i></div>
              <div class="roundBg borderRaidus tealBg print" data-id='${item.booking_no}'><i class="icon-printer margin-Left5" title="打印"></i></div>
            </td>
            <td>${item.booking_no}</td>
            <td>${item.status}</td>
              <td>${item.check_state}</td>
            <td>${item.booking_customer_name}</td>
            <td>${item.departure_code}</td>
            <td>${item.destination_code}</td>
            <td>${item.flight_no}</td>
            <td>${item.plan_fry_date}</td>
            <td>${item.apply_quatity}</td>
            <td>${item.apply_weight}</td>
            <td>${item.product_no}</td>
            <td>${item.remark}</td>
          </tr>`
            }
        ).join('')
        $('.table-listMsg').html(str)
    }

    let searchMainListm = () => {
        // 请求地址
        const reqUrl = baseUrl + '/def/output/booking/getBookingList'
        // 请求参数
        let params = {
            booking_no: $(".booknum").val(),
            two_flight_code: $(".twofly").val(),
            flight_num: $(".flynum").val(),
            flight_no: $(".twofly").val() + $(".flynum").val(),
            plan_fry_date: $(".fry_date_").val(),
            departure_code: $(".departure_code_").val(),
            destination_code: $(".destination_code_").val(),
            booking_customer_code: $(".booking_customer_code").val(),
            currPage: 1,
        }

        LXHR.POST(reqUrl, params).done(res => {
            if (res.status === 200) {
                $(".pageWrapMsg").css('display', 'block')
                pagination.init('.pageBoxs', res.data[0], params, reqUrl, renderTablem)
                renderTablem(res.data[0].list)
            } else {
                LALERT.msg(res.message)
            }
        })
    }
    // 发送请求
    $('.btn_search').click(function () {
        searchMainListm()
    })
})
//订舱查看-订舱查看-订舱查看-订舱查看-订舱查看-订舱查看-订舱查看-订舱查看
$(".table-listMsg").on('click', '.look', function () {
    $('.flightInformation').hide()
    $('.flight_booking_look').show()
    var bookid = $(this).data('id')
    $.ajax({
        url: baseUrl + '/def/output/booking/getBookingDetail',
        data: {"booking_no": bookid},
        type: "POST",
        dataType: "json",
        error: function () {
            LALERT.msg("服务器连接失败")
        },
        success: function (e) {
            if (e.status == 200) {
                $('input').val('')
                $("._book").val(e.data[0].booking_no)
                $("._flight_no").val(e.data[0].flight_no)
                $("._order_t").val(e.data[0].order_no.slice(0, 3))
                $("._order_n").val(e.data[0].order_no.slice(3, 11))
                $("._booking_customer_code").val(e.data[0].booking_customer_code)
                $("._booking_customer_name").val(e.data[0].booking_customer_name)
                $("._booking_contact_person").val(e.data[0].booking_contact_person)
                $("._booking_contact_person_tel").val(e.data[0].booking_contact_person_tel)
                $("._booking_contact_person_phone").val(e.data[0].booking_contact_person_phone)
                $("._product_no").val(e.data[0].product_no)
                $("._apply_quatity").val(e.data[0].apply_quatity)
                $("._apply_weight").val(e.data[0].apply_weight)
                $("._apply_volume").val(e.data[0].apply_volume)
                $("._number_plate").val(e.data[0].number_plate)
                $("._customer_service_records").val(e.data[0].customer_service_records)
                $("._departure_code").val(e.data[0].departure_code)
                $("._destination_code").val(e.data[0].destination_code)
                $("._plan_fry_date").val(e.data[0].plan_fry_date)
                //$('._customer_service_records').val(e.data[0].remark)
            } else {
                LALERT.msg(e.message)
            }
        }
    })
})
//订舱修改
$(".table-listMsg").on('click', '.bianji', function () {
    var bookid = $(this).data('id')
    $('.flightInformation').hide()
    $('.flight_booking_modification').show()
    $.ajax({
        url: baseUrl + '/def/output/booking/getBookingDetail',
        data: {"booking_no": bookid},
        type: "POST",
        dataType: "json",
        error: function () {
            LALERT.msg("服务器连接失败")
        },
        success: function (e) {
            if (e.status == 200) {
                localStorage.setItem("_page", e.data[0].currPage)
                console.log(e)
                $('input').val('')
                $(".book").val(e.data[0].booking_no)
                $(".order_t").val(e.data[0].order_no.slice(0, 3))
                $(".order_n").val(e.data[0].order_no.slice(3, 11))
                $(".booking_customer_codes").val(e.data[0].booking_customer_code)
                $(".booking_customer_name").val(e.data[0].booking_customer_name)
                $(".booking_contact_person").val(e.data[0].booking_contact_person)
                $(".booking_contact_person_tel").val(e.data[0].booking_contact_person_tel)
                $(".booking_contact_person_phone").val(e.data[0].booking_contact_person_phone)
                $(".product_no").val(e.data[0].product_no)
                $(".apply_quatity").val(e.data[0].apply_quatity)
                $(".apply_weight").val(e.data[0].apply_weight)
                $(".apply_volume").val(e.data[0].apply_volume)
                $(".number_plate").val(e.data[0].number_plate)
               // $(".customer_service_records").val(e.data[0].customer_service_records)
                $(".departure_code").val(e.data[0].departure_code)
                $(".destination_code").val(e.data[0].destination_code)
                $(".plan_fry_date").val(e.data[0].plan_fry_date)
                $(".order").val(e.data[0].flight_no)
                $(".remark").val(e.data[0].customer_service_records)
            } else {
                LALERT.msg(e.message)
            }
        }
    })


})
//修改
    $('.xiugai').click(function () {
        $.ajax({
            url: baseUrl + '/def/output/booking/updateBooking',
            data: {
                "flight_id":localStorage.flight_id,
                "booking_no": $(".book").val(),
                //  "status": $(".status").val(),
                "order_no": $(".order_t").val() + $(".order_n").val(),
                "booking_customer_code": $(".booking_customer_codes").val(),
                "booking_customer_name": $(".booking_customer_name").val(),
                "booking_contact_person": $(".booking_contact_person").val(),
                "booking_contact_person_tel": $(".booking_contact_person_tel").val(),
                "booking_contact_person_phone": $(".booking_contact_person_phone").val(),
                "product_no": $(".product_no").val(),
                "apply_quatity": $(".apply_quatity").val(),
                "apply_weight": $(".apply_weight").val(),
                "apply_volume": $(".apply_volume").val(),
                "number_plate": $(".number_plate").val(),
                "customer_service_records": $(".customer_service_records").val(),
                "departure_code": $(".departure_code").val(),
                "destination_code": $(".destination_code").val(),
                "plan_fry_date": $(".plan_fry_date").val(),
                //"order": $(".order").val(),
                "service_record": $(".remark").val(),
            },
            type: "POST",
            dataType: "json",
            error: function () {
                LALERT.msg("服务器连接失败")
            },
            success: function (e) {
                console.log(e)
                if (e.status == 200) {
                    LALERT.success(e.message)
                    $('.flight_booking_modification').hide()
                    $('.flightInformation').show()

                    //分页
                    const pagination = new Pagination
                    //渲染表格
                    let renderTablem = data => {
                        let str = data.map((item, index) => {
                                typeof item === 'object' && Object.keys(item).forEach(key => {
                                    item[key] = item[key] !== null ? item[key] : ''
                                    if (key === 'cancel_flag') {
                                        if (item[key] == 0) {
                                            item[key] = '正常'
                                        } else if (item[key] == 1) {
                                            item[key] = '取消'
                                        } else if (item[key] == 0) {
                                            item[key] = ''
                                        }
                                    }
                                    if (key === 'free_flag') {
                                        if (item[key] == 0) {
                                            item[key] = '正常'
                                        } else if (item[key] == 1) {
                                            item[key] = '释放'
                                        } else if (item[key] == 0) {
                                            item[key] = ''
                                        }
                                    }
                                    if (key === 'status') {
                                        if (item[key] == 1) {
                                            item[key] = '已提交'
                                        } else if (item[key] == 2) {
                                            item[key] = '已取消'
                                        }
                                    }
                                    if (key === 'check_state') {
                                        if (item[key] == 1) {
                                            item[key] = '审核通过'
                                        } else if (item[key] == 2) {
                                            item[key] = '审核不通过'
                                        } else if (item[key] == 0) {
                                            item[key] = '审核中'
                                        }
                                    }

                                })
                                return `
          <tr class="table-item">
          <td class="checkbox-wrap"><input type="checkbox" class="_item" data-id='${item.id}'><span class="checkbox-mask"></span></td>

            <td>${(pagination.nowNum - 1) * 10 + index + 1}</td>
            <td class="flexCenter padding0 ">
              <div class="roundBg borderRaidus blueBg look" data-id='${item.booking_no}'><i class="unhide icon margin-Left5" title="查看"></i></div>
              <div class="roundBg borderRaidus greenBg bianji" data-id='${item.booking_no}'><i class="edit icon margin-Left5" title="编辑"></i></div>
              <div class="roundBg borderRaidus oliveBg model" data-id='${item.booking_no}'><i class="icon-insert-template margin-Left5" title="模板"></i></div>
              <div class="roundBg borderRaidus tealBg print" data-id='${item.booking_no}'><i class="icon-printer margin-Left5" title="打印"></i></div>
            </td>
            <td>${item.booking_no}</td>
            <td>${item.status}</td>
              <td>${item.check_state}</td>
            <td>${item.booking_customer_name}</td>
            <td>${item.departure_code}</td>
            <td>${item.destination_code}</td>
            <td>${item.flight_no}</td>
            <td>${item.plan_fry_date}</td>
            <td>${item.apply_quatity}</td>
            <td>${item.apply_weight}</td>
            <td>${item.product_no}</td>
            <td>${item.remark}</td>
          </tr>`
                            }
                        ).join('')
                        $('.table-listMsg').html(str)
                    }

                    let searchMainListm = () => {
                        // 请求地址
                        const reqUrl = baseUrl + '/def/output/booking/getBookingList'
                        // 请求参数
                        let params = {
                            booking_no: $(".booknum").val(),
                            two_flight_code: $(".twofly").val(),
                            flight_num: $(".flynum").val(),
                            flight_no: $(".twofly").val() + $(".flynum").val(),
                            plan_fry_date: $(".fry_date_").val(),
                            departure_code: $(".departure_code_").val(),
                            destination_code: $(".destination_code_").val(),
                            booking_customer_code: $(".booking_customer_code").val(),
                            currPage: 1,
                        }

                        LXHR.POST(reqUrl, params).done(res => {
                            if (res.status === 200) {
                                $(".pageWrapMsg").css('display', 'block')
                                pagination.init('.pageBoxs', res.data[0], params, reqUrl, renderTablem)
                                renderTablem(res.data[0].list)
                            } else {
                                LALERT.msg(res.message)
                            }
                        })
                    }
                    // 发送请求
                        searchMainListm()

                } else {
                    LALERT.msg(res.message)
                }

            }
        })
    })


//模板
$(".table-listMsg").on('click', '.model', function () {
    var bookid = $(this).data('id')
    $.ajax({
        url: baseUrl + '/def/output/booking/getBookingDetail',
        data: {"booking_no": bookid},
        type: "POST",
        dataType: "json",
        error: function () {
            LALERT.msg("服务器连接失败")
        },
        success: function (e) {
            $('.flight_booking_model').show()
            $('.flightInformation').hide()
            $(".order_").val(e.data[0].flight_no)
            $(".order_t_").val(e.data[0].order_no.slice(0, 3))
            $(".order_n_").val(e.data[0].order_no.slice(3, 11))
            $(".booking_customer_code_").val(e.data[0].booking_customer_code)
            $(".booking_customer_name_").val(e.data[0].booking_customer_name)
            $(".apply_weight_").val(e.data[0].apply_weight)
            $(".customer_service_records_").val(e.data[0].customer_service_records)
            $(".departure_code_").val(e.data[0].departure_code)
            $(".destination_code_").val(e.data[0].destination_code)
            $(".plan_fry_date_").val(e.data[0].plan_fry_date)
            //$(".remark_").val(e.data[0].remark)
            console.log(e)
        }
    })
    $(".tijiaomodel").click(function () {
        $.ajax({
            url: baseUrl + '/def/output/booking/addBookingTemplate',
            data: {
                "booking_no": $(".book_").val(),
                "order_no": $(".order_t_").val() + $(".order_n").val(),
                "booking_customer_code": $(".booking_customer_code_").val(),
                "booking_customer_name": $(".booking_customer_name_").val(),
                "booking_contact_person": $(".booking_contact_person_").val(),
                "booking_contact_person_tel": $(".booking_contact_person_tel_").val(),
                "booking_contact_person_phone_": $(".booking_contact_person_phone_").val(),
                "product_no": $(".product_no_").val(),
                "apply_quatity": $(".apply_quatity_").val(),
                "apply_weight": $(".apply_weight_").val(),
                "apply_volume": $(".apply_volume_").val(),
                "number_plate": $(".number_plate_").val(),
                "customer_service_records": $(".customer_service_records_").val(),
                "departure_code": $(".departure_code_").val(),
                "destination_code": $(".destination_code_").val(),
                "plan_fry_date": $(".plan_fry_date_").val(),
                "order": $(".order_").val(),
                "remark": $(".remark_").val(),
            },
            type: "POST",
            dataType: "json",
            error: function () {
                LALERT.msg("服务器连接失败")
            },
            success: function (e) {
                if (e.status == 200) {
                    LALERT.success(e.message)
                    $('input').val('')
                    $('.remark_').val('')
                    $('.flight_booking_model').hide()
                    $('.flightInformation').show()
                } else {
                    LALERT.msg(e.message)
                }
            }
        })
    })
})
//订舱添加
$(".flight_booking_add_btn").click(function () {
    $.ajax({
        url: baseUrl + '/def/output/booking/getFlightList',
        data: {"flight_no": localStorage.flight_no},
        type: "POST",
        dataType: "json",
        error: function () {
            LALERT.msg("服务器连接失败")
        },
        success: function (e) {
            if (e.status == 200) {
                $('.flight_booking_add').show()
                $('.flightInformation').hide()
                $("._booking_customer_code_").val(e.data[0].list[0].booking_customer_code)
                $("._booking_customer_name_").val(e.data[0].list[0].booking_customer_name)
                $("._order_").val(e.data[0].list[0].flight_no)
                $("._apply_weight_").val(e.data[0].list[0].apply_weight)
                $("._shifa_").val(e.data[0].list[0].departure_code)
                $("._mudi_").val(e.data[0].list[0].destination_code)
                $("._date_").val(e.data[0].list[0].plan_fry_date)
                console.log(e)
            } else {
                LALERT.msg(e.message)
            }
        }
    })


})
$('.luru').click(function () {
    var booking_no = $("._booking_no_").val()
    var order_three = $("._order_three_").val()
    var order_numm = $("._order_numm_").val()
    var order_no = order_three + order_numm
    var booking_customer_name = $("._booking_customer_name_").val()
    var booking_contact_person = $("._booking_contact_person_").val()
    var booking_contact_person_tel = $("._booking_contact_person_tel_").val()
    var booking_contact_person_phone = $("._booking_contact_person_phone_").val()
    var booking_customer_code = $("._booking_customer_code_").val()
    var product_no = $("._product_no_").val()
    var departure_code = $("._departure_code").val()
    var destination_code = $("._destination_code").val()
    var apply_quatity = $("._apply_quatity_").val()
    var apply_weight = $("._apply_weight_").val()
    var apply_volume = $("._apply_volume_").val()
    var number_plate = $("._number_plate_").val()
    var customer_service_records = $("._customer_service_records_").val()
    var _data = {
        "order_no": order_no,
        "booking_no": booking_no,
        "flight_id": localStorage.flight_id,
        "booking_customer_name": booking_customer_name,
        "booking_contact_person": booking_contact_person,
        "booking_contact_person_phone": booking_contact_person_phone,
        "booking_contact_person_tel": booking_contact_person_tel,
        "booking_customer_code": booking_customer_code,
        "product_no": product_no,
        "apply_quatity": apply_quatity,
        "apply_weight": apply_weight,
        "apply_volume": apply_volume,
        "number_plate": number_plate,
        "customer_service_records": customer_service_records,
    }
    for (i in _data) {
        console.log(_data[i])
        if (_data[i] == '') {
            delete _data[i]
            console.log(_data)
        }
    }
    $.ajax({
        url: baseUrl + '/def/output/booking/addBooking',
        data: _data,
        type: "POST",
        dataType: "json",
        error: function () {
            LALERT.msg("服务器失败")
        },
        success: function (e) {
            console.log(e)
            if (e.status == 200) {
                LALERT.success(e.message)
                $('.flight_booking_add').hide()
                $('.flightInformation').show()

                //添加完成之后页面
                //分页
                const pagination = new Pagination
                //渲染表格
                let renderTablem = data => {
                    let str = data.map((item, index) => {
                            typeof item === 'object' && Object.keys(item).forEach(key => {
                                item[key] = item[key] !== null ? item[key] : ''
                                if (key === 'cancel_flag') {
                                    if (item[key] == 0) {
                                        item[key] = '正常'
                                    } else if (item[key] == 1) {
                                        item[key] = '取消'
                                    } else if (item[key] == 0) {
                                        item[key] = ''
                                    }
                                }
                                if (key === 'free_flag') {
                                    if (item[key] == 0) {
                                        item[key] = '正常'
                                    } else if (item[key] == 1) {
                                        item[key] = '释放'
                                    } else if (item[key] == 0) {
                                        item[key] = ''
                                    }
                                }
                                if (key === 'status') {
                                    if (item[key] == 1) {
                                        item[key] = '已提交'
                                    } else if (item[key] == 2) {
                                        item[key] = '已取消'
                                    }
                                }
                                if (key === 'check_state') {
                                    if (item[key] == 1) {
                                        item[key] = '审核通过'
                                    } else if (item[key] == 2) {
                                        item[key] = '审核不通过'
                                    } else if (item[key] == 0) {
                                        item[key] = '审核中'
                                    }
                                }

                            })
                            return `
          <tr class="table-item">
          <td class="checkbox-wrap"><input type="checkbox" class="_item" data-id='${item.id}'><span class="checkbox-mask"></span></td>

            <td>${(pagination.nowNum - 1) * 10 + index + 1}</td>
            <td class="flexCenter padding0 ">
              <div class="roundBg borderRaidus blueBg look" data-id='${item.booking_no}'><i class="unhide icon margin-Left5" title="查看"></i></div>
              <div class="roundBg borderRaidus greenBg bianji" data-id='${item.booking_no}'><i class="edit icon margin-Left5" title="编辑"></i></div>
              <div class="roundBg borderRaidus oliveBg model" data-id='${item.booking_no}'><i class="icon-insert-template margin-Left5" title="模板"></i></div>
              <div class="roundBg borderRaidus tealBg print" data-id='${item.booking_no}'><i class="icon-printer margin-Left5" title="打印"></i></div>
            </td>
            <td>${item.booking_no}</td>
            <td>${item.status}</td>
              <td>${item.check_state}</td>
            <td>${item.booking_customer_name}</td>
            <td>${item.departure_code}</td>
            <td>${item.destination_code}</td>
            <td>${item.flight_no}</td>
            <td>${item.plan_fry_date}</td>
            <td>${item.apply_quatity}</td>
            <td>${item.apply_weight}</td>
            <td>${item.product_no}</td>
            <td>${item.remark}</td>
          </tr>`
                        }
                    ).join('')
                    $('.table-listMsg').html(str)
                }

                let searchMainListm = () => {
                    // 请求地址
                    const reqUrl = baseUrl + '/def/output/booking/getBookingList'
                    // 请求参数
                    let params = {
                        booking_no: $(".booknum").val(),
                        two_flight_code: $(".twofly").val(),
                        flight_num: $(".flynum").val(),
                        flight_no: $(".twofly").val() + $(".flynum").val(),
                        plan_fry_date: $(".fry_date_").val(),
                        departure_code: $(".departure_code_").val(),
                        destination_code: $(".destination_code_").val(),
                        booking_customer_code: $(".booking_customer_code").val(),
                        currPage: 1,
                    }

                    LXHR.POST(reqUrl, params).done(res => {
                        if (res.status === 200) {
                            $(".pageWrapMsg").css('display', 'block')
                            pagination.init('.pageBoxs', res.data[0], params, reqUrl, renderTablem)
                            renderTablem(res.data[0].list)
                        } else {
                            LALERT.msg(res.message)
                        }
                    })
                }
                // 发送请求
                searchMainListm()


            } else {
                LALERT.msg(e.message)
            }
        }
    })
})
var _arr = [];
$('.table-listMsg').on('click', '.table-item', function (evt) {
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
        // console.log( _itemDataId.eq(a).data('id'));
    }
    //console.log(_arr)
})

console.log(_arr)

/*$(".table-listMsg ._item:checked").each(function () {
 _arr.push($(this).attr('data-id'));
 })*/
function btn(stau) {
    var _data = {
        "status": stau,
        "booking_id_list": _arr,
    }
    console.log(_arr)
    $.ajax({
        url: baseUrl + '/def/output/booking/updateBookingCheckStatus',
        data: JSON.stringify(_data),
        type: "POST",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        error: function () {
            LALERT.msg("服务器连接失败");
        },
        success: function (e) {
            console.log(e)
            LALERT.success(e.message)
            //完成之后页面
            //分页
            const pagination = new Pagination
            //渲染表格
            let renderTables = data => {
                let str = data.map((item, index) => {
                        typeof item === 'object' && Object.keys(item).forEach(key => {
                            item[key] = item[key] !== null ? item[key] : ''
                            if (key === 'cancel_flag') {
                                if (item[key] == 0) {
                                    item[key] = '正常'
                                } else if (item[key] == 1) {
                                    item[key] = '取消'
                                } else if (item[key] == 0) {
                                    item[key] = ''
                                }
                            }
                            if (key === 'free_flag') {
                                if (item[key] == 0) {
                                    item[key] = '正常'
                                } else if (item[key] == 1) {
                                    item[key] = '释放'
                                } else if (item[key] == 0) {
                                    item[key] = ''
                                }
                            }
                            if (key === 'status') {
                         if (item[key] == 1) {
                            item[key] = '已提交'
                        } else if (item[key] == 2) {
                            item[key] = '已取消'
                        }
                    }
                    if (key === 'check_state') {
                        if (item[key] == 1) {
                            item[key] = '审核通过'
                        } else if (item[key] == 2) {
                            item[key] = '审核不通过'
                        } else if (item[key] == 0) {
                            item[key] = '审核中'
                        }
                    }


                        })
                        return `
          <tr class="table-item">
          <td class="checkbox-wrap"><input type="checkbox" class="_item" data-id='${item.id}'><span class="checkbox-mask"></span></td>

            <td>${(pagination.nowNum - 1) * 10 + index + 1}</td>
            <td class="flexCenter padding0 ">
              <div class="roundBg borderRaidus blueBg look" data-id='${item.booking_no}'><i class="unhide icon margin-Left5" title="查看"></i></div>
              <div class="roundBg borderRaidus greenBg bianji" data-id='${item.booking_no}'><i class="edit icon margin-Left5" title="编辑"></i></div>
              <div class="roundBg borderRaidus oliveBg model" data-id='${item.booking_no}'><i class="icon-insert-template margin-Left5" title="模板"></i></div>
              <div class="roundBg borderRaidus tealBg print" data-id='${item.booking_no}'><i class="icon-printer margin-Left5" title="打印"></i></div>
            </td>
            <td>${item.booking_no}</td>
            <td>${item.status}</td>
              <td>${item.check_state}</td>
            <td>${item.booking_customer_name}</td>
            <td>${item.departure_code}</td>
            <td>${item.destination_code}</td>
            <td>${item.flight_no}</td>
            <td>${item.plan_fry_date}</td>
            <td>${item.apply_quatity}</td>
            <td>${item.apply_weight}</td>
            <td>${item.product_no}</td>
            <td>${item.remark}</td>
          </tr>`

                    }
                ).join('')
                $('.table-listMsg').html(str)
            }

            let searchMainLists = () => {
                // 请求地址
                const reqUrl = baseUrl + '/def/output/booking/getBookingList'
                // 请求参数
                let params = {
                    flight_id: localStorage.flight_id,
                }

                LXHR.POST(reqUrl, params).done(res => {
                    if (res.status === 200) {
                        $(".pageWrapMsg").css('display', 'block')
                        pagination.init('.pageBoxs', res.data[0], params, reqUrl, renderTables)
                        renderTables(res.data[0].list)
                    } else {
                        LALERT.msg(res.message)
                    }
                })
            }
            // 发送请求
            searchMainLists()
        }
    })
}
function btns(stau) {
    var _data = {
        "status": stau,
        "booking_id_list": _arr,
    }
    console.log(_arr)
    $.ajax({
        url: baseUrl + '/def/output/booking/updateBookingStatus',
        data: JSON.stringify(_data),
        type: "POST",
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        error: function () {
            LALERT.msg("服务器连接失败");
        },
        success: function (e) {
            console.log(e)
            LALERT.success(e.message)
            //完成之后页面
            //分页
            const pagination = new Pagination
            //渲染表格
            let renderTables = data => {
                let str = data.map((item, index) => {
                        typeof item === 'object' && Object.keys(item).forEach(key => {
                            item[key] = item[key] !== null ? item[key] : ''
                            if (key === 'cancel_flag') {
                                if (item[key] == 0) {
                                    item[key] = '正常'
                                } else if (item[key] == 1) {
                                    item[key] = '取消'
                                } else if (item[key] == 0) {
                                    item[key] = ''
                                }
                            }
                            if (key === 'free_flag') {
                                if (item[key] == 0) {
                                    item[key] = '正常'
                                } else if (item[key] == 1) {
                                    item[key] = '释放'
                                } else if (item[key] == 0) {
                                    item[key] = ''
                                }
                            }
                            if (key === 'status') {
                         if (item[key] == 1) {
                            item[key] = '已提交'
                        } else if (item[key] == 2) {
                            item[key] = '已取消'
                        }
                    }
                    if (key === 'check_state') {
                        if (item[key] == 1) {
                            item[key] = '审核通过'
                        } else if (item[key] == 2) {
                            item[key] = '审核不通过'
                        } else if (item[key] == 0) {
                            item[key] = '审核中'
                        }
                    }


                        })
                        return `
          <tr class="table-item">
          <td class="checkbox-wrap"><input type="checkbox" class="_item" data-id='${item.id}'><span class="checkbox-mask"></span></td>

            <td>${(pagination.nowNum - 1) * 10 + index + 1}</td>
            <td class="flexCenter padding0 ">
              <div class="roundBg borderRaidus blueBg look" data-id='${item.booking_no}'><i class="unhide icon margin-Left5" title="查看"></i></div>
              <div class="roundBg borderRaidus greenBg bianji" data-id='${item.booking_no}'><i class="edit icon margin-Left5" title="编辑"></i></div>
              <div class="roundBg borderRaidus oliveBg model" data-id='${item.booking_no}'><i class="icon-insert-template margin-Left5" title="模板"></i></div>
              <div class="roundBg borderRaidus tealBg print" data-id='${item.booking_no}'><i class="icon-printer margin-Left5" title="打印"></i></div>
            </td>
            <td>${item.booking_no}</td>
            <td>${item.status}</td>
              <td>${item.check_state}</td>
            <td>${item.booking_customer_name}</td>
            <td>${item.departure_code}</td>
            <td>${item.destination_code}</td>
            <td>${item.flight_no}</td>
            <td>${item.plan_fry_date}</td>
            <td>${item.apply_quatity}</td>
            <td>${item.apply_weight}</td>
            <td>${item.product_no}</td>
            <td>${item.remark}</td>
          </tr>`

                    }
                ).join('')
                $('.table-listMsg').html(str)
            }
            let searchMainLists = () => {
                // 请求地址
                const reqUrl = baseUrl + '/def/output/booking/getBookingList'
                // 请求参数
                let params = {
                    flight_id: localStorage.flight_id,
                }

                LXHR.POST(reqUrl, params).done(res => {
                    if (res.status === 200) {
                        $(".pageWrapMsg").css('display', 'block')
                        pagination.init('.pageBoxs', res.data[0], params, reqUrl, renderTables)
                        renderTables(res.data[0].list)
                    } else {
                        LALERT.msg(res.message)
                    }
                })
            }
            // 发送请求
            searchMainLists()
        }
    })
}

$('.co').click(function () {
    // console.log($(".table-listMsg>._item:checkbox").attr('data-id'))
    var _stau = $('.co').attr('title')
    btn(_stau)
})
$('.cos').click(function () {
    var _stau = $('.cos').attr('title')
    btn(_stau)
})
//******订舱确认取消恢复
// 选中、取消选中
$('.su').click(function () {
    // console.log($(".table-listMsg>._item:checkbox").attr('data-id'))
    var _stau = $('.su').attr('title')
    btns(_stau)
})
$('.sur').click(function () {
    // console.log($(".table-listMsg>._item:checkbox").attr('data-id'))
    var _stau = $('.sur').attr('title')
    btns(_stau)
})