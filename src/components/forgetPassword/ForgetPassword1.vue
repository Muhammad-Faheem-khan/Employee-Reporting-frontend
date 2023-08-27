<template>
  <!--Main-Container-->
  <v-container class="my-6">
    <!--Alert-->
    <div style="position: absolute; right: 1rem; width: 20rem">
      <v-alert
        :value="alertValue"
        style="z-index: 100"
        dismissible
        :color="alertColor"
        border="left"
        elevation="2"
        colored-border
        icon="mdi-check-circle"
      >
        {{ alertText }}
      </v-alert>
    </div>
    <!--Animated-Image-->
    <v-row class="text-center d-flex pt-16">
      <v-col cols="12">
        <v-avatar size="180">
          <img src="../../assets/forget-password-img.svg" />
        </v-avatar>
      </v-col>
    </v-row>
    <!--Heading-->
    <div class="text-center">
      <h1 class="mt-2 mb-3 text-h5 ml-3 font-weight-medium">
        Forget Password?
      </h1>
      <!--Paragraph-->
      <p class="text-body-2">No worries, we will send you verification email</p>
    </div>

    <v-row class="d-flex justify-center">
      <!--Text-Field-->
      <v-col cols="6">
        <v-text-field
          class="mt-1"
          v-model="userEmail"
          label="Verify Email"
          @keypress.enter="resetPassowrd()"
        >
        </v-text-field>
        <!--ResetPassword-Button-->
        <div class="d-flex justify-center mt-8">
          <v-btn
            class="forget-btn white--text"
            large
            rounded
            color="#013365"
            @click="resetPassowrd()"
            >Reset Password</v-btn
          >
        </div>
      </v-col>
    </v-row>
    <!--BacktoLogin-Button-->
    <div class="d-flex justify-center mt-4">
      <router-link to="/" class="text-decoration-none">
        <v-btn class="forget-btn white--text" large rounded color="secondary">
          <v-icon>mdi-arrow-left-thin</v-icon> Back to Log In
        </v-btn></router-link
      >
    </div>
  </v-container>
</template>

<script>
export default {
  name: "ComponentOne",
  data() {
    return {
      userEmail: "",
    };
  },
  computed: {
    alertValue() {
      return this.$store.state.alertValue;
    },
    alertText() {
      return this.$store.state.alertText;
    },
    alertColor() {
      return this.$store.state.alertColor;
    },
  },
  methods: {
    resetPassowrd() {
      this.$store.dispatch("resetpassword", { email: this.userEmail });
    },
  },
};
</script>
<style scoped>
.forget-btn {
  width: 18rem;
}

@media only screen and (max-width: 600px) {
  .forget-btn {
    width: 11rem;
  }
}
</style>
