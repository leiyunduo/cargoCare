const pageInfo = {
    // baseUrl: 'http://192.168.1.112:8080/lxtd-cca-apis',
    baseUrl: 'http://47.93.90.229/test',
}
let baseUrl = globalBaseUrl.baseUrl || pageInfo.baseUrl

let {getStore, removeStore, clearStore} = Store
var data = [
    {
        id: 1000,
        title: '收货',
        child: [{
            id: 1001,
            title: '国内',
            child: [
                // { title: '收货主单管理', child: [], alt: 'receiving_main_management' },
                {id: 1002, title: '收货主单管理', child: [], alt: 'receiving_middle_management'},
                {id: 1003, title: '收货分单管理', child: [], alt: 'receiving_middle_sub_management'}
            ]
        },]
    },
    {
        id: 1004,
        title: '快件',
        child: [{
            id: 1005,
            title: '国内',
            child: [
                {id: 1006, title: '邮件管理', child: [], alt: 'mail_management'},
                {id: 1007, title: '民航快递', child: [], alt: 'domestic_civilAviation_fastMail'},
                // { title: '特货代码', child: [], alt: 'symbol_set' }
            ]
        },]
    },
    {
        id: 1008,
        title: '出港',
        child: [
            {
                id: 1009,
                title: '出港作业航班',
                child: [],
                alt: 'departure_flight'
            },
            {
                id: 1010,
                title: '订舱',
                child: [
                    {id: 1011, title: '按作业航班订舱', child: [], alt: 'work_flight_booking11'},
                    {id: 1012, title: '普通订舱', child: [], alt: 'booking_list'}
                ],
            },
            {
                id: 1013,
                title: '配载',
                child: [
                    {id: 1014, title: '配载订舱', child: [], alt: 'booking1'},
                    {id: 1015, title: '配载订舱列表', child: [], alt: 'booking_list1'},
                    // {id: 1016, title: '取消订舱', child: [], alt: 'cancellation_of_booking'},
                    {id: 1017, title: '初舱单', child: [], alt: 'booking_begin'},
                    {id: 1018, title: '终舱单', child: [], alt: 'booking_end'},
                    {id: 1019, title: '航班关闭', child: [], alt: 'booking_close'},
                ]
            }
        ]
    },
    {
        id: 1020,
        title: '进港',
        child: [
            {
                id: 1021,
                title: '进港作业航班',
                child: [],
                alt: 'inbound_flight'
            },
            {
                id: 1022,
                title: '国内',
                child: [
                    {id: 1023, title: '进港管理', child: [], alt: 'inflight_main_management'},
                    // { title: '进港分单管理', child: [], alt: 'inflight_sub_management' }
                ]
            }
        ]
    },
    {
        id: 1025,
        title: '提货',
        child: [{
            id: 1026,
            title: '国内',
            child: [
                {id: 1027, title: '国内主单提货', child: [], alt: 'domestic_main_carry'},
                {id: 1028, title: '国内分单提货', child: [], alt: 'domestic_sub_carry'}
                // { title: '进港邮件管理', child: [], alt: 'inflight_mail_management' }
            ]
        }]
    },
    {
        id: 1029,
        title: '航班信息',
        child: [{
            id: 1030,
            title: '航班信息查询',
            child: [
                // { title: '航班车次查询', child: [], alt: 'flight_number_inquiries' }
            ],
            alt: 'flight_number_inquiries'

        },]
    },
    {
        id: 1031,
        title: '票证管理',
        child: [{
            id: 1032,
            title: '主单票证管理',
            child: [],
            alt: 'main_ticket_management'

        },
            {
                id: 1033,
                title: '分单票证管理',
                child: [],
                alt: 'sub_ticket_management'
            }
        ]
    },
    {
        id: 1073,
        title: '收付款',
        child: [
            {
                id: 1074,
                title: '收款',
                child: [
                    {
                        id: 1075,
                        title: '出发收款',
                        child: [
                            // { title: '单票收付款', child: [], alt: 'single_payment' },
                            {id: 1036, title: '出发单票/多票收款', child: [], alt: 'departure_receipt'}

                        ]
                    },
                    {
                        id: 1076,
                        title: '本地运单/包舱结算清单',
                        child: [],
                        alt: 'Local_bill_of_lading'

                    },
                    {
                        id: 1077,
                        title: '出发收款报表',
                        child: [
                            {id: 1038, title: '出发现金流量收款报表 ', child: [], alt: 'departure_receipt_cash'},
                            {title: '网络公司出发结算清单 ', child: [], alt: 'Arrival_list'},
                        ]
                    },
                    {
                        id: 1078,
                        title: '到达收款',
                        child: [
                            // { title: '单票收款', child: [], alt: 'arrival_and_payment' } ///未完
                            {id: 1039, title: '到达单票/多票收款', child: [], alt: 'arrival_receipt'}
                        ]
                    },
                    {
                        id: 1079,
                        title: '到达收款报表',
                        child: [
                            {id: 1040, title: '到达现金流量收款报表', child: [], alt: 'arrival_receipt_cash'},
                            {title: '网络公司到达结算清单', child: [], alt: 'Internet_company_arrives'},
                        ]
                    }
                ],
            },
            {
                id: 1080,
                title: '付款',
                child: [
                    {
                        id: 1081,
                        title: '出发付款',
                        child: [
                            // { title: '单票收付款', child: [], alt: 'single_payment' },
                            {id: 1042, title: '出发单票/多票付款', child: [], alt: 'departure_payment'}

                        ]
                    },
                    {
                        id: 1082,
                        title: '本地运单/包舱结算清单',
                        child: [],
                        alt: 'Local_bill_of_lading'
                    },
                    {
                        id: 1083,
                        title: '出发付款报表',
                        child: [
                            {id: 1044, title: '出发现金流量付款报表 ', child: [], alt: 'departure_payment_cash'},
                            {title: '网络公司出发结算清单 ', child: [], alt: 'Arrival_list'}
                        ]
                    },
                    {
                        id: 1084,
                        title: '到达付款',
                        child: [
                            // { title: '单票收款', child: [], alt: 'arrival_and_payment' } ///未完
                            {id: 1045, title: '到达单票/多票付款', child: [], alt: 'arrival_payment'}
                        ]
                    },
                    {
                        id: 1085,
                        title: '到达付款报表',
                        child: [
                            {id: 1046, title: '到达现金流量付款报表', child: [], alt: 'arrival_payment_cash'},
                            {title: '网络公司到达结算清单', child: [], alt: 'Internet_company_arrives'},
                        ]
                    }
                ],
            },
        ],
    },
    {
        id: 1047,
        title: '综合查询',
        child: [
            {
                id: 1048,
                title: '出发单号查询',
                child: [],
                alt: 'Departure_number'
            },
            {
                id: 1049,
                title: '收货信息模糊查询',
                child: [],
                alt: 'Fuzzy_query',
            },
            {
                id: 1050,
                title: '出发货量分析—统计类',
                child: [
                    {id: 1051, title: '出发货量汇总 ', child: [], alt: 'Shipping_summary'},
                    {id: 1052, title: '出发货量组合分析 ', child: [], alt: 'shipment_portfolio'},
                    {id: 1053, title: '出发货量走势(天)', child: [], alt: 'departure_volume_trend_day'},
                    // { title: '出发货量走势(周)', child: [], alt: 'departure_volume_trend_week' },
                    {id: 1054, title: '出发货量走势(月)', child: [], alt: 'departure_volume_trend_month'},

                ]
            },
            {
                id: 1055,
                title: '出发货量分析—收益类',
                child: [
                    {id: 1056, title: '出发航班收益分析 ', child: [], alt: 'flight_revenue_analysis'},
                    {id: 1057, title: '已维护发货人收益分析 ', child: [], alt: 'shipper_benefit_analysis'}
                ]
            },
            {
                id: 1058,
                title: '到达货量分析—统计类',
                child: [
                    {id: 1059, title: '到达货量汇总', child: [], alt: 'Arrive_at'},
                    {id: 1060, title: '到达货量分布', child: [], alt: 'Arrive_at_cargo'}
                ]
            },
            {
                id: 1061,
                title: '到达货量分析—收益类',
                child: [
                    {id: 1062, title: '到达航班收益分析 ', child: [], alt: 'Arrival_volume_analysis'},
                    {id: 1063, title: '已维护收货人收益分析 ', child: [], alt: 'Maintained_consignee'}

                ]
            },
            {
                id: 1064,
                title: '收货',
                child: [
                    {id: 1065, title: '航空公司销售报表 ', child: [], alt: 'sales_list'},
                    // { title: '到达货量分析—销益类 ', child: [], alt: 'analysis_sales' },
                    {id: 1066, title: '到达货量分析—收益类 ', child: [], alt: 'analysis_saless'}
                ]
            },
            {
                id: 1067,
                title: '出发',
                child: [
                    {id: 1068, title: '出发生产报表 ', child: [], alt: 'golist'},
                    {id: 1069, title: '订舱生产报表 ', child: [], alt: 'booklist'}
                ]
            },
            {
                id: 1070,
                title: '到达',
                child: [
                    {id: 1071, title: '到达提货单签收查询-提货单', child: [], alt: 'Bill_of_lading'},
                    {id: 1072, title: '到达提货单签收查询-签收单', child: [], alt: 'Let_them'},
                ]
            },
            {
                id: 1182,
                title: '收货相关报表',
                child: [
                    {/*id: 1183,*/ title: '收货生产报表—销售类', child: [], alt: 'analysis_sales'},
                    {id: 1184, title: '收货生产报表—收益类', child: [], alt: 'analysis_saless'},
                    {id: 1185, title: '航空公司销售报表', child: [], alt: 'sales_list'},
                ],
            },
            {
                id: 1186,
                title: '出发相关报表',
                child: [
                    {id: 1187, title: '出发单号查询', child: [], alt: 'Departure_number'},
                    {id: 1188, title: '订舱生产报表', child: [], alt: 'booklist'},
                    {id: 1189, title: '出发生产报表', child: [], alt: 'golist'},
                    {
                        id: 1190,
                        title: '出发货量分析-统计类',
                        child: [
                            {/*id: 1191,*/ title: '出发货量分布', child: [], alt: ''},
                            {id: 1192, title: '出发货量汇总', child: [], alt: 'Shipping_summary'},
                            {id: 1193, title: '出发货量走势图（按日期）', child: [], alt: 'departure_volume_trend_day'},
                            {id: 1194, title: '出发货量走势图（按月）', child: [], alt: 'departure_volume_trend_month'},
                            {id: 1195, title: '出发货量走势图（按周）', child: [], alt: 'departure_volume_trend_week'},
                            {id: 1196, title: '出发货量组合分析', child: [], alt: 'shipment_portfolio'},
                        ],
                    },
                    {
                        id: 1197,
                        title: '出发货量分析-收益类',
                        child: [
                            {id: 1198, title: '出发航班收益分析', child: [], alt: 'flight_revenue_analysis'},
                            {id: 1199, title: '已维护发货人收益分析', child: [], alt: 'shipper_benefit_analysis'},
                        ],
                    },
                ],
            },
            {
                id: 1200,
                title: '到达相关报表',
                child: [
                    {/*id: 1201,*/ title: '到达生产报表', child: [], alt: ''},
                    {/*id: 1202,*/ title: '到达提货单查询', child: [], alt: ''},
                    {/*id: 1203,*/ title: '到达签收单查询', child: [], alt: ''},
                    {
                        id: 1204,
                        title: '到达货量分析-统计类',
                        child: [
                            {id: 1205, title: '到达货量分布', child: [], alt: 'Arrive_at_cargo'},
                            {id: 1206, title: '到达货量汇总', child: [], alt: 'Arrive_at'},
                        ],
                    },
                    {
                        id: 1207,
                        title: '到达货量分析-收益类',
                        child: [
                            {id: 1208, title: '到达航班收益分析', child: [], alt: 'Arrival_volume_analysis'},
                            {id: 1209, title: '已维护收货人收益分析', child: [], alt: 'Maintained_consignee'},
                        ],
                    },
                ],
            },
            {
                id: 1210,
                title: '提货相关报表',
                child: [
                    {id: 1211, title: '提货生产报表-销售类', child: [], alt: 'tihuo'},
                    {id: 1212, title: '提货生产报表-收益类', child: [], alt: 'tihuos'},
                ],
            },
            {
                id: 1213,
                title: '收付款相关报表',
                child: [
                    {/*id: 1214,*/ title: '本地运单包舱结算清单', child: [], alt: ''},
                    {
                        id: 1215,
                        title: '出发收付款报表',
                        child: [
                            {id: 1216, title: '出发现金流量收款报表', child: [], alt: 'departure_receipt_cash'},
                            {id: 1216, title: '出发现金流量付款报表', child: [], alt: 'departure_payment_cash'},
                            {id: 1217, title: '本地出发结算清单', child: [], alt: 'Local_bill_of_lading'},
                            {id: 1218, title: '网络公司出发结算清单', child: [], alt: 'Arrival_list'},
                        ],
                    },
                    {
                        id: 1219,
                        title: '到达收付款报表',
                        child: [
                            {id: 1220, title: '到达现金流量收款报表', child: [], alt: 'arrival_receipt_cash'},
                            {id: 1220, title: '到达现金流量付款报表', child: [], alt: 'arrival_payment_cash'},
                            {id: 1221, title: '本地到达结算清单', child: [], alt: 'Local_bill_of_lading'},
                            {id: 1222, title: '网络公司到达结算清单', child: [], alt: 'Internet_company_arrives'},
                            {/*id: 1223,*/ title: '到达司机提成报表', child: [], alt: ''},
                        ],
                    },
                ],
            },
            {
                /*id: 1224,*/
                title: '票证相关报表',
                child: [
                    {/*id: 1225,*/ title: '单据盘存报表', child: [], alt: ''},
                    {/*id: 1226,*/ title: '票证业务统计', child: [], alt: ''},
                ],
            },
            {
                id: 1227,
                title: '库房',
                child: [
                    {
                        id: 1228,
                        title: '库房盘存报表',
                        child: [
                            {id: 1229, title: '到达', child: [], alt: ''},
                            {id: 1230, title: '出发', child: [], alt: ''},
                        ],
                    },
                    {
                        id: 1231,
                        title: '出入生产报表',
                        child: [
                            {id: 1232, title: '到达', child: [], alt: ''},
                            {id: 1233, title: '出发', child: [], alt: ''},
                        ],
                    },
                ],
            },
            {
                id: 1234,
                title: '车辆管理',
                child: [
                    {id: 1235, title: '车管业务统计', child: [], alt: ''},
                    {id: 1236, title: '派送终点报表', child: [], alt: ''},
                ],
            },
        ]
    },
    {
        title: '客服',
        child: [{
            title: '航线运价查询',
            child: [],
            alt: 'receiving_main_management'

        },
            {
                title: '分单处理',
                child: [],
                alt: 'receiving_sub_management'
            },
            /* {
             title: '客服生产报表',
             child: [
             { title: '已录入', child: [], alt: '' },
             { title: '已入库', child: [], alt: '' }
             ]
             }*/
        ]
    },
    {
        id: 1076,
        title: '系统管理',
        child: [{
            id: 1077,
            title: '用户管理',
            child: [],
            alt: 'user_management'

        },
            {
                id: 1079,
                title: '部门管理',
                child: [],
                alt: 'department_management',
            },
            {
                id: 1078,
                title: '权限管理',
                child: [],
                alt: 'permission_management',
            },
            {
                id: 1080,
                title: '角色管理',
                child: [],
                alt: 'Role_management',
            },
            {
                id: 1238,
                title: '个人中心',
                child: [],
                alt: 'personal_management',
            },
            {
                id: 1081,
                title: '组织机构',
                child: [],
                alt: 'Organization'
            },
            {
                id: 1082,
                title: '回收站管理',
                child: [],
                alt: 'Recycle_bin'
            },
            {
                id: 1083,
                title: '菜单管理',
                child: [],
                alt: 'Menu_management'
            },
            {
                id: 1084,
                title: '数据字典',
                child: [],
                alt: 'data_dictionary'
            },
            {
                id: 1085,
                title: '系统图标',
                child: [],
                alt: 'System_Icon'
            },
            {
                id: 1086,
                title: '国际化语言',
                child: [],
                alt: 'International_language'
            },
            {
                id: 1087,
                title: '多数据源管理',
                child: [],
                alt: 'Multiple_data_source'
            },
            {
                id: 1088,
                title: '用户快捷菜单',
                child: [],
                alt: 'User_shortcut_menu'
            }
        ]
    },
    {
        id: 1089,
        title: '基础数据',
        child: [{
            id: 1090,
            title: '设置',
            child: [
                {id: 1091, title: '职位管理', child: [], alt: 'Setting_job'},
                {id: 1092, title: '业务员管理', child: [], alt: 'Salesman_management'},
                {id: 1093, title: '车辆型号管理', child: [], alt: 'Vehicle_model'},
                {id: 1094, title: '司机信息管理', child: [], alt: 'Driver_information'},
                {id: 1095, title: '舱位数据管理', child: [], alt: 'air_position'},
                {id: 1096, title: '地域管理', child: [], alt: 'air_dili'},
                {id: 1097, title: '飞机编号管理', child: [], alt: 'air_num'},
            ]
        },
            {
                id: 1281,
                title: '到达提货相关数据',
                child: [
                    {id: 1282, title: '证件名称', child: [], alt: 'Arrival_document_name'},
                    {id: 1283, title: '提货方式', child: [], alt: 'Arrival_and_delivery_method'},
                    {id: 1284, title: '经常提货人', child: [], alt: 'Frequent_receive'},
                    {id: 1285, title: '到达交接人', child: [], alt: 'Arrival_of_receiver'},
                    {id: 1286, title: '派送中转区域', child: [], alt: 'Deliver_transit_area'},
                    {id: 1287, title: '派送线路', child: [], alt: 'Delivery_route'}
                ]
            },
            {
                id: 1105,
                title: '航班管理',
                child: [
                    {id: 1106, title: '订舱情况', child: [], alt: 'Booking_space'},
                    {id: 1107, title: '出港城市管理', child: [], alt: 'Outbound_city'}
                ]
            },
            {
                id: 1276,
                title: '航班、车次数据',
                child: [
                ]
            },
            {
                id: 1277,
                title: '飞机数据',
                child: [
                    {id: 1280, title: '机型信息', child: [], alt: 'Aircraft_model_information'},
                    {id: 1279, title: '飞机编号', child: [], alt: 'Aircraft_data_number'},
                    {id: 1278, title: '舱位数据', child: [], alt: 'Aircraft_seat_data'}
                ]
            },
            {
                id: 1272,
                title: '货物数据',
                child: [
                    {id: 1113, title: '承运人自分货物类别', child: [], alt: 'carrier_subdivides'},
                    {id: 1274, title: '货物类别', child: [], alt: 'workde_cla'},
                    {id: 1275, title: '货物名称', child: [], alt: 'workde_name'},
                    {id: 1273, title: '货物包装种类', child: [], alt: 'Basic_data_package'}
                ]
            },
            {
                id: 1265,
                title: '行业数据',
                child: [
                    {id: 1117, title: '承运人信息', child: [], alt: 'Carrier_information'},
                    {id: 1266, title: '常货主', child: [], alt: 'Small_agent'},
                    {id: 1119, title: '机场信息管理', child: [], alt: 'Airport_Information'},
                    {id: 1120, title: '邮件收货人', child: [], alt: 'Mail_consignee'},
                    {id: 1121, title: '国别代码', child: [], alt: 'Country_code'},
                    {id: 1268, title: '航空公司', child: [], alt: 'Airline_company'},
                    {id: 1270, title: '快递公司', child: [], alt: 'Courier_Company'},
                    {id: 1269, title: '机场代码', child: [], alt: 'Airport_Code'},
                    {id: 1267, title: '城市代码', child: [], alt: 'City_Code'},
                    {id: 1271, title: '网络公司信息', child: [], alt: 'Network_company'},
                    {id: 1127, title: '地面操作点信息', child: [], alt: 'point_information'},
                    {id: 1128, title: '承运人/地面操作点对照', child: [], alt: 'Ground_operating_point'},
                    {id: 1129, title: '集装器类型', child: [], alt: 'Container_type'},
                    {id: 1130, title: '城市对距离信息', child: [], alt: 'City_distance'},
                    {id: 1131, title: '火车站代码', child: [], alt: 'Train_station_code'},
                ]
            },
            {
                id: 1132,
                title: '运价管理',
                child: [
                    {id: 1237, title: '运价管理', child: [], alt: 'yunjiaguanli'},
                    {
                        id: 1239, title: '主单', child: [
                        {id: 1240, title: '主单航空', child: [], alt: 'mainfly'},
                        {id: 1241, title: '主单相关', child: [], alt: 'mainabout'},
                        {id: 1242, title: '运单特殊设置', child: [], alt: 'mainte'},
                    ]
                    },
                    {
                        id: 1243, title: '分单', child: [
                        {id: 1244, title: '分单航空', child: [], alt: 'subflly'},
                        {id: 1245, title: '分单相关', child: [], alt: 'subabout'},
                    ]
                    },
                    {
                        id: 1246, title: '邮件', child: [
                        {id: 1247, title: '邮件航空', child: [], alt: 'mailfly'},
                        {id: 1248, title: '邮件相关', child: [], alt: 'mailabout'},
                        {id: 1249, title: '邮件特殊设置', child: [], alt: 'mailte'},
                    ]
                    },
                    {
                        id: 1250, title: '提货', child: [
                        {id: 1251, title: '提货主单运价', child: [], alt: 'getmain'},
                        {id: 1252, title: '提货分单运价', child: [], alt: 'getsub'},
                    ]
                    },
                    {id: 1254, title: '运价优先级设置', child: [], alt: 'yunjiaBest'},
                    {id: 1133, title: '票面价管理', child: [], alt: 'Par_value'},
                    {id: 1134, title: '运价类别管理', child: [], alt: 'Tariff_categor'},
                    {id: 1135, title: '公布运价', child: [], alt: 'Announced_tariff'},
                    {id: 1136, title: '应收运价', child: [], alt: 'Freight_receivable'},
                    {id: 1137, title: '重量分界管理', child: [], alt: 'Weight_boundary'},
                    // { title: '结算价管理', child: [], alt: 'sale_boundary' },
                    {id: 1138, title: '运价类别', child: [], alt: 'sale_cla'},
                    {id: 1139, title: '运单', child: [], alt: 'post_list'},

                ]
            },
            {
                id: 1288,
                title: '出发收货信息',
                child: [],
                alt: '',
                child: [
                    {id: 1289, title: '出发优先级', child: [], alt: 'Departure_priority'},
                    {id: 1290, title: '到达终点后收费标准', child: [], alt: ''},
                    {id: 1291, title: '订舱联系人', child: [], alt: 'Booking_contact'},
                    {id: 1292, title: '收货人信息', child: [], alt: 'receiverMsg'},
                ]
            },
            {
                id: 1143,
                title: '其他运价',
                child: [],
                alt: '',
                child: [{
                    id: 1144,
                    title: '快件运价',
                    child: [
                        {title: '其他快件', child: [], alt: 'Other_express'},
                        {title: '邮件运价', child: [], alt: 'Mail_rate'}
                    ]
                },
                    {id: 1145, title: '分单', child: [], alt: 'Tariff_list'}

                ]
            },
            {
                id: 1146,
                title: '通用数据字典',
                child: [],
                alt: '',
                child: [
                    {id: 1147, title: '费用不可见设置', child: [], alt: 'The_cost_is_not_visible'},
                    {id: 1255, title: '库房信息', child: [], alt: 'Location_information'},
                    {id: 1149, title: '客户类型代码', child: [], alt: 'Customer_type_code'},
                    {id: 1150, title: '无法接收短信手机号', child: [], alt: 'Unable_to_receive_SMS_phone_number'},
                    {id: 1260, title: '快件区域', child: [], alt: 'Express_area'},
                    {id: 1152, title: '银行账号', child: [], alt: 'The_bank_account '},
                    {
                        id: 1264,
                        title: '预付款管理',
                        child: [
                            {id:1293,title: '接收提醒手机号', child: [], alt: 'Receive_reminder_phone_number'},
                            {id:1294,title: '预付款管理', child: [], alt: 'Advance_payment_management'},
                            {id:1295,title: '预付款扣款记录', child: [], alt: 'Advance_payment-record'},
                            {id:1296,title: '预付款结算单位', child: [], alt: 'Settlement_unit'},

                        ]
                    },
                    {id: 1263, title: '客户类型', child: [], alt: 'The_customer_type'},
                    {id: 1297, title: '客户类型与客户代码对应关系', child: [], alt: 'costurtype_codelink'},
                    {id: 1261, title: '快件区域目的地对应关系', child: [], alt: 'Corresponding_relations_between'},
                    {id: 1156, title: '结算单位信息', child: [], alt: 'Settlement_unit1'},
                    {id: 1157, title: '业务点信息', child: [], alt: 'Business_point_information'},
                    {id: 1258, title: '费用名称', child: [], alt: 'Cost_of_name'},
                    {id: 1159, title: '打印机IP地址', child: [], alt: 'Printer_IP_address'},
                    {id: 1262, title: '客服状态', child: [], alt: 'The_state_of_the_service'},
                    {id: 1161, title: '其它费用管理', child: [], alt: 'Cost_management'},
                    {id: 1162, title: '影响运价因素', child: [], alt: 'Freight_factors'},
                    {id: 1259, title: '付款方式', child: [], alt: 'Terms_of_payment'},
                    {id: 1164, title: '货物数据', child: [], alt: 'Data_commodity_name'},
                    {id: 1165, title: '国家和地区', child: [], alt: 'countries_and_regions'},
                    {id: 1166, title: '与承运人相关运价', child: [], alt: 'waybill '},
                    {id: 1167, title: '特货代码', child: [], alt: 'Special_goods_code'},
                    {id: 1168, title: '机型', child: [], alt: 'Model'},
                    {id: 1169, title: '货物不正常关系', child: [], alt: 'Abnormal_type'},
                    {id: 1170, title: 'ULD类型', child: [], alt: 'Base_data_type_ULD'},
                    {id: 1171, title: '货物品名代码', child: [], alt: 'data_goods_name_code'},
                    {id: 1172, title: '航空公司基本信息管理', child: [], alt: 'basic_information_management'},
                    {id: 1173, title: '材料销售', child: [], alt: 'Basic_data_material_sales'},
                    {id: 1174, title: '收发货人信息管理', child: [], alt: 'Consignee_information_management'},
                    {id: 1176, title: '始发站目的地管理', child: [], alt: 'Departure_station_destination'},
                    {id: 1177, title: '提货方式', child: [], alt: 'Delivery_mode'},
                ]
            },
        ]
    },
]

let login_out = () => {
    clearStore()
    top.location.href = "index.html"
}

let authList = JSON.parse(getStore('authList'))

if (!authList) {
    login_out()
}

let formMenuData = data => {
    data.forEach(item1 => {
        let isShow = authList.some(item2 => {
            return item1.id === item2.id
        })

        if (isShow) {
            item1.show = true
            if (item1.child.length) {
                formMenuData(item1.child)
            }
        }
    })
}

formMenuData(data)


var box = $('.list ul')
// 左侧导航的内容
var str = ''
//用模拟数据生成结构
function creatE(data) {
    data.forEach((item, i) => {
        if (item.show) {
            str += `<li ><a href="#" alt="${item.alt}" class="inactive" data-name='${item.title}'>${item.title}</a>`
            if (item.child.length) {
                str += `<ul style="display: none;">`
                creatE(item.child)
                str += `</ul>`
            }
            str += '</li>'
        }
    })
    return str
}
str = creatE(data)
box.append(str)

$('.sing_out').on('click', function () {
    LXHR.POST(baseUrl + '/auth/logOut').done(res => {
        if (res.status === 200) {
            login_out()
        }
    })
})