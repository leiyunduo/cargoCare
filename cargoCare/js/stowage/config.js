
const pageInfo = {
  // baseUrl: 'http://192.168.1.100:8080/lxtd-cca-apis',
  baseUrl: 'http://47.93.90.229/test',
}

let baseUrl = globalBaseUrl.baseUrl || pageInfo.baseUrl

let gotoBook = () => {
  jump()
  $(".tabBox.book").show()
  $(".tabNav .book").addClass('active')
}
// 跳到配载订舱列表
let gotoList = () => {
  jump()
  $(".tabBox.list").show()
  $(".tabNav .list").addClass('active')
}
// 跳到取消配载订舱
let gotoCancel = () => {
  jump()
  $(".tabBox.cancel").show()
  $(".tabNav .cancel").addClass('active')
}
// 跳到初舱单
let gotoBegin = () => {
  jump()
  $(".tabBox.begin").show()
  $(".tabNav .begin").addClass('active')
}
// 跳到终舱单
let gotoEnd = () => {
  jump()
  $(".tabBox.end").show()
  $(".tabNav .end").addClass('active')
}
// 跳到航班关闭
let gotoClose = () => {
  jump()
  $(".tabBox.close").show()
  $(".tabNav .close").addClass('active')
}