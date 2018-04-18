const Store = {
  getStore(name) {
    if (!name) return
    return window.localStorage.getItem(name)
  },
  setStore(name, content) {
    if (!name) return
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
  },
  removeStore(name) {
    if (!name) return
    window.localStorage.removeItem(name)
  },
  clearStore() {
    window.localStorage.clear()
  },
}

// 格式化日期
let formatDate = date => {
  date = date ? date : ''
  // return date.slice(0,10).split('-').join('')
  return date.slice(0,10)
}

// 格式化时间
let formatTime = time => {
  time = time ? time : ''
  return time.slice(0,19)
}

// 小写转大写
let toUpper = () => {
  $('.toUpper').on('input', function () {
    // let upVal = $(this).val().toUpperCase()
    // $(this).val(upVal)
  })
}

// 清除错误提示
const clearError = () => {
  $('.ui.form').removeClass('error')
  $('.field').removeClass('error')
  $('.field .ui.basic.red.prompt').remove()
}

// 清空开单明细
const clearIpt = () => {
  $('.tabBodyWrap .detail input').not("input[type='hidden']").val('')
  $('.tabBodyWrap .detail textarea').val('')
  $('.tabBodyWrap .detail .dropdown').dropdown('clear')
  $('.tabBodyWrap .detail .dropdown').dropdown('set value', 0)
}

// 清空主页搜索
const clearSearch = () => {
  $('.main_search input').not("input[type='hidden']").val('')
  $('.main_search .dropdown').dropdown('clear')
}

// 跳转页面
let jump = () => {
  $(".tabNav .item").removeClass('active')
  $(".tabNav .item").removeClass('tabColor')
  $(".tabBox").hide()
}

// 跳到开单明细
let gotoDetail = () => {
  jump()
  $(".tabBox.detail").show()
  $(".tabNav .detail").addClass('active tabColor')
}
// 跳到开单费用
let gotoCost = () => {
  jump()
  $(".tabBox.cost").show()
  $(".tabNav .cost").addClass('active tabColor')
  $(".insertCostInfo .cost_name").focus()
}
// 跳到拼单明细
let gotoBind = () => {
  jump()
  $(".tabBox.bind").show()
  $(".tabNav .bind").addClass('active tabColor')
}
// 跳到体积
let gotoVolume = () => {
  jump()
  $(".tabBox.volume").show()
  $(".tabNav .volume").addClass('active tabColor')
  $('.insertVolumeInfo .volume_length').focus()
}
// 跳到出发、到达信息
let gotoStartArrive = () => {
  jump()
  $(".tabBox.start_arrival").show()
  $(".tabNav .start_arrival").addClass('active tabColor')
  $('.insertServiceInfo .insert').focus()
}
// 跳到相关航班信息
let gotoRelateFlight = () => {
  jump()
  $(".tabBox.relate_flight").show()
  $(".tabNav .relate_flight").addClass('active tabColor')
}

// 跳到用户编辑
let gotoUser = () => {
  jump()
  $(".tabNav .item").hide()
  $(".tabBox.user").show()
  $(".tabNav .user").show()
  $(".tabNav .user").addClass('active tabColor')
}

// 跳到部门编辑
let gotoDepart = () => {
  jump()
  $(".tabNav .item").hide()
  $(".tabBox.depart").show()
  $(".tabNav .depart").show()
  $(".tabNav .depart").addClass('active tabColor')
}

// 跳到权限编辑
let gotoAuth = () => {
  jump()
  $(".tabNav .item").hide()
  $(".tabBox.auth").show()
  $(".tabNav .auth").show()
  $(".tabNav .auth").addClass('active tabColor')
}

// 返回主页
let backMain = () => {
  $('.two_level_menu_wrap').css({'display':'none'})
}

// 确定并返回开单明细
$('.sure_and_back_detail').click(function () {
  gotoDetail()
  let type = $(this).data('type')
  setTimeout(function() {
    switch (true) {
      case type === 'bind':
        $('.bind_input').focus()
      break;
      case type === 'flight':
        $('.flight_input').focus()
      break;
      case type === 'volume':
        $('.volume_input').focus()
        if($('.sumPiece').html() !== $('.d_piece').val()) {
          LALERT.msg('体积录入总件数与明细件数不一致,请确认')
        }
      break;
      case type === 'price':
        $('.price_input').focus()
      break;
      case type === 'custom':
        $('.custom_input').focus()
      break;
      default: break;
    }
  }, 100)
})

// 获取创建编辑时间
let add0 = (n) => {
  n = n > 9 ? n : '0' + n 
  return n
}

let getTime = () => {
  let oDate = new Date()
  let y = oDate.getFullYear()
  let m = oDate.getMonth() + 1
  let d = oDate.getDate()
  let h = oDate.getHours()
  let min = oDate.getMinutes() 
  let s = oDate.getSeconds()
  let nowTime = y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(min) + ':' + add0(s)

  if(pageInfo.isEdit){
    $('.d_update_time').val(nowTime)
  }else{
    $('.d_create_time').val(nowTime)
  }

  return nowTime
}

// 获取一个月前的时间
let getOneMonthAgoTime = () => {
  let oDate = new Date()
  let y = oDate.getFullYear()
  let d = oDate.getDate()
  let m = oDate.getMonth()
  if(d === 31) {
    m = m + 1
    d = 1
  }else{
    m = m ? m : 12
  }
  
  let h = oDate.getHours()
  let min = oDate.getMinutes() 
  let s = oDate.getSeconds()
  let nowTime = y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(min) + ':' + add0(s)

  if(pageInfo.isEdit){
    $('.d_update_time').val(nowTime)
  }else{
    $('.d_create_time').val(nowTime)
  }

  return nowTime
}

// 验证失败后提示
let failValidate = () => {
  LALERT.msg('请按要求填写')
  $('.ui.form.detail_form').form('validate form')
}

let {getStore:getstore} = Store

let authLists = JSON.parse(getstore('authList'))
// 根据权限判断按钮是否显示
Array.from($('.auth_about')).forEach((item1, index) => {
  let isShow = authLists.some(item2 => {
    return $(item1).data('id') === item2.id
  })

  if(!isShow) {
    $(item1).hide()
  }
})