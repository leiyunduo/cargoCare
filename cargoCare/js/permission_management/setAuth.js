// 获取员工权限
let getAuthById = () => {
  let url = baseUrl + '/def/auth_manage/get_empl_auth_byid'
  let params = {user_id: pageInfo.id}

  LXHR.POST(url, params).done(res => {
    if(res.status === 200) {
      let zNodes = formatAuthData(res.data)
      TreeObj = $.fn.zTree.init($("#tree"), setting, zNodes)
      pageInfo.authList = zNodes
    }
  })
}

// 填充员工信息
let fillUserInfo = d => {
  $('.user_name').html(d.name)
  $('.user_real_name').html(d.real_name)
  $('.user_depart').html(d.depart_name)
  $('.user_level').html(d.level)
}

// 获取选中权限id列表
let getCheckedId = () => TreeObj.getCheckedNodes(true).map(item => item.id)

// 保存员工权限
let saveUserAuth = () => {
  let url = baseUrl + '/def/auth_manage/save_empl_auth'
  let params = {
    user_id: pageInfo.id,
    auth_list_id: getCheckedId()
  }

  LXHR.POST(url, JSON.stringify(params), {contentType: 'application/json'}).done(res => {
    if(res.status === 200) {
      LALERT.success('权限设置成功')
      getUserList()
      backMain()
    }
  })
}

// 保存权限方案
let saveAuthGroup = () => {
  let url = baseUrl + '/def/auth_manage/save_auth_plan'
  let params = {
    user_id: pageInfo.id,
    auth_id_list: getCheckedId(),
    plan_name: $('.plan_name').val(),
    plan_reamrk: $('.plan_remark').val(),
    is_syn_empl: $('.isSame').checkbox('is checked') ? 1 : 0
  }

  LXHR.POST(url, JSON.stringify(params), {contentType: 'application/json'}).done(res => {
    if(res.status === 200) {
      LALERT.success('权限方案保存成功')
      layer.closeAll()
      getUserList()
      backMain()
    }
  })
}

// 获取权限方案列表
let getAuthGroup = () => {
  let url = baseUrl + '/def/auth_manage/get_auth_plan'
  return new Promise((resolve, reject) => {
    LXHR.POST(url).done(res => {
      if(res.status === 200) {
        resolve(res.data)
      }
    })
  })
}

// 使用该权限方案
let useAuthGroup = () => {
  let url = baseUrl + '/def/auth_manage/use_auth_plan_by_id'
  let params = {
    id: pageInfo.authId
  }
  LXHR.POST(url, params).done(res => {
    if(res.status === 200) {
      let zNodes = formatAuthData(res.data)
      TreeObj = $.fn.zTree.init($("#tree"), setting, zNodes)
      pageInfo.authList = zNodes
      LALERT.success(res.message)
      layer.closeAll()
    }
  })
}

// 点击设置权限
$('.user_table').on('click', '.btn_set', function () {
  pageInfo.id = $(this).data('id')
  pageInfo.nowUser = $(this).data('info')
  fillUserInfo(pageInfo.nowUser)
  getAuthById()
  $('.two_level_menu_wrap').css({'display':'block'})
})

// 保存员工权限
$('.btn_save').on('click', function () {
  saveUserAuth()
})

let getSaveGroupHtml = () => `
  <form class="ui form" style="margin-bottom:10px;">
    <div class="ui mini form">
      <div class="field">
        <label>方案名称</label>
        <input type="text" class="plan_name" placeholder="方案名称">
      </div>
      <div class="field">
        <label>备注</label>
        <input type="text" class="plan_remark" placeholder="备注">
      </div>
    </div>
  </form>
  <div class="inline field">
    <div class="ui checkbox isSame">
      <input type="checkbox">
      <label>是否将当前方案赋予当前用户</label>
    </div>
  </div>
`

let renderAuthGroup = data => data.map((item, index) => `
  <tr class="table_item" data-id="${item.id}">  
  <td>
    <div class="ui radio checkbox">
      <input type="radio" name="radio" class="relate_flight_info_radio">
      <label></label>
    </div>
  </td>
  <td>${index + 1}</td>
  <td class="flexCenter padding0 ">
    <div class="roundBg borderRaidus redBg btn_delete" data-id="${item.id}">
      <i class="trash outline icon margin-Left5" title="删除"></i>
    </div>
  </td>
  <td>${item.plan_name}</td>
  <td>${item.plan_reamrk}</td>
</tr>`).join('')

let getGroupHtml = data => `
  <table class="ui celled table selled" style="min-width:500px;">
    <thead>
      <tr>
        <th></th>
        <th>序号</th>
        <th>操作</th>
        <th>方案名称</th>
        <th>备注</th>
      </tr>
    </thead>
    <tbody class="auth_group_table">
      ${renderAuthGroup(data)}
    </tbody>
  </table>
`

// 删除权限方案
let deleteAuthGroup = () => {
  let url = baseUrl + '/def/auth_manage/delete_auth_plan_by_id'
  let params = {
    id: pageInfo.authId
  }
  layer.confirm('确认要删除吗?', {
    icon: 0,
    title: '提醒',
    btn: ['确定','取消'],
    tipsMore: true,
  }, function(){
    LXHR.POST(url, params).done(res => {
      if(res.status === 200) {
        getAuthGroup().then(data => {
          $('.auth_group_table').html(renderAuthGroup(data))
        })
        LALERT.success(res.message)
      }
    })
  }, function(){
      return
  })
}

$('.btn_save_group').on('click', function () {
  layer.open({
    title: '方案信息',
    area: ['420px', '320px'],
    btn: ['确认', '取消'],
    content: getSaveGroupHtml(),
    yes: function(){
      saveAuthGroup()
    },
  })
})

$('.btn_select_group').on('click', function () {
  getAuthGroup().then(data => {
    layer.open({
      title: '方案列表',
      area: ['auto', '400px'],
      btn: ['确认', '取消'],
      content: getGroupHtml(data),
      yes: function(){
        useAuthGroup()
      },
    })
  })
})

$('body').on('click', '.auth_group_table .table_item', function (evt) {
  $('.auth_group_table').find('.table_item').removeClass('active')
  $(this).addClass('active')
  $(this).find('.checkbox').checkbox('check')
  pageInfo.authId = $(this).data('id')
})

$('body').on('click', '.auth_group_table .btn_delete', function (evt) {
  pageInfo.authId = $(this).data('id')
  deleteAuthGroup()
  return false
})
