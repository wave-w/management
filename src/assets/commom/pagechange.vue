<template>
    <div>
        <div class="paging" v-show="isshowpage">
            <span>共{{total}}条</span>
            <button @click="reducepage">&lt;</button>
            <!-- <select @change="selchange" v-model="pagesize">
                <option v-for="(item,index) in pagearr" :key="index" :value="item" :label="item+ '条/页'"></option>
            </select> -->
            <ul  v-for="index of pagenumber"  :key="index">
                <li @click="pagecange(index)" :class="{'changecolor':index==page}">{{index}}</li>
            </ul>
            <button @click="addpage">&gt;</button>
            <!-- <div class="pageinput">前往 <input type="number"></div> -->
        </div>
    </div>
</template>

<script>
    import {getteacheraccount} from '@/network/Home/home';
    export default {
        name: '',
        data() {
            return {
                total: 0,
                // pagearr: [10, 15, 20, 25, 30],
                page: 1,
                pagesize: 10,
                pagenumber: '',
                liarr: [],
                isshowpage:false
            }
        },
        created() {
            getteacheraccount("", "", '1', '10').then(res => {
                this.total = 200
                console.log(res);
            })
        },
        mounted() {
            this.pagenumber = Math.ceil(this.total / this.pagesize)
           setTimeout(() => {
                this.showellipsis()
                // this.selchange()
           }, 1000);
},
        methods: {
            selchange() {
                this.pagesize = 10
                this.pagecange()
            },
            pagecange(page) {
                this.page = page
                this.showellipsis()
            },
            reducepage() {
                if (this.page > 1) {
                    this.page--
                }
                this.showellipsis()
            },
            addpage() {
                if (this.page < this.pagenumber) {
                    this.page++
                }
                this.showellipsis()
            },
            showellipsis() {
                this.pagenumber = Math.ceil(this.total / this.pagesize)
                this.liarr = document.getElementsByTagName('li')
                if (this.liarr.length <= 10) {
                    this.liarr.forEach(liitem => {
                        liitem.style.display = 'inline'
                        liitem.id = ''
                    })
                this.isshowpage = true
                } else if (this.liarr.length > 10 && this.page < 4) {
                    this.liarr.forEach(liitem => {
                        liitem.style.display = 'none'
                        liitem.id = ''
                    })
                    for (let i = 0; i < 6; i++) {
                        this.liarr[i].style.display = 'inline'
                    }
                    this.liarr[5].id = 'changeellipsis'
                    this.liarr[this.liarr.length - 1].style.display = 'inline'
                    this.liarr[this.liarr.length - 2].style.display = 'inline'
                    this.liarr[this.liarr.length - 3].style.display = 'inline'
                    this.isshowpage = true
                } else if (this.liarr.length > 10 && this.page > 4 && this.page <= this.liarr.length - 6) {
                    this.liarr.forEach(liitem => {
                        liitem.style.display = 'none'
                        liitem.id = ''
                    })
                    this.liarr[0].id = 'changeellipsis'
                    this.liarr[0].style.display = 'inline'
                    this.liarr[this.page - 3].style.display = 'inline'
                    this.liarr[this.page - 2].style.display = 'inline'
                    this.liarr[this.page - 1].style.display = 'inline'
                    this.liarr[this.page].style.display = 'inline'
                    this.liarr[this.page + 1].style.display = 'inline'
                    this.liarr[this.page + 2].style.display = 'inline'
                    this.liarr[this.page + 2].id = 'changeellipsis'
                    this.liarr[this.liarr.length - 1].style.display = 'inline'
                    this.liarr[this.liarr.length - 2].style.display = 'inline'
                    this.liarr[this.liarr.length - 3].style.display = 'inline'
                    this.liarr[this.liarr.length - 4].id = ''
                    this.liarr[this.liarr.length - 5].id = ''
                } else if (this.liarr.length > 10 && this.page > 4 && this.page > this.liarr.length - 6) {
                    this.liarr.forEach(liitem => {
                        liitem.style.display = 'none'
                        liitem.id = ''
                    })
                    this.liarr[0].id = 'changeellipsis'
                    this.liarr[0].style.display = 'inline'
                    this.liarr[this.liarr.length - 1].style.display = 'inline'
                    this.liarr[this.liarr.length - 2].style.display = 'inline'
                    this.liarr[this.liarr.length - 3].style.display = 'inline'
                    this.liarr[this.liarr.length - 4].style.display = 'inline'
                    this.liarr[this.liarr.length - 5].style.display = 'inline'
                    this.liarr[this.liarr.length - 6].style.display = 'inline'
                    this.liarr[this.liarr.length - 7].style.display = 'inline'

                }
            }
        },
    }
</script>

<style scoped>
    .paging {
        position: absolute;
        display: flex;
        left: 500px;
        bottom: 30px;
        cursor: pointer;
    }

    ul {
        position: relative;
    }

    li {
        float: left;
        margin: 5px;
        margin-left: 10px;
    }

    li:hover {
        color: blue;
        font-weight: 1000;
    }

    span {
        margin: 5px;
    }

    select {
        margin: 5px;
        height: 20px;
        width: 70px;
        line-height: 20px;
    }

    .changecolor {
        font-weight: 1500 !important;
        color: blue;
    }

    #changeellipsis::after {
        font-family: iconfont;
        font-size: 20px;
        content: '\e60b';
    }

    button {
        font-size: 25px;
        background-color: #fff;
    }
</style>