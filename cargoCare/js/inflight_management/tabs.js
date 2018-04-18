
// 跳到到达页面
$('.detail_service_record').on('keyup', function(evt){
  if(evt.keyCode === 13){
    gotoStartArrive()
  }
})

// 相关航班信息====================================================================================================
;(function(){
  let getFlightParams = () => {
    return {
      currPage: 1,
      order_three_code: $('.detail_order_no_3 ').val(),
    }
  }

  $('.tabNav .relate_flight').on('click', function () {
    flightInfo.change(getFlightParams())
    gotoRelateFlight()
  })

  $('.detail_flight_time').on('keyup', function (evt) {
    if(evt.keyCode === 13){
      flightInfo.change(getFlightParams())
      gotoRelateFlight()
    }
  })
})()