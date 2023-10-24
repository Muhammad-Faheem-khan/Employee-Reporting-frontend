<template>
  <!--Main-Container-->
  <v-container class="text-center">
    <v-row class="d-flex justify-end mt-4">
      <v-col col="12" md="6" lg="4">
        <v-alert
          v-model="alertValue"
          dismissible
          :color="alertColor"
          text
          border="right"
        >
          {{ alertText }}
        </v-alert>
      </v-col>
    </v-row>

    <!--Main-Row-->
    <v-row class="d-flex justify-space-around mt-4">
      <!--First-Column-->
      <v-col cols="12" md="6" class="my-auto hidden-sm-and-down">
        <!--Animated-Image-->
        <div class="d-flex flex-column align-center">
          <v-img src="../assets/loginPageSideImg.svg" width="100%"></v-img>
        </div>
      </v-col>
      <!--Second-Column-->
      <v-col cols="12" md="6" sm="9" class="px-13 mt-8">
        <!--Logo-Image-->
        <div class="d-flex flex-column align-center pt-5">
          <v-img src="../assets/logo.png" width="130" height="130"></v-img>
        </div>
        <!--Main-Heading-->
        <h1 class="mt-6 mb-4 text-h5 ml-3 font-weight-medium pt-4">Login</h1>
        <!--Login-Form-->
        <v-form class="pt-4">
          <!--Email/Username-Field-->
          <v-text-field
            ref="loginInput"
            v-model="loginData.userID"
            :rules="validation.required"
            label="Email"
            required
            @keypress.enter="validate"
          ></v-text-field>
          <!--Password-Field-->
          <v-text-field
            v-model="loginData.password"
            :append-icon="eyeIcon ? 'mdi-eye' : 'mdi-eye-off'"
            :type="eyeIcon ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            :rules="validation.required"
            @click:append="eyeIcon = !eyeIcon"
            required
            @keypress.enter="validate"
          ></v-text-field>
          <!--Forgot-Password-->
          <div class="text-end mb-2">
            <small
              ><router-link to="/forgetPassword"
                ><a>Forgot Password? </a></router-link
              >
            </small>
          </div>
          <!--Submit-Button-->
          <div class="d-flex flex-column align-center py-3 buttons_padding">
            <v-btn
              rounded
              color="#013365"
              large
              class="sign_btn white--text"
              @click="validate"
              :loading="apiLoading"
            >
              Login
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as validations from "../validations";
export default {
  name: "LoginPage",
  created() {
    this.validation = validations;
  },
  mounted() {
    // Set the focus on the password input field when the component is mounted
    this.$refs.loginInput.focus();
  },
  methods: {
    // function to check both fields are present to login
    validate() {
      if (navigator.onLine) {
        if (this.loginData.userID && this.loginData.password) {
          this.$store.dispatch("loginValidation", this.loginData);
        } else {
          this.$store.commit("setAlertValue", true);
          this.$store.commit("setAlertText", "Invalid email or password");
          this.$store.commit("setAlertColor", "red");
          setTimeout(() => {
            this.$store.commit("setAlertValue", false);
          }, 3000);
        }
      } else {
        this.$store.commit("setAlertValue", true);
        this.$store.commit("setAlertText", "Check Your Internet");
        this.$store.commit("setAlertColor", "red");
        setTimeout(() => {
          this.$store.commit("setAlertValue", false);
        }, 3000);
      }
    },
  },
  computed: {
    apiLoading() {
      return this.$store.state.apiLoading;
    },
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
  data: () => ({
    eyeIcon: false,
    validation: "",
    loginData: {
      userID: "",
      password: "",
    },
  }),
};
</script>

<style scoped>
p {
  width: 35%;
  text-align: center;
  border-bottom: 1px solid #000;
  line-height: 0.1em;
  margin: 20px 0 20px;
}

p span {
  background: #fff;
  padding: 0 10px;
}

.sign_btn {
  width: 18rem;
}

@media only screen and (max-width: 600px) {
  .sign_btn {
    width: 15rem;
  }

  .l_name {
    padding-top: 0px;
  }

  .f_name {
    padding-bottom: 0px;
  }
}
</style>
