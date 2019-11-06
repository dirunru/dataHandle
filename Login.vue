<template>
    <div class="login-container">
        <div class="login-bg"></div>
        <div class="login">
            <img class="login-icon"
                 src="../../assets/img/login/login-icon.png">
            <!--            <div class="login-left">-->
            <!--                <img src="../../assets/img/download.png" alt="">-->
            <!--            </div>-->
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" class="login-context">

                <!--                <el-form-item prop="account" style="position: absolute;opacity: 0;">-->
                <!--                    <el-input type="text" placeholder="账号" v-model="ruleForm2.account" autocomplete="off"></el-input>-->
                <!--                </el-form-item>-->
                <!--                <el-form-item prop="pass" style="position: absolute;opacity: 0;">-->
                <!--                    <el-input type="new-password" placeholder="密码" v-model="ruleForm2.pass" autocomplete="off"></el-input>-->
                <!--                </el-form-item>-->
                <el-form-item prop="account">
                    <el-input type="text" placeholder="请输入用户名" v-model="ruleForm2.account"
                              @keyup.native.enter="submitForm('ruleForm2')" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="pass">
                    <el-input type="text" v-model.trim="ruleForm2.pass" class="mask-layer"
                              @keyup.native.enter="submitForm('ruleForm2')"
                              @input="renderMask()"
                              @focus="focusMask()"
                              @blur="blurMask()"
                              autocomplete="new-password"></el-input>
                    <input type="text"
                           :style="{'color': ruleForm2.mask === maskTips ? '#ccc' : '#333'}"
                           v-model="ruleForm2.mask"
                           ref="maskInput"
                           class="mask-layer-input el-input__inner">
                    <span class="el-input__suffix" v-if="isDirty">
                                <span class="el-input__suffix-inner"></span>
                                <i :class="{'el-icon-circle-check': !!ruleForm2.pass, 'el-icon-circle-close': !ruleForm2.pass}"
                                   class="el-input__icon el-input__validateIcon"></i>
                            </span>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" round @click="submitForm('ruleForm2')">登录</el-button>
                </el-form-item>
            </el-form>
            <div class="">
                <!--                <div class="login-right-hd">-->
                <!--                    <img height="48" src="../../assets/img/logo-ww.png" alt="">-->
                <!--                </div>-->

            </div>
        </div>
        <div class="login-copyright">
            <p>迎变·赢变·量变</p>
            Copyright©2019深圳万威科技有限公司版权所有
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import global from '@/utils/global'
    import storage from '@/utils/storage'

    export default {
        name: "Login",
        data() {
            var checkAccount = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error("账号不能为空"));
                } else {
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入密码"));
                } else {
                    callback();
                }
            };
            return {
                maskString: new Array(50).fill('•'), // 初始化要显示的密码
                maskTips: '请输入密码',
                isDirty: false,
                ruleForm2: {
                    pass: '',
                    account: '',
                    mask: '',
                },
                rules2: {
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    account: [
                        {validator: checkAccount, trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$api.login.login({
                            username: this.ruleForm2.account,
                            password: this.ruleForm2.pass
                        }).then((res) => {
                            if (res.state == false) {
                                this.$message({
                                    message: res.message,
                                    type: 'error',
                                    duration: 500
                                });
                                return
                            }
                            sessionStorage.setItem('account', res.account);
                            sessionStorage.setItem('token', res.token);
                            // sessionStorage.setItem('token', res.token)
                            sessionStorage.setItem('userName', res.username);
                            sessionStorage.setItem('userId', res.userId);
                            this.$store.commit('setToken', res.token);
                            this.getCurrentUserMethodAuth(res.token);
                            this.getMyBusinessInfo()
                            // this.getMenu();
                            // this.getOwnerId();
                            if (this.ruleForm2.account === 'admin') { // admin 没有组织架构
                                storage.set('compName', '');
                                storage.set('ownerId', '');
                                this.getMenu(res.token);
                            } else {
                                this.getOwnerId().then(resolve => {
                                    if (resolve) {
                                        this.getMenu(res.token);
                                    }
                                });
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            getMyBusinessInfo(){
              this.$api.login.post({
                  url:"/api/scmuc/v1/getMyBusinessInfo",
                  data:{}
              }).then(res=>{
                  console.log("获取到了！！！！",res);
                  if (res.state == false) {
                      return false;
                  }
                  storage.set("businessDivisions",res.businessDivisions);
                  storage.set("provinces",res.provinces);
                  this.$api.common.getActDivision();
              })
            },
            renderMask() { // 显示出假的密码
                if (!!this.ruleForm2.pass) {
                    this.ruleForm2.mask = this.maskString.slice(0, this.ruleForm2.pass.length).join('') + '|';
                } else {
                    this.ruleForm2.mask = '|';
                }
            },
            focusMask() { // 焦点事件
                if (!this.isDirty) {
                    this.$refs.maskInput.style.borderColor = 'rgb(64, 168, 255)';
                }
                if (!this.ruleForm2.pass) {
                    this.ruleForm2.mask = '|';
                } else {
                    this.ruleForm2.mask = this.ruleForm2.mask + '|';
                }
            },
            blurMask() { // 离开事件
                this.isDirty = true;
                if (!this.ruleForm2.pass) {
                    this.ruleForm2.mask = this.maskTips;
                    this.$refs.maskInput.style.borderColor = '#F56C6C';
                } else {
                    this.ruleForm2.mask = this.ruleForm2.mask.slice(0, -1);
                    this.$refs.maskInput.style.borderColor = '#67C23A';
                }
            },
            getOwnerId() {
                return this.$api.common.getLoginId().then(
                    res => {
                        if (!res || res.state === false) {
                            this.$message({type: "error", message: res.message});
                            return false;
                        }
                        this.$store.state.app.compName = res.compName;
                        storage.set('compName', res.compName);
                        storage.set('ownerId', res.compId);
                        return true
                    }
                );
            },
            getCurrentUserMethodAuth(token) {
                axios({
                    method: "get",
                    url: global.menuUrl + "/sys/sysMenu/v1/getCurrentUserMethodAuth",
                    headers: {
                        "Authorization": "Bearer " + token,
                    }
                }).then(res => {
                    if (res.state == false) {
                        return false;
                    }
                    const allMethod = res.data.curUserMethod;
                    sessionStorage.setItem("allMethod", JSON.stringify(allMethod));
                    this.$store.state.app.allMethod = allMethod;
                })
            },
            getMenu(token) {
                axios({
                    method: 'get',
                    url: global.menuUrl + '/sys/sysMenu/v1/getCurrentUserMenu',
                    headers: {
                        "Authorization": "Bearer " + token,
                    },
                    params: {
                        menuType: 1
                    }
                }).then((res) => {
                    if (res.state == false) {
                        return this.$message({type: "error", message: res.message});
                    }
                    let data = res.data;
                    // 从服务端请求左侧菜单栏，包括父菜单和子菜单
                    this.menuData = data.value.reduce((finalMenu, item, index, arr) => {
                        if (item.alias.includes('SCMcdgl')) {
                            finalMenu = item.children
                            sessionStorage.setItem('menulist', JSON.stringify(finalMenu))
                        }
                        return finalMenu
                    }, [])
                    let allLink = this.menuData.reduce((finalMenu, item, index, arr) => {
                        item.children.reduce((total, currentValue) => {
                            finalMenu.push(currentValue.name);
                            finalMenu.push(currentValue.menuUrl);
                        }, []);
                        return finalMenu
                    }, []);
                    // sessionStorage.setItem('routerList', JSON.stringify(allLink));
                    this.$store.commit("setRouterList", allLink);
                    this.$router.push('/');
                });
            }
        },
        mounted() {
            this.ruleForm2.mask = this.maskTips;
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .login-container {
        height: 100%;
        width: 100%;
        position: fixed;
        left: 0;
        top: 0;

        .login-bg {
            height: 66.11%;
            background: url("../../assets/img/login/login-bg.png") center center no-repeat /cover;
        }

        .login {
            position: absolute;
            width: 560px;
            height: 460px;
            bottom: 19.6%;
            left: 50%;
            margin-left: -280px;

            .login-icon {
                margin-bottom: -20px;
            }

            .login-context {
                height: 100%;
                background: url("../../assets/img/login/login-box.png") center center no-repeat/100% 100%;
                text-align: center;
                background-origin: padding-box;
                box-sizing: border-box;
                padding-top: 153px;

                .el-form-item {
                    width: 282px;
                    margin: 0 auto 28px;

                    .el-input__inner {
                        border-radius: 18px !important;
                        height: 37px;
                    }

                    button {
                        width: 282px;
                        border-radius: 18px;
                    }
                }

                .mask-layer {
                    z-index: 2;
                    opacity: 0;
                }

                .mask-layer-input {
                    position: absolute;
                    left: 0;
                    top: 0;
                }
            }
        }

        .login-copyright {
            position: absolute;
            bottom: 3%;
            width: 100%;
            text-align: center;
            font-size: 14px;
            color: #AFAFAF;
            font-family: PingFang-SC-Medium;

            p {
                font-size: 18px;
                color: #696969;
                margin-bottom: 20px;
                font-family: PingFang-SC-Medium;
            }
        }
    }
</style>
