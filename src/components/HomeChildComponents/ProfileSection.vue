<template>
  <!--Main-Conatiner-->
  <v-container>
    <!--Heading-->
    <div class="row d-flex justify-center">
      <div class="d-flex justify-space-between col-lg-12 announce-row">
        <h1 class="mt-6 mb-4 text-h4 ml-3 font-weight-medium">User Profile</h1>
        <router-link
          class="text-decoration-none"
          :to="{ name: 'updateProfile', params: { id: user._id } }"
        >
          <v-btn
            class="mt-6 ml-5 create-btn"
            outlined
            height="2rem"
            color="#013365"
          >
            Update Profile
          </v-btn>
        </router-link>
      </div>
    </div>

    <div class="d-flex justify-center">
      <v-avatar size="250px" v-ripple class="mb-3">
        <v-img
          contain
          :src="
            user.img
              ? user.img
              : `https://www.pngitem.com/pimgs/m/551-5510463_default-user-image-png-transparent-png.png`
          "
          alt="loading"
        ></v-img>
      </v-avatar>
    </div>
    <div v-if="apiLoading" class="d-flex justify-center mt-15">
      <v-progress-circular
        :size="50"
        indeterminate
        color="primary"
      ></v-progress-circular>
    </div>

    <div v-else class="pl-10 mb-5 pb-5">
      <!--Full-Name-->
      <v-row class="d-flex justify-around flex-container">
        <v-col md="3" sm="3" class="d-flex justify-center py-0">
          <h4 class="mt-4 text-center">Full Name</h4>
        </v-col>
        <v-col md="8" sm="9" class="d-flex justify-center py-0 pt-2">
          <!--Name-Field-->
          <p class="text-center mt-2">{{ user.name }}</p>
        </v-col>
      </v-row>
      <!--Department Name-->
      <v-row class="flex-container">
        <v-col md="3" sm="3" class="d-flex justify-center py-0">
          <h4 class="mt-4 text-center">Department Name</h4>
        </v-col>
        <!--Job-Title-Field-->
        <v-col md="8" m="9" class="d-flex justify-center py-0 pt-2">
          <p class="text-center mt-2">{{ user.departmentName }}</p>
        </v-col>
      </v-row>
      <!--Designation-->
      <v-row class="flex-container">
        <v-col md="3" sm="3" class="d-flex justify-center py-0">
          <h4 class="mt-4 text-center">Designation</h4>
        </v-col>
        <!--Designation-Field-->
        <v-col md="8" m="9" class="d-flex justify-center py-0 pt-2">
          <p class="text-center mt-2">{{ user.designation }}</p>
        </v-col>
      </v-row>
      <v-row class="flex-container">
        <v-col md="3" sm="3" class="d-flex justify-center py-0">
          <h4 class="mt-4 text-center">Job Description</h4>
        </v-col>
        <v-col md="8" m="9" class="d-flex justify-center py-0 pt-2">
          <p class="text-center mt-2">{{ user.jobDescription }}</p>
        </v-col>
      </v-row>

      <v-row class="flex-container">
        <v-col md="3" sm="3" class="d-flex justify-center py-0">
          <h4 class="mt-4 text-center">Employee Reporting To</h4>
        </v-col>
        <v-col md="8" m="9" class="d-flex justify-center py-0 pt-2">
          <p class="text-center mt-2">{{ user.employeeReportingTo?.name }}</p>
        </v-col>
      </v-row>
      <v-row class="flex-container">
        <v-col md="3" sm="3" class="d-flex justify-center py-0">
          <h4 class="mt-4 text-center">Employee Status</h4>
        </v-col>
        <v-col md="8" m="9" class="d-flex justify-center py-0 pt-2">
          <p class="text-center mt-2">{{ user.employeeStatus }}</p>
        </v-col>
      </v-row>
      <v-row class="flex-container">
        <v-col md="3" sm="3" class="d-flex justify-center py-0">
          <h4 class="mt-4 text-center">Salary</h4>
        </v-col>
        <v-col md="8" m="9" class="d-flex justify-center py-0 pt-2">
          <p class="text-center mt-2">{{ user.salary }}</p>
        </v-col>
      </v-row>
      <!--Joining date-->
      <v-row class="flex-container">
        <v-col md="3" sm="3" class="d-flex justify-center py-0">
          <h4 class="mt-4 text-center">Joining date</h4>
        </v-col>
        <!--Joining date-->
        <v-col md="8" m="9" class="d-flex justify-center py-0 pt-2">
          <p class="text-center mt-2">
            {{ user.joiningDate  }}
          </p>
        </v-col>
      </v-row>
      <!--Gender-->
      <v-row class="flex-container">
        <v-col md="3" sm="3" class="d-flex justify-center py-0">
          <h4 class="mt-4 text-center">Gender</h4>
        </v-col>
        <!--Gender-Field-->
        <v-col md="8" sm="9" class="d-flex justify-center py-0 pt-2">
          <p class="text-center mt-2">{{ user.gender }}</p>
        </v-col>
      </v-row>

      <!--Date of Birth-->
      <v-row class="flex-container">
        <v-col md="3" sm="3" class="d-flex justify-center py-0">
          <h4 class="mt-4 text-center">Date of Birth</h4>
        </v-col>
        <!--Date of Birth-->
        <v-col md="8" m="9" class="d-flex justify-center py-0 pt-2">
          <p class="text-center mt-2">
            {{ user.dob  }}
          </p>
        </v-col>
      </v-row>
      <!--CNIC-->
      <v-row class="flex-container">
        <v-col md="3" sm="3" class="d-flex justify-center py-0">
          <h4 class="mt-4 text-center">CNIC</h4>
        </v-col>
        <!--CNIC-Field-->
        <v-col md="8" m="9" class="d-flex justify-center py-0 pt-2">
          <p class="text-center mt-2">{{ user.formattedCNIC }}</p>
        </v-col>
      </v-row>
      <!--Employee Code-->
      <v-row class="flex-container">
        <v-col md="3" sm="3" class="d-flex justify-center py-0">
          <h4 class="mt-4 text-center">Employee Code</h4>
        </v-col>
        <!--Employee Code-Field-->
        <v-col md="8" m="9" class="d-flex justify-center py-0 pt-2">
          <p class="text-center mt-2">{{ user.employeeCode }}</p>
        </v-col>
      </v-row>
      <!--Mobile-->
      <v-row class="flex-container">
        <v-col md="3" sm="3" class="d-flex justify-center py-0">
          <h4 class="mt-4 text-center">Comapny Mobile #</h4>
        </v-col>
        <!--Mobile-Field-->
        <v-col md="8" m="9" class="d-flex justify-center py-0 pt-2">
          <p class="text-center mt-2">{{ user.mobileFormat }}</p>
        </v-col>
      </v-row>
      <v-row class="flex-container">
        <v-col md="3" sm="3" class="d-flex justify-center py-0">
          <h4 class="mt-4 text-center">Personal Mobile #</h4>
        </v-col>
        <!--Mobile-Field-->
        <v-col md="8" m="9" class="d-flex justify-center py-0 pt-2">
          <p class="text-center mt-2">{{ user.mobileFormat }}</p>
        </v-col>
      </v-row>

      <!--Email-->
      <v-row class="d-flex justify-around flex-container">
        <v-col md="3" sm="3" class="d-flex justify-center py-0">
          <h4 class="mt-4 text-center">Email</h4>
        </v-col>
        <!--Email-Field-->
        <v-col md="8" sm="9" class="d-flex justify-center py-0 pt-2">
          <p class="text-center mt-2">{{ user.email }}</p>
        </v-col>
      </v-row>

      <!--Address-->
      <v-row class="flex-container">
        <v-col md="3" sm="3" class="d-flex justify-center py-0">
          <h4 class="mt-4 text-center">Address</h4>
        </v-col>
        <!--Address-Field-->
        <v-col md="8" m="9" class="d-flex justify-center py-0 pt-2">
          <p class="text-center mt-2">{{ user.address }}</p>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "ProfileSection",

  created() {
    this.$store.commit('setUserImg',null)
    this.$store.state.user = {}
    const userId = this.$route.params.id;
    this.$store.dispatch("viewUserProfile", userId);
  },
  data() {
    return {
      show1: false,
    };
  },

  computed: {
    apiLoading() {
      return this.$store.state.apiLoading;
    },
    user() {
      return this.$store.state.user;
    },
  },

  methods: {
    
  },
};
</script>

<style>
.time-text {
  font-size: medium;
}
.date-text {
  font-size: small;
}

@media screen and (max-width: 500px) {
  .announce-row {
    flex-direction: column;
    align-items: center;
  }
}
</style>
