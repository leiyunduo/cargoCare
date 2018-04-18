/**
 * 初舱单、终舱单
 */

// 生成初仓单
let getBeginManifestParams = () => {
  let list = getCheckedData('.StowageOrderList_table').map(item => item.order_no)
  return {
    flight_id: pageInfo.flight_id,
    order_nos: list,
  }
}

let create_begin_manifest = () => {
  let url = baseUrl + '/def/output/manifest/saveFirstManifest'
  let params = getBeginManifestParams()

  LXHR.POST(url, JSON.stringify(params), {contentType: 'application/json'}).done(res => {
    if(res.status === 200){
      LALERT.success('生成初舱单成功')

      now_Flight_Info = getListParams()
      fillBegin()
      searchManifest(0)
      gotoBegin()
    }else{
      LALERT.msg(res.message)
    }
  })
}

$('.create_manifest_btn').on('click', function () {
  create_begin_manifest()
})

// 生成终舱单
let create_end_manifest = () => {
  let url = baseUrl + '/def/output/manifest/manifestTypeUpdate'
  let params = {
    flight_id: pageInfo.flight_id,
    type: 1,
  }

  LXHR.POST(url, params).done(res => {
    if(res.status === 200){
      LALERT.success('生成终舱单成功')

      now_Flight_Info = getFirstManifestParams()
      fillEnd()
      searchManifest(1)
      gotoEnd()
    }else{
      LALERT.msg(res.message)
    }
  })
}

$('.create_end_manifest_btn').on('click', function () {
  create_end_manifest()
})


// 查询舱单
$('.manifest .btn-search').on('click', function (evt) {
  searchManifest($(this).data('type'))
})