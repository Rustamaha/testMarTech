<template>
  <div class="form-content">
    <div v-if="!isRegCompleted">
      To register, enter the mail to which our news is sent and set your
      password
      <ElForm ref="form" :model="ruleForm" :rules="rules" status-icon>
        <el-form-item prop="email">
          <el-input
            v-model="ruleForm.email"
            class="w-50"
            placeholder="Example@email.com"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            show-password
            placeholder="Password"
          />
        </el-form-item>
        <ElButton :loading="loading" class="form-content__btn" @click="onSubmit"
          >submit</ElButton
        >
      </ElForm>
    </div>
    <div class="form-content__thanks" v-else>
      <h1>Thank you</h1>
      <div class="form-content__info">
        To complete registration, please check your e-mail
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { isEmail, sleep } from "@/utils";
import { useFetch } from "@/services";

const emit = defineEmits(["set-token"]);

const form = ref<FormInstance>();
const ruleForm = ref({
  email: "",
  password: "",
});
const isRegCompleted = ref(false);
const loading = ref(false);

const validateEmail = (
  _rule: any,
  value: string,
  callback: (arg?: Error) => void
) => {
  if (!isEmail(value)) {
    callback(new Error("Please enter a valid e-mail"));
  } else {
    callback();
  }
};

const rules = reactive<FormRules>({
  email: [
    { required: true, message: "Please enter a valid e-mail", trigger: "blur" },
    { validator: validateEmail, trigger: "blur" },
  ],
  password: [
    { required: true, message: "Please enter a password", trigger: "blur" },
    {
      min: 8,
      max: 15,
      message: "Password is from 8 to 15 symbols",
      trigger: "blur",
    },
  ],
});

const onSubmit = async () => {
  if (!form.value) return;
  let isValid = false;
  await form.value.validate((valid, fields) => {
    if (valid) {
      isValid = valid;
      console.log("submit!");
    } else {
      isValid = false;
      console.log("error submit!", fields);
    }
  });
  if (isValid) {
    loading.value = true;
    const { token, status, error } = await useFetch(ruleForm.value);
    if (error?.value) {
      console.warn(error);
    }
    isRegCompleted.value = !!status?.value;
    loading.value = false;
    if (token?.value) {
      emit("set-token", token.value);
    }
  }
};
</script>
<style lang="scss" scoped>
.form-content {
  margin: 76px 0 0 0;
  max-width: 620px;
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  letter-spacing: -0.04em;
  color: #3a3a3a;

  :deep(.is-focus) {
    box-shadow: none;
  }

  :deep(.el-input__wrapper) {
    box-shadow: none;
    border-bottom: 1px solid #3a3a3a;
    opacity: 0.5;
    border-radius: 0;
  }

  :deep(.is-error) {
    border-bottom: 1px solid #ff0000;
    opacity: 0.7;
  }

  :deep(.el-input) {
    margin-top: 50px;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
    text-indent: 24px;
  }

  .input-error {
    background: #ff0000;
  }

  :deep(.el-form-item__error) {
    left: calc(100% - 60%);
  }

  &__btn {
    margin-top: 46px;
  }

  &__thanks {
    display: flex;
    flex-direction: column;
  }

  &__info {
    margin-top: 20px;
  }
}

@media only screen and (max-width: 800px) {
  .form-content {
    :deep(.el-form-item__error) {
      left: calc(100% - 70%);
    }
  }
}

@media only screen and (max-width: 500px) {
  .form-content {
    margin: 30px 0 0 0;
    font-size: 17px;
    line-height: 24px;

    :deep(.el-input) {
      margin-top: 30px;
    }

    :deep(.el-form-item__error) {
      left: calc(100% - 90%);
    }
  }
}
</style>
