<template>
	<div class="out-div">
		<div class="kl-table">
			<div class="table-header">
				<div class="table-search">	
					<div class="query-item" v-for="item in showQuery()">
						<span>{{item.label}}：</span>
						<div class="query-box">
							<el-input size="mini"></el-input>
						</div>
					</div>
					<el-button type="warning" icon="el-icon-search" size="mini"></el-button>
					<div class="fold-open" v-if="searchArr.length>3"  @click="showMore">
						<i class="el-icon-arrow-up" v-if="showLength!=3"></i>
						<i class="el-icon-arrow-down" v-if="showLength==3"></i>
					</div>
				</div>
				<div class="operate-group" :class="{'group-inline':showLength==3}">
					 <el-button :type="item.color" v-for="item in operateArr" size="mini">{{item.name}}</el-button>
				</div>	
			</div>
			
			<div class="table-body">
				<el-table
					size="mini"
					:data="tableData"
					border
					height="100%"
					style="width: 100%">
					<el-table-column
						 fixed
                          type="selection"
                          width="55">
                        </el-table-column>					
					<el-table-column 
					  prop="date"
					  label="日期"
					  width="150">
					</el-table-column>
					<el-table-column
					  prop="name"
					  label="姓名"
					  width="120">
					</el-table-column>
					<el-table-column
					  prop="province"
					  label="省份"
					  width="120">
					</el-table-column>
					<el-table-column
					  prop="city"
					  label="市区"
					  width="120">
					</el-table-column>
					<el-table-column
					  prop="address"
					  label="地址"
					  >
					</el-table-column>
					<el-table-column
					  prop="zip"
					  label="邮编"
					  width="120">
					</el-table-column>
					<el-table-column
					  fixed="right"
					  label="操作"
					  width="100">
					  <template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
						<el-button type="text" size="small">编辑</el-button>
					  </template>
					</el-table-column>
				  </el-table>
			</div>
			<div class="table-pagination">
				 <el-pagination
				   @size-change="handleSizeChange"
				   @current-change="handleCurrentChange"
				   :current-page="currentPage4"
				   :page-sizes="[100, 200, 300, 400]"
				   :page-size="100"
				   layout="total, sizes, prev, pager, next, jumper"
				   :total="400">
				 </el-pagination>
			</div>
		</div>
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
				currentPage4: 4,
				showLength:3,
				searchArr:[
					{label:'上传日期',type:'el-date-picker'},
					{label:'最不利压力点',type:'el-input'},
					{label:'周期类型',type:'el-select',option:[
						{name:'select1',value:0},
						{name:'select2',value:1},
						{name:'select3',value:2},
					]},
					{label:'方案名称',type:'el-input'},
					{label:'上传日期',type:'el-date-picker'},
					{label:'最不利压力点',type:'el-input'},
					{label:'周期类型',type:'el-select',option:[
						{name:'select1',value:0},
						{name:'select2',value:1},
						{name:'select3',value:2},
					]},
					{label:'方案名称',type:'el-input'},
					],
					formData:{
						time:'',
						press:'',
						cycle:'',
						name:''
					},
					operateArr:[
						{name:'导出',color:'primary',url:''},
						{name:'打印',color:'warning',url:''},
						{name:'新建',color:'success',url:''}
					],
					 tableData: [{
						  date: '2016-05-03',
						  name: '王小虎',
						  province: '上海',
						  city: '普陀区',
						  address: '上海市普陀区金沙江路 1518 弄',
						  zip: 200333
						}, {
						  date: '2016-05-02',
						  name: '王小虎',
						  province: '上海',
						  city: '普陀区',
						  address: '上海市普陀区金沙江路 1518 弄',
						  zip: 200333
						}, {
						  date: '2016-05-04',
						  name: '王小虎',
						  province: '上海',
						  city: '普陀区',
						  address: '上海市普陀区金沙江路 1518 弄',
						  zip: 200333
						}, {
						  date: '2016-05-01',
						  name: '王小虎',
						  province: '上海',
						  city: '普陀区',
						  address: '上海市普陀区金沙江路 1518 弄',
						  zip: 200333
						}]
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
			showQuery(){
				return this.searchArr.slice(0,this.showLength)
			},
			showMore(){
				// alert(1)
				if(this.showLength == 3){
					this.showLength = this.searchArr.length
				}else{
					this.showLength = 3
				}
			},
			 handleClick(row) {
				console.log(row);
			  },
			     handleSizeChange(val) {
					console.log(`每页 ${val} 条`);
				  },
				  handleCurrentChange(val) {
					console.log(`当前页: ${val}`);
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
					span{
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
			height: 500px;
		}
		.table-pagination{
			    height: 40px;
				padding-top: 5px;
				text-align: right;
				padding-right: 10px;
		}
	}
</style>
