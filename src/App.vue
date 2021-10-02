<script>
	import pageAnimation from './components/page-animation/index.vue'
	export default {
		mixins:[pageAnimation],
		onLaunch: function() {
			console.log(1);
		},
		onShow: function() {
			
		},
		onHide: function() {
			
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	// @import "./static/css/iconfont.css";
	@import "./static/css/iconfont_1.css";
</style>
