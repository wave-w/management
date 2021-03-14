<template>
    <div>
        <table align="center">
            <div class="miantable">
                <tr>
                    <th align="center" valign="middle" style="width:220px">学院</th>
                    <th align="center" valign="middle" style="width:160px">工号</th>
                    <th align="center" valign="middle" style="width:240px">班级</th>
                    <th align="center" valign="middle">姓名</th>
                    <th align="center" valign="middle" style="width:170px">电话</th>
                    <th align="center" valign="middle">权限</th>
                    <th align="center" valign="middle">操作</th>
                </tr>
                <div class="maintabletext" ref="checkbox">
                    <tr v-for="(item,index) in accenttable" :key="index" class="bodttr">
                        <td align="center" valign="middle" style="border-top:none;width:220px">
                            <input type="checkbox" class="checkboxs" :id="item.id">{{item.college}}</td>
                        <td align="center" valign="middle" style="border-top:none;width:160px">
                            {{item.num!=undefined?item.num:item.stuNum}}</td>
                        <td align="center" valign="middle" style="border-top:none;width:240px">
                            {{(item.className==null||item.className=="")?'无':item.className}}</td>
                        <td align="center" valign="middle" style="border-top:none">{{item.name}}</td>
                        <td align="center" valign="middle" style="border-top:none;width:170px">{{item.phone}}</td>
                        <td align="center" valign="middle" style="border-top:none">
                            {{item.position!=undefined?item.position:'学生'}}</td>
                        <td align="center" valign="middle" style="border-top:none">
                            <button class="edit"
                                @click="edit(item)">{{(confirmposition=='teacher')?'编辑权限':'重置密码'}}</button>
                        </td>
                    </tr>
                </div>
            </div>
        </table>
        <button @click="batchdelete" class="delebtn">删除账号</button>
        <button @click="showaddteaacc = true;edittachertext='添加老师账号';editdisabled=false" class="addpeople"
            v-if="(confirmposition=='teacher')">添加老师</button>
        <div class="confirm" v-if="showconfirm">
            <p style="margin: 10px;">确认删除这些账号?</p>
            <button class="confirmbtn" style="background:#909399" @click="showconfirm=false">取消</button>
            <button class="confirmbtn" style="background:#e6a23c" @click="delectacc">确认</button>
        </div>
         <div class="confirm" v-if="showresetbox">
            <p style="margin: 10px;">确认重置该账号密码为123456?</p>
            <button class="confirmbtn" style="background:#909399" @click="showresetbox=false">取消</button>
            <button class="confirmbtn" style="background:#e6a23c" @click="truereset">确认</button>
        </div>
        <div class="addteaacc" v-if="showaddteaacc">
            <div class="addteaccmain">
                <p style="font-size: 28px; color:#409eff;margin-top: 10px;">{{edittachertext}}</p>
                <span style="position: absolute;top: 75px;left: 33px; font-size: 20px;">账号 :</span>
                <input style="position: absolute;top: 68px;left: 65px;height: 30px;width: 215px;padding-left: 5px;"
                    type="text" :disabled='editdisabled' v-model="addteacheracc.username"> <br>
                <span style="position: absolute;top: 75px;left: 360px; font-size: 20px;">姓名 :</span>
                <input type="text" style="position: absolute;top: 68px;left: 390px;height: 30px;width: 95px;
            padding-left: 5px;" :disabled='editdisabled' v-model="addteacheracc.name">
                <span style="position: absolute;top: 127px;left: 33px; font-size: 20px;">电话 :</span>
                <input style="position: absolute;top:120px;left: 65px;height: 30px;width: 215px;padding-left: 5px;"
                    type="text" v-model="addteacheracc.phone">
                <span style="position: absolute;top: 127px;left: 360px; font-size: 20px;">民族 :</span>
                <input style="position: absolute;top:120px;left: 390px;height: 30px;width: 95px;padding-left: 5px;"
                    type="text" v-model="addteacheracc.nation">
                <span style="position: absolute;top: 179px;left: 33px; font-size: 20px;">密码 :</span>
                <input style="position: absolute;top: 172px;left: 65px;height: 30px;width: 180px;padding-left: 5px;"
                    type="password" v-model="addteacheracc.password">
                <span style="position: absolute;top: 179px;left: 300px; font-size: 20px;">确认密码 :</span>
                <input style="position: absolute;top: 172px;left: 365px;height: 30px;width: 180px;padding-left: 5px;"
                    type="password" v-model="addteacheracc.truepassword">
                <span style="position: absolute;top: 231px;left: 360px; font-size: 20px;">性别 :</span>
                <div :class="{select:true,selectzindex:!sexicon}" style="top: 227px; left: 420px; width: 100px;"
                    @mouseover='showsex' @mouseleave='unshowsex'>
                    <span style="margin-left: 20px;"></span>
                    {{sexselecttext}}
                    <span class="iconfont icon-icon1" style="float: right; margin-right: 20px;" v-if="!sexicon"></span>
                    <span class="iconfont icon-arrow-down" style="float: right; margin-right: 20px;"
                        v-if="sexicon"></span>
                    <div class="sexselectbox" v-if="sexicon">
                        <p class="sexselect" @click="selectsex('男')">男</p>
                        <p class="sexselect" @click="selectsex('女')">女</p>
                    </div>
                </div>
                <span style="position: absolute;top: 231px;left: 33px; font-size: 20px;">学院 :</span>
                <div :class="{select:true,selectzindex:!collegeicon}" style="top:227px;left: 95px;width:220px"
                    @mouseover='showcollege' @mouseleave='unshowcollege'>
                    <span style="margin-left: 20px;"></span>
                    {{collegeselecttext}}
                    <span class="iconfont icon-icon1" style="float: right; margin-right: 20px;"
                        v-if="!collegeicon"></span>
                    <span class="iconfont icon-arrow-down" style="float: right; margin-right: 20px;"
                        v-if="collegeicon"></span>
                    <div class="sexselectbox" v-if="collegeicon">
                        <p class="sexselect" v-for="(college,index) in collegearr" :key="index"
                            @click="selectcollege(college.message,college.data)">{{college.message}}</p>
                    </div>
                </div>
                <span style="position: absolute;top: 283px;left: 360px; font-size: 20px;">身份 :</span>
                <div :class="{select:true,selectzindex:!positionicon}" style="top:279px;left: 420px;width:120px;"
                    @mouseover='showposition' @mouseleave='unshowposition'>
                    <span style="margin-left: 20px;"></span>
                    {{positionselecttext}}
                    <span class="iconfont icon-icon1" style="float: right; margin-right: 20px;"
                        v-if="!positionicon"></span>
                    <span class="iconfont icon-arrow-down" style="float: right; margin-right: 20px;"
                        v-if="positionicon"></span>
                    <div class="sexselectbox" v-if="positionicon">
                        <p class="sexselect" v-for="(position,index) in positionarr" :key="index"
                            @click="selectposition(position)">{{position.message}}</p>
                    </div>
                </div>
                <span style="position: absolute;top: 283px;left: 33px; font-size: 20px;">班级 :</span>
                <div :class="{select:true,selectzindex:!classicon}" style="top:279px;left: 95px;width:250px"
                    @mouseover='showclass' @mouseleave='unshowclass'>
                    <span style="margin-left: 20px;"></span>
                    {{classselecttext}}
                    <span class="iconfont icon-icon1" style="float: right; margin-right: 20px;"
                        v-if="!classicon"></span>
                    <span class="iconfont icon-arrow-down" style="float: right; margin-right: 20px;"
                        v-if="classicon"></span>
                    <div class="sexselectbox" v-if="classicon">
                        <p class="sexselect" v-for="(classname,index) in classarr" :key="index"
                            @click="selectclass(classname)">{{classname}}</p>
                    </div>
                </div>
                <div class="addselectbtnbox">
                    <button @click="trueaddteacher" style="margin: 10px; background:#409eff">确认</button>
                    <button @click="falseaddteacher" style="margin: 10px; background:#909399">取消</button>
                </div>
            </div>
        </div>
        <i :class='classname' v-if="showmess">{{messagetext}}</i>
        <div class="nullbox" v-show="isshownull">暂无数据</div>
    </div>
</template>
<script>
    import {
        deleteacher,
        delestudent,
        addteacher,
        editteacher,
        resetstupassword
    } from '@/network/Home/home';
    export default {
        data() {
            return {
                truecheckbox: [],
                truecheckstr: '',
                editdisabled: false,
                showconfirm: false,
                showmess: false,
                classname: '',
                messagetext: '',
                edittachertext: '',
                showaddteaacc: false,
                sexselecttext: '性别',
                sexicon: false,
                collegeselecttext: '学院',
                collegeicon: false,
                positionselecttext: '身份',
                positionicon: false,
                classarr: [],
                classselecttext: '班级',
                classvalue: '',
                classicon: false,
                roleId: 0,
                tid: '',
                showresetbox:false,
                stuid:'',
                addteacheracc: {
                    username: '',
                    name: '',
                    phone: '',
                    nation: '',
                    password: '',
                    truepassword: '',
                }
            }
        },
        name: '',
        props: {
            accenttable: {
                type: Array,
                default: []
            },
            isshownull: {
                type: Boolean,
                default: true
            },
            confirmposition: {
                type: String,
                default: ''
            },
            collegearr: {
                type: Array,
                default: []
            },
            positionarr: {
                type: Array,
                default: []
            },
        },
        methods: {
            edit(teames) {
                if (this.confirmposition == 'teacher') {
                    this.tid = teames.id
                    this.edittachertext = '编辑老师账号,密码为空则默认之前密码'
                    this.editdisabled = true
                    this.showaddteaacc = true
                    this.addteacheracc.username = teames.num
                    this.addteacheracc.name = teames.name
                    this.addteacheracc.phone = teames.phone
                    this.addteacheracc.nation = teames.nation
                    this.sexselecttext = teames.sex
                    // this.classselecttext = teames.className
                    this.positionselecttext = teames.position
                    // this.collegeselecttext = teames.college
                } else if (this.confirmposition == 'student') {
                    this.showresetbox = true
                   this.stuid = teames.stuNum
                }
                // console.log(teames.stuNum);
            },
            batchdelete() {
                let checkarr = this.$refs.checkbox.getElementsByClassName('checkboxs')
                checkarr.forEach(check => {
                    if (check.checked) {
                        let id = parseInt(check.id)
                        //  console.log(typeof id);
                        this.truecheckbox.push(id)
                    }
                })
                if (this.truecheckbox.length != 0) {
                    this.showconfirm = true
                } else {
                    this.showconfirm = false
                };
            },
            delectacc() {
                // console.log(this.truecheckbox);
                if (this.confirmposition == 'teacher') {
                    this.deteacher()
                } else if (this.confirmposition == 'student') {
                    this.destudent()
                }
            },
            deteacher() {
                // console.log(this.truecheckbox);
                // console.log(this.truecheckbox[0]);
                this.truecheckstr = JSON.stringify(this.truecheckbox).substring(1, JSON.stringify(this.truecheckbox)
                    .length - 1);
                // console.log(this.truecheckstr);
                deleteacher(this.truecheckstr).then(res => {
                    // console.log(res);
                    if (res.code == 200) {
                        this.$parent.getteacher();
                        this.showconfirm = false
                        this.clearcheckbox()
                        this.showmess = true
                        this.classname = 'passright'
                        this.messagetext = "删除老师账号成功"
                    } else {
                        this.showconfirm = false
                        this.clearcheckbox()
                        this.showmess = true
                        this.classname = 'passwrong'
                        this.messagetext = "删除老师账号失败"
                    }
                    setTimeout(() => {
                        this.showmess = false
                    }, 3000);
                })
            },
            destudent() {
                // console.log(this.truecheckbox);
                this.truecheckstr = JSON.stringify(this.truecheckbox).substring(1, JSON.stringify(this.truecheckbox)
                    .length - 1);
                delestudent(this.truecheckstr).then(res => {
                    // console.log(res);
                    if (res.code == 200) {
                        this.$parent.getstu();
                        this.showconfirm = false
                        this.clearcheckbox()
                        this.showmess = true
                        this.classname = 'passright'
                        this.messagetext = "删除学生账号成功"
                    } else {
                        this.showconfirm = false
                        this.clearcheckbox()
                        this.showmess = true
                        this.classname = 'passwrong'
                        this.messagetext = "删除学生账号失败"
                    }
                    setTimeout(() => {
                        this.showmess = false
                    }, 3000);
                })
            },
            clearcheckbox() {
                this.$refs.checkbox.getElementsByClassName('checkboxs').forEach(item => {
                    item.checked = false
                })
            },
            showsex() {
                this.sexicon = true
            },
            unshowsex() {
                this.sexicon = false
            },
            selectsex(sex) {
                this.sexselecttext = sex
                this.sexicon = false
            },
            showcollege() {
                this.collegeicon = true
            },
            unshowcollege() {
                this.collegeicon = false
            },
            selectcollege(collegename, classarr) {
                this.collegeselecttext = collegename
                this.classarr = classarr
                this.collegeicon = false
            },
            showposition() {
                this.positionicon = true
            },
            unshowposition() {
                this.positionicon = false
            },
            selectposition(position) {
                this.positionselecttext = position.message
                this.roleId = position.data
                // console.log(this.roleId);
                this.positionicon = false
            },
            showclass() {
                this.classicon = true
            },
            unshowclass() {
                this.classicon = false
            },
            selectclass(classn) {
                this.classselecttext = classn
                this.classicon = false
            },
            trueaddteacher() {
                if (this.addteacheracc.username == '' || this.addteacheracc.name == '' ||
                    this.addteacheracc.phone == '' || this.addteacheracc.nation == '' ||
                    this.sexselecttext == '性别' || this.collegeselecttext == '学院' ||
                    this.positionselecttext == '身份' || (this.classselecttext == '班级' &&
                        this.positionselecttext == '班主任') || this.addteacheracc.password !=
                    this.addteacheracc.truepassword || (this.addteacheracc.password == '' && !this.editdisabled)) {
                    this.messagetext = '请填写完所有字段'
                    this.classname = 'passwrong'
                    this.showmess = true
                    if (this.addteacheracc.password != this.addteacheracc.truepassword) {
                        this.messagetext = '两次密码输入的不一致'
                        this.classname = 'passwrong'
                        this.showmess = true
                    }
                    if (this.classselecttext == '班级' && this.positionselecttext == '班主任') {
                        this.messagetext = '班主任必须选择班级'
                        this.classname = 'passwrong'
                        this.showmess = true
                    }
                    setTimeout(() => {
                        this.showmess = false
                    }, 3000);
                } else {
                    if (this.classselecttext == '班级') {
                        this.classvalue = ''
                    } else this.classvalue = this.classselecttext;
                    if (!this.editdisabled) {
                        this.toaddteacher()
                    } else this.toeditteacher()
                }
            },
            falseaddteacher() {
                this.showaddteaacc = false
                this.addteacheracc = {}
                this.sexselecttext = '性别',
                    this.classselecttext = '班级',
                    this.classarr = []
                this.classvalue = '',
                    this.positionselecttext = '身份',
                    this.collegeselecttext = '学院'
            },
            toaddteacher() {
                addteacher(this.addteacheracc.username, this.addteacheracc.name,
                    this.sexselecttext, this.classvalue, this.positionselecttext,
                    this.collegeselecttext, this.addteacheracc.phone, this.addteacheracc.nation,
                    this.addteacheracc.password, this.roleId).then(res => {
                    if (res.code == 200) {
                        this.messagetext = '添加老师账号成功'
                        this.$parent.getteacher();
                        this.classname = 'passright'
                        this.showmess = true
                    } else {
                        this.messagetext = '添加老师账号失败,请重试'
                        this.classname = 'passwrong'
                        this.showmess = true
                    }
                    this.showaddteaacc = false
                    this.addteacheracc = {}
                    this.sexselecttext = '性别',
                        this.classselecttext = '班级',
                        this.classvalue = '',
                        this.positionselecttext = '身份',
                        this.collegeselecttext = '学院'
                    setTimeout(() => {
                        this.showmess = false
                    }, 3000);
                })
            },
            toeditteacher() {
                // console.log(this.tid, this.addteacheracc.username,
                //     this.addteacheracc.name, this.sexselecttext,
                //     this.classselecttext, this.positionselecttext,
                //     this.collegeselecttext, this.addteacheracc.phone,
                //     this.addteacheracc.nation);
                editteacher(this.tid, this.addteacheracc.username,
                    this.addteacheracc.name, this.sexselecttext,
                    this.classvalue, this.positionselecttext,
                    this.collegeselecttext, this.addteacheracc.phone,
                    this.addteacheracc.nation).then(res => {
                    if (res.code == 200) {
                        this.messagetext = '编辑老师信息成功'
                        this.$parent.getteacher();
                        this.classname = 'passright'
                        this.showmess = true
                    } else {
                        this.messagetext = '编辑老师信息失败,请重试'
                        this.classname = 'passwrong'
                        this.showmess = true
                    }
                    this.showaddteaacc = false
                    this.addteacheracc = {}
                    this.sexselecttext = '性别',
                        this.classselecttext = '班级',
                        this.classvalue = '',
                        this.positionselecttext = '身份',
                        this.collegeselecttext = '学院'
                    setTimeout(() => {
                        this.showmess = false
                    }, 3000);
                })
            },
            truereset(){
                resetstupassword(this.stuid).then(res=>{
                    // console.log(res);
                     this.showresetbox = false
                    if(res.code==200){
                         this.showmess = true
                        this.classname = 'passright'
                        this.messagetext = `重置${res.data2}密码成功`
                    }else{
                         this.showmess = true
                        this.classname = 'passwrong'
                        this.messagetext = "重置密码失败"
                    }
                    setTimeout(() => {
                        this.showmess = false
                    }, 3000);
                })
                // console.log(("重置密码"));
            }
        },
    }
</script>

<style scoped>
    .maintabletext {
        height: 245px;
        width: 1264px;
        border: none;
        /* background-color: red; */
        overflow-y: auto;

    }

    .maintable {
        height: 245px;
        width: 1425px;
        border: none;
    }

    table {
        position: absolute;
        top: 260px;
        left: 80px;
        border-collapse: collapse;
        border: none;
        /* border:1px solid #0f0bd6;  */
    }

    table tr th,
    table tr td {
        border: 1px solid #0f0bd6;
    }

    table tr th,
    table tr td {
        height: 60px;
        width: 150px;
    }

    .nullbox {
        position: absolute;
        top: 360px;
        left: 67px;
        height: 262px;
        width: 1405px;
        text-align: center;
        line-height: 250px;
        /* border: 1px solid #000; */
        /* border-top: none; */
    }

    button {
        height: 30px;
        width: 80px;
        border-radius: 5px;
        color: #fff;
    }

    button:hover {
        color: rgb(5, 5, 10);
    }

    .edit {
        background: #e6a23c;
        margin: 10px;
    }

    .delete {
        background: #f56c6c;
    }

    input {
        float: left;
        margin-left: 30px;
        margin-top: 5px;
    }

    .delebtn {
        position: absolute;
        top: 180px;
        right: 200px;
        background: #f56c6c;
        height: 40px;
        width: 100px;
    }

    .addpeople {
        position: absolute;
        top: 180px;
        right: 70px;
        background: #909399;
        height: 40px;
        width: 100px;
    }

    .confirm {
        position: absolute;
        height: 110px;
        width: 300px;
        top: 300px;
        left: 500px;
        background: #fff;
    }

    .confirmbtn {
        float: right;
        margin: 10px;
        margin-top: 20px;
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

    .addteaacc {
        position: absolute;
        left: 330px;
        top: 200px;
        height: 400px;
        width: 650px;
        background: #fff;
        border-radius: 5px;
        z-index: 99;
    }

    .select {
        position: absolute;
        height: 30px;
        text-align: left;
        line-height: 30px;
        border: 1px solid;
    }

    .addteaccmain {
        position: absolute;
        height: 100%;
        width: 620px;
        left: 30px;
        z-index: -10;
    }

    .sexselectbox {
        max-height: 85px;
        overflow-y: auto;
    }

    .selectzindex {
        z-index: -1;
    }

    .sexselect {
        text-align: center;
        line-height: 30px;
        background: #dfe4e6;
    }

    .sexselect:hover {
        background-color: #56a9ff;
    }

    .addselectbtnbox {
        position: absolute;
        bottom: 30px;
        right: 50px;
        z-index: -9;
    }
</style>