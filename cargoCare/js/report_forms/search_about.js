
// 当查询依据改变时改变表头显示项
let changeShowSearchBasis = basisItem => {
  pageInfo.showItems = pageInfo.showItems.filter(item => {
    return !item.search_about
  })
  pageInfo.showItems.push(basisItem)
  pageInfo.checkedShowItems = getCheckedItems(pageInfo.showItems)
  renderShowItems(pageInfo.checkedShowItems)
}

let renderBasisSelect = data => {
  let optionsStr = data.map(item => {
    return `
    <option class="item" data-value="${item.show_name}">
      ${item.show_name}
    </option>
    `
  }).join('')
  
  let str = `
  <input type="hidden" value="${data[0].show_name}">
  <div class="default text">${data[0].show_name}</div>
  <i class="dropdown icon"></i>
  <div class="menu">
    ${optionsStr}
  </div>
  `
  $('.about_select_value').html(str)
  $('.about_select_value').dropdown()
}

let getBasisSelect = params => {
  let url = baseUrl + '/def/zhcx/pick_up/get_drop_down_box_detail'
  LXHR.POST(url, params).done(res => {
    if(res.status === 200) {
      renderBasisSelect(res.data)
    }else{
      LALERT.msg(res.message)
    }
  })
}

let render_search_basis = data => {
  let optionsStr = data.map(item => {
    return `
    <option class="item" data-value="${item.id}" data-info='${JSON.stringify(item)}'>
      ${item.query_basis_name}
    </option>
    `
  }).join('')

  let str = `
  <input type="hidden" value="${data[0].id}">
  <div class="default text">${data[0].query_basis_name}</div>
  <i class="dropdown icon"></i>
  <div class="menu">
    ${optionsStr}
  </div>
  `

  $('.about_select_wrap').html(`
    <label class="about_label">${data[0].cn_name}</label>
    <div class="ui dropdown selection about_select_value" data-info='${JSON.stringify(data[0])}'></div>
  `)

  getBasisSelect(
    {
      en_name: data[0].en_name,
      start_date: $('.before_time').val(),
      end_date: $('.now_time').val(),
    }
  )

  pageInfo.showItems.push(
    {
      search_about: 1,
      name: data[0].cn_name,
      en_name: data[0].en_name,
      is_select: 1,
    }
  )

  $('.search_about').html(str)
  $('.search_about').dropdown({
    onChange: function(value, text, $selectedItem) {
      if($selectedItem){
        let info = $selectedItem.data('info')
        let about_select_str = `
        <label class="about_label">${data[0].cn_name}</label>
        <div class="ui dropdown selection about_select_value" data-info='${JSON.stringify(data[0])}'></div>
        `
        $('.about_select_wrap').html(about_select_str)

        getBasisSelect(
          {
            en_name: info.en_name,
            start_date: $('.before_time').val(),
            end_date: $('.now_time').val(),
          }
        )

        let basisItem = {
          search_about: 1,
          name: info.cn_name,
          en_name: info.en_name,
          is_select: 1,
        }
        changeShowSearchBasis(basisItem)
        getOrderList()
      }
    }
  })
}

let get_search_basis = () => {
  let url = baseUrl + '/def/zhcx/report_check_util/get_query_basis'

  return new Promise(resolve => {
    LXHR.POST(url, {page_id: pageInfo.id}).done(res => {
      if(res.status === 200) {
        if(res.data[0]) {
          render_search_basis(res.data)
        }
        resolve()
      }else{
        LALERT.msg(res.message)
      }
    })
  })
}

$('.now_time').val(getTime())
$('.before_time').val(getOneMonthAgoTime())