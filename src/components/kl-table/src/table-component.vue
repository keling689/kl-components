<template>

		<div class="kl-table">
			<div class="table-header">
				<div class="table-search" v-if="!!searchObj">	
					<div class="query-item" v-for="(item, key, index) in showQuery()"  :key="item.label">
						<span>{{item.label}}：</span>
						<!-- <template :is="item.type" v-model="queryObj.queryData[item.model]" clearable></template> -->
						<div class="query-box">
							<el-input size="mini" v-model="queryObj.queryData[item.model]" clearable v-if="item.type == 'el-input'"></el-input>
							<el-date-picker
							v-if="item.type == 'daterange'"
							  v-model="queryObj.queryData[item.model]"
							  size="mini"
							  type="daterange"
							  clearable
							  value-format="yyyy-MM-dd"
							  start-placeholder="开始日期"
							  end-placeholder="结束日期" style="width: 100%;">
							</el-date-picker>
							<el-date-picker
							 v-if="item.type == 'date'"
							  v-model="queryObj.queryData[item.model]"
							  size="mini"
                               type="date"
							   value-format="yyyy-MM-dd"
							  placeholder="选择日期" style="width: 100%;">
							</el-date-picker>
							<el-select  v-if="item.type == 'el-select'" v-model="queryObj.queryData[item.model]" clearable placeholder="请选择" size="mini" clearable style="display: block;">
								<el-option
								 v-for="item in item.option"
								 :key="item.value"
								 :label="item.name"
								 :value="item.value">
							   </el-option>
							</el-select>
								
						</div>
					</div>
					<!-- 搜索函数暴露出来 -->
					<el-button type="warning" icon="el-icon-search" size="mini" @click="searchObj.searchMethod(queryObj.queryData,that)"></el-button>
					<!-- <el-button type="warning" icon="el-icon-search" size="mini" @click="doSearch"></el-button> -->
					<div class="fold-open" v-if="searchObj.searchArr.length>3"  @click="showMore">
						<i class="el-icon-arrow-up" v-if="showLength!=3"></i>
						<i class="el-icon-arrow-down" v-if="showLength==3"></i>
					</div>
				</div>
				<div v-if="!!operateArr" class="operate-group" :class="{'group-inline':showLength==3}">
					 <el-button  :class="item.icon" :type="item.color || 'primary'" v-for="item in operateArr" :key="item.name" size="mini" @click="item.method(item.name)">{{item.name}}</el-button>
				</div>	
			</div>
			
			<div class="table-body">
				<el-table
				v-if="showTable"
					size="mini"
					:data="tableData"
					border
					 @selection-change="tableObj.tableMethods.selection?tableObj.tableMethods.selection($event):innerSelect($event)"
					:max-height="tableHeight"
					style="width: 100%">
					<el-table-column
							v-if="tableObj.selectionShow || false"
							  fixed="left"
					          type="selection"
					          width="55">
					    </el-table-column>	
						  <el-table-column
						  v-if="tableObj.indexShow || false"
						  label="序号"
						  width="49px"
						  fixed
						  >
						  <template slot-scope="scope">
							{{scope.$index+1}}
						  </template>
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
						  <span v-if="!item.scopeType">{{scope.row[item.prop]}}</span>
						  <span v-html="item.method(scope.row)" v-if="item.scopeType=='formate'"></span>
						<el-button type="text" size="small" v-for="sonitem in item.buttonArr" :key="sonitem.name" v-if="item.scopeType == 'button'&&sonitem.isShow(scope.row)" @click="sonitem.method(scope.row,that)">{{sonitem.name}}</el-button>		
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

</template>

<script>
	// const list = require('../list.json');
	// console.log(list)
	import api from './api.js'
	export default{
		name:'KlTable',
		props:{
			searchObj: Object,
			queryObj: Object,
			operateArr:Array,
			tableObj:Object,
			paginationObj:Object		
		},
		components:{
			
		},
		data(){
			return {
				that:this,
				showTable:false,
				tableHeight:'',
				currentPage4: 4,
				showLength:3,
				showScope:function(row){
					return row
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
			innerSelect(val){
				console.log(val)
			},
			setTableHeight(){
				this.showTable = false
				setTimeout(()=>{
					this.tableHeight = document.querySelector('.kl-table').clientHeight-document.querySelector('.table-header').clientHeight-60
					this.showTable = true
				},0)	
			},
			doSearch(){
				alert(JSON.stringify(this.queryObj.queryData))
				this.getList()
			},
			getList(){
				// console.log(api.fetch())
				api.fetch({
					  method: this.queryObj.ajaxObj.method,
					  apiUrl: this.queryObj.ajaxObj.listUrl,
					  params: this.queryObj.queryData,
					  isJson: this.queryObj.ajaxObj.isJson,
				}).then(res=>{
					this.tableData = res.data
					this.pageArr = res.pageinfo
					this.setTableHeight()	
				}).catch(err=>{
					console.log(err)
				})
				// this.$axios.get(this.queryObj.ajaxObj.listUrl).then(res=>{
				// 	console.log(res)
				// 	this.tableData = res.data.data
				// 	this.pageArr = res.data.pageinfo
				// 	this.setTableHeight()	
				// }).catch(err=>{
				// 	console.log(err)
				// })
			},
			showQuery(){
				return this.searchObj.searchArr.slice(0,this.showLength)
			},
			showMore(){	
				// alert(1)
				if(this.showLength == 3){
					if(!!this.searchObj){
						this.showLength = this.searchObj.searchArr.length
					}else{
						this.showLength = 0
					}
					
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
			min-height: 40px;
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
						height: 16px;
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
