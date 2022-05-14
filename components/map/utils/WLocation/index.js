let bandLatlng = function(L, map, View = true, Watch = false) {
 	/*
 	第一个参数：leaflet库
 	第二个参数：储存地图变量
 	第三个参数：是否跳转到当前定位
 	第四个参数：持续定位
 	*/
 	let self = this
 	map.locate({
 		// watch: Watch,
 		// setView: true

 		watch: Watch,
 		setView: View
 	})
 	map.on("locationfound", function(e) {


 		if (self.locationData) {
 			self.locationData.remove();
 		}
 		self.locationData = L.marker({
 			lat: e.latlng.lat,
 			lng: e.latlng.lng, 
			
 		})

 		self.locationData.addTo(map)

 		// var radius = e.accuracy / 2;
 		// L.marker(e.latlng)
 		// 	.addTo(map)
 		// 	.bindPopup("你就在这个圈内");
 		// L.circle(e.latlng, radius).addTo(map);
 	});
 }

 export default {
 	bandLatlng
 }
