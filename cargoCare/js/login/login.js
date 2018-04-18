const pageInfo = {
	//baseUrl: 'http://192.168.1.113:8080/lxtd-cca-apis',
  baseUrl: 'http://47.93.90.229/test',
}

let { setStore } = Store
let baseUrl = globalBaseUrl.baseUrl || pageInfo.baseUrl
//登录跳转函数
$(function () {
	let getSys = () => {
		let Sys = {}
		let ua = navigator.userAgent.toLowerCase()
		let s
		(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
		(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
		(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
		(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
		(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0
	
		if (Sys.ie) console.log('IE: ' + Sys.ie)
		if (Sys.firefox) console.log('Firefox: ' + Sys.firefox)
		if (Sys.chrome) console.log('Chrome: ' + Sys.chrome)
		if (Sys.opera) console.log('Opera: ' + Sys.opera)
		if (Sys.safari) console.log('Safari: ' + Sys.safari)
	}

	getSys()
	
	setTimeout(function () {
		$('.center').css({ 'transition': '.3s', 'opacity': '1', 'transform': 'scale(1)' })
	}, 800)

	$(".ui.teal.button").click(function () {
		// login
		let url = baseUrl + "/auth/login"
		let params = {
			name: $('.name').val(),
			password: $('.password').val(),
		}

		LXHR.POST(url, params).done(res => {
			if(res.status === 200) {
				$('.center').css({ 'transition': '.2s', 'opacity': '0', 'transform': 'scale(2.9,1.6)' })
				setTimeout(function () {
					setStore('authList', res.data[0].authNameList)
					setStore('admin', res.data[0].is_admin)
					setStore('departId', res.data[0].depart_id)
					setStore('userId', res.data[0].id)
					setStore('session_id', res.data[0].session_id)
					setStore('real_name', res.data[0].real_name)

					window.location.href = "showStytm.html"
					LALERT.success('登录成功')
				}, 600)
			}else{
				LALERT.msg(res.message)
			}
		})
	})
})

