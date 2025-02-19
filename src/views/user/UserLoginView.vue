<template>
  <div id="userLoginView">
    <!--    <h2 style="margin-bottom: 16px">用户登录</h2>-->
    <a-tabs
      default-active-key="1"
      style="max-width: 480px; margin: 0 auto"
      @tab-click="doChangeTab()"
    >
      <a-tab-pane key="1" title="账号密码登录">
        <a-form
          style="max-width: 480px; margin: 20px auto"
          label-align="left"
          auto-label-width
          :model="form"
          @submit="handleSubmit"
        >
          <a-form-item
            field="username"
            label="账号"
            :rules="[{ required: true, message: '请填写用户名' }]"
          >
            <a-input v-model="form.username" placeholder="请输入账号" />
          </a-form-item>
          <a-form-item
            field="password"
            tooltip="密码不少于 8 位"
            label="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          >
            <a-input-password
              v-model="form.password"
              placeholder="请输入密码"
            />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" style="width: 120px">
              登录
            </a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="2" title="邮箱登录">
        <a-form
          ref="emailFormRef"
          style="max-width: 480px; margin: 20px auto"
          label-align="left"
          auto-label-width
          :model="form"
          @submit="handleSubmit"
        >
          <a-form-item
            field="email"
            label="邮箱"
            :rules="[{ required: true, message: '请填写邮箱' }]"
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
              登录
            </a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
    <div class="toRegister">
      没有账号？<router-link to="/user/register">去注册</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
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
  email: "",
  code: "",
  loginType: 1,
});

const emailDto: EmailDto = reactive({
  email: "",
});

const router = useRouter();
const route = useRoute();
const store = useStore();

const emailFormRef = ref<FormInstance | null>(null);

const doChangeTab = () => {
  form.loginType = form.loginType === 1 ? 0 : 1;
};

const doSendMail = async () => {
  if (emailFormRef.value) {
    try {
      await emailFormRef.value.validateField("email");
      if (!emailDto.email) {
        return;
      }
      emailDto.email = form.email;
      await UserControllerService.sendMail(emailDto);
    } catch (error) {
      // 验证失败时，Arco Design 会自动显示错误信息
    }
  }
};

/**
 * 提交表单
 * @param data
 */
const handleSubmit = async () => {
  if (form.loginType === 1 && (form.username === "" || form.password === "")) {
    return;
  }
  if (form.loginType === 0 && (form.email === "" || form.code === "")) {
    return;
  }
  const res = await UserControllerService.login(form);
  if (res.code === 20000) {
    store.dispatch("user/getLoginUser");
    Message.success({
      id: "loginSuccess",
      content: "登陆成功",
      duration: 2000,
    });
    const redirect = route.query.redirect;
    if (redirect) {
      router.push(redirect as string);
    } else {
      // 如果没有 redirect 参数，跳转到默认页面
      router.push("/");
    }
  } else {
    Message.error({
      id: "loginError",
      content: res.description as string,
      duration: 2000,
    });
  }
};
</script>

<style scoped>
/* 可以在这里添加自定义样式 */
</style>
