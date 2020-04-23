<template>
  <v-card flat elevation="1">
    <v-card-title class="px-3">
      Sign in
    </v-card-title>
    <v-card-text>
      <v-form v-model="dataIsValid" class="px-3 mt-2 mb-4">
        <v-text-field
          label="Enter your e-mail address"
          v-model="email"
          :rules="rules.emailRules"
          required
        />
        <v-text-field
          label="Enter your password"
          v-model="password"
          :append-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="togglePasswordVisibility"
          :type="passwordVisible ? 'text' : 'password'"
          :rules="rules.passwordRules"
          required
          class="mt-2"
        />
        <v-btn
          class="mt-8"
          color="primary"
          :disabled="!dataIsValid"
          depressed
          block
          @click="sendForm"
        >
          Sign in
        </v-btn>
      </v-form>
      <div class="text-center mt-6" v-if="!!loginError">
        <v-alert color="error" border="top" text class="body-2">{{
          loginError
        }}</v-alert>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "LoginForm"
})
export default class LoginForm extends Vue {
  email = "";
  password = "";

  rules = {
    emailRules: [
      (v: string) => !!v || "E-mail is required",
      (v: string) =>
        /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail must be valid"
    ],
    passwordRules: [
      (v: string) => !!v || "Password is required",
      (v: string) => v.length > 5 || "Password is too short"
    ]
  };

  dataIsValid = false;
  passwordVisible = false;

  loginError = false;

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  async sendForm() {
    const authData = {
      email: this.email,
      password: this.password
    };

    this.$store.dispatch("login", authData).then(res => {
      if (res.success) {
        this.$router.push("/home");
      } else {
        this.loginError = res.message;
        setTimeout(() => (this.loginError = false), 3000);
      }
    });
  }
}
</script>
