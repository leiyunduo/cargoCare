// 获取上级部门信息
let dropdownStr = (data, type, noAll) => {
  let optionsStr = data.map(item => {
    return `<option class="item" data-value='${type ? item.id : item}'>${type ? item.name : item}</option>`
  }).join('')

  return `
        <input type="hidden" value="">
        <div class="default text">${noAll ? '请选择上级部门' : '全部'}</div>
        <i class="dropdown icon"></i>
        <div class="menu">
          ${optionsStr}
        </div>`
}

// 获取上级部门
let getDepartInfo = () => {
  let url = baseUrl + '/def/depart_manage/get_depart_list_no_page'
  let params = {
    depart_hide_id: pageInfo.departId
  }
  LXHR.POST(url, params).done(res => {
    if(res.status === 200) {
      $('.parent_depart').html(dropdownStr(res.data, 1, 1))
      $('.ui.dropdown.parent_depart').dropdown()
    }
  })
}

getDepartInfo()

// 添加时改变状态
$('.addBtn').on('click', function(){
  pageInfo.isEdit = false
  $('.two_level_menu_head .title').html('部门管理添加')
  resetAll()
  getDepartInfo()
  gotoDepart()
})

let getSaveParams = () => {
  return {
    name: $('.d_name').val(),
    code: $('.d_code').val(),
    tel: $('.d_tel').val(),
    fax: $('.d_fax').val(),
    parent_depart_id: $('.parent_depart').dropdown('get value'),
    parent_depart_name: $('.parent_depart').dropdown('get text'),
  }
}

// 添加
$('.btn_save_detail').on('click', function () {
  let url = pageInfo.isEdit ? baseUrl + '/def/depart_manage/update_depart_by_id' : baseUrl + '/def/depart_manage/add_depart'
  let params = getSaveParams()
  if(pageInfo.isEdit) {
    Object.assign(params, {id: pageInfo.id})
  }

  LXHR.POST(url, params).done(res => {
    if(res.status === 200) {
      LALERT.success(res.message)
      getDepartList()
      backMain()
    }else{
      LALERT.msg(res.message)
    }
  })
})

// 编辑
let fillDetail = d => {
  if(!d) return
  $('.d_name').val(d.name)
  $('.d_code').val(d.code)
  $('.d_tel').val(d.tel)
  $('.d_fax').val(d.fax)
  $('.parent_depart').dropdown('set value', d.parent_depart_id)
  $('.parent_depart').dropdown('set text', d.parent_depart_name)
  $('.depart_name_info').html(d.name)
  $('.up_depart').html(d.parent_depart_name)
}

let editSearch = () => {
  let url = baseUrl + '/def/depart_manage/get_depart_by_id'
  LXHR.POST(url, {id: pageInfo.id}).done(res => {
    if(res.status === 200) {
      fillDetail(res.data[0])
    }
  })
}

let editSet = () => {
  resetAll()
  pageInfo.isEdit = true
  $('.two_level_menu_head .title').html('部门管理编辑')
  $('.two_level_menu_wrap').css({'display':'block'})
}

$('.depart_table').on('click', '.btn_edit', function () {
  pageInfo.id = $(this).data('id')
  editSet()
  editSearch()
  gotoDepart()
})

$('.depart_table').on('click', '.btn_set', function () {
  pageInfo.id = $(this).data('id')
  editSet()
  editSearch()
  getDepartAuth()
  gotoAuth()
})

// 删除
let deleteDepart = () => {
  let url = baseUrl + '/def/depart_manage/delete_depart_by_id'
  layer.confirm('确认要删除吗?', {
    icon: 0,
    title: '提醒',
    btn: ['确定','取消']
  }, function(){
    LXHR.POST(url, {id: pageInfo.id}).done(res => {
      if(res.status === 200) {
        layer.closeAll()
        LALERT.success(res.message)
        getDepartList()
      }
    })
  }, function(){
      return
  })
}

$('.depart_table').on('click', '.btn_delete', function () {
  pageInfo.id = $(this).data('id')
  deleteDepart()
})

// 保存权限
$('.btn_save_auth').on('click', function () {
  saveDepartAuth()
})