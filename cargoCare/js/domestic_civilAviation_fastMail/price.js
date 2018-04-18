// 费用相关 ======================================================================================================
let getCostInfo = () => {
  const url= baseUrl + '/def/receive/getCaCost'
  let params = {
    id: $('.ui.dropdown.price_species').dropdown('get value'),
    weight: $('.detail_weight').val(),
    order_no: pageInfo.edit_order_no,
  }

  LXHR.POST(url, params).done(res => {
    if(res.status === 200){
      costInfo.change(res.data)
    }
  })
}

// 价种相关查询
const getCaPriceSpeciesUrl = baseUrl + '/def/receive/getCaPriceSpecies'

let render_price_species_selection = data => {
  let optionsStr = data.map(item => {
    return `<option class="item" data-value="${item.id}" data-info='${JSON.stringify(item)}'>${item.price_species}</option>`
  }).join('')

  let str = `
            <input type="hidden" value="${data[0].id}">
            <div class="default text">${data[0].price_species}</div>
            <i class="dropdown icon"></i>
            <div class="menu">
              ${optionsStr}
            </div>`
  $('.price_species').html(str)
  
  $('.detail_base_price').val(data[0].sale_base_price)
  $('.billing_incr_price').val(data[0].billing_incr_price)
  $('.sale_incr_price').val(data[0].sale_incr_price)
  $('.detail_base_weight').val(data[0].base_weight)
  $('.detail_incr_weight').val(data[0].incr_weight)

  $('.ui.dropdown.price_species')
  .dropdown({
    onChange: function(value, text, $selectedItem) {
      let nowData = $selectedItem.data('info')
      $('.detail_base_price').val(nowData.sale_base_price)
      $('.billing_incr_price').val(nowData.billing_incr_price)
      $('.sale_incr_price').val(nowData.sale_incr_price)
      $('.detail_base_weight').val(nowData.base_weight)
      $('.detail_incr_weight').val(nowData.incr_weight)
      getCostInfo()
      gotoCost()
    }
  })
}
