<template>
  <div class="auth-page">
    <div class="auth-container">
      <div class="auth-header">
        <h1 class="auth-title">登录</h1>
        <p class="auth-subtitle">欢迎回来，请登录您的账户</p>
      </div>
      
      <form class="auth-form" @submit.prevent="handleLogin">
        <div class="form-group">
          <label class="form-label">邮箱</label>
          <input
            v-model="form.email"
            type="email"
            class="form-input"
            :class="{ 'error': emailError }"
            placeholder="请输入邮箱地址"
            @blur="validateEmail"
            @input="clearEmailError"
          />
          <span v-if="emailError" class="error-message">{{ emailError }}</span>
        </div>
        
        <div class="form-group">
          <label class="form-label">密码</label>
          <div class="password-input-wrapper">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              class="form-input"
              placeholder="请输入密码"
            />
            <button
              type="button"
              class="password-toggle"
              @click="togglePassword"
              tabindex="-1"
            >
              <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 4C5 4 1.73 8.11 1.13 8.93a1 1 0 0 0 0 1.14C1.73 11.89 5 16 10 16s8.27-4.11 8.87-4.93a1 1 0 0 0 0-1.14C18.27 8.11 15 4 10 4Zm0 10c-3.31 0-6.13-2.61-7.19-4C3.87 8.61 6.69 6 10 6s6.13 2.61 7.19 4C16.13 11.39 13.31 14 10 14Zm0-7a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" fill="#409eff"/></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2.293 2.293a1 1 0 0 1 1.414 0l14 14a1 1 0 0 1-1.414 1.414l-2.09-2.09C12.47 16.2 11.26 16.5 10 16.5c-5 0-8.27-4.11-8.87-4.93a1 1 0 0 1 0-1.14c.37-.5 1.13-1.47 2.19-2.36L2.293 2.293ZM10 14.5c1.26 0 2.47-.3 3.5-.82l-1.44-1.44A3 3 0 0 1 7.76 8.94l-1.44-1.44C3.87 8.61 1.87 10.39 1.13 11.07c1.06 1.39 3.88 4 7.19 4Zm7.19-3.5c-.37.5-1.13 1.47-2.19 2.36l-1.44-1.44A3 3 0 0 0 12.24 8.94l-1.44-1.44C16.13 8.61 18.13 10.39 18.87 11.07c-1.06 1.39-3.88 4-7.19 4Z" fill="#409eff"/></svg>
            </button>
          </div>
        </div>
        
        <div class="form-actions">
          <button
            type="submit"
            class="btn-primary"
            :disabled="!isFormValid || loading"
          >
            <span v-if="loading">登录中...</span>
            <span v-else>登录</span>
          </button>
        </div>
        
        <div class="auth-links">
          <router-link to="/register" class="auth-link">注册账户</router-link>
          <router-link to="/forgot-password" class="auth-link">忘记密码？</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: ''
})

const emailError = ref('')
const showPassword = ref(false)

const loading = computed(() => authStore.loading)

const isFormValid = computed(() => {
  return form.value.email && form.value.password && !emailError.value
})

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.value.email) {
    emailError.value = '请输入邮箱地址'
  } else if (!emailRegex.test(form.value.email)) {
    emailError.value = '请输入正确的邮箱格式'
  } else {
    emailError.value = ''
  }
}

const clearEmailError = () => {
  if (emailError.value) {
    emailError.value = ''
  }
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleLogin = async () => {
  if (!isFormValid.value) return
  
  const result = await authStore.login(form.value.email, form.value.password)
  
  if (result.success) {
    // 登录成功后跳转
    router.push('/home')
  } else {
    // 这里可以添加错误提示
    console.error('登录失败:', result.error)
  }
}
</script>

<style lang="scss" scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('https://ipfs.crossbell.io/ipfs/bafkreibbx4xm53cp6frlhwt2ewzca2gtu4twepwbm2zdjbbhgp56hrm4vy?img-quality=75&img-format=auto&img-onerror=redirect&img-width=1200') center center/cover no-repeat;
  padding: 20px;
}

.auth-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
  
  @media (max-width: 480px) {
    padding: 30px 20px;
    margin: auto;
  }
}

.auth-header {
  text-align: center;
  margin-bottom: 32px;
}

.auth-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 8px;
}

.auth-subtitle {
  color: var(--text-color-secondary);
  font-size: 14px;
}

.auth-form {
  .form-group {
    margin-bottom: 24px;
  }
  
  .form-label {
    display: block;
    font-weight: 500;
    color: var(--text-color);
    margin-bottom: 8px;
    font-size: 14px;
  }
  
  .form-input {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    font-size: 14px;
    transition: border-color 0.2s ease;
    background: white;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }
    
    &.error {
      border-color: var(--danger-color);
    }
    
    &::placeholder {
      color: var(--text-color-secondary);
    }
  }
  
  .password-input-wrapper {
    position: relative;
    
    .password-toggle {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: var(--primary-color);
      font-size: 16px;
      cursor: pointer;
      padding: 4px 8px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        background: rgba(64, 158, 255, 0.1);
      }
    }
  }
  
  .error-message {
    color: var(--danger-color);
    font-size: 12px;
    margin-top: 4px;
    display: block;
  }
}

.form-actions {
  margin-top: 32px;
}

.btn-primary {
  width: 100%;
  padding: 14px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  
  &:hover:not(:disabled) {
    background: #337ecc;
  }
  
  &:disabled {
    background: var(--info-color);
    cursor: not-allowed;
  }
  
  &:active {
    transform: scale(0.95);
  }
}

.auth-links {
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--border-color);
}

.auth-link {
  color: var(--primary-color);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s ease;
  
  &:hover {
    color: #337ecc;
  }
}
</style> 