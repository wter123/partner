<template>
	<view class="homePage">
		
		<!-- 地图组件 -->
		<view class="initWH">
			<mapView></mapView>
		</view>
		
		<!-- 抽屉组件 -->
		<view class="drawer">
			<unidrawer @drawerStatus="getDrawerStatus" ref="draw" :mask="mask" :width="drawWid" :mode='mode'>
				<view style="padding:30rpx;z-index:9999">
					<view class="uni-title">抽屉式导航</view>
				</view> 
			</unidrawer>
		</view>
		
		<!-- 滑动小功能组件 -->
		<view class="location">
			<uni-fab :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical" :direction="direction"
			 @trigger="trigger" @fabClick="fabClick"></uni-fab>
		</view>

	</view>
</template>

<script>
	import mapView from "@/components/map/index.vue"
	import unidrawer from "@/components/uni-drawer/uni-drawer.vue"
	import uniFab from "@/components/uni-fab/uni-fab.vue"
	export default {
		components: {
			unidrawer,
			mapView,
			uniFab
		},
		data() {
			return {
				mask: true,
				mapPage: "@/components/map/index.vue",
				left: 'left',
				drawWid: '75%', //最好把uni-drawer组件里的参数width的type改为String，不然想用百分比报错烦
				maskClick: true,
				repeatClick: false,
				mode: 'left',
				horizontal: 'right',
				vertical: 'bottom',
				direction: 'vertical',
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
				},
				content: [{
						iconPath: '/static/component.png',
						selectedIconPath: '/static/componentHL.png',
						text: '组件',
						active: false
					},
					{
						iconPath: '/static/api.png',
						selectedIconPath: '/static/apiHL.png',
						text: 'API',
						active: false
					},
					{
						iconPath: '/static/template.png',
						selectedIconPath: '/static/templateHL.png',
						text: '模版',
						active: false
					}
				]
			};
		},
		methods: {
		
			// 打开或关闭面板
			open() {
				let self = this
				self.repeatClick = !self.repeatClick
				if (self.repeatClick) {
					self.$refs.draw.open();
				} else if (!self.repeatClick) {
					self.$refs.draw.close();
				}
			},
			// 监听面板是否打开
			getDrawerStatus(val) {
				let self = this
				if (val == false) {
					self.repeatClick = false
				} else if (val == true) {
					self.repeatClick = true

				}
			},
			trigger(index) {
				// 点击滑动组件里面的元素
				console.log(index)
				if (index["index"] == 0) {
					if (plus.os.name == 'Android') {

						plus.runtime.launchApplication({
								pname: 'com.miui.compass'
							},
							function(e) {
								console.log('Open system default browser failed: ' + e.message);
							}
						);
						plus.runtime.launchApplication({
								pname: 'com.taobaoa.taobao'
							},
							function(e) {
								console.log(plus.runtime.version)
								console.log(plus.runtime.versionCode)
								console.log('Open system default browser failed: ' + e.message);
							}
						);

					} else if (plus.os.name == 'iOS') {
						plus.runtime.launchApplication({
							action: 'compass://'
						}, function(e) {
							console.log('Open system default browser failed: ' + e.message);
						});
					}

				}
			},
			fabClick() {

				// 点击滑动组件
				// console.log("b")
			}
		},
		onNavigationBarButtonTap(val) {
			let self = this
			// console.log(val)
			if (val.index == 0) {
				self.open()
			}
		},
		onNavigationBarSearchInputChanged() {

		}

	}
</script>
<style scoped>

/* 
	.initWH {
		width: 100%;
		height: 100%;
	} */
	.drawer{
		
	}
	.homePage,
	page {
	position: fixed;
	left:0;
	right: 0;
	top:20;
	bottom: 0;
	}
</style>
