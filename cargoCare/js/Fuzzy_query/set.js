pageInfo.showItems = [
  {name: '单号', en_name: 'order_no', is_select: 1,},
]

pageInfo.searchItems = [
  {name: '单号', en_name: 'order_no', is_select: 1,},
]

// 获取设置项
let getSetItems = () => {
  let url = baseUrl + '/def/zhcx/receve_like/get_receve_show_item_list'
  LXHR.POST(url, {page_id: pageInfo.id}).done(res => {
    if(res.status === 200) {
      pageInfo.dropdownItems = res.data.filter(item => item.property_type).map(item => item.en_name)
    }
  })
}

let getSaveSetParams = (type, list) => {
  return {
    user_id: pageInfo.userId,
    show_type: type,
    list: list,
  }
}

// 保存设置项
let saveSetItems = (params) => {
  let url = baseUrl + '/def/zhcx/receve_like/save_receve_show_item'
  LXHR.POST(url, JSON.stringify(params), {contentType: 'application/json'}).done(res => {
    if(res.status === 200) {
      LALERT.success('设置成功')
    }
  })
}

getSetItems()

// 升维数组
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

// 获取新的设置项
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
      <div class="ui dropdown selection ${item.en_name}">
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
      <input type="text" placeholder="${item.name}" class="${item.en_name}">
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
let renderShowItems = data => {
  let str = '<th>序号</th>'
  str += data.map(item => `<th>${item.name}</th>`).join('')
  $('.show_items').html(str)
}

let getSelectedItems = () => {
  let url = baseUrl + '/def/zhcx/receve_like/get_receve_show_item_by_uid'
  LXHR.POST(url, {user_id: pageInfo.userId, page_id: pageInfo.id}).done(res => {
    if(res.status === 200) {
      pageInfo.showItems = pageInfo.showItems.concat(res.data[0].list_form_head)
      pageInfo.searchItems = pageInfo.searchItems.concat(res.data[0].list_select)

    pageInfo.checkedSearchItems = getCheckedItems(pageInfo.searchItems)
      renderSearchItems(updateArr(pageInfo.checkedSearchItems))
      pageInfo.checkedShowItems = getCheckedItems(pageInfo.showItems)
      renderShowItems(pageInfo.checkedShowItems)
    }
  })
}

getSelectedItems()


$('.set_search').on('click', function () {
  layer.open({
    title: '设置查询条件',
    area: ['400px', '300px'],
    btn: ['确认', '取消'],
    content: renderSet(pageInfo.searchItems),
    yes: function(){
      pageInfo.searchItems = getNewItems()
      pageInfo.checkedSearchItems = getCheckedItems(pageInfo.searchItems)
      renderSearchItems(updateArr(pageInfo.checkedSearchItems))
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
    area: ['400px', '300px'],
    btn: ['确认', '取消'],
    content: renderSet(pageInfo.showItems),
    yes: function(){
      pageInfo.showItems = getNewItems()
      pageInfo.checkedShowItems = getCheckedItems(pageInfo.showItems)
      let list = pageInfo.checkedShowItems.map(item => item.id)
      list.shift()

      let params = getSaveSetParams(1, list)
      saveSetItems(params)
      getOrderList()
      renderShowItems(pageInfo.checkedShowItems)
      layer.closeAll()
    },
  })
})

