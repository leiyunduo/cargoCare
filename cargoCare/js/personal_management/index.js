let {getStore} = Store
const pageInfo = {
  baseUrl: 'http://47.93.90.229/test',
  // baseUrl: 'http://192.168.1.108:8080/lxtd-cca-apis',
  id: getStore('userId'),
  is_edit: false,
  password_edit: false,
}

let baseUrl = globalBaseUrl.baseUrl || pageInfo.baseUrl

let fillDetail = (d) => {
  $('.user_name').html(d.name)
  $('.user_real_name').html(d.real_name)
  $('.user_en_name').html(d.en_name)
  $('.user_tel').html(d.phone)
  $('.user_email').html(d.email)
  $('.user_depart').html(d.depart_name)

  $('.d_en_name').val(d.en_name)
  $('.d_email').val(d.email)
  $('.d_phone').val(d.phone)
}

let getPersonalInfo = () => {
  let url = baseUrl + '/def/empl_manage/get_empl_by_id'
  LXHR.POST(url, {id: pageInfo.id}).done(res => {
    if(res.status === 200) {
      fillDetail(res.data[0])
    }
  })
}

let getSaveParams = () => {
  return {
    id: pageInfo.id,
    en_name: $('.d_en_name').val(),
    phone: $('.d_phone').val(),
    email: $('.d_email').val(),
  }
}

let resetEditInfo = () => {
  $('.btn_edit').html('编辑信息')
  $('.edit_info').hide()
  pageInfo.is_edit = false
}

let resetPasswordInfo = () => {
  $('.password_edit').html('修改密码')
  $('.password_info').hide()
  pageInfo.password_edit = false
}

let savePersonalInfo = () => {
  let url = baseUrl + '/def/empl_manage/update_empl_by_id'
  let params = getSaveParams()

  LXHR.POST(url, params).done(res => {
    if(res.status === 200) {
      LALERT.success(res.message)
      resetEditInfo()
      getPersonalInfo()
    }else{
      LALERT.msg(res.message)
    }
  })
}

let getPasswordParams = () => {
  return {
    old_password: $('.d_old_password').val(),
    new_password: $('.d_new_password').val(),
  }
}

let savePassword = () => {
  let url = baseUrl + '/def/empl_manage/update_password_by_id'
  let params = getPasswordParams()
  
  LXHR.POST(url, params).done(res => {
    if(res.status === 200) {
      LALERT.success(res.message)
      getPersonalInfo()
      resetEditInfo()
    }else{
      LALERT.msg(res.message)
    }
  })
}

getPersonalInfo()

$('.btn_edit').on('click', function () {
  resetPasswordInfo()
  pageInfo.is_edit = !pageInfo.is_edit
  $('.edit_info').toggle()

  if(pageInfo.is_edit) {
    $(this).html('取消编辑')
    $('.d_real_name').focus()
  }else{
    $(this).html('编辑信息')
  }
})

$('.password_edit').on('click', function () {
  resetEditInfo()
  pageInfo.password_edit = !pageInfo.password_edit
  $('.password_info').toggle()

  if(pageInfo.password_edit) {
    $(this).html('取消修改')
    $('.d_old_password').focus()
  }else{
    $(this).html('修改密码')
  }
})

$('.d_sure_password').on('change', function () {
  if($(this).val() !== $('.d_new_password').val()) {
    LALERT.msg('两次输入的密码不一致')
    $(this).focus()
  }
})

$('.btn_save_detail').on('click', function () {
  savePersonalInfo()
})

$('.btn_save_password').on('click', function () {
  if($('.d_sure_password').val() !== $('.d_new_password').val()) {
    LALERT.msg('两次输入的密码不一致')
    $('.d_sure_password').focus()
    return
  }

  savePassword()
})