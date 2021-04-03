<template>
  <div class="wrapper">
    <img
      src="http://www.dell-lee.com/imgs/vue3/user.png"
      class="wrapper__img"
    />
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        placeholder="请输入用户名"
        v-model="username"
      />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        placeholder="请输入密码"
        type="password"
        v-model="password"
        autocomplete="new-password"
      />
    </div>
    <div class="wrapper__Login-button" @click="handleLogin">登陆</div>
    <div class="wrapper__Login-link" @click="handleRegisterClick">立即注册</div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast'
// 处理登陆逻辑
const useLoginEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({
    username: '',
    password: ''
  })
  const handleLogin = async () => {
    try {
      const { username, password } = data
      if (username === '' || password === '') {
        showToast('Login failed')
      } else {
        const result = await post('/api/user/login', {
          username: data.username,
          password: data.password
        })
        if (result?.errno === 0) {
          localStorage.isLogin = true
          router.push({ name: 'Home' })
        } else {
          showToast('Login failed')
        }
      }
    } catch (e) {
      showToast('Request failed')
    }
  }
  const { username, password } = toRefs(data)
  return { username, password, handleLogin }
}
// 处理注册跳转
const useRegisterEffect = () => {
  const router = useRouter()
  const handleRegisterClick = () => {
    router.push({ name: 'Register' })
  }
  return { handleRegisterClick }
}
export default {
  name: 'Login',
  components: { Toast },
  // 代码执行流程
  setup () {
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, handleLogin } = useLoginEffect(showToast)
    const { handleRegisterClick } = useRegisterEffect()
    return { handleLogin, handleRegisterClick, username, password, show, toastMessage }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variables.scss';
.wrapper {
  position: absolute;
  top: 50%;
  right: 0;
  left: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    margin: 0 auto .4rem auto;
    width: .66rem;
    height: .66rem;
  }
  &__input {
    height: .48rem;
    margin: 0 .4rem .16rem .4rem;
    padding: 0 .16rem;
    background: #f9f9f9;
    border: .01rem solid rgba(0, 0, 0, 0.1);
    border-radius: .06rem;
    border-radius: .06rem;
    &__content {
      margin-top: .12rem;
      width: 100%;
      line-height: .22rem;
      border: none;
      outline: none;
      background: none;
      font-size: .16rem;
      color: $content-notice-fontColor;
      &::placeholder {
        color: $content-notice-fontColor;
      }
    }
  }
  &__Login-button {
    margin: .32rem .4rem .16rem .4rem;
    line-height: .48rem;
    background: $btn-bgColor;
    box-shadow: 0 .04rem .08rem 0 rgba(0, 145, 255, .32);
    border-radius: .04rem;
    border-radius: .04rem;
    color: $bgColor;
    font-size: .16rem;
    text-align: center;
  }
  &__Login-link {
    font-size: .14rem;
    color: $content-notice-fontColor;
    text-align: center;
  }
}
</style>
