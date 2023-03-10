import Vue from 'vue'
export default {
	namespaced:true,
	state() {
		return {
			orderCartList:[],
			cartList: [{
					id: "10090",
					twoId: 10089,
					name: "拿破仑莓恋",
					french: "Napoléon aux fraises",
					price: "218.00",
					img: "https://static.mcake.com/new_goods/napolunmeilian/N0201/list/1.jpg",
					list: [{
							id: 10090,
							sku: "n0201",
							ahead: "提前5小时预定",
							edible: "2-3人食",
							spec: "1磅",
							price: "218.00"
						},
						{
							id: 10091,
							sku: "n0202",
							ahead: "提前5小时预定",
							edible: "4-7人食",
							spec: "2磅",
							price: "318.00"
						},
						{
							id: 10092,
							sku: "n0203",
							ahead: "提前5小时预定",
							edible: "8-12人食",
							spec: "3磅",
							price: "458.00"
						},
						{
							id: 10093,
							sku: "n0205",
							ahead: "提前5小时预定",
							edible: "12-20人食",
							spec: "5磅",
							price: "750.00"
						}
					],
					ischeck: false,
					num: 1, //商品数量
					idx: 0 //标志选中的子商品信息

				},
				{
					id: "11547",
					twoId: 11540,
					name: "白色恋人",
					french: "Blanc Amant",
					price: "218.00",
					tid: 11,
					ischeck: false,
					num: 2, //商品数量
					idx: 0, //标志选中的子商品信息
					tname: "限定",
					list: [{
							id: 10090,
							sku: "n0201",
							ahead: "提前5小时预定",
							edible: "2-3人食",
							spec: "1磅",
							price: "218.00"
						},
						{
							id: 10091,
							sku: "n0202",
							ahead: "提前5小时预定",
							edible: "4-7人食",
							spec: "2磅",
							price: "318.00"
						},
						{
							id: 10092,
							sku: "n0203",
							ahead: "提前5小时预定",
							edible: "8-12人食",
							spec: "3磅",
							price: "458.00"
						},
					],
					img: "https://static.mcake.com/new_goods/napolunmeilian/N0201/list/1.jpg"
				}
			]
		}
	},
	mutations: {
		// 单选加工
		cartCheckMut(state, index) {
			state.cartList[index].ischeck = !state.cartList[index].ischeck
		},
		// 全选加工,bool为原本的全选状态
		cartAllCheckMut(state, bool) {
			state.cartList.forEach(item => {
				item.ischeck = !bool
			})
			
		},
		//子商品的下拉处理
		cartListCheckMut(state, {
			cartIndex,
			dropIndex,
			num
		}) {
			state.cartList[cartIndex].idx = dropIndex
			state.cartList[cartIndex].num = num
		},
		// 添加购物车
		cartAddMut(state, goodObj) {
			// 判断去除相同的商品，有重复的执行数量加1
			let {cartList} = state
			for(let i=0 ; i<cartList.length ; i++){
				let { id , idx } = goodObj
				// 购物车有完全一样的商品，执行数量加1
				if(cartList[i].id == id && cartList[i].idx == idx){
					cartList[i].num ++ 
					return
				}
			}
			// 新增三个自己定义的数据ischeck，num, idx
			// goodObj.ischeck = false 非响应式方法
			// 响应式方法
			Vue.set(goodObj,'ischeck',false)
			Vue.set(goodObj,'num',1)
			// Vue.set(goodObj,'idx',0)
			state.cartList.push(goodObj)

		},
		saveOrderCartListMut(state,value){
			state.orderCartList = value
		},
		
	},
	actions:{
		// 把购物车的信息提交到订单里
		saveOrderCartListAct({state,commit}){
			let orderCartList = []
			state.cartList.forEach(item=>{
				if(item.ischeck){
					orderCartList.push(item)
				}
			})
			console.log(orderCartList);
			commit('saveOrderCartListMut',orderCartList)
		}
	},
	getters: {
		isAllChecked(state) {
			let isAll = true
			state.cartList.forEach(item => {
				// 有一个不为真就是假
				if (!item.ischeck) {
					isAll = false
				}
			})
			return isAll

		},
		// 计算总价
		sumPrice(state) {
			let allPrice = 0
			state.cartList.forEach(item => {
				if (item.ischeck) {
					allPrice += item.list[item.idx].price * item.num
				}
			})
			return allPrice
		}
	}
}
