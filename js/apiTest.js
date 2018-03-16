/** 获取当前用户的包厢列表 
*   类型：GET
*  	参数：无
*	是否登录：是
*/

// 成功返回数据示例：
{
	"status": 200,
	"msg": "success",
	"list":[
		{
			"id": 1001,                     // 店铺id
			"name": "坪洲四季城店",			// 店铺名称
			"total_user": 1567,				// 店铺累计使用人数
			"total_income": 5624.23,		// 店铺累计消费金额
			"is_idle": 0,					// 空闲唱机数量
			"is_using": 1,					// 正在使用唱机数量
			"is_repair": 2,					// 维修中唱机数量
			"machine_list": [				// 唱机列表
				{
					"id": 001,     			// 唱机id
					"total_user": 1234,		// 唱机累计使用人数
					"total_income": 2345,	// 唱机累计消费金额
					"idle_time": 1,			// 唱机已空闲时长
				},	
				{
					"id": 002,     			// 唱机id
					"total_user": 1222,		// 唱机累计使用人数
					"total_income": 2222,	// 唱机累计消费金额
					"idle_time": 0.5,		// 唱机已空闲时长
				},			
			]
		},
		{
			"id": 1002,                     // 店铺id
			"name": "坪洲天虹店",			// 店铺名称
			"total_user": 2345,				// 店铺累计使用人数
			"total_income": 4567.23,		// 店铺累计消费金额
			"is_idle": 1,					// 空闲唱机数量
			"is_using": 2,					// 正在使用唱机数量
			"is_repair": 0,					// 维修中唱机数量
			"machine_list": [				// 唱机列表
				{
					"id": 001,     			// 唱机id
					"total_user": 1234,		// 唱机累计使用人数
					"total_income": 2345,	// 唱机累计消费金额
					"idle_time": 1,			// 唱机已空闲时长
				},	
				{
					"id": 002,     			// 唱机id
					"total_user": 1222,		// 唱机累计使用人数
					"total_income": 2222,	// 唱机累计消费金额
					"idle_time": 0.5,		// 唱机已空闲时长
				},			
			]
		}
	]

}


/** 获取当前用户的订单列表
*   类型：GET
*  	参数：
		参数名       参数类型      是否必填      默认值           可选参数                          参数说明

		shop:    	  string		  是           无		  店铺id/0 (0表示取全部订单)		     店铺id
 		order:        string          否          "desc"         "desc"/"asc"                     	 升降序
 		sort_by:      string          否        "creat_time"       "creat_time"/"price"			按什么排序，默认按订单创建时间排序；可选按消费金额排序
*	
*/

// 正确返回示例
{
	"status": 200,
	"msg": "success",
	"list":[
		{
			"id": "A487954221",              // 订单编号id
			"shop_name": "坪洲四季城店",	// 店铺名称
			"shop_id": "1001",				// 店铺id
			"device_id": "1-1"				// 设备编号
			"user_id": 1567,				// 用户id
			"user_name": "小鸡鸡",			// 用户昵称
			"user_avatar": "http://a.baidu.com/image/10012.jpg",	// 用户头像
			"created_at": 1552998746	    // 订单创建时间, 时间戳
			"duration": 30,					// 使用时长（单位：min）
			"amount": 28.00,				// 消费金额
			"pay_status": 1,				// 支付状态； 0：未支付，1：已支付
		}
	]

}