<template>
  <div class="hello">  
    <h2>table-组件引入</h2>
	<div style="height: 600px;border: 1px solid red;font-size: 14px;">
		<kl-table v-bind="tableConfig"></kl-table>
	</div>
  </div>
</template>

<script>
import klTable from './kl-table/src/table-component.vue'
export default {
  name: 'HelloWorld',
  components:{
	  klTable
  },
  data () {
	let _this = this;
    return {
      msg: 'Welcome to Your Vue.js App热热热若',
	  tableConfig:{
		  	// 查询条件数组
		  searchObj:{
		  	searchMethod:function(params,that){
		  		console.log(params)
				that.getList()
		  	},
		  	searchArr:[
		  		{label:'上传日期',type:'date',model:'time'},
		  		{label:'最不利压力点',type:'el-input',model:'press'},
		  		{label:'周期类型',type:'el-select',model:'cycle',option:[
		  			{name:'select1',value:0},
		  			{name:'select2',value:1},
		  			{name:'select3',value:2},
		  		]},
		  		{label:'方案名称',type:'el-input',model:'name'},
				{label:'日期区间',type:'daterange',model:'time'},
		  	],
		  },
		  			
		  	// 查询条件参数 
		  	queryObj:{
				listUrl:'static/data/list.json',
				ajaxObj:{
					method:'get',
					listUrl:'static/data/list.json',
					isJson:false,
				},
		  		queryData:{
		  			time:'',
		  			press:'',
		  			cycle:'',
		  			name:'',
		  			page: 1,
		  			pageCount: 15,
		  		}
		  	},
		  
		  	// 按钮数组
		  	operateArr:[
		  		{name:'导出',color:'primary',icon:'el-icon-download',url:'',method:function(name){
					console.log(_this.msg)
		  			alert(name)
		  		}},
		  		{name:'打印',icon:'el-icon-receiving',url:'',method:function(name){
		  			alert(name)
		  		}},
		  		{name:'新建',icon:'el-icon-plus',url:'',method:function(name){
		  			alert(name)
		  		}}
		  	],
		  	// table表配置参数
		  	tableObj:{
				// 左边选择框展示
				selectionShow:true,
				// 左边序号展示
				indexShow:true,
		  		// table表事件参数配置
		  		tableMethods:{
		  			// selection:function(val){
		  			// 	console.log(val)
		  			// }
		  		},
		  		// table表展示列配置
		  		showItems:[
		  			{name:'编号',prop:'code',width:200},
		  			{name:'状态',prop:'condition',width:100},
		  			{name:'创建人',prop:'createBy',width:100},
		  			{name:'创建时间',prop:'createTime',width:200},
		  			{name:'名称',prop:'name',width:150},
		  			{name:'数量',prop:'number',width:100},
		  			{name:'其他',prop:'other',width:100,scopeType:'formate',method:function(row){//需要格式化列函数
		  				return row.status == 0 ?'停用':'启用'
		  			}},
		  			{name:'操作',prop:'operate',width:150,fixed:'right',scopeType:'button',buttonArr:[//最后一行操作栏数组
		  				{name:'查看',method:function(row){
		  					console.log(row)	
		  				},isShow:function(row,that){
							return true
						}},
		  				{name:'编辑',method:function(row){
		  					console.log(row)
		  				},isShow:function(row,that){
							return true
						}},
		  				{name:'删除',method:function(row,that){
		  					console.log(row);
							that.getList()
		  				},isShow:function(row,that){
							return row.status == 0
						}}
		  			]},
		  		]
		  	},
		  	// 分页展示总条配置
		  	 paginationObj:{
		  		 pageSizes:[15,30,100,500]
		  	 },
	  }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
