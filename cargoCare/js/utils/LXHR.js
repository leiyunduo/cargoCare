
let globalBaseUrl = {
   // baseUrl: 'http://192.168.1.112:8080/lxtd-cca-apis',
  baseUrl: 'http://47.93.90.229/test',
}

var LXHR = {
  GET (url, data = {}, options = {}) {
    let option = Object.assign({
      url: url,
      data: data,
      dataType:"json"
    }, options)
    return $.ajax(option)
  },
  POST (url, data = {}, options = {}) {
    let option = Object.assign({
      url: url,
      data: data,
      dataType:"json",
      type:"POST",
    }, options)
    return $.ajax(option)
  },
}

var LALERT = {
  msg (msg, callback) {
    layer.msg(msg, {icon: 0, offset: 't', anim: 6,}, callback)
  },
  success (msg, callback) {
    layer.msg(msg, {icon: 1, offset: 't'}, callback)
  },
}
