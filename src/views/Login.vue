<template>
  <div class="mainlog" @keyup.enter="logname">
    <form class="logform" ref="log">
      <input type="text" v-model="username" ref="user" class="psty">
      <span class="iconfont icon-tubiao211" style="margin-top: 85px;"></span>
      <input type="password" v-model="password" ref="pass" class="psty1">
      <span class="iconfont icon-mima" style="margin-top: 145px;"></span>
      <input type="number" v-model="code" ref="code" class="psty2">
      <span class="iconfont icon-yanzhengma" style="margin-top: 205px;"></span>
      <div class="randonn" @click="changerom">{{randomnum}}</div>
      <input type="checkbox" class="checkbox" v-model='ischeck'>
      <span class="checkbox" style="margin-left: 25px; margin-top: -6px;" @click="changecheck">记住密码</span>
      <button @click="logname" class="logbtn" type="button">登录</button>
      <button @click="reset" class="reset" type="button">重置</button>
      <span class="mes mes1" v-if="isname">请输入用户名</span>
      <span class="mes mes2" v-if="ispass">请输入密码</span>
      <span class="mes mes3" v-if="iscode">验证码错误</span>
    </form>
    <i class='logwrong' v-if="showmess">登陆失败,用户名或密码错误</i>
  </div>
</template>
<script>
  import {Login} from '@/network/login';
  export default {
    name: '',
    data() {
      return {
        username: 'administrators',
        password: '123456',
        code: '',
        randomnum: '',
        ischeck: false,
        isname: false,
        ispass: false,
        iscode:false,
        showmess:false,
      }
    },
    created() {
      this.random()
      // console.log(document.body.clientHeight);
      },
    methods: {
      logname() {
        if (this.username == '' || this.password == '' || this.code !=this.randomnum) {
          if (this.username == '') {
            this.isname = true
            this.$refs.user.focus()
          }else if (this.password == '') {
            this.ispass = true
            this.$refs.pass.focus()
          }else if(this.code !=this.randomnum){
            this.iscode = true
            this.$refs.code.focus()
          }
          this.random()
        } else {
            Login(this.username,this.password,this.ischeck).then(res=>{
              // console.log(res);
              if(res.code == 200){
                this.$router.push('/home')
                window.sessionStorage.setItem('username',res.data.username)
              }else{
                 this.showmess = true
                 this.random()
                setTimeout(() => {
                this.showmess = false
              }, 3000);
              }
            })
        }
      },
      reset() {
        this.$refs.log.reset();
        this.username = ''
        this.password = ''
        this.code = ''
      },
      random() {
        for (let i = 0; i < 4; i++) {
          this.randomnum = parseInt(10000 * (Math.random() == 0 ? 0.7658 : Math.random()));
        }
      },
      changerom() {
        this.random()
      },
      changecheck() {
        this.ischeck = !this.ischeck
      }
    },
  }
</script>
<style scoped>
.mainlog{
    height: 100vh;
    min-height: 500px;
    background-color: #aab9be;
}
  .logform {
    position: relative;
    display: flex;
    flex-direction: column;
    top: 200px;
    left: 500px;
    width: 535px;
    height: 350px;
    border: 1px solid;
    background: #fff;
  }
  .psty {
    position: absolute;
    width: 400px;
    height: 35px;
    top: 75px;
    left: 35px;
  }

  input {
    padding-left: 35px;
  }

  .psty1 {
    position: absolute;
    width: 400px;
    height: 35px;
    top: 135px;
    left: 35px;
  }

  .psty2 {
    position: absolute;
    width: 100px;
    height: 35px;
    top: 195px;
    left: 35px;
  }

  .logbtn {
    position: absolute;
    top: 270px;
    right: 165px;
    width: 80px;
    height: 40px;
    color: #fff;
    border-radius: 5px;
    background: #67c23a;
  }

  .reset {
    position: absolute;
    top: 270px;
    right: 62px;
    width: 80px;
    height: 40px;
    color: #fff;
    border-radius: 5px;
    background: #e6a23c;
  }

  span {
    position: absolute;
    left: 45px;
  }

  .randonn {
    position: absolute;
    height: 39px;
    width: 80px;
    top: 195px;
    left: 220px;
    line-height: 39px;
    text-align: center;
    border: 1px solid;
    color: #fff;
    background: url('../assets/images/code.jpg');
  }

  .checkbox {
    position: absolute;
    top: 280px;
    left: 35px;
    cursor: pointer;
  }

  .message {
    position: absolute;
    left: 150px;
    top: 20px;
  }

  .mes {
    color: rgb(255, 0, 13);
  }

  .mes1 {
    position: absolute;
    top: 120px;
    left: 35px;
    font-size: 10px;
  }

  .mes2 {
    position: absolute;
    top: 180px;
    left: 35px;
    font-size: 10px;
  }
  .mes3{
    position: absolute;
    top: 240px;
    left: 35px;
    font-size: 10px;
  }
  button:hover{
    color: red;
}
  i {
    position: absolute;
    top: 10px;
    left: 500px;
    width: 500px;
    height: 30px;
    line-height: 30px;
    border-radius: 6px;
    text-align: center;
    z-index: 99;
  }
  .logwrong {
    background: #fef0f0;
    color: #f56c6c;
  }

  .logwrong::before {
    position: absolute;
    left: 120px;
    font-family: iconfont;
    content: '\e8c5';
  }
</style>