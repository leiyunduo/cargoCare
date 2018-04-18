console.log('这是test')



$('.ui.form')
.form({

  inline : true,
  on     : 'blur',
  fields : {
    'add_waybill_number_three_code':{//运单号三字代码
      	identifier  : 'add_waybill_number_three_code',
      	rules: [
        	{
          		type : 'regExp[/^[0-9]{3}$/]',
          		prompt : '请输入正确的运单号三字代码(数字)'
        	}
      	]
    },
    'add_waybill_number_eight_digits':{//运单号8位数字
      	identifier  : 'add_waybill_number_eight_digits',
      	rules: [
        	{
          		type   : 'regExp[/^[0-9]{8}$/]',
          		prompt : '请输入正确的运单号8位数字'
        	}
      	]
    },
    'add_eparture_tation_three_code':{//始发站代码
      	identifier  : 'add_eparture_tation_three_code',
      	rules: [
        	{
          		type   : 'regExp[/^[A-Z]{3}$/g]',
          		prompt : '请输入正确的始发站机场三字代码'
        	}
      	]
    },
    'add_destination_station_three_code':{//目的站代码
        identifier  : 'add_destination_station_three_code',
        rules: [
          {
              type   : 'regExp[/^[A-Z]{3}$/g]',
              prompt : '请输入正确的目的站机场三字代码'
          }
        ]
    },
    'add_shipper_code':{//发货人代码或者不输入
      	identifier  : 'add_shipper_code',
      	rules: [
        	{
          		type   : 'regExp[/^(?![0-9]+$)([A-Z0-9]+|)$/g]',
          		prompt : '请输入正确的发货人代码或者不输入'
        	}
      	]
    },
    'add_consignee_code':{//收货人代码或者不输入
      	identifier  : 'add_consignee_code',
      	rules: [
        	{
          		type   : 'regExp[/^(?![0-9]+$)([A-Z0-9]+|)$/g]',
          		prompt : '请输入正确的收货人代码或者不输入'
        	}
      	]
    },
    'add_shipper_information_name':{//发货人信息 名称
        identifier  : 'add_shipper_information_name',
        rules: [
          {
              type   : 'regExp[/([^\s])/]',
              prompt : '请输入正确的发货人名称'
          }
        ]
    },
    'add_shipper_information_tel':{//发货人信息 电话
        identifier  : 'add_shipper_information_tel',
        rules: [
          {
              type   : 'regExp[/^(((((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-3,5-9]))\\d{8})(\\s*)?)|(0\\d{2}(-)?\\d{8}(-\\d{1,4})?)|(0\\d{3}(-)?\\d{7,8}(-\\d{1,4})?(\\s*)?))+$/]',
               // type   : 'regExp[/^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$/]',
              prompt : '请输入正确的发货人移动/固话号码'
          }
        ]
    },
    'add_shipper_information_fax':{//发货人信息 传真
        identifier  : 'add_shipper_information_fax',
        rules: [
          {
              type   : 'regExp[/^((0\\d{2}(-)?\\d{8})|(0\\d{3}(-)?\\d{7,8})|)$/]',
              prompt : '请输入正确的发货人传真号'
          }
        ]
    },
    'add_shipper_information_mail':{//发货人信息 邮箱
        identifier  : 'add_shipper_information_mail',
        rules: [
          {
              type   : 'regExp[/^[A-Za-z\\d]+([-_.][A-Za-z\\d]+)*@([A-Za-z\\d]+[-.])+[A-Za-z\\d]{2,4}$/]',
              prompt : '请输入正确的发货人邮箱'
          }
        ]
    },
// 混合 ((((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8})|(0\\d{2}-\\d{8}(-\\d{1,4})?)|(0\\d{3}-\\d{7,8}(-\\d{1,4})?))+
          // ((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}   0\\d{2}-\\d{8}(-\\d{1,4})?)|(0\\d{3}-\\d{7,8}(-\\d{1,4})?


// 电话 ((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}
// 区号 0\\d{2}-\\d{8}(-\\d{1,4})?)|(0\\d{3}-\\d{7,8}(-\\d{1,4})?
    'add_shipper_information_address':{//发货人信息 地址
        identifier  : 'add_shipper_information_address',
        rules: [
          {
              type   : 'regExp[/([^\s])/]',
              prompt : '请输入发货人地址'
          }
        ]
    },

    'add_consignee_information_name':{//收货人信息 名称
        identifier  : 'add_consignee_information_name',
        rules: [
          {
              type   : 'regExp[/([^\s])/]',
              prompt : '请输入正确的收货人名称'
          }
        ]
    },
    'add_consignee_information_address':{//收货人信息 地址
        identifier  : 'add_consignee_information_address',
        rules: [
          {
              type   : 'regExp[/([^\s])/]',
              prompt : '请输入收货人地址'
          }
        ]
    },
    'add_consignee_information_tel':{//收货人信息 电话
        identifier  : 'add_consignee_information_tel',
        rules: [
          {
               type   : 'regExp[/^(((((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-3,5-9]))\\d{8})(\\s*)?)|(0\\d{2}(-)?\\d{8}(-\\d{1,4})?)|(0\\d{3}(-)?\\d{7,8}(-\\d{1,4})?(\\s*)?))+$/]',
              prompt : '请输入正确的收货人移动/固话号码'
          }
        ]
    },
    'add_consignee_information_fax':{//收货人信息 传真
        identifier  : 'add_consignee_information_fax',
        rules: [
          {
              type   : 'regExp[/^((0\\d{2}(-)?\\d{8})|(0\\d{3}(-)?\\d{7,8})|)$/]',
              prompt : '请输入正确的收货人传真号'
          }
        ]
    },
    'add_consignee_information_mail':{//发货人信息 邮箱
        identifier  : 'add_consignee_information_mail',
        rules: [
          {
              type   : 'regExp[/^[A-Za-z\\d]+([-_.][A-Za-z\\d]+)*@([A-Za-z\\d]+[-.])+[A-Za-z\\d]{2,4}$/]',
              prompt : '请输入正确的发货人邮箱'
          }
        ]
    },
    'add_first_course_code':{//第一程 机场三字代码
        identifier  : 'add_first_course_code',
        rules: [
          {
              type   : 'regExp[/[A-Z]{3}/]',
              prompt : '请输入正确的第一程机场三字代码'
          }
        ]
    },
    'add_second_course_code':{//第二程 机场三字代码
        identifier  : 'add_second_course_code',
        rules: [
          {
              type   : 'regExp[/[A-Z]{3}/]',
              prompt : '请输入正确的第二程机场三字代码'
          }
        ]
    },
    'add_estimated_date_flight':{//预计航班日期
       identifier  : 'add_estimated_date_flight',
       rules: [
         {
            type: 'regExp[/((^[0-9]{4})-(((0[13578]|1[02])-(0[1-9]{1}$|[12][0-9]|3[01]{1}$))|((0[469]|11)-(0[1-9]{1}$|[12][0-9]{1}$|30$))|(02-(0[1-9]|[1][0-9]|2[0-8]{1}$))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29$)/g]',
             prompt : '请按正确的预计航班日期格式输入如:20170101'
         }
       ]
    },
    'add_scheduled_flight_number_code':{//预计航班号代码
        identifier  : 'add_scheduled_flight_number_code',
        rules: [
          {
              type   : 'regExp[/^(?![0-9]+$)([A-Z]{2}|[A-Z0-9]{2})$/g]',
              prompt : '请输入正确的航空公司二字代码'
          }
        ]
    },
    'add_scheduled_flight_number_number':{//预计航班号4位数字
        identifier  : 'add_scheduled_flight_number_number',
        rules: [
          {
              type   : 'regExp[/^[0-9]{4}$/g]',
              prompt : '请输入正确的航空公司航班号(4位数字)'
          }
        ]
    },
    'add_name_code_first':{//品名 第一格
        identifier  : 'add_name_code_first',
        rules: [
          {
              type   : 'regExp[/^(?![0-9]+$)([A-Z0-9]+)$/g]',
              prompt : '请输入正确的品名代码'
          }
        ]
    },
    'add_commodity_code_first':{//商品代码
        identifier  : 'add_commodity_code_first',
        rules: [
          {
              type   : 'regExp[/^(([0-9]{4})|)$/g]',
              prompt : '请输入正确的商品代码(4位数字)'
          }
        ]
    },
    'add_goods_class_code_first':{//货物类别代码 第一格
        identifier  : 'add_goods_class_code_first',
        rules: [
          {
              type   : 'regExp[/^(?![0-9]+$)([A-Z0-9]+)$/g]',
              prompt : '请输入正确的货物类别代码'
          }
        ]
    },
    'add_packing_code_first':{//包装代码 第一格
        identifier  : 'add_packing_code_first',
        rules: [
          {
              type   : 'regExp[/^(?![0-9]+$)([A-Z0-9]+)$/g]',
              prompt : '请输入正确的包装代码'
          }
        ]
    },
    'add_jianshu_number':{//件数
        identifier  : 'add_jianshu_number',
        rules: [
          {
              type   : 'regExp[/^\\d+$/g]',
              prompt : '请输入正整数'
          }
        ]
    },
    'add_actual_weight':{//实重
        identifier  : 'add_actual_weight',
        rules: [
          {
              type   : 'regExp[/^[0-9]+([.]{1}[0-9]{1,2})?$/g]',
              prompt : '请输入正整数或者小数(限两位小数)'
          }
        ]
    },
    'add_volume':{//体积
        identifier  : 'add_volume',
        rules: [
          {
              type   : 'regExp[/^[0-9]+([.]{1}[0-9]{1,2})?$/g]',
              prompt : '请输入正整数或者小数(限两位小数)'
          }
        ]
    },
    'add_calculated_weight':{//计重
        identifier  : 'add_calculated_weight',
        rules: [
          {
              type   : 'regExp[/^[0-9]+([.]{1}[0-9]{1,2})?$/g]',
              prompt : '请输入正整数或者小数(限两位小数)'
          }
        ]
    },
    'add_price_category_second':{//价种 第二格
        identifier  : 'add_price_category_second',
        rules: [
          {
              type   : 'regExp[/([^\s])/]',
              prompt : '请输入正确的价种'
          }
        ]
    },
    'add_rate':{//费率
        identifier  : 'add_rate',
        rules: [
          {
              type   : 'regExp[/^[0-9]+([.]{1}[0-9]{1,2})?$/g]',
              prompt : '请输入正整数或者小数(限两位小数)'
          }
        ]
    },
    'add_discount':{//折扣
        identifier  : 'add_discount',
        rules: [
          {
              type   : 'regExp[/^(100|[1-9]?\\d(\.\\d\\d?)?)%$|0|$/]',
              prompt : '请输入正确的格式50%'
          }
        ]
    },
    'add_billing_time':{//开票时间
        identifier  : 'add_billing_time',
        rules: [
          {
              type : 'regExp[/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)\\s(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/]',
              prompt : '请按正确的开票时间格式输入 20170101'
          }
        ]
    },
    'add_modification_time':{//修改时间
        identifier  : 'add_modification_time',
        rules: [
          {
              type : 'regExp[/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)\\s(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/]',
              prompt : '请按正确的修改时间格式输入 20170101'
          }
        ]
    },
    'add_modifier':{//修改人
        identifier  : 'add_modifier',
        rules: [
          {
              type   : 'regExp[/([^\s])/]',
              prompt : '请填写修改人'
          }
        ]
    },
    'add_drawer':{//开票人
        identifier  : 'add_drawer',
        rules: [
          {
              type   : 'regExp[/([^\s])/]',
              prompt : '请填写开票人'
          }
        ]
    },
    'add_billing_location':{//开票地点
        identifier  : 'add_billing_location',
        rules: [
          {
              type   : 'regExp[/([^\s])/]',
              prompt : '请填写开票地点'
          }
        ]
    },
    'volume_long':{//长
        identifier  : 'volume_long',
        rules: [
          {
              type   : 'regExp[/^[0-9]+([.]{1}[0-9]{1,2})?$/g]',
              prompt : '请输入正整数或者小数(限两位小数)'
          }
        ],
    },
    'volume_width':{//宽
        identifier  : 'volume_width',
        rules: [
          {
              type   : 'regExp[/^[0-9]+([.]{1}[0-9]{1,2})?$/g]',
              prompt : '请输入正整数或者小数(限两位小数)'
          }
        ],
    },
    'volume_height':{//高
        identifier  : 'volume_height',
        rules: [
          {
              type   : 'regExp[/^[0-9]+([.]{1}[0-9]{1,2})?$/g]',
              prompt : '请输入正整数或者小数(限两位小数)'
          }
        ],
    },
    'volume_jianshu_number':{//件数
        identifier  : 'volume_jianshu_number',
        rules: [
          {
              type   : 'regExp[/^\\d+$/g]',
              prompt : '请输入正整数'
          }
        ],
    },
    'volume_volume':{//体积的体积
        identifier  : 'volume_volume',
        rules: [
          {
              type   : 'regExp[/^[0-9]+([.]{1}[0-9]{1,2})?$/g]',
              prompt : '请输入正整数或者小数(限两位小数)'
          }
        ],
    },
    'volume_weight':{//体积重量
        identifier  : 'volume_weight',
        rules: [
          {
              type   : 'regExp[/^[0-9]+([.]{1}[0-9]{1,2})?$/g]',
              prompt : '请输入正整数或者小数(限两位小数)'
          }
        ],
    },
    'spell_three_code':{//拼单中三字代码
        identifier  : 'spell_three_code',
        rules: [
          {
              type : 'regExp[/^[A-Z0-9]{3}$/]',
              prompt : '请输入正确的三字代码'
          }
        ]
    },
    'spell_eight_digits':{//拼单中8位数字
        identifier  : 'spell_eight_digits',
        rules: [
          {
              type   : 'regExp[/^[0-9]{8}$/]',
              prompt : '请输入正确的8位数字'
          }
        ]
    },
    'add_settlement_unit_code_first':{//结算单位第一格
        identifier  : 'add_settlement_unit_code_first',
        rules: [
          {
              type   : 'regExp[/^(?![0-9]+$)([A-Z0-9]+|)$/g]',
              prompt : '请输入正确的发货人代码或者不输入'
          }
        ]
    },
},
  onInvalid: function(){
    // 验证失败时触犯的事件
  },
})