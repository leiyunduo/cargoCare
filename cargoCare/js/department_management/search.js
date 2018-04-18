
// 获取部门列表
let renderTable = (data, num) => {
  let isReWtite = key => key === 'is_show_tel' || key === 'is_show_sender' || key === 'is_show_address' || key === 'related_departure' || key === 'related_arrival'

  let str = data.map((item, index) => {
    typeof item === 'object' && Object.keys(item).forEach(key => {
      item[key] = item[key] !== null ? item[key] : ''    
  
      if(isReWtite(key)) {
        item[key] = item[key] ? '是' : '否'
      }
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
      <td>${item.code}</td>
      <td>${item.name}</td>
      <td>${item.parent_depart_name}</td>
      <td>${item.tel}</td>
      <td>${item.fax}</td>
      <td>${item.is_auth}</td>
    </tr>`
    }
  ).join('')
  $('.depart_table').html(str)
}

let getSearchParams = () => {
  return {
    name: $('.depart_name').val(),
    code: $('.depart_code').val(),
    depart_hide_id: pageInfo.departId,
  }
}

let getDepartList = () => {
  let url = baseUrl + '/def/depart_manage/get_depart_list_no_page'
  let params = getSearchParams()
  
  LXHR.POST(url, params).done(res => {
    if(res.status === 200) {
      renderTable(res.data, 1)
    }else{
      LALERT.msg(res.message)
    }
  })
}

$('.btn_search').click(function () {
  getDepartList()
})