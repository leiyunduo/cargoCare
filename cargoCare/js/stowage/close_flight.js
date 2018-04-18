const close_flight_url =  baseUrl + '/def/output/booking/saveFlightClose'
let close_flight_params = {
  flightList: []
}

$('.flight_closed').on('click', '.table-item', function (evt) {
  $(this).toggleClass('active')
  
  if( $(this).find(':checkbox').is(':checked') ){
    $(this).find(':checkbox').attr('checked', false)
    $(this).find('.cancel_reason').val('')
  }else{
    $(this).find(':checkbox').attr('checked', true)
  }
})

$('.flight_closed .btn-close').on('click', function (evt) {
  close_flight_params.flightList = Array.from( $('.flight_closed').find('input:checked') ).map(item => {
    return $(item).data('id')
  })
 
  LXHR.POST(close_flight_url, JSON.stringify(close_flight_params), {contentType: 'application/json'}).done(res => {
    if(res.status === 200){
      LALERT.success('航班关闭成功')
      LXHR.POST(reqUrl, params).done( res => {
        if(res.status === 200){
          pagination.init('.pageBox', res.data[0], params, reqUrl, renderTable)
          renderTable(res.data[0].list)
        }else{
          LALERT.msg('航班关闭失败')
        }
      })
    }
  })
})