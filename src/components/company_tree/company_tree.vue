<template>
  <div id="tree" v-loading="loading">
    <div class="search" v-if="inputProp.inputshow">
      <el-input v-model="filterText" :placeholder="inputProp.Inp_placeholder" suffix-icon="el-icon-search"></el-input>
    </div>

    <el-tree
      class="tree"
      :highlight-current="true"
      :data="treedata"
      :props="defaultProps"
      :node-key="node_key"
      accordion
      @node-click="handleNodeClick"
      ref="tree2"
      icon-class="el-icon-arrow-right"
      :style="{height:inputProp.inputshow?'calc(100% - 80px)':'100%'}"
      :filter-node-method="filterNode"
    >

    </el-tree>
  </div>
</template>

<script>
  export default {
    name: "company_tree",
    props: ['treeData'],
    data() {
      return {
        treedata: [],
        defaultProps: {},
        sendTreeProp: [],
        filterText: '',
        loading: true,
        inputProp: {
          Inp_placeholder: '',
          inputshow: null,
        },
        node_key: ''
      }
    },
    watch: {
      treeData: {
        handler(val) {
          if (val) {
            this.init()
          }
        },
        deep: true
      },
      filterText(val) {
        this.$refs.tree2.filter(val)
      },
    },
    created() {
      this.init()
    },
    mounted() {
      var inp = document.querySelectorAll('.el-input__inner')[0]
      var Node = document.querySelectorAll(' .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content')[0]
      if (inp) {
        inp.style.borderRadius = '20px'
      }
      if (Node) {
        Node.style.backgroundColor = '#328ed1'
        Node.style.color = '#fff'
      }
    },
    methods: {
      //初始化
      init() {
        let data = this.treeData
        if (data) {
          //是否有树
          if (data.tree) {
            if (data.tree.constructor == Object) {
              let tree = Object.keys(data.tree)
              if (tree.length !== 0) {
                let treedata = this.gettree([data.tree])
                if(! treedata[0].hasOwnProperty('name')){
                  treedata[0].name = data.rootName ? data.rootName : '根节点'
                }

                this.$set(this, 'treedata', treedata)
              } else {
                this.$set(this, 'treedata', [])
              }
              this.$set(this, 'loading', false)
            } else if (data.tree.constructor == Array) {
              if (data.tree.length !== 0) {
                let treedata = this.gettree(data.tree)
                if(! treedata[0].hasOwnProperty('name')){
                  treedata[0].name = data.rootName ? data.rootName : '根节点'
                }
                this.$set(this, 'treedata', treedata)

              } else {
                this.$set(this, 'treedata', [])
              }
              this.$set(this, 'loading', false)
            }
          }
          //是否有树的label选项
          let defaultProps = Object.keys(data.defaultProps)
          if (defaultProps.length !== 0) {
            this.$set(this, 'defaultProps', data.defaultProps)
          } else {
            this.$set(this, 'defaultProps', {children: 'children', label: 'name'})

          }
          //是否有返回值的选项
          if (data.sendTreeProp.length !== 0) {
            this.$set(this, 'sendTreeProp', data.sendTreeProp)
          } else {
            this.$set(this, 'sendTreeProp', ['name', 'code', 'parentCode'])
          }
          //input的一些选择
          let inputProp = Object.keys(data.inputProp)
          if (inputProp.length !== 0) {
            this.$set(this.inputProp, 'inputshow', data.inputProp.showSearch !== '' ? data.inputProp.showSearch : true)
            this.$set(this.inputProp, 'Inp_placeholder', data.inputProp.Inp_placeholder !== '' ? data.inputProp.Inp_placeholder : '请输入部门')
          } else {
            this.$set(this.inputProp, 'inputshow', true)
            this.$set(this.inputProp, 'Inp_placeholder', '请输入')
          }
          if (data.node_key) {
            this.$set(this, 'node_key', data.node_key)
          }


        }
      },
      // 点击node节点事件
      handleNodeClick(treeNode) {
        if (treeNode.parentMask == 0) {
          this.$emit('sendTreeData', {name: 'root'})
        } else {
          let data = {};
          this.sendTreeProp.map(item => {
            if (treeNode[item] !== null) {
              data[item] = treeNode[item]
            } else {
              data[item] = '暂无'
            }
          })
          this.$emit('sendTreeData', data)
        }

      },
      //过滤
      filterNode(value, data) {
        if (!value) return true
        return data.name.indexOf(value) !== -1
      },
      //tree处理
      gettree(data) {
        var parentMask = new Array();
        var root = new Array();

        root.push(data[0]);
        parentMask.push(data[0]);
        data.forEach(function (item, index) {
          if (index == 0) return;
          maskCompare(item);
        });

        function maskCompare(item) {
          if (item.parentMask > parentMask[parentMask.length - 1].parentMask) {//子节点
            if (!parentMask[parentMask.length - 1]._child)
              parentMask[parentMask.length - 1]._child = new Array();
            parentMask[parentMask.length - 1]._child.push(item);
            parentMask.push(item);
          } else if (item.parentMask <= parentMask[parentMask.length - 1].parentMask) {
            parentMask.pop();
            maskCompare(item);
          }
        }


        return root
      }
    }

  }
</script>

<style scoped>
  #tree {
    height: 100%;
    border-right: 1px solid #ccc
  }

  #tree .search {
    padding: 20px 10px;
    height: 80px;
    border-bottom: 1px solid #ccc;
  }

  #tree .tree {
    height: calc(100% - 80px);
    overflow-x: auto;
  }

  .is-leaf {
    color: #959595;
  }
</style>
