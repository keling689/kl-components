<template>
  <div id="second_nav">
      <el-menu :default-active="$route.path" @select="handleSelect" unique-opened>
        <div  v-for=" (nav,index)  in  navList">
          <el-menu-item v-if="nav.type == 'firstmenu'" :key='index' :index="nav.url"><i :class="nav.icon"></i>{{nav.NavName}}</el-menu-item>
          <el-submenu  v-if="nav.type == 'submenu'"  :index="nav.icon" >
            <template slot="title">{{nav.NavName}}</template>
            <el-menu-item :key='index' v-for=" (item,index) in nav.children" :index="item.url"><i :class="item.icon"></i>{{item.NavName}}</el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
  </div>
</template>

<script>
  export default {
    props: ['secondNav'],
    name: "second_Nav",
    data() {
      return {
        navList: new Array(),
      }
    },
    watch: {
      secondNav: {
        handler(val) {
          if (val) {
            this.init()
          }
        },
        deep: true
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        var data = this.secondNav;
        this.$set(this, 'navList', data.navList)
      },
      handleSelect(data){
        /*
         * 以http开头的需要跳转
         *
         *router 以name跳转
         *router 以path跳转
         *
         * */
        if(/^http/g.test(data)){

          // window.open(data,'_self')

        }else if(/^[a-zA-Z]/g.test(data)){

          // this.$router.push({name: data})

        }else if(/^\//g.test(data)){

          // this.$router.push({path: data})

        }
      },
    }
  }
</script>

<style scoped>
  #second_nav {
    width: 100%;
    height: 100%;
    background: #fff;
  }
  .el-menu{
    border: none;
  }
  .el-menu-item.is-active{
    color: #fff;
    background: rgb(50,142,209);
  }
</style>
