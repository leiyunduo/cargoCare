//左侧功能键的展示
$('.inactive').click(function () {
	if ($(this).siblings('ul').css('display') == 'none') {
		$(this).parent('li').siblings('li').removeClass('inactives');
		// $(this).addClass('inactives');
		$(this).siblings('ul').slideDown(500).children('li');
		if ($(this).parents('li').siblings('li').children('ul').css('display') == 'block') {
			$(this).parents('li').siblings('li').children('ul').parent('li').children('a').removeClass('inactives');
			$(this).parents('li').siblings('li').children('ul').slideUp(500);
		}
	} else {
		//控制自身变成+号
		$(this).removeClass('inactives');
		//控制自身菜单下子菜单隐藏
		$(this).siblings('ul').slideUp(500);
		//控制自身子菜单变成+号
		$(this).siblings('ul').children('li').children('ul').parent('li').children('a').addClass('inactives');
		//控制自身菜单下子菜单隐藏
		$(this).siblings('ul').children('li').children('ul').slideUp(500);

		//控制同级菜单只保持一个是展开的（-号显示）
		$(this).siblings('ul').children('li').children('a').removeClass('inactives');
	}
})

// ***********************************

//欢迎页Menu单击事件
$('.W_button').click(function (event) {
	//三级菜单栏出现
	$('.wym').addClass('active')
	//黑色背景框出现
	$('.wym_wrap_black').addClass('active')

	event.stopPropagation();
})

//点击黑背景的事件
$('.wym_wrap_black').click(function () {
	//三级菜单回归左侧
	$('.wym').removeClass('active')
	//黑色菜单回归左侧
	$('.wym_wrap_black').removeClass('active')
	if (!$('.W_nav').hasClass('active')) {
		$('.W_nav').addClass('active')
		$('.wrap').addClass('active')
	}
})

//Get Started 的点击
$('.M_button_content').click(function () {
	//三级菜单栏出现
	$('.wym').addClass('active')
	//主体内容出现
	$('.wrap').show()
	//初始页面隐藏
	$('.wym_wrap').hide()
	return false
})

//菜单的点击
$('.W_nav').click(function (event) {
	//菜单回归左侧
	$(this).removeClass('active')
	//三级菜单栏出现
	$('.wym').addClass('active')

	$('.wrap').removeClass('active')

	//黑色菜单回归左侧
	$('.wym_wrap_black').addClass('active')

	event.stopPropagation();
})

//菜单的hover
$('.W_nav').hover(function () {
	$(this).css({ 'width': '150px', 'transition': '1s' });
	$(this).html('<span></span><span></span><span></span><li class="W_nav_a">菜单</li>');
}, function () {
	$(this).css({ 'width': '55px', 'transition': '1s' });
	$(this).html('<span></span><span></span><span></span>');
})

$('.W_nav_left').click(function (event) {
	event.stopPropagation();
})

$('.W_user>img').click(function () {
	location.reload(true)
})

$('.list a').on('click', function () {
	//选项卡过渡效果开始
	var con_header_width = Number.parseInt($('.con_header').css('width'))
	var width = Number.parseInt($('.con_header_children.active').css('width'))
	//判断有没有点击过
	if ($(this).attr('alt') && $(this).attr('checked')) {
		//获取alt
		var alt = $(this).attr('alt')
		//判断是否大于容器的长度
		if (width > con_header_width) {
			for (let i = 0; i < $('.con_header_children a').length; i++) {
				// 找出相同元素的位置
				if (alt == $('.con_header_children a').eq(i).attr('alt')) {
					// 获取元素相对于父级的位置
					var n = $('.con_header_children a')[i].offsetLeft
					if (n < con_header_width / 2) {
						$('.con_header_children').animate({ 'left': 0 }, 1000, 'linear')
					} else if (n > width - con_header_width) {
						$('.con_header_children').animate({ 'left': con_header_width - width + 'px' }, 1000, 'linear')
					} else {
						$('.con_header_children').animate({ 'left': -n / 2 + 'px' }, 1000, 'linear')
					}
					$('.con_header_children a').removeClass('active')
					$('.con_header_children a').eq(i).addClass('active')
					break;
				}
			}
		} else {
			for (let i = 0; i < $('.con_header_children a').length; i++) {
				if (alt == $('.con_header_children a').eq(i).attr('alt')) {

					$('.con_header_children a').removeClass('active')
					$('.con_header_children a').eq(i).addClass('active')
					$('.wym_container_list').css('display', 'block')

					// iframe标签换地址
					iframeChangeUrl($(this))
					$('.W_nav').addClass('active')
					$('.wym').removeClass('active');
					$('.wrap').show().addClass('active')
					$('.wym_wrap_black').removeClass('active')
					break;
				}
			}
		}
	}
	// 选项卡过渡效果结束
	if (!$(this).next().length && !$(this).attr('checked')) {
		// 三级菜单栏回归左侧
		$('.wym').removeClass('active')
		// 主体内容出现
		$('.wrap').show().addClass('active')
		// 初始页面隐藏
		$('.wym_wrap').hide()
		// 黑色菜单回归左侧
		$('.wym_wrap_black').removeClass('active')

		$('.W_nav').addClass('active')
		// 欢迎页的menu消失
		$('.W_button').css({ 'display': 'none' });
		// iframe标签换地址
		iframeChangeUrl($(this))

		if ($('.firstPage').css('display') !== 'none') {
			$('.firstPage').css({ 'display': 'none' })
		}

		// 让右边内容出来
		$('.wym_container').addClass('active')

		// 给点击的加上一个属性 标明被点击过了，无法再次点击
		$(this).attr({ checked: "true" })
		let navItem = {
			name: $(this).data('name'),
			alt: $(this).attr('alt'),
			active: 1,
		}
		open_or_change(navItem)

		// 过渡效果开始
		tabTransition()
		// 过渡效果结束
		tabBtnSOH()
	}
})

$('W_append').on('click', function () {
	var _url1 = $('W_append').attr(alt)
})

$('.wym_container').on('click', function (e) {
	$('.wym').addClass('active').removeClass('overlay visible')
	$('.W_nav').addClass('active')
})

// 清除按按钮的刷新页事件
$('button').click(function () {
	return false;
})

$('.con_header_children').on('click', 'a', function (e) {
	var This = $(this)
	if ($(this).data('active')) return
	
	layer.confirm('离开当前页面后会丢失未保存的操作，确定要离开吗?', {
		icon: 0,
		title: '提醒',
		btn: ['确定', '取消'],
	}, function () {
		clearActive()
		navData[This.data('index')].active = 1
		if (This.attr('alt') == 'index_show') {
			$('.firstPage').css({ 'display': 'flex' })
		} else {
			$('.firstPage').css({ 'display': 'none' })
		}
		renderNavs()
		// iframe标签换地址
		iframeChangeUrl(This)
		layer.closeAll()
		return false
	}, function () {
		return
	})
})

// window.oncontextmenu = function() { return false; }
$('.con_header_children').on('mousedown', 'a', function (e) {
	if (e.which == 3) {
		var x = e.clientX;
		var y = e.clientY;
		$(".W_qq").show().css({ 'left': x, 'top': y });
	}
})
$('.con_header_children').on('mouseover', 'a', function (e) {
	$(".W_qq").hide()
})

$('.con_header_children').on('click', '.delPage', function () {
	// tab过渡效果开始
	tabTransition($(this).parent().outerWidth())
	// tab过渡效果结束
	// tab控制按钮的显示与隐藏开始
	tabBtnSOH()
	// tab控制按钮的显示与隐藏结束
	var thisAlt = $(this).parent().attr('alt')
	$('.list a[checked]').each(function (index, item) {
		if ($(item).attr('alt') == thisAlt) {
			$(item).removeAttr("checked");
		}
	})

	close_nav($(this).data('alt'))
	// if ($(this).parent().hasClass('active')) {
	// 	$(this).parent().remove();
	// 	$('.ui.tabular.menu a:last').addClass('active')
	// } else {
	// 	$(this).parent().remove();
	// }

	iframeChangeUrl($('.con_header_children>.active'))

	if ($('.con_header_children>.active').attr('alt') === 'index_show') {
		$('.firstPage').show()
	}
	return false
})

// tabBtn   left  right 功能 开始
var abc = true
$('.Q_W_span_right').click(function () {
	console.log('点击了右边')
	if (abc) {
		abc = false;
		var w = 150
		var con_header_width = Number.parseInt($('.con_header ').css('width'))
		var width = Number.parseInt($('.con_header_children').css('width'))
		var left = Number.parseInt($('.con_header_children').css('left'))

		var n = 0
		if (left - w < con_header_width - width) {
			n = con_header_width - width
		} else {
			n = left - w
		}
		$('.con_header_children').animate({ 'left': n + 'px' }, 1000, 'linear', function () {
			abc = true
		})
	}
})

$('.Q_W_span_left').click(function () {
	console.log('点击了左边')
	if (abc) {
		console.log(1)
		abc = false;
		var w = 150;
		var left = Number.parseInt($('.con_header_children').css('left'))

		var n = 0;
		if (left < -150) {
			n = left + w
		} else {
			n = 0
		}
		$('.con_header_children').animate({ 'left': n + 'px' }, 1000, 'linear', function () {
			abc = true
		})
	}
})

function tabTransition(thisAWidth) {
	var asWidth = 0;
	var passWidth = 0;
	if ($('.tabMove').outerWidth() > $('.con_header').outerWidth()) {

		$('.tabMove>a').each(function (index, item) {
			asWidth += $(item).outerWidth();
		})
		if ($('.tabMove').width() > $('.con_header').outerWidth()) {
			// console.log($('.tabMove').outerWidth())
			// console.log($('.con_header').outerWidth())
			if (thisAWidth) {
				passWidth = $('.tabMove').outerWidth() - $('.con_header').outerWidth() - thisAWidth
				$('.tabMove').css({ 'left': (passWidth > 0 ? -passWidth : 0) })
			} else {
				passWidth = $('.tabMove').width() - $('.con_header').outerWidth()
				// console.log(passWidth+1)
				$('.tabMove').css({ 'left': -passWidth })
			}
		}
	}
}
function tabBtnSOH() {
	if ($('.tabMove').outerWidth() > $('.con_header').outerWidth()) {
		$(".Q_W_span").show("slow");
	} else {
		$(".Q_W_span").hide("slow");
	}

}
function iframeChangeUrl(_this) {
	$('#route_iframe').attr('routechange', '')
	var msg1 = _this.attr('alt')
	var _url1 = 'html/' + msg1 + '.html'
	$('.main').attr('src', _url1)
}

$('.tabWrap>a').on('click', function () {
	// semantic 内部样式  tab
	$('.tabWrap>a').removeClass('active tabColor')
	$(this).addClass('active tabColor')
	// 选项卡对应的展示内容
	$('.tabBodyWrap>.tabBox').hide().eq($(this).index()).show()
})
// 阻止鼠标点击刷新页面
$('.button').on('click', function () {
	return false
})
// 显示添加二级页面
$('.addBtn').on('click', function () {
	$('.two_level_menu_wrap').css({ 'display': 'block' })
})

$('#close_two_level_page').on('click', function () {
	$('.two_level_menu_wrap').hide()
	// $('input').val('')//wanyym
	$('.destination_code').val('')//wanyym
	$('.sender_code').val('')//wanyym
})
// 显示隐藏二级页面
$('.editBtn').on('click', function () {
	console.log(1321313)
	console.log($('.edit_two_level_menu_wrap'))
	$('.edit_two_level_menu_wrap').css({ 'display': 'block' })
})

$('.edit_two_level_menu_wrap #edit_close_two_level_page').on('click', function () {
	$('.edit_two_level_menu_wrap').hide()
	// $('input').val('')//wangym
	$('.destination_code').val('')//wanyym
	$('.sender_code').val('')//wanyym
})

// 下拉框
$('.ui.dropdown').dropdown()

// 单选
$('.ui.radio.checkbox').checkbox()

// 阻止semantic form下的input keyCode13刷新页面事件
$('input').keydown(function (event) {
	if (event.keyCode == 13) {
		return false
	}
})




