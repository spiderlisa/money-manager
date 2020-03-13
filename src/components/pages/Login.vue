<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card tile flat elevation="1">
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
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { Action } from "vuex-class";

  @Component({
    name: "Login"
  })
  export default class Login extends Vue {
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

    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    }

    @Action('login') login: any;

    sendForm() {
      const authData = {
        email: this.email,
        password: this.password
      };
      this.$store
        .dispatch('login', authData)
        .then(() => {
          this.$router.push('/');
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
</script>

<style>
  .fill-height {
    height: 100vh;
  }
</style>