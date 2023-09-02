<template>
  <!--Main-Container-->
  <v-container class="mt-6">
    <!--Alert-->
    <div style="position: absolute; right: 1rem; width: 20rem">
    </div>
    <!--Animated-Image-->
    <v-row class="text-center pt-10">
      <v-col cols="12 pt-10">
        <v-avatar size="180">
          <img src="../../assets/checkEmail.svg" />
        </v-avatar>
      </v-col>
    </v-row>

    <v-row class="text-center">
      <v-col class="mb-1" cols="12">
        <!--Heading-->
        <h1 class="mt-2 mb-3 text-h5 ml-3 font-weight-medium">
          Check your Email
        </h1>
        <!--Paragraph-->
        <p class="text-body-2">We sent a system generated password to</p>
        <!-- <p class="text-body-1">{{ userEmail ? userEmail.slice(0,3)+'********' + userEmail.slice(-11) : '*********email********' }}</p> -->
        <!--OpenEmail-Button-->
        <a class="text-decoration-none" href="https://mail.google.com/">
          <v-btn class="forget-btn white--text" large rounded color="#013365"
            >Check Mail</v-btn
          >
        </a>
        <p class="text-body-2 mt-3">Use those credentials to Login again.</p>
        <!--Resend-Button-->
        <div class="d-flex justify-center mt-4 flex-container">
          <p class="mt-1 mr-3">Didn't receive email?</p>
          <v-btn text color="#013365" >Contact HR</v-btn>
        </div>
        <!--BacktoLogin-Button-->
        <div class="d-flex justify-center mt-4">
          <router-link to="/" class="text-decoration-none">
            <v-btn
              class="forget-btn white--text"
              large
              rounded
              color="secondary"
              
            >
              <v-icon>mdi-arrow-left-thin</v-icon> Back to Log In
            </v-btn></router-link
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ComponentOne",

  data() {
    return {};
  },

  methods: {
 
  
  },
};
</script>
<style scoped>
.forget-btn {
  width: 18rem;
}

@media only screen and (max-width: 600px) {
  .forget-btn {
    width: 15rem;
  }

  .flex-container {
    flex-direction: column;
    align-content: center;
  }

  .flex-container > p {
    margin-bottom: 0;
  }
}
</style>
