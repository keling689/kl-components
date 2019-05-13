<template>

  <el-dialog :title="dialogtitle"  :visible.sync="dialogVisible" width="45%" :close-on-click-modal="false" :before-close="handleClose">
    <el-row style="height: 300px">
      <!--面包屑 搜索-->
      <el-row style="height:35px;display: flex;align-items: center">
        <el-col :span="18">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col :span="6">

        </el-col>

      </el-row>
      <!--组织树 人员选择 展示人员部门-->
      <el-row style="height: calc(100% - 35px);border: 1px solid #DEDEDE;">
        <el-col :span="8" class="h100" style="border-right:1px solid #DEDEDE;">
          <slot name="tree" :backtreeData="backtreeData"></slot>
        </el-col>
        <el-col :span="8" class="h100" style="border-right:1px solid #ccc;padding: 5px;overflow-y: auto">

          <el-radio-group v-if="isRaido" v-model="selectboxgroup.checkedCities" @change="handleRadioCitiesChange">
            <el-radio v-for=" i in selectboxgroup.List" :key="i.code" :label="i.id">{{i.name}}</el-radio>
          </el-radio-group>

          <el-checkbox-group v-else v-model="selectboxgroup.checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="i in selectboxgroup.List" :label="i.id" :key="i.id">{{i.name}}</el-checkbox>
          </el-checkbox-group>


        </el-col>
        <el-col :span="8" class="h100" style="overflow-y: auto">
          <div style="margin:5px " v-for="(item,index) in Item" :key="index">{{item.name}}
          </div>
        </el-col>
      </el-row>
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="sendTreeData">确 定</el-button>
    </span>
  </el-dialog>

</template>

<script>
  export default {
    props: ['MemberData', 'showMemComp',],
    name: "dialog_company_member",
    components: {},
    data() {
      return {
        dialogVisible: false,
        //单选还是多选
        selectedProp: 'member',
        isRaido: false,
        selectboxgroup: {
          checkedCities: [],
          List: []
        },
        dialogtitle: '',
        Item: [],
        raidoitem:{},
      }
    },
    watch: {
      MemberData: {
        handler(val) {
          if (val) {
            this.init()
          }
        },
        deep: true
      },
      showMemComp(val) {
        if (val) {
          this.dialogVisible = val
        }
      },
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        var data = this.MemberData
        this.$set(this, 'dialogVisible', this.showMemComp)
        this.$set(this, 'selectedProp', data.selectedProp)
        this.$set(this, 'isRaido', data.isRaido)
        this.$set(this, 'dialogtitle', data.selectedProp == 'member' ? '请选择人员' : data.selectedProp == 'company' ? '请选择部门' : data.selectedProp == 'memberOrcompany' ? '请选择部门和人员' : '')
      },

      backtreeData(obj) {
        if (this.selectedProp == 'member') {
          //选人员
          this.selectMember(obj)

        } else if (this.selectedProp == 'company') {
          //选部门
          this.selectCopmany(obj)

        }else if(this.selectedProp == 'memberOrcompany'){
          //部门人员
          this.selectMemberOrcompany(obj)
        }

      },

      //人员
      selectMember(obj) {
        this.$axios({
          url: 'http://192.168.49.140:7000/dep/staff.htm',
          params: {code: obj.code},
          method: 'post'
        }).then(res => {
          this.selectboxgroup.List = new Array()
          let data = res.data;
          data.forEach((item, index) => {
            this.$set(this.selectboxgroup.List, index, item)
          })
        })
      },
      //部门
      selectCopmany(obj) {
        this.selectboxgroup.List = new Array()
        if (obj.children !== '暂无' && obj.hasOwnProperty('children')) {
          obj.children.forEach((item, index) => {
            this.$set(this.selectboxgroup.List, index, item)
          })
        } else {
          this.$set(this.selectboxgroup, 'List', [])
        }

      },
      //部门人员
      selectMemberOrcompany(obj){
        this.selectboxgroup.List = new Array()
        var arr1 =[]
        var arr2 = []
        this.$axios({
          url: 'http://192.168.49.140:7000/dep/staff.htm',
          params: {code: obj.code},
          method: 'post'
        }).then(res => {
          let data = res.data;
          data.forEach((item, index) => {
            this.$set(arr1, index, item)
          })
          if (obj.children !== '暂无' && obj.hasOwnProperty('children')) {
            obj.children.forEach((item, index) => {
              this.$set(arr2, index, item)
            })
          } else {
            arr2=[]
          }
          this.$set(this.selectboxgroup, 'List', [...arr2,...arr1])
        })



      },
      // 多选
      handleCheckedCitiesChange(val) {
        if(this.Item){
          var arr = this.Item
        }
        var bool;
        this.Item=new Array()
        val.forEach((item,index)=>{
          bool=true
          this.selectboxgroup.List.forEach(i=>{
            if(item==i.id){
              this.$set(this.Item,index,i)
              bool = false

              return
            }
          })
          if(bool){
            this.$set(this.Item,index,arr[index])
          }
        })
      },
      //单选
      handleRadioCitiesChange(val) {
        this.selectboxgroup.List.forEach(j => {
          if (val == j.id) {
            this.Item = [j]
            this.raidoitem = j
          }
        })
      },
      //返回值
      sendTreeData() {
        var data ;
        if(this.isRaido){
           data = [this.raidoitem]
        }else {
           data = this.Item
        }
        this.$emit('backMemberCompany', data)
        this.reset()
      },
      handleClose(deno) {
        this.reset()
        deno()
      },
      cancel() {
        this.reset()
      },
      reset() {
        var selectboxgroup = {
          checkedCities: [],
          List: []
        }
        // this.Item = []
        this.$set(this, 'dialogVisible', false)
        // this.$set(this, 'selectboxgroup', selectboxgroup)
        this.$emit('cancel')

      }
    }

  }
</script>

<style scoped>
  .el-dialog__body {
    padding: 10px;
  }

  .el-breadcrumb {
    display: flex;
    align-items: center;
  }

  .el-checkbox {
    width: calc(100% - 30px);
    margin-bottom: 10px;
  }

  .el-radio {
    width: calc(100% - 30px);
    margin-bottom: 10px;
  }

  .h100 {
    height: 100%;
  }
</style>
