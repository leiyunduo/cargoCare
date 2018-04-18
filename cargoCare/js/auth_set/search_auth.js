let updateTree = (data) => {
  let zNodes = formatAuthData(data)
  TreeObj = $.fn.zTree.init($("#tree"), setting, zNodes)
}

let getAuthById = (url, params) => {
  LXHR.POST(url, params).done(res => {
    if(res.status=== 200) {
      updateTree(res.data)
    }else{
      LALERT.msg(res.message)
    }
  })
}

let getDepartAuth = () => {
  let url = baseUrl + '/def/depart_manage/get_depart_auth_byid'
  let params = {depart_id: pageInfo.id}
  getAuthById(url, params)
}

let getUserAuth = () => {
  let url = baseUrl + '/def/empl_manage/get_empl_auth_by_userid'
  let params = {user_id: pageInfo.id}
  getAuthById(url, params)
}

let getCheckedId = () => TreeObj.getCheckedNodes(true).map(item => item.id)

getUpdateAuthList = () => pageInfo.sysAuthList.map(item => {
  getCheckedId().forEach(id => {
    if(item.id === id) {
      item.is_select = 1
    }
  })
  return item
})

let saveAuth = (url, params) => {
  LXHR.POST(url, JSON.stringify(params), {contentType: 'application/json'}).done(res => {
    if(res.status=== 200) {
      LALERT.success('权限保存成功')
      backMain()
    }else{
      LALERT.msg(res.message)
    }
  })
}

let saveDepartAuth = () => {
  let url = baseUrl + '/def/depart_manage/save_depart_auth'
  let params = {
    depart_id: pageInfo.id,
    auth_list_id: getCheckedId(),
    // auth_list_id: getUpdateAuthList(),
  }
  saveAuth(url, params)
}

let saveUserAuth = () => {
  let url = baseUrl + '/def/empl_manage/save_empl_auth'
  let params = {
    user_id: pageInfo.id,
    auth_list_id: getCheckedId(),
    // auth_list_id: getUpdateAuthList(),
  }
  
  saveAuth(url, params)
}