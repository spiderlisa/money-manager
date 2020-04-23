<template>
  <v-card flat elevation="1">
    <v-card-title class="px-3">
      Sign up
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
          label="Enter new password"
          v-model="password"
          :append-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="togglePasswordVisibility"
          :type="passwordVisible ? 'text' : 'password'"
          :rules="rules.passwordRules"
          required
          class="mt-2"
        />
        <v-text-field
          label="Verify password"
          v-model="passwordVer"
          :append-icon="passwordVerVisible ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append="togglePasswordVerVisibility"
          :type="passwordVerVisible ? 'text' : 'password'"
          :rules="rules.passwordVerRules"
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
          Sign up
        </v-btn>
      </v-form>
      <div class="text-center mt-6" v-if="!!registerError">
        <v-alert color="error" border="top" text class="body-2">{{
          registerError
        }}</v-alert>
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "RegisterForm"
})
export default class RegisterForm extends Vue {
  email = "";
  password = "";
  passwordVer = "";

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
    ],
    passwordVerRules: [
      (v: string) => !!v || "Password verification is required"
    ]
  };

  dataIsValid = false;
  passwordVisible = false;
  passwordVerVisible = false;

  registerError = false;

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  togglePasswordVerVisibility() {
    this.passwordVerVisible = !this.passwordVerVisible;
  }

  @Watch("passwordVer")
  passwordsMatch(newVal: string) {
    const rule = (v: string) => !v || "Passwords don't match";
    if (newVal !== this.password) {
      if (this.rules.passwordVerRules.length === 1)
        // @ts-ignore
        this.rules.passwordVerRules.push(rule);
    } else {
      if (this.rules.passwordVerRules.length > 1)
        this.rules.passwordVerRules.pop();
    }
  }

  sendForm() {
    const authData = {
      email: this.email,
      password: this.password
    };

    this.$store.dispatch("register", authData).then(res => {
      if (res.success) {
        this.$router.push("/login");
      } else {
        this.registerError = res.message;
        setTimeout(() => (this.registerError = false), 3000);
      }
    });
  }
}
</script>
