/**
 * FlightInfo V0.1
 * by:salen
 */

class FlightInfo {
  constructor() {
    this.isInit = false
    this.is_domestic = 2
  }

  init(el, baseUrl, pagination) {
    if(this.isInit){
      return
    }
    this.isInit = true
    this.baseUrl = baseUrl
    this.pagination = pagination
    this.el = $(el)
    this.el.unbind()
    this.event()
  }

  change(params) {
    this.params = params
    this.getFlightInfo()
  }

  render(data, num) {
    let str = data.map((item, index) => {
      typeof item === 'object' && Object.keys(item).forEach(key => {
        item[key] = item[key] !== null ? item[key] : ''
      })

      return `
        <tr data-info='${JSON.stringify(item)}' class="table_item">
          <td>
            <div class="ui radio checkbox">
              <input type="radio" name="radio" class="relate_flight_info_radio">
              <label></label>
            </div>
          </td>
          <td>${(num - 1) * 10 + index + 1}</td>
          <td>${item.plan_fry_date}</td>
          <td>${item.flight_no}</td>
          <td>${item.departure_name}</td>
          <td>${item.plan_fry_time}</td>
          <td>${item.plan_fry_time}</td>
          <td>${item.destination_city_name}</td>
          <td>${item.plan_drop_time}</td>
          <td>${item.plan_drop_time}</td>
          <td>${item.in_stock}</td>
          <td>${item.model_code}</td>
          <td>${item.type}</td>
          <td>${item.available_payload}</td>
          <td>${item.actual_loads}</td>
          <td>${item.booking_loads}</td>
          <td>${item.book_termination}</td>
          <td>${item.update_person}</td>
          <td>${item.data_sources}</td>
          <td>${item.state}</td>
        </tr>`
      }
    ).join('')
    $('.relate_flight_info_table').html(str)
  }

  getFlightInfo() {
    let url = this.baseUrl + '/def/output/booking/getFlightListRelated'
    let params = this.params
      
    LXHR.POST(url, params).done(res => {
      if(res.status === 200){
        if(!res.data[0].list.length) {
          LALERT.msg('无相关航班信息')
        }

        this.pagination.init('.relate_flight_info_pageBox', res.data[0], params, url, this.render)
        this.render(res.data[0].list, 1)
      }else{
        LALERT.msg(res.message)
      }
    })
  }

  event() {
    let This = this
    This.el.on('click', '.table_item', function (evt) {
      This.el.find('.table_item').removeClass('active')
      $(this).addClass('active')
      $(this).find('.checkbox').checkbox('check')
      
      let nowData = $(this).data('info')
      This.is_domestic = nowData.is_domestic
      $('.detail_flight_time').val(formatDate(nowData.plan_fry_date))
      $('.detail_flight_no').val(nowData.flight_no && nowData.flight_no.slice(0,2))
      $('.detail_flight_num').val(nowData.flight_no && nowData.flight_no.slice(2,6))
    })
  }
}

