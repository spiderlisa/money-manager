<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4" lg="3">
        <LoginForm />
        <div class="my-6 d-flex justify-center" color="primary">
          or sign up if you don't have an account
        </div>
        <RegisterForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import RegisterForm from "../parts/RegisterForm.vue";
import LoginForm from "../parts/LoginForm.vue";

@Component({
  name: "Login",
  components: {
    RegisterForm,
    LoginForm
  }
})
export default class Login extends Vue {
  beforeMount() {
    this.$store.dispatch("logout");
  }
}
</script>

<style>
.fill-height {
  height: 100vh;
}
</style>
