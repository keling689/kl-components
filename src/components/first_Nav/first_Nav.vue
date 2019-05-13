<template>
  <div id="firstNav">
    <div class="top">
      <div class="logo fl"><img :src="logoSrc" alt=""></div>
      <div class="logoLine fl">|</div>
      <div class="title fl vintage">{{title}}</div>
      <div class="setting fr">
        <slot></slot>
      </div>
    </div>
    <div id="nav">
      <div class="nav ">
        <ul class="navList">
          <li v-for="(item,index) in navData.navList" :key="index" @click="channelJump(item)" :class="{active: item.path == navData.activeChanel || item.name == navData.activeChanel || item.url == navData.activeChanel}">
            <i v-if="item.icon" :class="item.icon" style="font-size: 16px"></i>
            <span>{{item.Navtitle}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "first_Nav",
    props: ['firstNav'],
    data() {
      return {
        //系统名称
        title: null,
        //logo路径
        logoSrc: '',
        //导航
        navData: null
      }
    },
    created() {
      this.init()
    },
    watch:{
      firstNav:{
        handler(val){
          if(val){
            this.init()
          }
        },
        deep:true
      },
      '$route.path':{
        handler(val){
          let strurl = val.match(/^(\/[\w]+)\/?/)[1];
          this.$set(this.navData,'activeChanel',strurl)
        },
        deep:true
      },
    },
    methods: {
      //初始化
      init() {
        var data = this.firstNav
        //系统名称
        this.$set(this, 'title', data.title ?data.title : '')


        //logo
        if(data.hasOwnProperty('logoSrc')){
          data.logoSrc.then(res=>{
            this.$set(this, 'logoSrc',res)
          })
        }else {
          this.$set(this, 'logoSrc','https://cn.vuejs.org/images/logo.png')
        }


        //默认
        var DefaultnNavList = {
          navList: [
            {Navtitle: '显示不正确', icon: '', path: '/'},
          ],
          activeChanel: '/',
        }
        //菜单list
        this.$set(this, 'navData', data.navData ? data.navData : DefaultnNavList)
      },
      //导航点击
      channelJump(data){
        /*
        * 以http开头的需要跳转
        *
        *router 以name跳转的params传参
        *router 以path跳转的query传参 (vue-router 定义)
        *
        *
        *
        *
        * */
        if(data.hasOwnProperty('url')){

          window.open(data.url,'_self')
          this.$set(this.navData,'activeChanel',data.url)

        }else if(data.hasOwnProperty('name')){

          if(data.hasOwnProperty('params')){

            // this.$router.push({name: data.name, params:data.params})

          }else {

            // this.$router.push({name: data.name})

          }
          this.$set(this.navData,'activeChanel',data.name)

        }else if(data.hasOwnProperty('path')){

          if(data.hasOwnProperty('query')) {

            // this.$router.push({path: data.path, query:data.query})

          }else {

            // this.$router.push({path: data.path})

          }
          this.$set(this.navData,'activeChanel',data.path)
        }

      },
    },
  }
</script>

<style scoped>
  #firstNav {
    width: 100%;
    height: 68px;
    color: #fff;

  }
  #firstNav .top{
    width: 100%;
    height: 38px;
    padding: 0 20px;
    background: rgb(50,142,209);
    color: #fff;
  }

  #firstNav #nav{
    height: 30px;
    background: #fff;
  }


  #firstNav .logo {
    width: auto;
    height: 1.6em;
    margin-top: 0.75em;
    margin-right: 20px;
  }

  #firstNav .logo img {
    height: 100%;
  }

  #firstNav .title {
    line-height: 38px;
    font-size: 1.4em;
  }

  #firstNav .title.vintage {

  }

  #firstNav .logoLine {
    padding-top: 0.4rem;
    margin-right: 20px;
    font-size: 1.4rem;
    color: rgba(255, 255, 255, .5);
  }

  #firstNav .nav {
    padding: 0 40px;

  }

  #firstNav .nav .navList {
    width: 100%;
    height:30px;
  }

  #firstNav  .nav .navList > li {
    position: relative;
    float: left;
    height: 100%;
    line-height: 30px;
    text-align: center;
    padding: 0 20px;
    cursor: pointer;
    color: rgb(50,142,209);
  }

  #firstNav .nav .navList li i {
    position: relative;
    font-size: 1em;
    vertical-align: middle;
    z-index: 999;
  }

  #firstNav .nav .navList li span {
    position: relative;
    z-index: 999;
  }

  #firstNav .nav .navList > li.active {
    background: #49a2ff;
    color: #fff;
  }
  #firstNav .setting{
    height: 38px;
  }
  .fl {
    float: left;
  }

  .fr {
    float: right;
  }
</style>
