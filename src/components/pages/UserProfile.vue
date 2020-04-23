<template>
  <v-card flat class="mb-3 elevation-2">
    <v-card-title>
      Profile
    </v-card-title>
    <v-divider />

    <v-card-text>
      <v-row>
        <v-col class="py-0 title">
          General
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col cols="6"> Email - {{ userEmail }} </v-col>
        <v-col cols="6" class="d-flex justify-end">
          <v-btn
            v-if="!passwordUpdateVisible"
            x-small
            text
            color="error"
            @click="passwordUpdateVisible = true"
          >
            Change password
          </v-btn>
          <v-btn
            v-else
            x-small
            text
            color="error"
            @click="passwordUpdateVisible = false"
          >
            Cancel
          </v-btn>
        </v-col>
        <v-col cols="7" v-if="passwordUpdateVisible">
          <v-form ref="passwordForm" v-model="passwordForm">
            <v-text-field
              v-model="passwordInfo.current"
              dense
              outlined
              label="Current password"
              :rules="passwordRules.current"
              :append-icon="passwordVisible.current ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="passwordVisible.current = !passwordVisible.current"
              :type="passwordVisible.current ? 'text' : 'password'"
            ></v-text-field>
            <v-text-field
              v-model="passwordInfo.new"
              dense
              outlined
              label="New password"
              :rules="passwordRules.new"
              :append-icon="passwordVisible.new ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="passwordVisible.new = !passwordVisible.new"
              :type="passwordVisible.new ? 'text' : 'password'"
            ></v-text-field>
            <v-text-field
              v-model="passwordInfo.confirm"
              dense
              outlined
              label="Confirm new password"
              :rules="passwordRules.confirm"
              :append-icon="passwordVisible.confirm ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="passwordVisible.confirm = !passwordVisible.confirm"
              :type="passwordVisible.confirm ? 'text' : 'password'"
            ></v-text-field>
            <div class="d-flex justify-end">
              <v-spacer />
              <v-btn
                color="primary"
                small
                depressed
                :disabled="!passwordForm"
                @click="updatePassword"
              >
                Change
              </v-btn>
            </div>
          </v-form>
        </v-col>
        <v-col cols="12" v-if="passwordUpdateSuccess" class="text-center">
          <v-alert color="accent" border="top" text class="body-2"
            >Password updated</v-alert
          >
        </v-col>
        <v-col cols="12" v-else-if="passwordUpdateFail" class="text-center">
          <v-alert color="error" border="top" text class="body-2"
            >Failed to update - current password is incorrect</v-alert
          >
        </v-col>
      </v-row>

      <v-row>
        <v-col class="title">Categories</v-col>
      </v-row>
      <template v-for="(category, k) in categories">
        <CategoryInfo :category="category" :key="k" />
      </template>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import CategoryInfo from "../parts/CategoryInfo.vue";
import { PasswordChangeDTO } from "../../store/api/endpoints/userEndpoints";

@Component({
  name: "UserProfile",
  components: {
    CategoryInfo
  }
})
export default class UserProfile extends Vue {
  beforeMount() {
    this.$store.dispatch("fetchUserInfo");
  }

  get userEmail() {
    return this.$store.getters["email"];
  }

  get categories() {
    return this.$store.getters["categories"];
  }

  toTitleCase = (str: string) =>
    str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

  passwordForm = false;
  passwordUpdateVisible = false;
  passwordUpdateSuccess = false;
  passwordUpdateFail = false;

  passwordInfo = {
    current: "",
    new: "",
    confirm: ""
  };

  passwordRules = {
    current: [
      (v: string) => !!v || "Current password is required",
      (v: string) => v.length > 5 || "Current password is too short"
    ],
    new: [
      (v: string) => !!v || "New password is required",
      (v: string) => v.length > 5 || "New password is too short"
    ],
    confirm: [(v: string) => !!v || "Password verification is required"]
  };

  passwordVisible = {
    current: false,
    new: false,
    confirm: false
  };

  @Watch("passwordInfo", { deep: true })
  passwordsMatch() {
    const rule = (v: string) => !v || "Passwords don't match";
    if (this.passwordInfo.confirm !== this.passwordInfo.new) {
      if (this.passwordRules.confirm.length === 1)
        // @ts-ignore
        this.passwordRules.confirm.push(rule);
    } else {
      if (this.passwordRules.confirm.length > 1)
        this.passwordRules.confirm.pop();
    }
  }

  setPasswordUpdated() {
    // @ts-ignore
    this.$refs.passwordForm.reset();
    this.passwordUpdateVisible = false;
    this.passwordUpdateSuccess = true;
    setTimeout(() => (this.passwordUpdateSuccess = false), 5000);
  }

  setCurrentPasswordWrong() {
    this.passwordUpdateFail = true;
    setTimeout(() => (this.passwordUpdateFail = false), 5000);
  }

  async updatePassword() {
    const data: PasswordChangeDTO = {
      oldPassword: this.passwordInfo.current,
      newPassword: this.passwordInfo.new
    };

    const res = await this.$store.dispatch("updatePassword", data);
    if (res) this.setPasswordUpdated();
    else this.setCurrentPasswordWrong();
  }
}
</script>
