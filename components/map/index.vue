<template>
	<view class="mapView">
		<view id="lmap" :style="{height:'100%', width:'100%'}" :prop="sender" :change:prop="changeData" />
		
		<!-- 当前点击位置的经纬度 -->
		<view class=" latlng" :class="{latlngSatus:locationStatus}" ref="latlng" @tap="leafletMap.latlngClick"> 
			<b class="latlng-a iconfont icondingwei"></b> <!-- 当前定位图标 -->
		</view>
		
		
	</view>
</template>


<script module="leafletMap" lang="renderjs">
	import L from '@/plugins/leaflet/leaflet';
	import '@/plugins/leaflet/leaflet.ChineseTmsProviders.js';
	import {
		WLocation
	} from '@/components/map/utils/index.js'
	// window.addEventListener('deviceorientation', function(e){
	//         console.log('absolute: ' + e.absolute)
	//         console.log('alpha: ' + e.alpha)
	//         console.log('beta: ' + e.beta)
	//         console.log('gamma: ' + e.gamma)
	//     }, false);
	export default {
		name: "mapView",
		data() {
			return {
				map: null,
				locationData: null,
				locationStatus: false,
				layer: {}
			}
		},
		mounted() {
			this.handleCreateMap()
			WLocation.bandLatlng(L, this.map)
			this.createMarker()
		},
		methods: {
			latlngClick(event, ownerInstance) {
				let self = this
				self.locationStatus = !self.locationStatus
				if (self.locationStatus) {
					WLocation.bandLatlng(L, self.map, true, true)
				} else if (!self.locationStatus) {
					WLocation.bandLatlng(L, self.map, false, false)
				}

				ownerInstance.callMethod('onLocationClick', {
					status: self.locationStatus
				})
			},
			onMapClick(e) {
				var popup = L.popup();
				popup
					.setLatLng(e.latlng)
					.setContent("你点击的位置在 " + e.latlng.toString())
					.openOn(this.map);
			},
			handleCreateMap() {
				let self = this
				self.map = L.map('lmap', {
					// ,
					zoomControl: false,
					attributionControl: true
				})
				L.control.scale({
					position: 'topleft',
					maxWidth: '100',
					imperial: false
				}).addTo(self.map);

				var google = L.tileLayer(
					"https://api.mapbox.com/styles/v1/yqcim/cizh1ma3400ez2so5x1anhuzo/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoieXFjaW0iLCJhIjoiY2l6ZmhnZjExMDBhajJ4cGxnNGN5MnhpdCJ9.pcZtdfk8mSFboCdwqkvW6g", {
						maxZoom: 100,
						reuseTiles: true

					})
				google.addTo(self.map)
				self.layer = google
				
				self.map.on("contextmenu",self.onMapClick)
			},

			createMarker(event, ownerInstance) {
				let self=this
				// uni.showModal(toString(event),toString(ownerInstance))
				var pos = {
					lat: 26.524712,
					lng: 112.357392
				}
				var marker = L.marker({
					lat: pos.lat,
					lng: pos.lng
				}).addTo(self.map)
			},
			createLine(event, ownerInstance) {
				var list = [
					[25.0707201, 102.648351],
					[25.0707201, 102.649351],
					[25.0707201, 102.652351],
					[25.0707201, 102.655351],
					[25.0707201, 102.656351]
				]
				var polyline = L.polyline(list, {
					color: 'red',
					weight: 6
				}).addTo(this.map);

				polyline.bindTooltip('测试路线')
				polyline.openTooltip()
				polyline.on('click', () => {
					ownerInstance.callMethod('showToast', '您点击了测试路线')
				})
				this.map.fitBounds(polyline.getBounds());
			},
			changeData(newValue, oldValue, ownerInstance, instance) {
				if (newValue.event == 'mapKey') {
					// this.handleTianLayer(newValue.data)
					return
				}
				ownerInstance.callMethod('showToast', '监测到Vue中的数据发生改变:' + JSON.stringify(newValue))
			}
		}
	}
</script>
<script>
	export default {
		data() {
			return {
				locationStatus: false,
				// height: 100%,
				sender: {
					event: 'click',
					data: null
				},
				skyApi: ''
			}
		},
		onLoad() {

		},
		methods: {
			onLocationClick(data) {
				let self = this
				this.locationStatus = data.status
			},
			showToast(text) {
				uni.showToast({
					icon: 'none',
					title: text
				})
			},
			handleChange() {
				this.sender.data = {
					title: '测试数据:' + Math.round(Math.random() * 100)
				}
			},
			handleSkyMap() {
				this.sender.data = this.skyApi
				this.sender.event = 'mapKey'
			}
		}
	}
</script>

<style>
	@import '/plugins/leaflet/leaflet.css';
	/* @import '/plugins/leafletPlugins/css/MarkerCluster.css';
	@import '/plugins/leafletPlugins/css/MarkerCluster.Default.css'; */

	/* 	#lmap{
		width: 100%;
		height: 100%;
	} */
	
	/* .flex {
		margin-top: 10px;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
	} */

	.form-i/* tem {
		border: 1px solid #eee;
		padding: 5px;
	} */

	page,
	.mapView {
		width: 100%;
		height: 100%;
		/* display: flex; */
			position: fixed;
			left:0;
			right: 0;
			top:0;
			bottom: 0;
	}

	.latlng {
		position: fixed;
		left: 20px;
		bottom: 30px;
		z-index: 500;
		color: #666;
		width: 36px;
		height: 36px;
		padding: 5px 3px 3px 5px;
		background-color: #fff;
		border-radius: 50%;
		right: calc(15px + var(--window-right));
		bottom: calc(30px + var(--window-bottom));
	}
	#lmap{
		
	}
	
	.latlngSatus {
		color: #1cbbb4;
	}

	.latlng-a {
		font-size: 2em;

	}
</style>
