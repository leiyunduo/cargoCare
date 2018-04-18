// 获取部门信息

let dropdownStr = (data, type, noAll) => {
  let optionsStr = noAll ? `` : `<option class="item" data-value=''>全部</option>`
  optionsStr += data.map(item => {
    return `<option class="item" data-value='${type ? item.id : item}'>${type ? item.name : item}</option>`
  }).join('')

  return `
        <input type="hidden" value="">
        <div class="default text">${noAll ? '请选择' : '全部'}</div>
        <i class="dropdown icon"></i>
        <div class="menu">
          ${optionsStr}
        </div>`
}

// 获取部门
let getDepartInfo = () => {
  let url = baseUrl + '/def/depart_manage/get_depart_list_no_page'
  let params = {
    depart_hide_id: pageInfo.departId
  }
  LXHR.POST(url, params).done(res => {
    if(res.status === 200) {
      $('.depart').html(dropdownStr(res.data, 1))
      $('.add_depart').html(dropdownStr(res.data, 1, 1))
      $('.ui.dropdown.depart').dropdown()
      $('.ui.dropdown.add_depart').dropdown()
    }
  })
}

let getLevelInfo = () => {
  let url = baseUrl + '/def/empl_manage/get_level'
  LXHR.POST(url).done(res => {
    if(res.status === 200) {
      $('.level').html(dropdownStr(res.data))
      $('.ui.dropdown.level').dropdown()
    }
  })
}

getDepartInfo()
getLevelInfo()

// 分页
const paginationMain = new Pagination

// 获取用户列表
let renderTable = (data, num) => {
  let str = data.map((item, index) => {
    typeof item === 'object' && Object.keys(item).forEach(key => {
      item[key] = item[key] !== null ? item[key] : ''      
      if(key === 'is_auth') {
        item[key] = item[key] ? '是' : '否'
      }
    })

    return `
    <tr>
      <td>${(num - 1) * 10 + index + 1}</td>
      <td class="flexCenter padding0 ">
        <div class="roundBg borderRaidus greenBg btn_edit" data-id="${item.id}">
          <i class="edit icon margin-Left5" title="编辑"></i>
        </div>
        <div class="roundBg borderRaidus oliveBg btn_set" data-id="${item.id}" data-info='${JSON.stringify(item)}'>
          <i class="setting icon margin-Left5" title="设置权限"></i>
        </div>
        <div class="roundBg borderRaidus redBg btn_delete" data-id="${item.id}">
          <i class="trash outline icon margin-Left5" title="删除"></i>
        </div>
      </td>
      <td>${item.name}</td>
      <td>${item.real_name}</td>
      <td>${item.en_name}</td>
      <td>${item.depart_name}</td>
      <td>${item.level}</td>
      <td>${item.email}</td>
      <td>${item.phone}</td>
      <td>${item.is_auth}</td>
    </tr>`
    }
  ).join('')
  $('.user_table').html(str)
}

let getSearchParams = () => {
  return {
    name: $('.name').val(),
    real_name: $('.real_name').val(),
    level: $('.level').dropdown('get value'),
    depart_research_id: $('.depart_id').dropdown('get value'),
    depart_hide_id: pageInfo.departId,
  }
}

let getUserList = () => {
  let url = baseUrl + '/def/empl_manage/get_empl_list'
  let params = getSearchParams()

  LXHR.POST(url, params).done(res => {
    if(res.status === 200) {
      paginationMain.init('.pageBox', res.data[0], params, url, renderTable)
      renderTable(res.data[0].list, 1)
    }else{
      LALERT.msg(res.message)
    }
  })
}

let updateUserList = d => {
  let url = baseUrl + '/def/empl_manage/get_empl_list'
  let params = getSearchParams()
  paginationMain.init('.pageBox', d, params, url, renderTable)
  renderTable(d.list, 1)
}

$('.btn_search').click(function () {
  getUserList()
})