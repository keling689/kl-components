const wgx = {
  //一级导航
  first_Nav: {
    //系统名称
    title: '安全项目',
    //logo路径
    logoSrc: import('../assets/images/logo3.png'),
    //导航
    navData: {
      navList: [
        //Navtitle:菜单标题，icon:菜单图标，路径：有三种形式  path，name，url，只可存在一种
        {Navtitle: '应用管理', icon: ' iconfont icon-shouye', path: '/applicationmanagement'},
        {Navtitle: '租户管理', icon: ' iconfont icon-task', name: '/tenantmanagement'},
        {
          Navtitle: '组织架构管理',
          icon: ' iconfont icon-yewuguanli',
          url: 'https://cn.vuejs.org/v2/guide/components-slots.html'
        },
        {Navtitle: '权限管理', icon: ' iconfont icon-shezhi', path: '/Privilegemanagement'},
        {Navtitle: '系统任务', icon: ' iconfont icon-shezhi', path: '/systemtask'},
        {Navtitle: '应用使用组件', icon: ' iconfont icon-shezhi', path: '/applicationcomponents'},
      ],
      //默认路径
      activeChanel: '/organizationalarchitecturemanagement',
    },
  },
  //二级导航
  second_Nav: {
    navList: [
      //type:    类型       firstmenu一级菜单 submenu二级菜单
      //NavName: 菜单名称
      //url:     路径       多种格式,http,/,name
      //icon:    图标
      //children:二级菜单    只有type类型为submenu可用
      {
        type: 'firstmenu',
        NavName: '应用租户管理',
        url: 'https://cn.vuejs.org/v2/guide/components-slots.html',
        icon: 'el-icon-arrow-right'
      },
      {
        type: 'firstmenu',
        NavName: '应用角色管理',
        url: 'applicationmanagement',
        icon: 'el-icon-cloudy-and-sunny'
      },
      {
        type: 'submenu',
        NavName: '基础信息管理',
        icon: 'el-icon-check',
        children: [
          {
            NavName: '应用角色管理',
            url: '/applicationmanagement/ApplicationRoleManagement',
            icon: 'el-icon-cloudy-and-sunny'
          },
          {NavName: '应用租户管理', url: '/applicationmanagement/ApplicationTenantManagement', icon: 'el-icon-arrow-right'},
        ]
      },
      {
        type: 'submenu',
        NavName: '应用操作管理',
        icon: 'el-icon-pie-chart',
        children: [
          {
            NavName: '应用角色管理',
            url: '/ApplicationRoleManagement/ApplicationRoleManagement',
            icon: 'el-icon-cloudy-and-sunny'
          },
          {NavName: '应用租户管理', url: '/applicationmanagement', icon: 'el-icon-arrow-right'},
        ]
      },
    ],
  },
  //组织树
  company_tree: {
    /*
    *   tree:树
    *   defaultProps:树的label和children 字段分别是对应的什么字段
    *   inputProp:输入框的一些选项,
    *   sendTreeProp:返回的字段
    *   rootName:根节点  点击根节点默认返回 name:'root'
    *
    * */
    tree: [],
    defaultProps:{
      label:'',
      children:''
    },
    inputProp:{
      showSearch:false,
      Inp_placeholder:'不要输入'
    },
    sendTreeProp:['name','code','parentCode','level','children'],
    rootName:'总部'
  },

  //组织弹出框
  MemberData:{
    // selectedProp: member(人员) ,company(部门), memberOrcompany(部门和人员)
    selectedProp:'company',
    isRaido:false,
  }

}
const lzl = {
  // c:'1',
  // d:'2'
  // infoCueData
  infoCueData:{                     //二次信息弹出框相关
    data :{                              //弹出框相关数据
      dialogProp: {                            //模态框属性
        title: '详情',                             //顶部标题
        width: '30%',                              //框宽
        content:'请确认信息',                       //提示信息
      },
      buttonData:{                  //按钮组相关
        buttonList:[                     //按钮组相关数据
          {
            buttonType:'primary',               //按钮背景色
            funArgument:'confirm',              //按钮触发事件参数
            label:'确定',                        //按钮文字内容
          },
          {
            buttonType:'',
            funArgument:'cancel',
            label:'取消'
          },
        ]
      },
    },
    showInfoCue:true,                  //显示弹出框
  },
  infoEditData:{                    //信息编辑表单相关
    data:{                               //data
      formProp: {                              //表单属性
        label_width: '100px',                        //表单label文字占宽
        label_position: 'right',                     //表单label文字位置
      },
      dialogProp: {                  //模态框属性
        title: '详情',                   //标题
        width: '40%',                    //模态框占宽
        top:'20vh',                      //模态框距离顶部高度
      },
      formData:[                              //表单详细参数
        {
          span:14,                              //一行所占宽度
          offset:5,                             //距离左侧宽度
          formList:[                             //表单
            {label:'危险源编号',key:'code',type:'input',size:''},
          ]
        },
        {
          span:14,
          offset:5,
          formList:[
            {label:'危险源名称',key:'name',type:'inputPerson',size:'',},
          ]
        },
        {
          span:7,
          formList:[
            {label:'业态',key:'businessTypeName',type:'select',offset:5,
              selectOption:[
                {label:'自来水',value:111111},
                {label:'酒精',value:222222},
                {label:'油',value:333333},
                {label:'其他液体',value:44444}
              ]
            },
            {label:'类型',key:'hazardTypeName',type:'select',
              selectOption:[
                {label:'机械伤害',value:111111},
                {label:'触电',value:222222},
                {label:'天灾',value:333333},
                {label:'摔伤',value:44444}
              ]
            },
          ]
        },
        {
          span:14,
          offset:5,
          formList:[
            {label:'状态',key:'state',type:'radio',radio:[{label:'否',value:0,border:true},{label:'是',value:1,border:false}]},
          ]
        },
        {
          span:14,
          offset:5,
          formList:[
            {label:'创建人',key:'addUser',type:'checkbox',checkbox:[{label:'否',value:0,border:true},{label:'是',value:1,border:true},{label:'未知',value:2}]},
          ]
        },
        {
          span:14,
          offset:5,
          formList:[
            {label:'部门',key:'department',type:'inputDepartment'},
          ]
        }
      ],
      buttonList:[       //按钮组相关数据
        {
          buttonType:'primary',
          funArgument:'confirm',
          label:'确定',
        },
        {
          buttonType:'',
          funArgument:'cancel',
          label:'取消'
        },
        {
          buttonType:'',
          funArgument:'reset',
          label:'重置',
        }
      ]
    },
    showInfoEdit:true,
  },
  infoPresentationData:{            //信息展示表单相关
    data:{                               //data
      formProp: {                              //表单属性
        label_width: '100px',                        //表单label文字占宽
        label_position: 'right',                     //表单label文字位置
      },
      dialogProp: {                  //模态框属性
        title: '详情',                   //标题
        width: '40%',                    //模态框占宽
        top:'20vh',                      //模态框距离顶部高度
      },
      formData:[                              //表单详细参数
        {
          span:14,                              //一行所占宽度
          offset:5,                             //距离左侧宽度
          formList:[                             //表单
            {label:'危险源编号',key:'code',type:'input',size:''},
          ]
        },
        {
          span:14,
          offset:5,
          formList:[
            {label:'危险源名称',key:'name',type:'inputPerson',size:'',},
          ]
        },
        {
          span:7,
          formList:[
            {label:'业态',key:'businessTypeName',type:'select',offset:5,
              selectOption:[
                {label:'自来水',value:111111},
                {label:'酒精',value:222222},
                {label:'油',value:333333},
                {label:'其他液体',value:44444}
              ]
            },
            {label:'类型',key:'hazardTypeName',type:'select',
              selectOption:[
                {label:'机械伤害',value:111111},
                {label:'触电',value:222222},
                {label:'天灾',value:333333},
                {label:'摔伤',value:44444}
              ]
            },
          ]
        },
        {
          span:14,
          offset:5,
          formList:[
            {label:'状态',key:'state',type:'radio',radio:[{label:'否',value:0,border:true},{label:'是',value:1,border:false}]},
          ]
        },
        {
          span:14,
          offset:5,
          formList:[
            {label:'创建人',key:'addUser',type:'checkbox',checkbox:[{label:'否',value:0,border:true},{label:'是',value:1,border:true},{label:'未知',value:2}]},
          ]
        },
        {
          span:14,
          offset:5,
          formList:[
            {label:'部门',key:'department',type:'inputDepartment'},
          ]
        }
      ],
      buttonList:[       //按钮组相关数据
        {
          buttonType:'primary',
          funArgument:'confirm',
          label:'确定',
        },
        {
          buttonType:'',
          funArgument:'cancel',
          label:'取消'
        },
        {
          buttonType:'',
          funArgument:'reset',
          label:'重置',
        }
      ]
    },
    showInfoPresentationData:true,
  }
}

export {wgx,lzl}








