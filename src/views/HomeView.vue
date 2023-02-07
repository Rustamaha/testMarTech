<template>
  <div class="main-block">
    <MainLogo />

    <div class="main-block__subscriber">
      <h1>How to participate</h1>
      <div class="main-block__ol" v-for="(i, idx) in texts" :key="idx">
        <div class="main-block__li">{{ idx + 1 }}.</div>
        <div v-if="i === 'sign up'" class="main-block__content">
          <ElButton @click="openForm">
            {{ i }}
          </ElButton>
        </div>
        <div v-else class="main-block__content">{{ i }}</div>
      </div>
    </div>
    <el-dialog v-model="dialogVisible" width="30%" destroy-on-close center>
      <RegistrationForm @set-token="setToken" />
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import MainLogo from "@/components/MainLogo.vue";
import RegistrationForm from "@/components/RegistrationForm.vue";
import { sleep } from "@/utils";

const dialogVisible = ref(false);
const texts = [
  "Subscribe to our News",
  "sign up",
  "Check your email inbox",
  "Wait till September 22",
];

const redirect = (token: string) =>
  (window.location.href = `https://www.dating.com/people/#token=${token}`);

onMounted(async () => {
  if (localStorage.token) {
    await sleep(2000);
    redirect(localStorage.token);
  }
});

const openForm = () => (dialogVisible.value = true);

const setToken = (token: string) => {
  localStorage.token = token;
  redirect(token);
};
</script>

<style lang="scss" scoped>
.main-block {
  width: 100%;
  max-width: 1920px;
  max-height: 1080px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;

  &__subscriber {
    margin-left: 170px;
  }

  &__ol {
    display: flex;
    align-items: center;
  }

  &__li {
    font-weight: 800;
    font-size: 55px;
    line-height: 75px;
    letter-spacing: -0.05em;
    background: linear-gradient(145.08deg, #e61726 12.35%, #d4208c 83.63%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    padding-right: 20px;
  }

  &__content {
    font-weight: 600;
    font-size: 38px;
    line-height: 198.18%;
    letter-spacing: -0.05em;
    color: #3a3a3a;
  }

  :deep(.el-button) {
    padding: 25px 51px;
    gap: 10px;
    width: 387px;
    height: 81px;
    background: linear-gradient(238.08deg, #d4208c 0.42%, #e61726 82.5%);
    border-radius: 10px;
    color: #fff;
    font-weight: 800;
    font-size: 23px;
    line-height: 31px;
    letter-spacing: 0.03em;
    text-transform: uppercase;

    @media only screen and (max-width: 700px) {
      width: 300px;
    }
    @media only screen and (max-width: 550px) {
      width: 200px;
    }
    @media only screen and (max-width: 500px) {
      padding: 25px 51px;
      gap: 10px;
      width: 166px;
      height: 45px;
      font-size: 12px;
      line-height: 16px;
    }
  }

  :deep(.el-dialog) {
    width: 66%;
    height: 60%;
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 50px;

    header {
      button {
        el-icon {
          color: red;
        }
      }
    }
  }

  :deep(.el-dialog__body) {
    display: flex;
    justify-content: center;
  }

  :deep(.el-overlay) {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(7.5px);
  }
}

@media only screen and (max-width: 1300px) {
  .main-block {
    &__subscriber {
      width: 400px;
      margin-left: 5%;

      h1 {
        font-size: 70px;
      }
    }

    &__li {
      font-size: 45px;
    }

    &__content {
      font-size: 30px;
    }
  }
}

@media only screen and (max-width: 1170px) {
  .main-block {
    padding: 0 20px;
    flex-direction: column;
    align-items: center;
  }
}

@media only screen and (max-width: 800px) {
  .main-block {
    svg {
      max-width: 100%;
      max-height: 400px;
    }

    &__subscriber {
      width: 400px;
      margin-left: 5%;

      h1 {
        font-size: 60px;
      }
    }

    &__li {
      font-size: 35px;
    }

    &__content {
      font-size: 25px;
    }
  }
}

@media only screen and (max-width: 500px) {
  .main-block {
    svg {
      max-width: 100%;
      max-height: 250px;
    }

    &__subscriber {
      width: 100%;

      h1 {
        font-size: 40px;
      }
    }

    &__li {
      font-size: 33px;
    }

    &__content {
      font-size: 20px;
    }

    :deep(.el-dialog) {
      border-radius: 20px;
      width: 70%;
      height: 440px;
    }
  }
}

@media only screen and (max-width: 420px) {
  .main-block {
    &__subscriber {
      h1 {
        font-size: 35px;
      }
    }

    &__li {
      font-size: 33px;
    }

    &__content {
      font-size: 18px;
    }

    :deep(.el-dialog) {
      width: 278px;
      height: 440px;
    }
  }
}
</style>
