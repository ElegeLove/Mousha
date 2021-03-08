<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  created(){    
      // window.addEventListener("message", this.receiveMessage, false);
  },
  methods:{
    // receiveMessage(e){
    //   console.log(e)
    // }
  }
}
</script>
<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;
        &.router-link-exact-active {
            color: #42b983;
        }
    }
}

// 输入框
.el-input__inner {
    background: #f5f5f5;
    border: 1px solid #eeeeee;
    border-radius: 4px;
}
.el-textarea__inner{
  width: 100%;
    height: 190px;
    background: rgba(245, 245, 245, 1) !important;
    /* border: 1px solid rgba(238, 238, 238, 1); */
    border-radius: 4px !important;
    resize: none !important;
    border: none !important;
    outline-style: none !important;
    line-height: 30px !important;
    padding: 20px !important;
    box-sizing: border-box !important;
    font-size: 16px !important;
    font-family: 'Microsoft YaHei' !important;
    font-weight: 400 !important;
    color: rgba(51, 51, 51, 1) !important;
}
.el-date-table td.current:not(.disabled) span{
  text-align: center;
}
.el-button--primary span{
  color: #ffffff !important;
}
.el-form-item__content{
  margin-bottom: 20px;
}
.el-dialog__header{
  text-align: center;
}
.ql-editor {
    font-size: 16px;
}
</style>
