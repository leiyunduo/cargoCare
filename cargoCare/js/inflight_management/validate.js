$('.ui.form')
	.form({
		inline: true,
		on: 'blur',
		fields: {
			'add_association_point': {//关联点
				identifier: 'add_association_point',
				rules: [
					{
						type: 'regExp[/^(([A-Z]{3})|)$/g]',
						prompt: '请输入正确的关联点三字代码'
					}
				]
			},
			'add_take_off_three_code': {//起飞站代码
				identifier: 'add_take_off_three_code',
				rules: [
					{
						type: 'regExp[/^[A-Z]{3}$/g]',
						prompt: '请输入正确的起飞机场三字代码'
					}
				]
			},
			// 'add_date_flight': {//航班日期
			// 	identifier: 'add_date_flight',
			// 	rules: [
			// 		{
			// 			type: 'regExp[/((^[0-9]{4})-(((0[13578]|1[02])-(0[1-9]{1}$|[12][0-9]|3[01]{1}$))|((0[469]|11)-(0[1-9]{1}$|[12][0-9]{1}$|30$))|(02-(0[1-9]|[1][0-9]|2[0-8]{1}$))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29$)/g]',
			// 			prompt: '请按正确的预计航班日期格式输入如:2017-01-01'
			// 		}
			// 	]
			// },
			'add_scheduled_flight_number_code': {//航班号代码
				identifier: 'add_scheduled_flight_number_code',
				rules: [
					{
						type: 'regExp[/^(?![0-9]+$)([A-Z]{2}|[A-Z0-9]{2})$/g]',
						prompt: '请输入正确的航空公司二字代码'
					}
				]
			},
			'add_scheduled_flight_number_number': {//预计航班号4位数字
				identifier: 'add_scheduled_flight_number_number',
				rules: [
					{
						type: 'regExp[/^[0-9]{4}$/g]',
						prompt: '请输入正确的航空公司航班号(4位数字)'
					}
				]
			},
			'add_waybill_number_three_code': {//主单号三位数字
				identifier: 'add_waybill_number_three_code',
				rules: [
					{
						type: 'regExp[/^[0-9]{3}$/]',
						prompt: '请输入正确的主单号三字代码(数字)'
					}
				]
			},
			'add_waybill_number_eight_digits': {//主单号8位数字
				identifier: 'add_waybill_number_eight_digits',
				rules: [
					{
						type: 'regExp[/^[0-9]{8}$/]',
						prompt: '请输入正确的主单号8位数字'
					}
				]
			},
			'add_shipper_code_first': {//发货人代码 第一格
				identifier: 'add_shipper_code_first',
				rules: [
					{
						type: 'regExp[/^(?![0-9]+$)([A-Z0-9]+)$/g]',
						prompt: '请输入正确的发货人代码'
					}
				]
			},
			'add_shipper_chinese_second': {//发货人中文名 第二格
				identifier: 'add_shipper_chinese_second',
				rules: [
					{
						type: 'regExp[/([^\s])/]',
						prompt: '请输入正确的发货人'
					}
				]
			},
			'add_eparture_tation_three_code': {//始发站代码
				identifier: 'add_eparture_tation_three_code',
				rules: [
					{
						type: 'regExp[/^[A-Z]{3}$/g]',
						prompt: '请输入正确的始发站机场三字代码'
					}
				]
			},
			'add_destination_station_three_code': {//目的站代码
				identifier: 'add_destination_station_three_code',
				rules: [
					{
						type: 'regExp[/^[A-Z]{3}$/g]',
						prompt: '请输入正确的目的站机场三字代码'
					}
				]
			},

			// 'add_name_code_first': {//品名 第一格
			// 	identifier: 'add_name_code_first',
			// 	rules: [
			// 		{
			// 			type: 'empty',
			// 			prompt: '请输入品名代码'
			// 		}
			// 	]
			// },
			// 'add_goods_class_code_first': {//货物类别代码 第一格
			// 	identifier: 'add_goods_class_code_first',
			// 	rules: [
			// 		{
			// 			type: 'regExp[/^(?![0-9]+$)([A-Z0-9]+)$/g]',
			// 			prompt: '请输入正确的货物类别代码'
			// 		}
			// 	]
			// },
			// 'add_packing_code_first': {//包装代码 第一格
			// 	identifier: 'add_packing_code_first',
			// 	rules: [
			// 		{
			// 			type: 'regExp[/^((?![0-9]+$)([A-Z0-9]+)|)$/g]',
			// 			prompt: '请输入正确的包装代码'
			// 		}
			// 	]
			// },
			'add_jianshu_number': {//件数
				identifier: 'add_jianshu_number',
				rules: [
					{
						type: 'regExp[/^\\d+$/g]',
						prompt: '请输入正整数'
					}
				]
			},
			'add_actual_weight': {//实重
				identifier: 'add_actual_weight',
				rules: [
					{
						type: 'regExp[/^[0-9]+([.]{1}[0-9]{1,2})?$/g]',
						prompt: '请输入正整数或者小数(限两位小数)'
					}
				]
			},
			'add_calculated_weight': {//计重
				identifier: 'add_calculated_weight',
				rules: [
					{
						type: 'regExp[/^[0-9]+([.]{1}[0-9]{1,2})?$/g]',
						prompt: '请输入正整数或者小数(限两位小数)'
					}
				]
			},
			'add_arrival_number': {//到达件数
				identifier: 'add_arrival_number',
				rules: [
					{
						type: 'regExp[/^\\d+$/g]',
						prompt: '请输入正整数'
					}
				]
			},
			'add_arrival_weight': {//到达重量
				identifier: 'add_arrival_weight',
				rules: [
					{
						type: 'regExp[/^[0-9]+([.]{1}[0-9]{1,2})?$/g]',
						prompt: '请输入正整数或者小数(限两位小数)'
					}
				]
			},
			// 'add_arrival_time': {//到达时间
			// 	identifier: 'add_arrival_time',
			// 	rules: [
			// 		{
			// 			type : 'regExp[/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)\\s(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/]',
			// 			prompt: '请按正确的到达时间格式输入如:2017-01-01 23:59:59'
			// 		}
			// 	]
			// },
			'add_consignee_code_first': {//收货人代码 第一格
				identifier: 'add_consignee_code_first',
				rules: [
					{
						type: 'regExp[/^(?![0-9]+$)([A-Z0-9]+)$/g]',
						prompt: '请输入正确的收货人代码'
					}
				]
			},
			'add_consignee_chinese_second': {//收货人中文名 第二格
				identifier: 'add_consignee_chinese_second',
				rules: [
					{
						type: 'regExp[/([^\s])/]',
						prompt: '请输入正确的收货人'
					}
				]
			},
			'add_consignee_code_first': {//收货人代码 第一格
				identifier: 'add_consignee_code_first',
				rules: [
					{
						type: 'regExp[/^(?![0-9]+$)([A-Z0-9]+)$/g]',
						prompt: '请输入正确的收货人代码或者不输入'
					}
				]
			},
			// 'add_consignee_tel': {//收货人 电话
			// 	identifier: 'add_consignee_tel',
			// 	rules: [
			// 		{
			// 			type: 'regExp[/^(((((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-3,5-9]))\\d{8})(\\s*)?)|(0\\d{2}(-)?\\d{8}(-\\d{1,4})?)|(0\\d{3}(-)?\\d{7,8}(-\\d{1,4})?(\\s*)?))+$/]',
			// 			prompt: '请输入正确的收货人移动/固话号码'
			// 		}
			// 	]
			// },
			'add_consignee_address': {//收货人 地址
				identifier: 'add_consignee_address',
				rules: [
					{
						type: 'regExp[/([^\s])/]',
						prompt: '请输入收货人地址'
					}
				]
			},

			'add_payment_slip': {//支出费用
				identifier: 'add_payment_slip',
				rules: [
					{
						type: 'regExp[/^[0-9]+([.]{1}[0-9]{1,2})?$/g]',
						prompt: '请输入正整数或者小数(限两位小数)'
					}
				]
			},
			'add_sub_number': {//分单数
				identifier: 'add_sub_number',
				rules: [
					{
						type: 'regExp[/^\\d+$/g]',
						prompt: '请输入正整数或者小数(限两位小数)'
					}
				]
			},
			'add_behalf_collection': {//代收款
				identifier: 'add_behalf_collection',
				rules: [
					{
						type: 'regExp[/^[0-9]+([.]{1}[0-9]{1,2})?$/g]',
						prompt: '请输入正整数或者小数(限两位小数)'
					}
				]
			},
			// 'add_entry_man': {//录入人
			// 	identifier: 'add_entry_man',
			// 	rules: [
			// 		{
			// 			type: 'regExp[/([^\s])/]',
			// 			prompt: '请填写录入人'
			// 		}
			// 	]
			// },
			// 'add_entry_date': {//录入日期
			// 	identifier: 'add_entry_date',
			// 	rules: [
			// 		{
			// 			type : 'regExp[/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)\\s(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/]',
			// 			prompt: '请按正确的录入日期格式输入如 2017-01-01 23:59:59'
			// 		}
			// 	]
			// },
			// 'add_modifier': {//修改人
			// 	identifier: 'add_modifier',
			// 	rules: [
			// 		{
			// 			type: 'regExp[/([^\s])/]',
			// 			prompt: '请填写修改人'
			// 		}
			// 	]
			// },
			// 'add_modification_date': {//修改时间
			// 	identifier: 'add_modification_date',
			// 	rules: [
			// 		{
			// 			type : 'regExp[/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)\\s(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/]',
			// 			prompt: '请按正确的修改时间格式输入 2017-01-01 23:59:59'
			// 		}
			// 	]
			// },
			// 'add_receiver': {//交接人
			// 	identifier: 'add_receiver',
			// 	rules: [
			// 		{
			// 			type: 'regExp[/([^\s])/]',
			// 			prompt: '请填写交接人'
			// 		}
			// 	]
			// },
			// 'add_receiver_date': {//交接日期
			// 	identifier: 'add_receiver_date',
			// 	rules: [
			// 		{
			// 			type : 'regExp[/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)\\s(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/]',
			// 			prompt: '请按正确的交接日期格式输入 2017-01-01 23:59:59'
			// 		}
			// 	]
			// },

			'add_lading_bills_number': {//提货表件数
				identifier: 'add_lading_bills_number',
				rules: [
					{
						type: 'regExp[/^\\d+$/g]',
						prompt: '请输入正整数或者小数(限两位小数)'
					}
				]
			},
			'add_lading_bills_weight': {//支出费用
				identifier: 'add_lading_bills_weight',
				rules: [
					{
						type: 'regExp[/^[0-9]+([.]{1}[0-9]{1,2})?$/g]',
						prompt: '请输入正整数或者小数(限两位小数)'
					}
				]
			},
		},
		onInvalid: function () {
			// 验证失败时触犯的事件
		},
	})