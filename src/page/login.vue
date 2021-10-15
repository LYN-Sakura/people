<template>
    <div class="login">
        <el-form
            ref="login"
            class="login_form"
            :model="formValue"
            :rules="formRules"
            @submit.native.prevent
        >
            <el-form-item prop="user_name">
                <el-input
                    v-model="formValue.user_name"
                    prefix-icon="el-icon-user-solid"
                    placeholder="请输入用户名"
                ></el-input>
            </el-form-item>
            <el-form-item prop="user_pwd">
                <el-input
                    v-model="formValue.user_pwd"
                    prefix-icon="el-icon-lock"
                    type="password"
                    placeholder="请输入二级密码"
                    @keyup.13.native="submitForm"
                ></el-input>
            </el-form-item>
        </el-form>
        <div class="btn">
            <el-button
                type="primary"
                class="fSize17"
                :loading="qdLoading"
                @click="submitForm"
                @keyup.enter.native="submitForm"
            >
                登 录
            </el-button>
        </div>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            formValue: {
                user_name: "",
                user_pwd: "",
            },
            formRules: {
                user_name: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur",
                    },
                ],
                user_pwd: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur",
                    },
                ],
            },
            qdLoading: false,
        };
    },
    methods: {
        async submitForm() {
            this.qdLoading = true;
            let send = true;
            this.$refs.login.validate((valid) => {
                send = valid;
            });
            if (send) {
                const result = await this.$http.post("api/Login/login", this.formValue);
                if (result && result.status === 1) {
                    // 登录成功后跳转
                    this.$message.success({
                        message: "登录成功",
                        duration: 500,
                    });
                    this.$router.push("/");
                }
            } else {
                this.$message.error("请输入账号和密码");
            }
            this.qdLoading = false;
        },
    },
};
</script>

<style lang="less" scoped></style>
