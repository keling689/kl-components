<template>
	<div class="kl-table">
		
	</div>
</template>

<script>
	const list = require('../list.json');
	console.log(list)
	export default{
		name:'KlTable',
		props:{
			description: {
				type: String,
				default: ''
			  },			
		},
		components:{
			
		},
		data(){
			return {
				
			}
		},
		computed:{
			
		},
		created(){
			this.$axios.get('static/data/list.json').then(res=>{
				console.log(res)
			}).catch(err=>{
				console.log(err)
			})
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	
</style>
