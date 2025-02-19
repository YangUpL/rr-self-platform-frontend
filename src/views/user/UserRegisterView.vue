<template>
  <div id="userLoginView">
    <!--    <h2 style="margin-bottom: 16px">用户登录</h2>-->
    <a-form
      ref="registerFormRef"
      style="max-width: 480px; margin: 20px auto"
      label-align="left"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item
        field="username"
        label="账号"
        :rules="[{ required: true, message: '请填写账号' }]"
      >
        <a-input v-model="form.username" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item
        field="password"
        tooltip="密码不少于 8 位"
        label="密码"
        :rules="[
          { required: true, message: '请填写密码' },
          { min: 8, message: '密码不少于 8 位' },
        ]"
      >
        <a-input-password v-model="form.password" placeholder="请输入密码" />
      </a-form-item>
      <a-form-item
        field="confirmPassword"
        tooltip="密码不少于 8 位"
        label="确认密码"
        :rules="[
          { required: true, message: '请再次输入密码' },
          { validator: validateConfirmPassword },
        ]"
      >
        <a-input-password
          v-model="form.confirmPassword"
          placeholder="请再次输入密码"
        />
      </a-form-item>
      <a-form-item
        field="email"
        label="邮箱"
        :rules="[
          { required: true, message: '请填写邮箱' },
          { type: 'email', message: '请输入有效的邮箱地址' },
        ]"
      >
        <a-input v-model="form.email" placeholder="请输入邮箱" />
      </a-form-item>
      <a-form-item
        field="code"
        tooltip="点击右侧按钮 获取验证码"
        label="验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <a-input v-model="form.code" placeholder="请输入验证码" />
        <a-button type="outline" @click="doSendMail()">获取验证码</a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 120px">
          注册
        </a-button>
      </a-form-item>
    </a-form>

    <div class="toLogin">
      已有账号？<router-link to="/user/login">去登陆</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { EmailDto, UserControllerService } from "../../../generated";
import { Message } from "@arco-design/web-vue";
import type { FormInstance } from "@arco-design/web-vue";

/**
 * 表单信息
 */
const form = reactive({
  username: "",
  password: "",
  confirmPassword: "",
  email: "",
  code: "",
});

const emailDto: EmailDto = reactive({
  email: "",
});

const router = useRouter();
const store = useStore();

const registerFormRef = ref<FormInstance | null>(null);

const doSendMail = async () => {
  if (registerFormRef.value) {
    try {
      await registerFormRef.value.validateField("email");
      emailDto.email = form.email;
      await UserControllerService.sendMail(emailDto);
    } catch (error) {
      // 验证失败时，Arco Design 会自动显示错误信息
    }
  }
};

/**
 * 验证确认密码
 */
const validateConfirmPassword = (rule: any, value: string) => {
  if (form.confirmPassword === form.password) {
    return Promise.resolve();
  }
  Message.error({
    id: "validateConfirmPasswordError",
    content: "两次输入密码不一致",
    duration: 2000,
  });
  return Promise.reject(new Error("两次输入的密码不一致"));
};

/**
 * 提交表单
 * @param data
 */
const handleSubmit = async () => {
  if (registerFormRef.value) {
    try {
      await registerFormRef.value.validate();
      if (
        form.username === "" ||
        form.password === "" ||
        form.confirmPassword === "" ||
        form.email === "" ||
        form.code === ""
      ) {
        return;
      }
      const res = await UserControllerService.register(form);
      if (res.code === 20000) {
        Message.success({
          id: "registerSuccess",
          content: "注册成功，快去登陆吧",
          duration: 2000,
        });
        router.push("/user/login");
      } else {
        Message.error({
          id: "registerError",
          content: res.description as string,
          duration: 2000,
        });
      }
    } catch (error) {
      // 表单校验失败，Arco Design 会自动显示错误信息
    }
  }
};
</script>

<style scoped>
/* 可以在这里添加自定义样式 */
</style>
