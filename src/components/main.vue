<template>
	<div class="out-div">
		<div class="kl-table">
			<div class="table-header">
				<div class="table-search">	
					<div class="query-item" v-for="(item, key, index) in showQuery()"  :key="item.label">
						<span>{{item.label}}：</span>
						<div class="query-box">
							<el-input size="mini" v-model="queryObj.queryData[item.model]" clearable></el-input>
						</div>
					</div>
					<!-- 搜索函数暴露出来 -->
					<!-- <el-button type="warning" icon="el-icon-search" size="mini" @click="searchObj.searchMethod(queryData)"></el-button> -->
					<el-button type="warning" icon="el-icon-search" size="mini" @click="doSearch"></el-button>
					<div class="fold-open" v-if="searchObj.searchArr.length>3"  @click="showMore">
						<i class="el-icon-arrow-up" v-if="showLength!=3"></i>
						<i class="el-icon-arrow-down" v-if="showLength==3"></i>
					</div>
				</div>
				<div class="operate-group" :class="{'group-inline':showLength==3}">
					 <el-button :type="item.color" v-for="item in operateArr" :key="item.name" size="mini" @click="item.method(item.name)">{{item.name}}</el-button>
				</div>	
			</div>
			
			<div class="table-body">
				<el-table
				v-if="showTable"
					size="mini"
					:data="tableData"
					border
					 @selection-change="tableObj.tableMethods.selection"
					:max-height="tableHeight"
					style="width: 100%">
					<el-table-column
							v-if="tableObj.tableMethods.selection"
							  fixed="left"
					          type="selection"
					          width="55">
					    </el-table-column>	
					<el-table-column	
					 :show-overflow-tooltip="item.scopeType != 'button'"
					  v-for="item in tableObj.showItems"
					  :prop="item.prop"
					  :key="item.prop"
					  :fixed="item.fixed"
					  :label="item.name"  
					  :min-width="item.width">
					  <template slot-scope="scope">
						  <!-- {{item.prop}} -->
						  <span v-if="!item.scopeType">{{scope.row[item.prop]}}</span>
						  <span v-html="item.method(scope.row)" v-if="item.scopeType=='formate'"></span>
						<el-button type="text" size="small" v-for="sonitem in item.buttonArr" :key="sonitem.name" v-if="item.scopeType == 'button'"  @click="sonitem.method(scope.row)">{{sonitem.name}}</el-button>
						<!-- <el-button type="text" size="small">编辑</el-button> -->
					  </template>
					</el-table-column>
					
				  </el-table>
			</div>
			<div class="table-pagination">
				 <el-pagination
				   @size-change="handleSizeChange"
				   @current-change="handleCurrentChange"
				   :current-page="pageArr.page"
				   :page-sizes="paginationObj.pageSizes"
				   :page-size="pageArr.pageCount"
				   layout="total, sizes, prev, pager, next, jumper"
				   :total="pageArr.rowNumber">
				 </el-pagination>
			</div> 
		</div>
	</div>

</template>

<script>
	// const list = require('../list.json');
	// console.log(list)
	export default{
		name:'KlTable',
		props:{
			// searchObj: Object,
			// queryObj: Object,
			// operateArr:Array,
			// tableObj:Object,
			// paginationObj:Object		
		},
		components:{
			
		},
		data(){
			return {
				showTable:false,
				tableHeight:'',
				currentPage4: 4,
				showLength:3,
				showScope:function(row){
					return row
				},
				// 查询条件数组
				searchObj:{
					searchMethod:function(params){
						console.log(params)
					},
					
					searchArr:[
						{label:'上传日期',type:'el-date-picker',model:'time'},
						{label:'最不利压力点',type:'el-input',model:'press'},
						{label:'周期类型',type:'el-select',model:'cycle',option:[
							{name:'select1',value:0},
							{name:'select2',value:1},
							{name:'select3',value:2},
						]},
						{label:'方案名称',type:'el-input',model:'name'},
					],
				},
			
					// 查询条件参数 
					queryObj:{
						listUrl:'static/data/list.json',
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
						{name:'导出',color:'primary',url:'',method:function(name){
							alert(name)
						}},
						{name:'打印',color:'warning',url:'',method:function(name){
							alert(name)
						}},
						{name:'新建',color:'success',url:'',method:function(name){
							alert(name)
						}}
					],
					// table表配置参数
					tableObj:{
						// table表事件参数配置
						tableMethods:{
							selection:function(val){
								console.log(val)
							}
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
								{name:'查看',method:function(row,that){
									
									console.log(row)
								}},
								{name:'编辑',method:function(row){
									console.log(row)
								}},
								{name:'删除',method:function(row){
									console.log(row)
								}}
							]},
						]
					},
					// 分页展示总条配置
					 paginationObj:{
						 pageSizes:[15,30,100,500]
					 },
					 tableData: [],
					 pageArr:{}
			}
		},
		computed:{
			
		},
		created(){	
			this.getList()
		},
		mounted(){
			// this.setTableHeight()		
		},
		methods:{
			setTableHeight(){
				this.showTable = false
				setTimeout(()=>{
					this.tableHeight = document.querySelector('.kl-table').clientHeight-document.querySelector('.table-header').clientHeight-60
					// console.log(this.tableHeight)
					this.showTable = true
				},0)	
			},
			doSearch(){
				alert(JSON.stringify(this.queryObj.queryData))
				this.getList()
			},
			getList(){
				let url = this.queryObj.listUrl;
				this.$axios.get(url).then(res=>{
					console.log(res)
					this.tableData = res.data.data
					this.pageArr = res.data.pageinfo
					this.setTableHeight()
				}).catch(err=>{
					console.log(err)
				})
			},
			showQuery(){
				return this.searchObj.searchArr.slice(0,this.showLength)
			},
			showMore(){	
				// alert(1)
				if(this.showLength == 3){
					this.showLength = this.searchObj.searchArr.length
				}else{
					this.showLength = 3
				}
				this.setTableHeight()
				
			},
			 handleClick(row) {
				console.log(row);
			  },
			 handleSizeChange(val) {
					console.log(`每页 ${val} 条`);
					this.queryObj.queryData.page = 0;
					this.queryObj.queryData.pageCount = val;
					this.getList()
			},
			handleCurrentChange(val) {
					console.log(`当前页: ${val}`);
					this.queryObj.queryData.page = val;
					this.getList()
			}
		}
	}
</script>


<style lang="scss">
	// 设置表头和表格内容居中
	.el-table{
		.cell{
			text-align: center;
		}
		td{
			text-align: center;
		}
		.el-table__header-wrapper{
			border-bottom: 2px solid #ccc;
		}
	}
	*{
		padding: 0;
		margin: 0;
	}
	.out-div{
		font-size: 12px;
		height: 600px;
		width: 100%;
	}
	
	.kl-table{
		border:1px solid red;
		height: 100%;
		&>div{
			// border: 1px solid #ccc;
		}
		.table-header{
			position: relative;
			margin-bottom: 20px;
			.table-search{	
				margin-bottom: 20px;
				position: relative;
				border-bottom: 1px solid #CCCCCC;
				padding-right: 210px;
				.query-item{
					display: inline-block;
					padding: 5px 10px;
					width: calc(33% - 50px);
					
					// max-width: 280px;
					&>span{
						display: inline-block;
						width: 100px;
						text-align: left;
					}
					.query-box{
						display: inline-block;
						width: calc(100% - 110px);
					}
					
				}
				.fold-open{
					    width: 56px;
						text-align: center;
						position: absolute;
						bottom: -16px;
						border-bottom-right-radius: 4px;
						border-bottom-left-radius: 4px;
						right: calc(50% - 28px);
						border: 1px solid #CCCCCC;
				}
			}
			.operate-group{
				height: 30px;
				// width: 100%;
				// background: gainsboro;
				text-align: right;
				padding-right: 15px;
				&.group-inline{
					position: absolute;
					right: 0;
					top:5px;
				}
				// float: right;
			}
		}
		.table-body{
			// height: 500px;
		}
		.table-pagination{
			    height: 40px;
				padding-top: 5px;
				text-align: right;
				padding-right: 10px;
		}
	}
</style>
