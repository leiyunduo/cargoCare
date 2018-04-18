
// 升维数组
// [1, 2, 3, 4, 5, 6] => [[1, 2, 3, 4], [5, 6]]
let updateArr = arr => {
  let newArr = []
  let update = arr => {
    if(arr.length > 0) {
      newArr.push(arr.splice(0, 4))
      update(arr)
    }
  }
  update(JSON.parse(JSON.stringify(arr)))
  return newArr
}

// 渲染设置项
let renderSet = data => {
  let str = data.map(item => `
    <div class="ui checkbox ${item.is_select ? 'checked' : ''} setCheckItem" data-info='${JSON.stringify(item)}'>
      <input type="checkbox" name="example" ${item.is_select ? 'checked' : ''}>
      <label>${item.name}</label>
    </div>
  `).join('')
  return `
  <div class="checkItems">
    ${str}
  </div>
  `
}

// 获取选中后的设置项数据
let getNewItems = () => Array.from($('.checkItems .setCheckItem'))
.map( item => {
  let obj = $(item).data('info')
  if($(item).checkbox('is checked')) {
    return Object.assign(obj, {is_select: 1})
  }else{
    return Object.assign(obj, {is_select: 0})
  }
})

// 获取选中的设置项
let getCheckedItems = data => data.filter(item => item.is_select)

// 渲染查询条件
let renderRow = data => data.map(item => {
  return item.property_type ? `
    <div class="four wide field ">
      <label>${item.name}</label>
      <div class="ui dropdown selection ${item.en_name} print_head" data-name="${item.name}">
        <input type="hidden">
        <div class="default text">全部</div>
        <i class="dropdown icon"></i>
        <div class="menu">
          <option class="item" data-value="">全部</option>
          <option class="item" data-value="1">是</option>
          <option class="item" data-value="0">否</option>
        </div>
      </div>
    </div>
    ` :
    `
    <div class="four wide field ">
      <label>${item.name}</label>
      <input type="text" placeholder="${item.name}" data-name="${item.name}" class="print_head ${item.en_name}">
    </div>
    `
}).join('')

let renderSearchItems = data => {
  let str = data.map(item => {
    return `
      <div class="row">
        <div class="four fields">
          ${renderRow(item)}
        </div>
      </div>
      `
  }).join('')
  $('.search_items').html(str)
  $('.search_items .dropdown').dropdown()
}

// 渲染表头显示项
let getTheadStr = data => {
  let str = '<th>序号</th>'
  str += data.map(item => `<th>${item.name}</th>`).join('')
  return str
}

let renderShowItems = data => {
  let str = getTheadStr(data)
  $('.show_items').html(str)
}

// 从可选的显示项中过滤掉与查询依据重复的项
let filterShowItems = () => {
  let basisInfo = $('.about_select_value').data('info')
  basisInfo && pageInfo.showItems.forEach((item, index) => {
    if((item.en_name === basisInfo.en_name) && !item.search_about) {
      pageInfo.showItems.splice(index, 1)
    }
  })
}

// 从可选的查询项中过滤掉与查询依据重复的项
let filterSearchItems = () => {
  let basisInfo = $('.about_select_value').data('info')
  basisInfo && pageInfo.searchItems.forEach((item, index) => {
    if(item.en_name === basisInfo.en_name) {
      pageInfo.searchItems.splice(index, 1)
    }
  })
}

// 获取当前用户已有设置项
let getSelectedItems = (type) => {
  let url = baseUrl + '/def/zhcx/report_check_util/get_report_show_item_by_uid'
  LXHR.POST(url, {page_id: pageInfo.id, show_type: type,}).done(res => {
    if(res.status === 200) {
      pageInfo.dropdownItems = res.data.filter(item => item.property_type).map(item => item.en_name)
      if(type) {
        pageInfo.showItems = pageInfo.showItems.concat(res.data)
        pageInfo.haveBasis && filterShowItems()
        pageInfo.checkedShowItems = getCheckedItems(pageInfo.showItems)
        renderShowItems(pageInfo.checkedShowItems)
      }else{
        pageInfo.searchItems = pageInfo.searchItems.concat(res.data)
        pageInfo.haveBasis && filterSearchItems()
        pageInfo.checkedSearchItems = getCheckedItems(pageInfo.searchItems)
        renderSearchItems(updateArr(pageInfo.checkedSearchItems))
      }
    }
  })
}

let getSelectedShowItems = () => {
  getSelectedItems(1)
}

let getSelectedSearchItems = () => {
  getSelectedItems(0)
}

if(pageInfo.haveBasis) {
  get_search_basis().then(res => {
    getSelectedShowItems()
    getSelectedSearchItems()
  })
}else{
  getSelectedShowItems()
  getSelectedSearchItems()
}

// 获取保存设置项参数
let getSaveSetParams = (type, list) => {
  return {
    user_id: pageInfo.userId,
    show_type: type,
    list: list,
  }
}

// 保存设置项
let saveSetItems = (params) => {
  let url = baseUrl + '/def/zhcx/report_check_util/save_report_show_item'
  LXHR.POST(url, JSON.stringify(params), {contentType: 'application/json'}).done(res => {
    if(res.status === 200) {
      LALERT.success('设置成功')
      if(params.show_type) {
        renderShowItems(pageInfo.checkedShowItems)
        getOrderList()
      }else{
        renderSearchItems(updateArr(pageInfo.checkedSearchItems))
      }
    }else{
      LALERT.msg(res.message)
    }
  })
}

$('.set_search').on('click', function () {
  layer.open({
    title: '设置查询条件',
    area: ['700px', '400px'],
    btn: ['确认', '取消'],
    content: renderSet(pageInfo.searchItems),
    yes: function(){
      pageInfo.searchItems = getNewItems()
      pageInfo.checkedSearchItems = getCheckedItems(pageInfo.searchItems)
      let list = pageInfo.checkedSearchItems.map(item => item.id)
      list.shift()

      let params = getSaveSetParams(0, list)
      saveSetItems(params)
      layer.closeAll()
    },
  })
})

$('.set_show').on('click', function () {
  layer.open({
    title: '设置数据显示项',
    area: ['700px', '400px'],
    btn: ['确认', '取消'],
    content: renderSet(pageInfo.showItems),
    yes: function(){
      pageInfo.showItems = getNewItems()
      pageInfo.checkedShowItems = getCheckedItems(pageInfo.showItems)
      let list = pageInfo.checkedShowItems.map(item => item.id)
      list.shift()

      let params = getSaveSetParams(1, list)
      saveSetItems(params)
      layer.closeAll()
    },
  })
})

