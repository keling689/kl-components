<template>
  <el-dialog id="dialogModal"  
             v-if="visible" :title="dialogProp.title" 
             :visible.sync="visible" 
             :width="dialogProp.width" :top="dialogProp.top">
    <el-form class="form"
              ref="form" 
             :model="formData"  
             :labelWidth="formProp.label_width?formProp.label_width:'9rem'"
             :label-position="formProp.label_position?formProp.label_position:'right'" 
             style="'margin-bottom:6rem;margin-top:2rem'">
        <el-row :gutter="item.gutter?item.gutter:null" v-for="(item, index) in formList" :key="index">
            <el-col :span="item.span?item.span:item1.span?item1.span:null" 
                    :offset="item.offset?item.offset:item1.offset?item1.offset:null"
                    v-for="(item1,index1) in item.formList" 
                    :key="index1"  style="padding-bottom:15px">
                <el-form-item  :label="item1.label+':'" :prop="item1.key">
                    <!--input-->
                    <el-input v-if="item1.type == 'input'" 
                              :size="item1.size"
                              :clearable="item1.clear?item1.clear:true" 
                              v-model="formData[item1.key]"></el-input>
                    <!-- inputPerson(点击跳转人员树) -->

                    <el-input v-if="item1.type == 'inputPerson'"   
                              :size="item1.size"  
                              :clearable="item1.clear?item1.clear:true"   
                              v-model="formData[item1.key]" 
                              @focus="jump('person',item1.key)">
                    </el-input>
                    <!-- inputDepartment(点击跳转部门树) -->
                    <el-input v-if="item1.type == 'inputDepartment'" 
                              :size="item1.size" 
                              :clearable="item1.clear?item1.clear:true" 
                              v-model="formData[item1.key]" @focus="jump('department',item1.key)"></el-input>
                    <!-- inputAll(点击跳转部门人员混合树) -->
                    <el-input v-if="item1.type == 'inputAll'" 
                              :size="item1.size" 
                              :clearable="item1.clear?item1.clear:true" 
                              v-model="formData[item1.key]" @focus="jump('all',item1.key)"></el-input>
                    <!--select-->
                    <el-select v-if="item1.type == 'select'" 
                               :size="item1.size"
                               :clearable="item1.clear?item1.clear:true"
                               :placeholder="item1.placeholder?item1.placeholder:null"
                               v-model="formData[item1.key]">
                        <el-option v-for="(oItem, oIndex) in item1.selectOption" :key="oIndex" :label="oItem.label"
                                   :value="oItem.value"></el-option>
                    </el-select>
                    <!--时间-->
                    <el-date-picker
                        :clearable="item1.clear?item1.clear:true"
                        :size="item1.size"
                        v-if="item.type == 'date'"
                        v-model="formData[item1.key]"
                        type="datetime"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                    <!-- 单选组 -->
                    <el-radio-group v-model="formData[item1.key]" v-if="item1.type == 'radio'"  :size="item1.size" @change="changeRadio">
                        <el-radio v-for="(rItem,rIndex) in item1.radio" :key="rIndex" :border="rItem.border" :label="rItem.value">{{rItem.label}}</el-radio>
                    </el-radio-group>
                    <!-- 复选组 -->
                     <el-checkbox-group v-model="formData[item1.key]" v-if="item1.type == 'checkbox'" :size="item1.size" >
                        <el-checkbox v-for="(cItem,cIndex) in item1.checkbox" :key="cIndex" :label="cItem.value" :border="cItem.border" @change="changeCheckbox">{{cItem.label}}</el-checkbox>
                    </el-checkbox-group>
                    <!--文本域-->
                    <el-input v-if="item1.type=='textarea'" type="textarea" :autosize="{ minRows: 4, maxRows: 8}"  v-model="formData[item1.key]"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <!-- <el-button type="primary" @click="confirm">确 定</el-button>
        <el-button  @click="cancelreset">取 消</el-button> -->
        <el-button :type="item.buttonType" @click="operation(item.funArgument)" v-for="(item,index) of buttonList" :key="index">{{item.label}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: 'userDetail',
    props: ['infoEditData', 'showInfoEdit','infoEditFormData'],
    data() {
      return {
        visible: false,//是否显示模态框
        //form属性
        formProp: {},
        //模态框属性
        dialogProp: {},
        //form——item——list
        formList: [],
        //请求回来的数据
        formData: {},
        radio:'',
        checkList:[],
        buttonList:[],
      }
    },
    mounted() {


    },
    watch: {
      infoEditData(val) {//监听dialogFormData数据变化
        if (val) {
          console.log(val)
          this.init()
        }
      },
      showInfoEdit(val) {//监听dialogFormVisible数据变化(是否显示模态框)
        console.log(val)
        this.visible = val;
      },

      infoEditFormData(val){
        console.log(val)
        if(val.hasOwnProperty('key')){
            this.$set(this.formData,val.key,val.data.map(item=>item.name).toString())
           console.log(this.formData.name)
           
        }
      },
      // formData(val){
      //     if(val){
      //       console.log(val)
      //     }
      // }
      formData:{
        handler(){
            console.log(this.formData)
        },
        immediate: true,
        deep:true
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {//初始化所有数据
        var detail = this.infoEditData
        if (detail) {
          this.$set(this, 'visible', this.showInfoEdit)   //模态框显示隐藏
          this.$set(this, 'formProp', detail.formProp)      //form表单属性
          this.$set(this, 'dialogProp', detail.dialogProp)   //模态框属性
          this.$set(this,'buttonList',detail.buttonList)      //按钮组属性
          this.$set(this, 'formList', detail.formData)         //form表单数据

          this.formList.forEach((item, index) => {    //遍历formList,初始化属性(部分未传属性做初始化处理,如：item.span = null)
              this.$set(this.formList, index, item);
              item.span ? item.span = item.span : item.span = null;
              item.offset ? item.offset = item.offset : item.offset = null;
              //  formData赋值
                item.formList.forEach((item1, index1) => {    //初始化span,offset属性
                    this.$set(this.formData,item1.key,null)
                    if(item1.type == 'checkbox'){         //如果有复选框，需将属性值设置成数组以及初始化border属性
                      this.$set(this.formData,item1.key,[]) 
                      item1.checkbox.forEach(item2 => {  
                        item2.border ? item2.border = item2.border : item2.border = null; 
                      })
                    }
                    if(item1.type == 'radio'){    //如果有单选框，初始化border属性
                        item1.radio.forEach(item2 => {
                            item2.border ? item2.border = item2.border : item2.border = null;
                        })
                    }
                    item1.span ? item1.span = item1.span : item1.span = null;
                    item1.offset ? item1.offset = item1.offset : item1.offset = null;
                    item1.size ? item1.size = item1.size : item1.size = null;
                    
                })
            })
         
          this.buttonList.forEach(item => {
                item.hasOwnProperty('buttonType') ? item.buttonType = item.buttonType : item.buttonType = '';
                item.hasOwnProperty('funArgument') ? item.funArgument = item.funArgument : item.funArgument = '';
            }); 
          
        }
      },
      operation(agm){
          if(agm == 'submit'){                 //提交操作
              console.log("提交")
              this.$refs['form'].validate((valid) => {
                if (valid) {
                    console.log(valid)
                    this.$emit('operation',this.formData)
                  }else{
                    return false
                  }
              }) 
              this.visible = false;
          }else if(agm == 'reset'){           //重置操作
            console.log("重置")
            this.init();
          }else{                              //其他操作,传agm给父组件,自行处理
            this.$emit('operationEdit',{'agm':agm})
            this.visible = false;
          }
      },
      changeRadio(data){  //单选操作
        console.log(data)
      },
      changeCheckbox(data){   //复选操作
        console.log(data)
      },
      jump(val,key){     //点击对应类型的input框的跳转操作
            this.$emit('operationEdit',{'val':val,'key':key})
      },
    }
  }
</script>
