// 全选行为
checkAction('.close')

let closeFlight = () => {
  let url = baseUrl + '/def/output/booking/saveFlightClose'
  let params ={flightList: getCheckedData('.departure_flight_table')}

  LXHR.POST(url, JSON.stringify(params), {contentType: 'application/json'}).done(res => {
    if(res.status === 200) {
      LALERT.success('航班关闭成功')
      searchFlightList()
    }else{
      LALERT.msg(res.message)
    }
  })
}

$('.close .btn_close').on('click', function () {
  closeFlight()
})

$('.close .btn_search').on('click', function () {
  searchFlightList()
})

// 查看该航班下的订舱列表
$('.close').on('click', '.check_list', function () {
  now_Flight_Info = $(this).data('info')
  fillList()
  searchStowageOrderList()
  gotoList()
  return false
})