
// 添加时改变状态
$('.addBtn').on('click', function(){
  pageInfo.isEdit = false
  $('.two_level_menu_head .title').html('用户管理添加')
  $('.password_title').html('设置密码')
  gotoUser()
  resetAll()
  $('.is_same').dropdown('set value', 1)
})

let getSaveParams = () => {
  return {
    name: $('.d_name').val(),
    password: $('.d_password').val(),
    real_name: $('.d_real_name').val(),
    phone: $('.d_phone').val(),
    email: $('.d_email').val(),
    level: $('.d_level').dropdown('get text'),
    en_name: $('.d_en_name').val(),
    depart_id: $('.d_depart_id').dropdown('get value'),
    is_syn_depart_auth: $('.is_same').dropdown('get value'),
  }
}

// 添加
$('.btn_save_detail').on('click', function () {
  let url = pageInfo.isEdit ? baseUrl + '/def/empl_manage/update_empl_by_id' : baseUrl + '/def/empl_manage/add_empl'
  let params = getSaveParams()

  if(pageInfo.isEdit) {
    Object.assign(params, {id: pageInfo.id})
  }

  LXHR.POST(url, params).done(res => {
    if(res.status === 200) {
      LALERT.success(res.message)
      // updateUserList(res.data[0])
      getUserList()
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
  $('.d_password').val(d.password)
  $('.d_real_name').val(d.real_name)
  $('.d_password').val(d.password)
  $('.d_phone').val(d.phone)
  $('.d_email').val(d.email)
  $('.d_en_name').val(d.en_name)

  $('.d_level').dropdown('set value', d.level)
  $('.d_level').dropdown('set text', d.level)
  $('.d_depart_id').dropdown('set value', d.depart_id)
  $('.d_depart_id').dropdown('set text', d.depart_name)
  $('.is_same').dropdown('set value', d.is_syn_depart_auth)
  $('.is_same').dropdown('set text', d.is_syn_depart_auth ? '是' : '否')

  $('.user_name').html(d.name)
  $('.user_real_name').html(d.real_name)
  $('.user_depart').html(d.depart_name)
  $('.user_level').html(d.level)
}

let editSearch = () => {
  let url = baseUrl + '/def/empl_manage/get_empl_by_id'
  LXHR.POST(url, {id: pageInfo.id}).done(res => {
    if(res.status === 200) {
      fillDetail(res.data[0])
    }
  })
}

let editSet = () => {
  resetAll()
  pageInfo.isEdit = true
  $('.two_level_menu_head .title').html('用户管理编辑')
  $('.password_title').html('重置密码')
  $('.two_level_menu_wrap').css({'display':'block'})
}

$('.user_table').on('click', '.btn_edit', function () {
  pageInfo.id = $(this).data('id')
  editSet()
  editSearch()
  gotoUser()
})

$('.user_table').on('click', '.btn_set', function () {
  pageInfo.id = $(this).data('id')
  editSet()
  editSearch()
  getUserAuth()
  gotoAuth()
})

// 删除
let deleteUser = () => {
  let url = baseUrl + '/def/empl_manage/delete_empl_by_id'
  layer.confirm('确认要删除吗?', {
    icon: 0,
    title: '提醒',
    btn: ['确定','取消']
  }, function(){
    LXHR.POST(url, {id: pageInfo.id}).done(res => {
      if(res.status === 200) {
        layer.closeAll()
        LALERT.success(res.message)
        getUserList()
        // updateUserList(res.data[0])
      }
    })
  }, function(){
      return
  })
}

$('.user_table').on('click', '.btn_delete', function () {
  pageInfo.id = $(this).data('id')
  deleteUser()
})

// 保存权限
$('.btn_save_auth').on('click', function () {
  saveUserAuth()
})