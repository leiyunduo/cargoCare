console.log('dfdfdfdf')

$('.ui.form')
.form({
  inline : true,
  on     : 'blur',
  fields : {
    'time':{//签收单号10位数字
        identifier  : 'time',
        rules: [
          {
              type : 'regExp[/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)\\s(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/]',
              prompt : '(验证时间)'
          }
        ]
    },

    'add_sign_odd_number':{//签收单号10位数字
        identifier  : 'add_sign_odd_number',
        rules: [
          {
              type : 'regExp[/^[0-9]{10,11}$/]',
              prompt : '请输入正确的签收单号(数字)'
          }
        ]
    },
    'add_waybill_number_three_code':{//主单号三字代码
        identifier  : 'add_waybill_number_three_code',
        rules: [
          {
              type : 'regExp[/^[0-9]{3}$/]',
              prompt : '请输入正确的主单号三字代码(数字)'
          }
        ]
    },
    'add_waybill_number_eight_digits':{//主单号8位数字
        identifier  : 'add_waybill_number_eight_digits',
        rules: [
          {
              type   : 'regExp[/^[0-9]{8}$/]',
              prompt : '请输入正确的主单号8位数字'
          }
        ]
    },
    // 'add_odd_number_three_code':{//分单号三字代码
    //     identifier  : 'add_odd_number_three_code',
    //     rules: [
    //       {
    //           type : 'regExp[/^(?![0-9]+$)[A-Z0-9]{3}$/]',
    //           prompt : '请输入正确的分单号三字代码(数字)'
    //       }
    //     ]
    // },
    // 'add_odd_number_eight_digits':{//分单号8位数字
    //     identifier  : 'add_odd_number_eight_digits',
    //     rules: [
    //       {
    //           type   : 'regExp[/^[0-9]{8}$/]',
    //           prompt : '请输入正确的分单号8位数字'
    //       }
    //     ]
    // },
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
    'add_calculated_weight':{//计重
        identifier  : 'add_calculated_weight',
        rules: [
          {
              type   : 'regExp[/^[0-9]+([.]{1}[0-9]{1,2})?$/g]',
              prompt : '请输入正整数或者小数(限两位小数)'
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
    // 'add_name_code_first':{//品名 第一格
    //     identifier  : 'add_name_code_first',
    //     rules: [
    //       {
    //           type   : 'empty',
    //           prompt : '请输入品名代码'
    //       }
    //     ]
    // },
    // 'add_name_chinese_second':{//品名 第二格
    //     identifier  : 'add_name_chinese_second',
    //     rules: [
    //       {
    //           type   : 'regExp[/([^\s])/]',
    //           prompt : '请输入正确的品名中文名'
    //       }
    //     ]
    // },
    // 'add_goods_class_code_first':{//货物类别代码 第一格
    //     identifier  : 'add_goods_class_code_first',
    //     rules: [
    //       {
    //           type   : 'regExp[/^(?![0-9]+$)([A-Z0-9]+)$/g]',
    //           prompt : '请输入正确的货物类别代码'
    //       }
    //     ]
    // },
    // 'add_goods_class_chinese_second':{//货物类别代码 第二格
    //     identifier  : 'add_goods_class_chinese_second',
    //     rules: [
    //       {
    //           type   : 'regExp[/([^\s])/]',
    //           prompt : '请输入正确的货物类别中文名'
    //       }
    //     ]
    // },
    // 'add_packing_code_first':{//包装代码 第一格
    //     identifier  : 'add_packing_code_first',
    //     rules: [
    //       {
    //           type   : 'regExp[/^((?![0-9]+$)([A-Z0-9]+)|)$/g]',
    //           prompt : '请输入正确的包装代码'
    //       }
    //     ]
    // },
    'add_eparture_tation_three_code':{//始发站代码
        identifier  : 'add_eparture_tation_three_code',
        rules: [
          {
              type   : 'regExp[/^[A-Z]{3}$/g]',
              prompt : '请输入正确的始发站机场三字代码'
          }
        ]
    },
    'add_payer':{//付费方
        identifier  : 'add_payer',
        rules: [
          {
              type   : 'regExp[/([^\s])/]',
              prompt : '请输入正确的付费方'
          }
        ]
    },
    'add_behalf_collection':{//代收款
        identifier  : 'add_behalf_collection',
        rules: [
          {
              type   : 'regExp[/^[0-9]+([.]{1}[0-9]{1,2})?$/g]',
              prompt : '请输入正整数或者小数(限两位小数)'
          }
        ]
    },
    'add_paid_shipper':{//实付发货人
        identifier  : 'add_paid_shipper',
        rules: [
          {
              type   : 'regExp[/^[0-9]+([.]{1}[0-9]{1,2})?$/g]',
              prompt : '请输入正整数或者小数(限两位小数)'
          }
        ]
    },
    'add_consignee_code_first':{//收货人代码 第一格
        identifier  : 'add_consignee_code_first',
        rules: [
          {
              type   : 'regExp[/^(?![0-9]+$)([A-Z0-9]+)$/g]',
              prompt : '请输入正确的收货人代码'
          }
        ]
    },
    'add_consignee_chinese_second':{//收货人中文名 第二格
        identifier  : 'add_consignee_chinese_second',
        rules: [
          {
              type   : 'regExp[/([^\s])/]',
              prompt : '请输入正确的收货人'
          }
        ]
    },
    'add_consignee_tel':{//收货人 电话
        identifier  : 'add_consignee_tel',
        rules: [
          {
               type   : 'regExp[/^(((((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-3,5-9]))\\d{8})(\\s*)?)|(0\\d{2}(-)?\\d{8}(-\\d{1,4})?)|(0\\d{3}(-)?\\d{7,8}(-\\d{1,4})?(\\s*)?))+$/]',
              prompt : '请输入正确的收货人移动/固话号码'
          }
        ]
    },
    'add_consignee_ID_number':{//收货人 证件号
        identifier  : 'add_consignee_ID_number',
        rules: [
          {
              type   : 'regExp[/(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)/]',
              prompt : '请输入正确的收货人证件号码'
          }
        ]
    },
    'add_consignee_address':{//收货人 地址
        identifier  : 'add_consignee_address',
        rules: [
          {
              type   : 'regExp[/([^\s])/]',
              prompt : '请输入收货人地址'
          }
        ]
    },
    /*
    'add_consignee_line':{//收货人 线路
        identifier  : 'add_consignee_line',
        rules: [
          {
              type   : 'regExp[/([^\s])/]',
              prompt : '请输入收货人线路'
          }
        ]
    },
    'add_consignee_wagon_number':{//收货人 车牌号
        identifier  : 'add_consignee_wagon_number',
        rules: [
          {
              type   : 'regExp[/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/]',
              prompt : '请输入正确的车号'
          }
        ]
    },
    'add_driver':{//司机
        identifier  : 'add_driver',
        rules: [
          {
              type   : 'regExp[/([^\s])/]',
              prompt : '请输入正确的司机名称'
          }
        ]
    },
    'add_signer':{//签收人
        identifier  : 'add_signer',
        rules: [
          {
              type   : 'regExp[/([^\s])/]',
              prompt : '请输入签收人'
          }
        ]
    },
    'add_sign_ID_number':{//签收人 证件号
        identifier  : 'add_sign_ID_number',
        rules: [
          {
               type   : 'regExp[/(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)/]',
              prompt : '请输入正确的签收人证件号码'
          }
        ]
    },
    'add_sign_time':{//签收时间
        identifier  : 'add_sign_time',
        rules: [
          {
              type : 'regExp[/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)\\s(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/]',
              prompt : '请输入正确的签收时间 2017-01-01 23:59:59'
          }
        ]
    },
    'add_shipper':{//发货人
        identifier  : 'add_shipper',
        rules: [
          {
              type   : 'regExp[/([^\s])/]',
              prompt : '请输入正确的发货人'
          }
        ]
    },
    'add_storage_time':{//入库时间
        identifier  : 'add_storage_time',
        rules: [
          {
              type : 'regExp[/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)\\s(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/]',
              prompt : '请输入正确的入库时间 2017-01-01 23:59:59'
          }
        ]
    },
    'add_storage_room_six_code':{//库房6位代码
        identifier  : 'add_storage_room_six_code',
        rules: [
          {
              type   : 'regExp[/^[A-Z]{6}$/]',
              prompt : '请输入正确的库房6位代码'
          }
        ]
    },
    'add_storager':{//入库人
        identifier  : 'add_storager',
        rules: [
          {
              type   : 'regExp[/([^\s])/]',
              prompt : '请输入入库人'
          }
        ]
    },
    'add_termination_storage_time':{//终止保管时间
        identifier  : 'add_termination_storage_time',
        rules: [
          {
              type : 'regExp[/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)\\s(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/]',
              prompt : '请输入正确的终止保管时间 2017-01-01 23:59:59'
          }
        ]
    },
    'add_outbound_time':{//出库时间
        identifier  : 'add_outbound_time',
        rules: [
          {
              type : 'regExp[/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)\\s(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/]',
              prompt : '请输入正确的出库时间'
          }
        ]
    },
    'add_outgoing_person':{//出库人
        identifier  : 'add_outgoing_person',
        rules: [
          {
              type   : 'regExp[/([^\s])/]',
              prompt : '请输入出库人'
          }
        ]
    },
    'add_minimum_cost':{// 最低费用
        identifier  : 'add_minimum_cost',
        rules: [
          {
              type   : 'regExp[/^[0-9]+([.]{1}[0-9]{1,2})?$/g]',
              prompt : '请输入正整数或者小数(限两位小数)'
          }
        ]
    },
    'add_local_transit_agent':{//本地中转人
        identifier  : 'add_local_transit_agent',
        rules: [
          {
              type   : 'regExp[/([^\s])/]',
              prompt : '请输入本地中转人'
          }
        ]
    },
    'add_sales_unit':{//销售单位
        identifier  : 'add_sales_unit',
        rules: [
          {
              type   : 'regExp[/([^\s])/]',
              prompt : '请输入销售单位'
          }
        ]
    },
    'add_association_point':{//关联点
        identifier  : 'add_association_point',
        rules: [
          {
              type   : 'regExp[/^[A-Z]{3}$/g]',
              prompt : '请输入正确的关联点三字代码'
          }
        ]
    },
    // 'add_biller':{//开票人
    //     identifier  : 'add_biller',
    //     rules: [
    //       {
    //           type   : 'regExp[/([^\s])/]',
    //           prompt : '请输入正确的开票人'
    //       }
    //     ]
    // },
    // 'add_billing_time':{//开票时间
    //     identifier  : 'add_billing_time',
    //     rules: [
    //       {
    //           type : 'regExp[/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)\\s(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/]',
    //           prompt : '请输入正确的开票时间 2017-01-01 23:59:59'
    //       }
    //     ]
    // },
    // 'add_record_change_person':{//录改人
    //     identifier  : 'add_record_change_person',
    //     rules: [
    //       {
    //           type   : 'regExp[/([^\s])/]',
    //           prompt : '请输入正确的录改人'
    //       }
    //     ]
    // },
    // 'add_record_change_person_time':{//录改时间
    //     identifier  : 'add_record_change_person_time',
    //     rules: [
    //       {
    //           type : 'regExp[/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)\\s(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/]',
    //           prompt : '请输入正确的录改时间 2017-01-01 23:59:59'
    //       }
    //     ]
    // },
    // 'add_riser':{//生成人
    //     identifier  : 'add_riser',
    //     rules: [
    //       {
    //           type   : 'regExp[/([^\s])/]',
    //           prompt : '请输入正确的生成人'
    //       }
    //     ]
    // },
    // 'add_rise_time':{//生成时间
    //     identifier  : 'add_rise_time',
    //     rules: [
    //       {
    //         type : 'regExp[/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)\\s(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/]',            
    //         prompt : '请输入正确的生成时间 2017-01-01 23:59:59'
    //       }
    //     ]
    // },
    'add_receipt_printed_number':{//签收单打印次数
        identifier  : 'add_receipt_printed_number',
        rules: [
          {
              type   : 'regExp[/^\\d+$/g]',
              prompt : '请输入正整数'
          }
        ]
    },
    'add_receivable_consignor':{//应收发货人
        identifier  : 'add_receivable_consignor',
        rules: [
          {
              type   : 'regExp[/^[0-9]+([.]{1}[0-9]{1,2})?$/g]',
              prompt : '请输入正整数或者小数(限两位小数)'
          }
        ]
    },
    'add_net_receipts_consignor':{//实收发货人
        identifier  : 'add_net_receipts_consignor',
        rules: [
          {
              type   : 'regExp[/^[0-9]+([.]{1}[0-9]{1,2})?$/g]',
              prompt : '请输入正整数或者小数(限两位小数)'
          }
        ]
    },

    'add_receivable_shipper':{//应收收货人
        identifier  : 'add_receivable_shipper',
        rules: [
          {
              type   : 'regExp[/^[0-9]+([.]{1}[0-9]{1,2})?$/g]',
              prompt : '请输入正整数或者小数(限两位小数)'
          }
        ]
    },
    'add_net_receipts_shipper':{//实收收货人
        identifier  : 'add_net_receipts_shipper',
        rules: [
          {
              type   : 'regExp[/^[0-9]+([.]{1}[0-9]{1,2})?$/g]',
              prompt : '请输入正整数或者小数(限两位小数)'
          }
        ]
    },
    'add_transit_receiver':{//应付中转人
        identifier  : 'add_transit_receiver',
        rules: [
          {
              type   : 'regExp[/^[0-9]+([.]{1}[0-9]{1,2})?$/g]',
              prompt : '请输入正整数或者小数(限两位小数)'
          }
        ]
    },
    */
},
  onInvalid: function(){
    // 验证失败时触犯的事件
  },
})