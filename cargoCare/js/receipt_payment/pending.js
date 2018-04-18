// 审核 ============================================================================================================
;(function(){
  let pending = () => {
    let url = baseUrl + '/def/finance/updateCheckState'
    let pendingList = checkedData.map(item => item.id)
    let params = {
      departure_arrival_type: pageInfo.deparrType,
      list: pendingList,
      check_state: pageInfo.pendingState,
    }
  
    pendingList.length && LXHR.POST(url, JSON.stringify(params), {contentType: 'application/json'}).done(res => {
      if(res.status === 200) {
        LALERT.success(res.message)
        getOrderList()
      }else{
        LALERT.msg(res.message)
      }
    })
  }
  
  let pendingAll = () => {
    let url = baseUrl + '/def/finance/updateAllCheckState'
    let params = getSearchParams()
    params = Object.assign(params, {departure_arrival_type: pageInfo.deparrType, all_check_state: pageInfo.pendingState,})
  
    LXHR.POST(url, params).done(res => {
      if(res.status === 200) {
        LALERT.success(res.message)
        getOrderList()
      }else{
        LALERT.msg(res.message)
      }
    })
  }
  
  let hasPass = () => {
    return checkedData.some(item => item.check_state === '审核通过')
  }

  // 已选审核通过
  $('.pass_btn').click(function () {
    pageInfo.pendingState = $(this).data('state')
    pending()
  })
  
  // 已选审核不通过
  $('.reject_btn').click(function () {
    if(hasPass()){
      LALERT.msg('包含已通过审核的单子')
      return
    }
    pageInfo.pendingState = $(this).data('state')
    pending()
  })
  
  // 全部审核通过
  $('.all_pass_btn').click(function () {
    pageInfo.pendingState = $(this).data('state')
    pendingAll()
  })
  
  // 全部审核不通过
  $('.all_reject_btn').click(function () {
    if(pageInfo.click_check_able) {
      LALERT.msg('包含已通过审核的单子')
      return
    }

    pageInfo.pendingState = $(this).data('state')
    pendingAll()
  })
})()