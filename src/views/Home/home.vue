<template>
  <div class="homeview">
    <div class="mainhome">
      <div class="gmu"></div>
      <div class="motto"></div>
      <button @click="addaccount" class="addaccount">添加账号</button>
      <button @click="changepass" class="changepass">修改密码</button>
      <button @click="loginout" class="logout">退出登录</button>
    </div>
    <!-- <div v-if="true"> -->
    <div class="select select1" @mouseover='showcollege' @mouseleave='unshowcollege'><span
        style="margin-left: 30px;"></span>{{collegevalue}}
      <span class="iconfont  icon-icon1" v-if="!showcollegeicon" style="float: right; margin-right: 20px;"></span>
      <span class="iconfont  icon-arrow-down" v-if="showcollegeicon" style="float: right; margin-right: 20px;"></span>
      <span class="iconfont  icon-cha" id='clear' @click="clearall" v-if="showcollegeicon"></span>
      <div class="classp" v-show="isshowcollege">
        <p class="college" v-for="(college,index) in collegearr" :key="index"
          @click="getcollege(college.message,college.data)">
          {{college.message}}</p>
      </div>
    </div>
    <div class="select select2" @mouseover='showclasses' @mouseleave='unshowclasses'><span
        style="margin-left: 30px;"></span>{{classvalue}}
      <span class="iconfont  icon-icon1" v-if="!showclassicon" style="float: right; margin-right: 20px;"></span>
      <span class="iconfont  icon-arrow-down" v-if="showclassicon" style="float: right; margin-right: 20px;"></span>
      <span class="iconfont  icon-cha" id='clear' @click="clearclass" v-if="showclassicon"></span>
      <div class="classp" v-show="isshowclasses">
        <p v-for="(classna,index) in classes" :key="index" @click="getclasses(classna)">{{classna}}</p>
      </div>
    </div>
    <div class="select select3" @mouseover='showposition' @mouseleave='unshowposition'><span
        style="margin-left: 30px;"></span>{{positionvalue}}
      <span class="iconfont  icon-icon1" v-if="!showpositionicon" style="float: right; margin-right: 20px;"></span>
      <span class="iconfont  icon-arrow-down" v-if="showpositionicon" style="float: right; margin-right: 20px;"></span>
      <span class="iconfont  icon-cha" id='clear' @click="clearposition" v-if="showpositionicon"></span>
      <div class="classp" v-show="isshowposition">
        <p v-for="(position,index) in positionarr" :key="index" @click="getposition(position)">
          {{(confirmposition == 'teacher')? position.message: position}}</p>
      </div>
    </div>
    <account-table :accenttable='accounttable' :isshownull='isshownull' :confirmposition='confirmposition'
      :collegearr='collegearr' :positionarr='positionarr' ref="child">
    </account-table>
    <!-- <button class="cadres" v-if="switchclass" @click="tocadres">查寝干部</button> -->
    <button class="importbtn" @click="importaccount">导入账号</button>
    <i :class='classname' v-if="showmess">{{messagetext}}</i>
    <div class="changepassbox" v-if="showchangebox">
      <!--  -->
      <div class="inoubox">
        <span>请输入旧密码:</span> <input type="password" ref="oldpassword" v-model="oldpassword"> <br>
        <span v-if="isshowold" style="position: absolute;left:134px; font-size:10px;color:red">请输入旧密码 :</span>
        <span>请输入新密码:</span> <input type="password" ref="newpassword" v-model="newpassword"> <br>
        <span v-if="isshownew" style="position: absolute;left:134px; font-size:10px;color:red">请输入旧密码 :</span>
        <span>请确认新密码:</span> <input type="password" v-model="truenewpassword"> <br>
        <span v-if="isshowtrue" style="position: absolute;left:134px; font-size:10px;color:red">两次密码不一致 :</span>
        <button class="falsepass" @click="falsepass">取消</button>
        <button class="truepass" @click="truepass">确定</button>
      </div>
    </div>
    <div class="addadminacc" v-if="addadmin">
      <!--  -->
      <div class="inoubox">
        <span>请输入账户:</span> <input type="text" ref="addusername" v-model="addusername"> <br>
        <span v-if="isshowadduse" style="position: absolute;left:120px; font-size:10px;color:red">请输入用户名 :</span>
        <span>请输入密码:</span> <input type="password" ref="addpassword" v-model="addpassword"> <br>
        <span v-if="isshowaddpas" style="position: absolute;left:120px; font-size:10px;color:red">请输入密码 :</span>
        <span>请确认密码:</span> <input type="password" v-model="trueaddpassword"> <br>
        <span v-if="isshowtrueadd" style="position: absolute;left:120px; font-size:10px;color:red">两次密码不一致 :</span>
        <button class="falsepass" @click="falseadd">取消</button>
        <button class="truepass" @click="trueadd">确定</button>
      </div>
    </div>
    <div class="uploadfile" v-if="showimport">
      <p>默认表格模板,初始密码一定为123456</p>
      <img :src="(confirmposition == 'teacher')?timg:simg" alt="图片加载出错了" style="width:100%">
      <input type="file" name="file" id="file" class="upload">
      <div class="uploadbtnbox">
        <button @click="uploadfiles" class="uploadbtn" style="background: #409eff;">上传</button>
        <button @click="showimport = false" class="uploadbtn" style="background:#e6a23c">取消</button>
      </div>
    </div>
  </div>
  <div class="switchroles">
    <span :class="{switchbtn:true,activeswitch:!switchclass}" style="border-right:none"
      @click="changetoteacher">老师账户</span>
    <span :class="{switchbtn:true,activeswitch:switchclass}" @click="changetostudent">学生账户</span>
  </div>
  <div class="pagebox">
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
      :page-sizes="[10, 20, 30, 40,50]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  <!-- </div> -->
</template>

<script>
  import axios from 'axios';
  import {
    logout,
    changepassword
  } from '@/network/login';
  import {
    getteacheraccount,
    getstuentaccount,
    addadminacc,
    uploadteacex
  } from '@/network/Home/home';
  import AccountTable from '@/components/table'
  export default {
    name: '',
    data() {
      return {
        oldpassword: '',
        newpassword: '',
        truenewpassword: '',
        isshowold: false,
        isshownew: false,
        showchangebox: false,
        isshowtrue: false,
        showmess: false,
        classname: '',
        messagetext: '',
        collegearr: [],
        classes: [],
        positionarr: [],
        collegevalue: '请选择学院',
        classvalue: '请选择班级',
        positionvalue: '请选择身份',
        collparameter: '',
        classparameter: '',
        positionparameter: '',
        isshowcollege: false,
        isshowclasses: false,
        isshowposition: false,
        showcollegeicon: false,
        showclassicon: false,
        showpositionicon: false,
        page: 1,
        pagesize: 10,
        total: 0,
        accounttable: [],
        isshownull: false,
        switchclass: false,
        addadmin: false,
        addusername: '',
        addpassword: '',
        trueaddpassword: '',
        isshowadduse: false,
        isshowaddpas: false,
        isshowtrueadd: false,
        confirmposition: '',
        showimport: false,
        timg:require('@/assets/images/ex.png'),
        simg:require('@/assets/images/stuex.png')
      }
    },
    components: {
      AccountTable: AccountTable
    },
    created() {
      this.getteacher()
    },
    methods: {
      getteacher() {
        if (this.collegevalue == '请选择学院') {
          this.collparameter = ''
          this.classparameter = ''
        } else {
          this.collparameter = this.collegevalue
          this.classparameter = this.classvalue
        }
        if (this.classvalue == '请选择班级') {
          this.classparameter = ''
        }
        if (this.positionvalue == '请选择身份') {
          this.positionparameter = ''
        } else {
          this.positionparameter = this.positionvalue
        }
        // console.log(this.positionparameter, this.classparameter, this.collparameter, this.page, this.pagesize);
        getteacheraccount(this.positionparameter, this.classparameter, this.collparameter, this.page, this.pagesize)
          .then(res => {
            // console.log(res);
            this.confirmposition = res.message
            this.total = res.data.total
            this.collegearr = res.data2
            this.accounttable = res.data.records
            this.positionarr = res.data3
            if (this.accounttable.length == 0) {
              this.isshownull = true
            } else {
              this.isshownull = false
            }
            // console.log(res);
          })
      },
      getstu() {
        if (this.collegevalue == '请选择学院') {
          this.collparameter = ''
          this.classparameter = ''
        } else {
          this.collparameter = this.collegevalue
          this.classparameter = this.classvalue
        }
        if (this.classvalue == '请选择班级') {
          this.classparameter = ''
        }
        if (this.positionvalue == '请选择年级') {
          this.positionparameter = ''
        } else {
          this.positionparameter = this.positionvalue
        }
        // console.log(this.positionparameter, this.classparameter, this.collparameter, this.page, this.pagesize);
        getstuentaccount(this.positionparameter, this.classparameter, this.collparameter, this.page, this.pagesize)
          .then(res => {
            // console.log(res);
            this.confirmposition = res.message
            this.total = res.data.total
            this.collegearr = res.data3
            this.accounttable = res.data.records
            this.positionarr = res.data2
            if (this.accounttable.length == 0) {
              this.isshownull = true
            } else {
              this.isshownull = false
            }
          })
      },
      addaccount() {
        this.addadmin = true
      },
      loginout() {
        logout().then(() => {
          this.$router.push('/')
        })
      },
      changepass() {
        this.showchangebox = true
      },
      truepass() {
        let username = window.sessionStorage.getItem('username')
        if (this.oldpassword == '' || this.newpassword == '' || this.newpassword != this.truenewpassword) {
          if (this.oldpassword == '') {
            this.isshowold = true
            this.$refs.oldpassword.focus()
          } else if (this.newpassword == '') {
            this.isshownew = true
            this.$refs.newpassword.focus()
          } else if (this.newpassword != this.truenewpassword) {
            this.isshowtrue = true
          }
        } else {
          changepassword(username, this.oldpassword, this.newpassword).then(res => {
            // console.log(res);
            if (res.code == 200) {
              this.showmess = true
              this.classname = 'passright'
              this.messagetext = "修改密码成功"
              this.showchangebox = false
              this.oldpassword = '',
                this.newpassword = '',
                this.truenewpassword = ''
              setTimeout(() => {
                this.showmess = false
              }, 3000);
            } else {
              this.showmess = true
              this.classname = 'passwrong'
              this.messagetext = "输入的旧密码错误"
              this.showchangebox = false
              this.oldpassword = '',
                this.newpassword = '',
                this.truenewpassword = ''
              setTimeout(() => {
                this.showmess = false
              }, 3000);
            }
          })
        }
      },
      falsepass() {
        this.showchangebox = false
        this.oldpassword = ''
        this.newpassword = ''
        this.truenewpassword = ''
      },
      // 级联选择器
      getcollege(college, classes) {
        this.collegevalue = college
        this.classes = classes
        this.classvalue = '请选择班级'
        this.isshowcollege = false
        if (this.confirmposition == 'teacher') {
          this.getteacher()
        } else if (this.confirmposition == 'student') {
          this.getstu()
        }

      },
      getclasses(classna) {
        this.classvalue = classna
        if (this.confirmposition == 'teacher') {
          this.getteacher()
        } else if (this.confirmposition == 'student') {
          this.getstu()
        }
        this.isshowclasses = false
      },
      showcollege() {
        this.isshowcollege = true
        this.showcollegeicon = true
      },
      unshowcollege() {
        this.isshowcollege = false
        this.showcollegeicon = false
      },
      showclasses() {
        this.isshowclasses = true
        this.showclassicon = true
      },
      unshowclasses() {
        this.isshowclasses = false
        this.showclassicon = false
      },
      getposition(position) {
        if (this.confirmposition == 'teacher') {
          this.positionvalue = position.message
          this.getteacher()
        } else if (this.confirmposition == 'student') {
          this.positionvalue = position
          this.getstu()
        }
        this.isshowposition = false
      },
      showposition() {
        this.showpositionicon = true
        this.isshowposition = true
      },
      unshowposition() {
        this.showpositionicon = false
        this.isshowposition = false
      },
      clearall() {
        this.collegevalue = '请选择学院',
          this.classvalue = '请选择班级'
        this.classes = []
        if (this.confirmposition == 'teacher') {
          this.getteacher()
        } else if (this.confirmposition == 'student') {
          this.getstu()
        }
      },
      clearclass() {
        this.classvalue = '请选择班级'
        if (this.confirmposition == 'teacher') {
          this.getteacher()
        } else if (this.confirmposition == 'student') {
          this.getstu()
        }
      },
      clearposition() {
        if (this.confirmposition == 'teacher') {
          this.positionvalue = '请选择身份'
          this.getteacher()
        } else if (this.confirmposition == 'student') {
          this.positionvalue = '请选择年级'
          this.getstu()
        }
      },
      changetoteacher() {
        this.collegearr = []
        this.classes = []
        this.positionarr = []
        this.switchclass = false
        this.positionvalue = '请选择身份'
        this.collegevalue = '请选择学院'
        this.classvalue = '请选择班级'
        this.$refs.child.clearcheckbox();
        this.getteacher()
      },
      changetostudent() {
        this.collegearr = []
        this.classes = []
        this.positionarr = []
        this.switchclass = true
        this.positionvalue = '请选择年级'
        this.collegevalue = '请选择学院'
        this.classvalue = '请选择班级'
        this.$refs.child.clearcheckbox();
        this.getstu()
      },
      handleSizeChange(pagesize) {
        this.pagesize = pagesize
        if (this.confirmposition == 'teacher') {
          this.getteacher()
        } else if (this.confirmposition == 'student') {
          this.getstu()
        }
      },
      handleCurrentChange(page) {
        this.page = page
        if (this.confirmposition == 'teacher') {
          this.getteacher()
        } else if (this.confirmposition == 'student') {
          this.getstu()
        }
      },
      falseadd() {
        this.addadmin = false
        this.addusername = ''
        this.addpassword = ''
        this.trueaddpassword = ''
      },
      trueadd() {
        if (this.addusername == '' || this.addpassword == '' || this.addpassword != this.trueaddpassword) {
          if (this.addusername == '') {
            this.isshowadduse = true
            this.$refs.addusername.focus()
          } else if (this.addpassword == '') {
            this.isshowaddpas = true
            this.$refs.addpassword.focus()
          } else if (this.addpassword != this.trueaddpassword) {
            this.isshowtrueadd = true
          }
        } else {
          addadminacc(this.addusername, this.addpassword, 6).then(res => {
            console.log(res);
            if (res.code == 200) {
              this.showmess = true
              this.classname = 'passright'
              this.messagetext = "添加账号成功"
              this.addadmin = false
              this.addusername = '',
                this.addpassword = '',
                this.trueaddpassword = ''
              setTimeout(() => {
                this.showmess = false
              }, 3000);
            } else if (res.code == 404) {
              this.showmess = true
              this.classname = 'passwrong'
              this.messagetext = "用户名重复,请重试"
            } else {
              this.showmess = true
              this.classname = 'passwrong'
              this.messagetext = "添加账号失败,请重试"
              this.addadmin = false
              this.addusername = '',
                this.addpassword = '',
                this.trueaddpassword = ''
              setTimeout(() => {
                this.showmess = false
              }, 3000);
            }
          })
        }
      },
      importaccount() {
        this.showimport = true
      },
      uploadfiles() {
        let uolaodfile = document.getElementById('file').files
        let file = new FormData(); //构造FormData对象
        file.append('file', uolaodfile[0])
        if (uolaodfile.length < 1) {
          this.showmess = true
          this.classname = 'passwrong'
          this.messagetext = "请选择文件"
            setTimeout(() => {
          this.showmess = false
        }, 3000);
        } else if (uolaodfile.length > 1) {
          this.showmess = true
          this.classname = 'passwrong'
          this.messagetext = "文件数量不能大于一"
            setTimeout(() => {
          this.showmess = false
        }, 3000);
        } else {
          this.showmess = true
          this.classname = 'passright'
          this.messagetext = "正在上传...,请稍等...,请勿刷新页面"
          if (this.confirmposition == 'teacher') {
          let  url= 'https://cxcy.gmu.cn/score_back/updownload/uploadTeaExcel'
            this.sendfile(url,file)
             this.getteacher()
          } else if (this.confirmposition == 'student') {
            let url= 'https://cxcy.gmu.cn/score_back/updownload/uploadStuExcel'
             this.sendfile(url,file)
            this.getstu()
          }
          //
        }
      },
    sendfile(url,file){
      this.showimport = false
       let config = {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            withCredentials: true,
          }
          axios.post(url, file, config).then(res => {
            if (res.data.code === 200) {
              this.showmess = true
              this.classname = 'passright'
              this.messagetext = "上传成功"
               setTimeout(() => {
                 this.showmess = false
               }, 3000);
            } else {
              this.showmess = true
              this.classname = 'passwrong'
              this.messagetext = "上传失败"
              setTimeout(() => {
                 this.showmess = false
               }, 3000);
            }
          })
    }
    },
  }
</script>

<style scoped>
  .homeview {
    height: 100vh;
    min-height: 500px;
    overflow: hidden;
    background-color: #dfe4e6;
  }

  .mainhome {
    position: relative;
    height: 160px;
    background: url('../../assets/images/pic2.jpg') no-repeat;
    background-size: 100% 160px;
  }

  .gmu {
    position: absolute;
    height: 80px;
    width: 315px;
    top: 52px;
    left: 100px;
    background: url('../../assets/images/gmu.png');
  }

  .motto {
    position: absolute;
    height: 55px;
    width: 420px;
    top: 58px;
    left: 500px;
    background: url('../../assets/images/top_zs.png');
  }

  .addaccount {
    position: absolute;
    right: 280px;
    top: 70px;
    height: 40px;
    width: 120px;
    border-radius: 5px;
    background: #56a9ff;
    color: #fff;
  }

  .changepass {
    position: absolute;
    right: 150px;
    top: 70px;
    height: 40px;
    width: 100px;
    border-radius: 5px;
    background: #909399;
    color: #fff;
  }

  .logout {
    position: absolute;
    right: 30px;
    top: 70px;
    height: 40px;
    width: 100px;
    border-radius: 5px;
    background: #e6a23c;
    color: #fff;
  }

  .changepassbox {
    position: absolute;
    top: 260px;
    left: 500px;
    height: 250px;
    width: 500px;
    border-radius: 10px;
    z-index: 99;
    background: #fff;
  }

  .addadminacc {
    position: absolute;
    top: 260px;
    left: 500px;
    height: 250px;
    width: 500px;
    border-radius: 10px;
    z-index: 99;
    background: #fff;
  }

  input {
    margin-top: 20px;
    margin-left: 20px;
    padding-left: 5px;
    height: 25px;
    width: 300px;
  }

  .inoubox {
    margin-left: 10px;
  }

  .truepass {
    float: right;
    height: 40px;
    width: 80px;
    margin-top: 20px;
    margin-right: 10px;
    border-radius: 5px;
    background: #56a9ff;
    color: #fff;
  }

  .falsepass {
    float: right;
    margin-right: 58px;
    margin-top: 20px;
    height: 40px;
    width: 80px;
    border-radius: 5px;
    background: #909399;
    color: #fff;
  }

  button:hover {
    color: red;
  }

  i {
    position: absolute;
    top: 10px;
    left: 400px;
    width: 500px;
    height: 30px;
    line-height: 30px;
    border-radius: 6px;
    text-align: center;
    z-index: 99;
  }

  .passright {
    background: #f0f9eb;
    color: #67c23a;
  }

  .passright::before {
    position: absolute;
    left: 150px;
    font-family: iconfont;
    content: '\e60d';
  }

  .passwrong {
    background: #fef0f0;
    color: #f56c6c;
  }

  .passwrong::before {
    position: absolute;
    left: 150px;
    font-family: iconfont;
    content: '\e8c5';
  }

  .pagebox {
    position: absolute;
    top: 590px;
    left: 400px;
  }

  .select {
    position: absolute;
    top: 180px;
    height: 40px;
    width: 300px;
    line-height: 40px;
    border-radius: 3px;
    z-index: 99;
    border: 1px solid blue;
  }

  .select1 {
    left: 80px;
  }

  .select2 {
    left: 450px;
  }

  .select3 {
    width: 200px;
    left: 820px;
  }

  .classp {
    max-height: 200px;
    overflow-y: auto;
    background-color: #dfecf0;
    margin-top: 1px;
  }

  p {
    text-align: center;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    z-index: 99;
  }

  p:hover {
    background: #56a9ff
  }

  #clear {
    margin-left: 10px;
  }

  #clear:hover {
    color: blue;
  }

  .switchroles {
    position: absolute;
    right: 70px;
    top: 590px;
  }

  .switchbtn {
    display: inline-block;
    height: 35px;
    width: 100px;
    text-align: center;
    line-height: 35px;
    cursor: pointer;
    border: 1px solid;
  }

  .switchbtn:hover {
    background: #2374c5;
    color: #fff;
  }

  .activeswitch {
    background-color: rgb(0, 0, 255);
    color: #fff;
  }

  .importbtn {
    position: absolute;
    height: 40px;
    width: 100px;
    background: #0f70d8;
    border-radius: 5px;
    color: #fff;
    bottom: 30px;
    left: 80px;
  }

  .cadres {
    position: absolute;
    height: 40px;
    width: 100px;
    background: #0f70d8;
    border-radius: 5px;
    color: #fff;
    top: 180px;
    right: 70px;
  }

  .uploadfile {
    position: absolute;
    top: 200px;
    left: 400px;
    height: 300px;
    width: 800px;
    z-index: 999;
    background-color: #fff;
  }

  .upload {
    position: absolute;
    top: 130px;
    left: 50px;
  }

  .uploadbtnbox {
    margin-top: 120px;
    margin-left: 580px;
  }

  .uploadbtn {
    margin-left: 20px;
    margin-top: 0px;
    height: 40px;
    width: 80px;
    border-radius: 5px;
    color: #fff;
  }
</style>